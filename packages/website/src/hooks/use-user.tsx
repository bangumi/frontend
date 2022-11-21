import type { PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { api } from '@bangumi/client';
import type { User } from '@bangumi/client/user';

interface UserContextType {
  user?: User;
  redirectToLogin: () => void;
  login: (username: string, password: string, hCaptchaResp: string) => Promise<void>;
}

const UserContext = React.createContext<UserContextType>(null!);

export enum LoginErrorCode {
  E_USERNAME_OR_PASSWORD_INCORRECT = 'E_USERNAME_OR_PASSWORD_INCORRECT',
  E_TOO_MANY_ERROR = 'E_TOO_MANY_ERROR',
  E_REQUEST_ERROR = 'E_REQUEST_ERROR',
  E_NETWORK_ERROR = 'E_NETWORK_ERROR',
  E_UNKNOWN_ERROR = 'E_UNKNOWN_ERROR',
  E_CLIENT_ERROR = 'E_CLIENT_ERROR',
  E_SERVER_ERROR = 'E_SERVER_ERROR',
}

export class UnknownError extends Error {
  messages: string[];

  constructor(messages: string[]) {
    super(messages[0]);
    this.messages = messages;
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
  const { data: user, mutate } = useSWR(api.getCurrentUser.swrKey(), api.getCurrentUser.X, {
    refreshWhenHidden: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });
  const navigate = useNavigate();

  function redirectToLogin(): void {
    navigate('/login');
  }

  const value: UserContextType = {
    redirectToLogin,
    login: async (email, password, hCaptchaResp) => {
      await login(email, password, hCaptchaResp);
      await mutate();
    },
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser: () => UserContextType = () => {
  return React.useContext(UserContext);
};

async function login(email: string, password: string, hCaptchaResponse: string): Promise<void> {
  const res = await api.login.execute({
    email,
    password,
    hCaptchaResponse,
  });

  if (res.ok) {
    return;
  }

  switch (res.status) {
    case 400:
      throw new UnknownError(res.data.details);
    case 401:
      throw new PasswordUnMatchError(res.data.details.remain);
    case 422:
      throw new Error(LoginErrorCode.E_CLIENT_ERROR);
    case 429:
      throw new Error(LoginErrorCode.E_TOO_MANY_ERROR);
    case 502:
      throw new Error(LoginErrorCode.E_SERVER_ERROR);
    default:
      throw new Error(LoginErrorCode.E_UNKNOWN_ERROR);
  }
}
