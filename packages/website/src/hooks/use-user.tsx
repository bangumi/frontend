import { ok } from 'oazapfts';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { User } from '@bangumi/client/user';

interface UserContextType {
  user?: User;
  redirectToLogin: () => void;
  login: (username: string, password: string, captchaResp: string) => Promise<void>;
}

const UserContext = React.createContext<UserContextType>(null!);

export enum LoginErrorCode {
  E_USERNAME_OR_PASSWORD_INCORRECT = 'E_USERNAME_OR_PASSWORD_INCORRECT',
  E_TOO_MANY_ERROR = 'E_TOO_MANY_ERROR',
  E_CAPTCHA_ERROR = 'E_CAPTCHA_ERROR',
  E_NETWORK_ERROR = 'E_NETWORK_ERROR',
  E_UNKNOWN_ERROR = 'E_UNKNOWN_ERROR',
  E_CLIENT_ERROR = 'E_CLIENT_ERROR',
  E_SERVER_ERROR = 'E_SERVER_ERROR',
}

export class UnknownError extends Error {
  constructor(readonly detail: string) {
    super(LoginErrorCode.E_UNKNOWN_ERROR);
  }
}

export class CaptureError extends Error {
  remain: number;

  constructor(remain: number) {
    super(LoginErrorCode.E_CAPTCHA_ERROR);
    this.remain = remain;
  }
}

export class PasswordUnMatchError extends Error {
  remain: number;

  constructor(remain: number) {
    super(LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT);
    this.remain = remain;
  }
}

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: user, mutate } = useSWR('/me', async () => ok(ozaClient.getCurrentUser()));
  const navigate = useNavigate();

  function redirectToLogin(): void {
    navigate('/login');
  }

  const value: UserContextType = {
    redirectToLogin,
    login: async (email, password, captchaResp) => {
      await login(email, password, captchaResp);
      await mutate();
    },
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser: () => UserContextType = () => {
  return React.useContext(UserContext);
};

async function login(email: string, password: string, cfCaptchaResponse: string): Promise<void> {
  const res = await ozaClient.login({
    email,
    password,
    'cf-turnstile-response': cfCaptchaResponse,
  });

  if (res.status === 200) {
    return;
  }

  if (res.status === 400) {
    throw new UnknownError(res.data.message);
  } else if (res.status === 429) {
    throw new Error(LoginErrorCode.E_TOO_MANY_ERROR);
  }

  const remain = res.headers.get('X-RateLimit-Remaining') ?? '0';

  if (res.data.code === 'CAPTCHA_ERROR') {
    throw new CaptureError(parseInt(remain));
  }

  if (res.data.code === 'EMAIL_PASSWORD_ERROR') {
    throw new PasswordUnMatchError(parseInt(remain));
  }

  throw new UnknownError(LoginErrorCode.E_UNKNOWN_ERROR);
}
