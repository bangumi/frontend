import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Turnstile } from '@marsidev/react-turnstile';
import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInput } from 'rooks';

import { Button, Input, Message } from '@bangumi/design/index.tsx';
import { Password, UserLogin } from '@bangumi/icons/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import {
  CaptureError,
  LoginErrorCode,
  PasswordUnMatchError,
  UnknownError,
  useUser,
} from '@bangumi/website/hooks/use-user.tsx';
import { redirectTo } from '@bangumi/website/utils/route.ts';

import { ReactComponent as LoginLogo } from './assets/login-logo.svg';

const wrapper = css({
  width: '100vw',
  height: '100vh',
});

const container = css({
  width: '320px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translateX(-50%) translateY(-80%)',
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
  alignItems: 'center',
  '& > *': { width: '100%' },
});

const logo = css({ marginBottom: '25px' });

const hcaptcha = css({
  '& div': { height: '78px', textAlign: 'center' },
});

const buttonGroup = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  '&:has(button:only-child)': { justifyContent: 'center' },
});

const button = css({ width: '150px' });

const passkeyButton = css({ width: '100%' });

const Login: React.FC = () => {
  const captcha = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const email = useInput('' as string);
  const password = useInput('' as string);
  const { login, passkeyLogin } = useUser();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  // WebAuthn 不可用时隐藏 Passkey 登录按钮
  const [passkeySupported] = React.useState(
    () => typeof window !== 'undefined' && window.PublicKeyCredential != null,
  );

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const errorMessageMap: Record<string, string> = {
    [LoginErrorCode.E_NETWORK_ERROR]: '网络错误，请稍后重试',
    [LoginErrorCode.E_UNKNOWN_ERROR]: '未知错误',
    [LoginErrorCode.E_CLIENT_ERROR]: '请求错误',
    [LoginErrorCode.E_TOO_MANY_ERROR]: '登录失败次数太多，请过段时间再重试',
    [LoginErrorCode.E_SERVER_ERROR]: '服务器错误，请稍后重试',
  };

  const backTo = searchParams.get('backTo');
  // 如果 backTo 参数以 /oauth 开头，则隐藏注册按钮
  const shouldHideRegisterButton = backTo?.startsWith('/oauth') ?? false;

  const successRedirect = () => {
    // 如果有 backTo 参数，则跳转到指定的页面
    if (backTo) {
      redirectTo(backTo.startsWith('/') ? backTo : '/');
    } else {
      // 否则跳转到首页
      redirectTo('/');
    }
  };

  const handleLogin = async () => {
    if (!captchaToken) {
      setErrorMessage('请完成验证');
      return;
    }

    if (email.value === '') {
      setErrorMessage('请输入 Email 地址');
      return;
    }

    if (password.value === '') {
      setErrorMessage('请输入密码');
      return;
    }

    try {
      await login(email.value, password.value, captchaToken);
      successRedirect();
    } catch (error: unknown) {
      captcha.current?.reset();
      setCaptchaToken(null);
      if (error instanceof PasswordUnMatchError) {
        setErrorMessage(`用户名与密码不正确，请检查后重试，您还有 ${error.remain} 次尝试机会`);
        return;
      }

      if (error instanceof CaptureError) {
        setErrorMessage(`验证码错误，您还有 ${error.remain} 次尝试机会`);
        return;
      }

      if (error instanceof UnknownError) {
        setErrorMessage('未知错误');
        return;
      }

      if (error instanceof Error) {
        const errorMsg = errorMessageMap[error.message];
        if (errorMsg) {
          setErrorMessage(errorMsg);
          return;
        }
      }

      setErrorMessage(`意料之外的错误：${error?.toString() ?? typeof error}`);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      const ok = await passkeyLogin();
      if (ok) {
        successRedirect();
      }
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage('Passkey 登录失败，请稍后再试');
    }
  };

  return (
    <>
      <Helmet title='登录' />
      <div className={wrapper}>
        <div className={container}>
          <LoginLogo className={logo} />
          {errorMessage && (
            <Message type='error' blockWidth>
              {errorMessage}
            </Message>
          )}
          <Input type='email' prefix={<UserLogin />} placeholder='你的 Email 地址' {...email} />
          <Input type='password' prefix={<Password />} placeholder='你的登录密码' {...password} />
          <div className={hcaptcha}>
            <Turnstile
              options={{
                theme: 'light',
                action: 'login',
              }}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={(token: string) => {
                setCaptchaToken(token);
              }}
              ref={captcha}
            />
          </div>
          {passkeySupported && (
            <Button className={passkeyButton} color='gray' onClick={handlePasskeyLogin}>
              使用 Passkey 登录
            </Button>
          )}
          <div className={buttonGroup}>
            {!shouldHideRegisterButton && (
              <Button className={button} color='gray' disabled>
                注册新用户
              </Button>
            )}
            <Button className={button} onClick={handleLogin}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
