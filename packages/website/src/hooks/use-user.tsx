import { ok } from '@oazapfts/runtime';
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/browser';
import { startAuthentication } from '@simplewebauthn/browser';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Profile } from '@bangumi/client/user';

interface UserContextType {
  user?: Profile;
  /** 是否正在请求当前用户信息，加载完成前不应据此判断登录状态 */
  isLoading: boolean;
  redirectToLogin: () => void;
  login: (username: string, password: string, captchaResp: string) => Promise<void>;
  /** 登出并清空当前用户缓存 */
  logout: () => Promise<void>;
  /** 使用 Passkey 登录，成功返回 true，用户取消返回 false */
  passkeyLogin: () => Promise<boolean>;
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
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR('/me', async () => ok(ozaClient.getCurrentUser()));
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
    passkeyLogin: async () => {
      const ok = await passkeyLogin();
      if (ok) {
        await mutate();
      }
      return ok;
    },
    logout: async () => {
      await ozaClient.logout({});
      await mutate(undefined, { revalidate: false });
    },
    user,
    isLoading,
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
    turnstileToken: cfCaptchaResponse,
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

/**
 * Passkey 登录流程：
 * 1. 请求 WebAuthn authentication options（usernameless 模式）
 * 2. 调用浏览器 API 让用户验证 passkey
 * 3. 将凭证交给服务端验证并签发 session
 *
 * 服务端接口为私有 API，未包含在 @bangumi/client 生成的客户端中，因此直接使用 fetch。
 */
async function passkeyLogin(): Promise<boolean> {
  const optionsRes = await fetch('/p1/passkey/login/options', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  if (!optionsRes.ok) {
    throw new Error(LoginErrorCode.E_UNKNOWN_ERROR);
  }

  const { options, challenge } = (await optionsRes.json()) as {
    options: PublicKeyCredentialRequestOptionsJSON;
    challenge: string;
    rpId: string;
  };

  let credential: AuthenticationResponseJSON;
  try {
    credential = await startAuthentication({ optionsJSON: options });
  } catch (err) {
    // 用户取消或选择器关闭，静默返回
    if ((err as { name?: string } | null)?.name === 'NotAllowedError') {
      return false;
    }
    throw err;
  }

  const verifyRes = await fetch('/p1/passkey/login/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challenge, credential }),
  });

  if (!verifyRes.ok) {
    throw new Error(LoginErrorCode.E_UNKNOWN_ERROR);
  }

  return true;
}
