import { fireEvent, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';

import LoginPage from '.';
import { UserProvider } from '../../hooks/use-user';
import { server as mockServer } from '../../mocks/server';

const FakeHCaptcha: React.FC<{ onVerify: (token: string) => void }> = ({ onVerify }) => {
  React.useEffect(() => {
    onVerify('fake-token');
  });

  return <div />;
};

jest.mock('@hcaptcha/react-hcaptcha', () => {
  return FakeHCaptcha;
});
jest.mock('react-router-dom');
const mockedUseNavigate = jest.mocked(useNavigate);

function mockLogin(statusCode: number, response: Object = {}): void {
  mockServer.use(
    rest.post('http://localhost/p/login', (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(response));
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

it.each`
  statusCode | resp                                       | expectedError
  ${400}     | ${{ details: ['验证码错误，请再试一遍'] }} | ${'验证码错误，请再试一遍'}
  ${401}     | ${{ details: { remain: 5 } }}              | ${'用户名与密码不正确，请检查后重试，您可以有至多 5 次尝试'}
  ${422}     | ${{}}                                      | ${'请求错误'}
  ${429}     | ${{}}                                      | ${'登录失败次数太多，请过段时间再重试'}
  ${502}     | ${{}}                                      | ${'服务器错误，请稍后重试'}
`(
  'should show error message when response is %statusCode}',
  async ({ statusCode, resp, expectedError }) => {
    mockLogin(statusCode, resp);
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
