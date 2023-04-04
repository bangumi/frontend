import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Turnstile } from '@marsidev/react-turnstile';
import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInput } from 'rooks';

import { Button, Input, Message } from '@bangumi/design';
import { Password, UserLogin } from '@bangumi/icons';
import Helmet from '@bangumi/website/components/Helmet';

import {
  CaptureError,
  LoginErrorCode,
  PasswordUnMatchError,
  UnknownError,
  useUser,
} from '../../hooks/use-user';
import { ReactComponent as LoginLogo } from './assets/login-logo.svg';
import style from './index.module.less';

const Login: React.FC = () => {
  const captcha = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const email = useInput('' as string);
  const password = useInput('' as string);
  const { login } = useUser();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const errorMessageMap: Record<string, string> = {
    [LoginErrorCode.E_NETWORK_ERROR]: '网络错误，请稍后重试',
    [LoginErrorCode.E_UNKNOWN_ERROR]: '未知错误',
    [LoginErrorCode.E_CLIENT_ERROR]: '请求错误',
    [LoginErrorCode.E_TOO_MANY_ERROR]: '登录失败次数太多，请过段时间再重试',
    [LoginErrorCode.E_SERVER_ERROR]: '服务器错误，请稍后重试',
  };

  const successRedirect = () => {
    // 如果有 backTo 参数，则跳转到指定的页面
    const backTo = searchParams.get('backTo');
    if (backTo) {
      navigate(backTo.startsWith('/') ? backTo : '/', { replace: true });
    }
    // 否则跳转到首页
    else {
      navigate('/', { replace: true });
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

  return (
    <>
      <Helmet title='登录' />
      <div className={style.wrapper}>
        <div className={style.container}>
          <LoginLogo className={style.logo} />
          {errorMessage && (
            <Message type='error' blockWidth>
              {errorMessage}
            </Message>
          )}
          <Input type='email' prefix={<UserLogin />} placeholder='你的 Email 地址' {...email} />
          <Input type='password' prefix={<Password />} placeholder='你的登录密码' {...password} />
          <div className={style.hcaptcha}>
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
          <div className={style.buttonGroup}>
            <Button className={style.button} color='gray' disabled>
              注册新用户
            </Button>
            <Button className={style.button} onClick={handleLogin}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
