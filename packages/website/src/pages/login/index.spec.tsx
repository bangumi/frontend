import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { UserProvider } from '@bangumi/website/hooks/use-user';
import { redirectTo } from '@bangumi/website/utils/route';

import { server as mockServer } from '../../mocks/server';
import LoginPage from '.';

vi.mock('@bangumi/website/utils/route', () => ({
  redirectTo: vi.fn(),
}));

vi.mock('@marsidev/react-turnstile', () => {
  const Turnstile = React.forwardRef<
    { reset?: () => void },
    { onSuccess?: (token: string) => void }
  >(({ onSuccess }, ref) => {
    React.useImperativeHandle(ref, () => ({ reset: () => undefined }));

    React.useEffect(() => {
      onSuccess?.('fake-token');
    });

    return <div />;
  });

  return { Turnstile };
});

vi.mock('react-router-dom');
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseLocation = vi.mocked(useLocation);
const mockedUseSearchParams = vi.mocked(useSearchParams);

const renderLoginPage = () =>
  render(
    <HelmetProvider>
      <UserProvider>
        <LoginPage />
      </UserProvider>
    </HelmetProvider>,
  );

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

function mockSuccessfulLogin() {
  mockLogin(200);

  const { getByPlaceholderText, getByText } = renderLoginPage();
  const fakeEmail = 'fake-email';
  const fakePassword = 'fakepassword';

  fireEvent.input(getByPlaceholderText('你的 Email 地址'), { target: { value: fakeEmail } });
  fireEvent.input(getByPlaceholderText('你的登录密码'), { target: { value: fakePassword } });

  fireEvent.click(getByText('登录'));
}

it('should redirect user to homepage after success login', async () => {
  const mockedNavigate = vi.fn();
  mockedUseNavigate.mockReturnValue(mockedNavigate);
  mockedUseLocation.mockReturnValue({ key: 'default' } as any);
  mockedUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()] as any);

  mockSuccessfulLogin();
  await waitFor(() => {
    expect(redirectTo).toBeCalledWith('/');
  });
});

it('should redirect user to specified page', async () => {
  const mockedNavigate = vi.fn();
  mockedUseNavigate.mockReturnValue(mockedNavigate);
  mockedUseLocation.mockReturnValue({ key: 'default' } as any);
  mockedUseSearchParams.mockReturnValue([
    new URLSearchParams({ backTo: '/group/sandbox' }),
    vi.fn(),
  ] as any);

  mockSuccessfulLogin();
  await waitFor(() => {
    expect(redirectTo).toBeCalledWith('/group/sandbox');
  });
});

it('should redirect user to home if specified path is invalid', async () => {
  const mockedNavigate = vi.fn();
  mockedUseNavigate.mockReturnValue(mockedNavigate);
  mockedUseLocation.mockReturnValue({ key: 'default' } as any);
  mockedUseSearchParams.mockReturnValue([
    new URLSearchParams({ backTo: 'https://bgm.tv/' }),
    vi.fn(),
  ] as any);

  mockSuccessfulLogin();
  await waitFor(() => {
    expect(redirectTo).toBeCalledWith('/');
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
    const { getByPlaceholderText, getByText } = renderLoginPage();
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
  const { getByPlaceholderText, getByText } = renderLoginPage();

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
