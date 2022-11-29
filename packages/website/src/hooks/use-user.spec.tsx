import { waitFor, renderHook } from '@testing-library/react';
import { rest } from 'msw';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { server as mockServer } from '../mocks/server';
import {
  useUser,
  UserProvider,
  LoginErrorCode,
  PasswordUnMatchError,
  UnknownError,
} from './use-user';

function mockLogin(statusCode: number, response: Object = {}): void {
  mockServer.use(
    rest.post('http://localhost/p/login', (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(response));
    }),
  );
}

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <UserProvider>{children}</UserProvider>
  </MemoryRouter>
);

it.each([
  { statusCode: 401, resp: { details: { remain: 4 } }, expectedError: new PasswordUnMatchError(4) },
  { statusCode: 400, resp: { details: ['a', 'b'] }, expectedError: new UnknownError(['a', 'b']) },
  { statusCode: 422, resp: {}, expectedError: new Error(LoginErrorCode.E_CLIENT_ERROR) },
  { statusCode: 418, resp: {}, expectedError: new Error(LoginErrorCode.E_UNKNOWN_ERROR) },
  { statusCode: 429, resp: {}, expectedError: new Error(LoginErrorCode.E_TOO_MANY_ERROR) },
  { statusCode: 502, resp: {}, expectedError: new Error(LoginErrorCode.E_SERVER_ERROR) },
])(
  'should return error if request is failed with failed status $statusCode',
  async ({ statusCode, resp, expectedError }) => {
    const { result } = renderHook(() => useUser(), { wrapper });

    mockLogin(statusCode, resp);

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
  await result.current.login('fakeuser', 'fakepassword', 'fake-token');
  await waitFor(() => {
    expect(result.current.user).toMatchSnapshot();
  });
});
