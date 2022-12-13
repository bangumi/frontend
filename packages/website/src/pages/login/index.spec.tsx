import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React, { Component as MockComponent } from 'react';
import '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';

import LoginPage from '.';
import { UserProvider } from '../../hooks/use-user';
import { server as mockServer } from '../../mocks/server';

jest.mock('@hcaptcha/react-hcaptcha', () => {
  class HCaptcha extends MockComponent<{ onVerify?: (token: string) => void }> {
    componentDidMount() {
      this.props?.onVerify?.('fake-token');
    }

    resetCaptcha() {
      void 0;
    }

    render() {
      return <div />;
    }
  }

  return HCaptcha;
});

jest.mock('react-router-dom');
const mockedUseNavigate = jest.mocked(useNavigate);

function mockLogin(
  statusCode: number,
  response: Object = {},
  headers: Record<string, string | string[]> = {},
): void {
  mockServer.use(
    rest.post('http://localhost/p1/login', (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.set(headers), ctx.json(response));
    }),
  );
}

it('should redirect user to homepage after success login', async () => {
  mockLogin(200);
  const mockedNavigate = jest.fn();
  mockedUseNavigate.mockReturnValue(mockedNavigate);

  const { getByPlaceholderText, getByText } = render(
    <UserProvider>
      <LoginPage />
    </UserProvider>,
  );
  const fakeEmail = 'fake-email';
  const fakePassword = 'fakepassword';

  fireEvent.input(getByPlaceholderText('你的 Email 地址'), { target: { value: fakeEmail } });
  fireEvent.input(getByPlaceholderText('你的登录密码'), { target: { value: fakePassword } });

  fireEvent.click(getByText('登录'));

  await waitFor(() => {
    expect(mockedNavigate).toBeCalledWith('/', { replace: true });
  });
});

it.each([
  {
    statusCode: 401,
    resp: { code: 'CAPTCHA_ERROR' },
    headers: { 'X-RateLimit-Remaining': '4' },
    expectedError: '验证码错误，您还有 4 次尝试机会',
  },
  {
    statusCode: 401,
    resp: { code: 'EMAIL_PASSWORD_ERROR' },
    headers: { 'X-RateLimit-Remaining': '4' },
    expectedError: '用户名与密码不正确，请检查后重试，您还有 4 次尝试机会',
  },
  { statusCode: 422, expectedError: '未知错误' },
  { statusCode: 429, expectedError: '登录失败次数太多，请过段时间再重试' },
  { statusCode: 502, expectedError: '未知错误' },
])(
  'should show error message when response is $statusCode',
  async ({ statusCode, resp = {}, headers = {}, expectedError }) => {
    mockLogin(statusCode, resp, headers);
    const { getByPlaceholderText, getByText } = render(
      <UserProvider>
        <LoginPage />
      </UserProvider>,
    );
    const fakeEmail = 'fake-email';
    const fakePassword = 'fakepassword';

    fireEvent.input(getByPlaceholderText('你的 Email 地址'), { target: { value: fakeEmail } });
    fireEvent.input(getByPlaceholderText('你的登录密码'), { target: { value: fakePassword } });

    fireEvent.click(getByText('登录'));

    await waitFor(() => {
      expect(getByText(expectedError)).toBeInTheDocument();
    });
  },
);

it('should validate user input', async () => {
  const { getByPlaceholderText, getByText } = render(
    <UserProvider>
      <LoginPage />
    </UserProvider>,
  );

  fireEvent.click(getByText('登录'));

  await waitFor(() => {
    expect(getByText('请输入 Email 地址'));
  });

  const fakeEmail = 'fake-email';
  fireEvent.input(getByPlaceholderText('你的 Email 地址'), { target: { value: fakeEmail } });

  fireEvent.click(getByText('登录'));

  await waitFor(() => {
    expect(getByText('请输入密码'));
  });
});
