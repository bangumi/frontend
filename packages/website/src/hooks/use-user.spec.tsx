import type { AuthenticationResponseJSON } from '@simplewebauthn/browser';
import { startAuthentication } from '@simplewebauthn/browser';
import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { server as mockServer } from '../mocks/server';
import {
  CaptureError,
  LoginErrorCode,
  PasswordUnMatchError,
  UnknownError,
  UserProvider,
  useUser,
} from './use-user';

vi.mock('@simplewebauthn/browser', () => ({
  startAuthentication: vi.fn(),
}));

const mockedStartAuthentication = vi.mocked(startAuthentication);

const fakeCredential: AuthenticationResponseJSON = {
  id: 'fake-id',
  rawId: 'fake-raw-id',
  type: 'public-key',
  response: {
    clientDataJSON: 'fake-client-data',
    authenticatorData: 'fake-authenticator-data',
    signature: 'fake-signature',
  },
  clientExtensionResults: {},
};

function mockLogin(statusCode: number, response: Object = {}, headers: HeadersInit = {}): void {
  mockServer.use(
    http.post('http://localhost:3000/p1/login', () => {
      return HttpResponse.json(response, {
        status: statusCode,
        headers,
      });
    }),
  );
}

function mockPasskeyOptions(statusCode: number, response: Object = {}): void {
  mockServer.use(
    http.post('http://localhost:3000/p1/passkey/login/options', () => {
      return HttpResponse.json(response, { status: statusCode });
    }),
  );
}

function mockPasskeyVerify(statusCode: number, response: Object = {}): void {
  mockServer.use(
    http.post('http://localhost:3000/p1/passkey/login/verify', () => {
      return HttpResponse.json(response, { status: statusCode });
    }),
  );
}

function mockSuccessfulPasskeyLogin(): void {
  mockPasskeyOptions(200, { options: {}, challenge: 'fake-challenge', rpId: 'bgm.tv' });
  mockedStartAuthentication.mockResolvedValue(fakeCredential);
  mockPasskeyVerify(200, { id: 1, username: 'fakeuser' });
}

beforeEach(() => {
  vi.clearAllMocks();
});

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <SWRConfig value={{ provider: () => new Map() }}>
      <UserProvider>{children}</UserProvider>
    </SWRConfig>
  </MemoryRouter>
);

it.each([
  {
    statusCode: 401,
    body: { code: 'CAPTCHA_ERROR' },
    headers: { 'X-RateLimit-Remaining': '4' },
    expectedError: new CaptureError(4),
  },
  {
    statusCode: 401,
    body: { code: 'EMAIL_PASSWORD_ERROR' },
    headers: { 'X-RateLimit-Remaining': '4' },
    expectedError: new PasswordUnMatchError(4),
  },
  { statusCode: 400, body: { message: 'a' }, expectedError: new UnknownError('a') },
  { statusCode: 422, expectedError: new UnknownError(LoginErrorCode.E_UNKNOWN_ERROR) },
  { statusCode: 418, expectedError: new UnknownError(LoginErrorCode.E_UNKNOWN_ERROR) },
  { statusCode: 429, expectedError: new Error(LoginErrorCode.E_TOO_MANY_ERROR) },
  { statusCode: 502, expectedError: new UnknownError(LoginErrorCode.E_UNKNOWN_ERROR) },
])(
  'should return error if request is failed with failed status $statusCode',
  async ({ statusCode, body = {}, headers = {}, expectedError }) => {
    const { result } = renderHook(() => useUser(), { wrapper });

    mockLogin(statusCode, body, headers);

    expect.assertions(1);
    await waitFor(async () => {
      await expect(result.current.login('fakeuser', 'fakepassword', 'fake-token')).rejects.toEqual(
        expectedError,
      );
    });
  },
);

it('should refresh me if login succeeded', async () => {
  const { result } = renderHook(() => useUser(), { wrapper });

  mockLogin(200);
  await waitFor(async () => {
    await result.current.login('fakeuser', 'fakepassword', 'fake-token');
    expect(result.current.user).toMatchSnapshot();
  });
});

it('should stay loading until /me request resolves', async () => {
  let resolveMe!: (value: unknown) => void;
  mockServer.use(
    http.get('http://localhost:3000/p1/me', async () => {
      return new Promise((resolve) => {
        resolveMe = resolve as (value: unknown) => void;
      });
    }),
  );

  const { result } = renderHook(() => useUser(), { wrapper });

  // 等待请求发出，随后验证请求未完成时的状态
  await waitFor(() => {
    expect(typeof resolveMe).toBe('function');
  });
  expect(result.current.isLoading).toBe(true);
  expect(result.current.user).toBeUndefined();

  resolveMe(HttpResponse.json({ id: 1, username: 'fakeuser' }, { status: 200 }));

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
  expect(result.current.user).toEqual({ id: 1, username: 'fakeuser' });
});

it('should return true if passkey login succeeded', async () => {
  const { result } = renderHook(() => useUser(), { wrapper });

  mockSuccessfulPasskeyLogin();
  await waitFor(async () => {
    await expect(result.current.passkeyLogin()).resolves.toBe(true);
  });
  expect(mockedStartAuthentication).toHaveBeenCalledWith({ optionsJSON: {} });
});

it('should throw if passkey options request failed', async () => {
  const { result } = renderHook(() => useUser(), { wrapper });

  mockPasskeyOptions(500);
  await waitFor(async () => {
    await expect(result.current.passkeyLogin()).rejects.toThrow();
  });
  expect(mockedStartAuthentication).not.toHaveBeenCalled();
});

it('should throw if passkey verify request failed', async () => {
  const { result } = renderHook(() => useUser(), { wrapper });

  mockPasskeyOptions(200, { options: {}, challenge: 'fake-challenge', rpId: 'bgm.tv' });
  mockedStartAuthentication.mockResolvedValue(fakeCredential);
  mockPasskeyVerify(401);
  await waitFor(async () => {
    await expect(result.current.passkeyLogin()).rejects.toThrow();
  });
});

it('should return false if user cancelled authentication', async () => {
  const { result } = renderHook(() => useUser(), { wrapper });

  mockPasskeyOptions(200, { options: {}, challenge: 'fake-challenge', rpId: 'bgm.tv' });
  mockedStartAuthentication.mockRejectedValue(new DOMException('canceled', 'NotAllowedError'));
  await waitFor(async () => {
    await expect(result.current.passkeyLogin()).resolves.toBe(false);
  });
});

it('should throw if authentication failed with unexpected error', async () => {
  const { result } = renderHook(() => useUser(), { wrapper });

  mockPasskeyOptions(200, { options: {}, challenge: 'fake-challenge', rpId: 'bgm.tv' });
  mockedStartAuthentication.mockRejectedValue(new Error('browser error'));
  await waitFor(async () => {
    await expect(result.current.passkeyLogin()).rejects.toThrow('browser error');
  });
});
