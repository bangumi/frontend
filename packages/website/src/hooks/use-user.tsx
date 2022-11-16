import React, { PropsWithChildren } from 'react'
import { User } from '@bangumi/types/user'
import useSWR from 'swr'
import { client, privateGet } from '../api/request'
import { useNavigate } from 'react-router-dom'
import { operations } from '@bangumi/types/types'

interface UserContextType {
  user?: User
  redirectToLogin: () => void
  login: (username: string, password: string, hCaptchaResp: string) => Promise<void>
}

const UserContext = React.createContext<UserContextType>(null!)

export enum LoginErrorCode {
  E_USERNAME_OR_PASSWORD_INCORRECT = 'E_USERNAME_OR_PASSWORD_INCORRECT',
  E_REQUEST_ERROR = 'E_REQUEST_ERROR',
  E_NETWORK_ERROR = 'E_NETWORK_ERROR',
  E_UNKNOWN_ERROR = 'E_UNKNOWN_ERROR',
  E_CLIENT_ERROR = 'E_CLIENT_ERROR',
  E_SERVER_ERROR = 'E_SERVER_ERROR'
}

const ERROR_CODE_MAP: Record<number, LoginErrorCode> = {
  400: LoginErrorCode.E_REQUEST_ERROR,
  401: LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT,
  422: LoginErrorCode.E_CLIENT_ERROR,
  502: LoginErrorCode.E_SERVER_ERROR
}

export class UnknownError extends Error {
  messages: string[]

  constructor (messages: string[]) {
    super(messages[0])
    this.messages = messages
  }
}

export class PasswordUnMatchError extends Error {
  remain: number

  constructor (remain: number) {
    super(LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT)
    this.remain = remain
  }
}

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    data: user,
    mutate
  } = useSWR<User>(
    '/p/me',
    privateGet,
    {
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }
  )

  const navigate = useNavigate()

  function redirectToLogin (): void {
    navigate('/login')
  }

  const login: (
    email: string,
    password: string,
    hCaptchaResp: string
  ) => Promise<void> =
    async (email, password, hCaptchaResp) => {
      const res = await client.post(
        '/p/login', {
          json: {
            email,
            password,
            'h-captcha-response': hCaptchaResp
          },
          throwHttpErrors: false
        }
      )

      if (res.status === 200) {
        await mutate()
        return
      }

      const data = await res.json()
      const errorCode = ERROR_CODE_MAP[res.status]
      if (errorCode) {
        if (errorCode === LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT) {
          throw new PasswordUnMatchError((data as operations['login']['responses']['401']['content']['application/json']).details.remain)
        }
        throw new UnknownError((data as operations['login']['responses']['400']['content']['application/json']).details)
      }
      throw new Error(LoginErrorCode.E_UNKNOWN_ERROR)
    }

  const value: UserContextType = {
    redirectToLogin,
    login,
    user
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser: () => UserContextType = () => {
  return React.useContext(UserContext)
}
