import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { server as mockServer } from '../mocks/server';
import {
  CaptureError,
  LoginErrorCode,
  PasswordUnMatchError,
  UnknownError,
  UserProvider,
  useUser,
} from './use-user';

function mockLogin(
  statusCode: number,
  response: Object = {},
  headers: Record<string, string | string[]> = {},
): void {
  mockServer.use(
    rest.post('http://localhost:3000/p1/login', async (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.set(headers), ctx.json(response));
    }),
  );
}

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <UserProvider>{children}</UserProvider>
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
  { statusCode: 422, expectedError: new Error(LoginErrorCode.E_UNKNOWN_ERROR) },
  { statusCode: 418, expectedError: new Error(LoginErrorCode.E_UNKNOWN_ERROR) },
  { statusCode: 429, expectedError: new Error(LoginErrorCode.E_TOO_MANY_ERROR) },
  { statusCode: 502, expectedError: new Error(LoginErrorCode.E_UNKNOWN_ERROR) },
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
