import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Turnstile } from '@marsidev/react-turnstile';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from 'rooks';

import { Input, Button } from '@bangumi/design';
import { UserLogin, Password } from '@bangumi/icons';

import {
  CaptureError,
  LoginErrorCode,
  PasswordUnMatchError,
  UnknownError,
  useUser,
} from '../../hooks/use-user';
import { ReactComponent as LoginLogo } from './assets/login-logo.svg';
import ErrorMessage from './components/ErrorMessage';
import style from './index.module.less';

const Login: React.FC = () => {
  const captcha = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const email = useInput('' as string);
  const password = useInput('' as string);
  const { login } = useUser();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const errorMessageMap: Record<string, string> = {
    [LoginErrorCode.E_NETWORK_ERROR]: '网络错误，请稍后重试',
    [LoginErrorCode.E_UNKNOWN_ERROR]: '未知错误',
    [LoginErrorCode.E_CLIENT_ERROR]: '请求错误',
    [LoginErrorCode.E_TOO_MANY_ERROR]: '登录失败次数太多，请过段时间再重试',
    [LoginErrorCode.E_SERVER_ERROR]: '服务器错误，请稍后重试',
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
      navigate('/', { replace: true });
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
    <div className={style.wrapper}>
      <div className={style.container}>
        <LoginLogo className={style.logo} />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <Input
          type='email'
          prefix={<UserLogin className={style.icon} />}
          placeholder='你的 Email 地址'
          {...email}
        />
        <Input
          type='password'
          prefix={<Password className={style.icon} />}
          placeholder='你的登录密码'
          {...password}
        />
        <div className={style.hcaptcha}>
          <Turnstile
            siteKey={import.meta.env.TURNSTILE_SITE_KEY}
            onSuccess={(token: string) => setCaptchaToken(token)}
            ref={captcha}
          />
        </div>
        <div className={style.buttonGroup}>
          <Button className={style.button} type='secondary' shape='rounded' disabled>
            注册新用户
          </Button>
          <Button className={style.button} type='primary' shape='rounded' onClick={handleLogin}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
