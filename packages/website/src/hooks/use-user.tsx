import React from 'react'
import { User } from '../types/user'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { AxiosResponse } from 'axios'

interface UserContextType {
  user?: User
  redirectToLogin: () => void
  signout: () => void
  login: (username: string, password: string, hCaptchaResp: string) => Promise<void>
}
const UserContext = React.createContext<UserContextType>(null!)

export enum LoginErrorCode {
  E_USERNAME_OR_PASSWORD_INCORRECT = 'E_USERNAME_OR_PASSWORD_INCORRECT',
  E_NETWORK_ERROR = 'E_NETWORK_ERROR',
  E_UNKNOWN = 'E_UNKNOWN',
}

export const UserProvider: React.FC = ({ children }) => {
  const { data: user, mutate } = useSWR<AxiosResponse<User>>(
    '/p/me',
    privateRequest.get,
    {
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  console.log('🚀 ~ file: use-user.tsx ~ line 23 ~ data', user)

  const redirectToLogin: () => void = () => {
    console.log('redirectToLogin')
  }

  const login: (
    email: string,
    password: string,
    hCaptchaResp: string
  ) => Promise<void> =
    async (email, password, hCaptchaResp) => {
      try {
        const resp = await privateRequest.post(
          '/p/login', {
            email,
            password,
            'h-captcha-response': hCaptchaResp
          }
        )
        if (resp.status === 200) {
          mutate()
        } else if (resp.status === 401) {
          throw new Error(LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT)
        } else {
          throw new Error(LoginErrorCode.E_NETWORK_ERROR)
        }
      } catch (e) {
        throw new Error(LoginErrorCode.E_NETWORK_ERROR)
      }
    }

  const signout: () => void = () => {
    console.log('signout')
  }

  const value: UserContextType = { redirectToLogin, signout, login, user: user?.data }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser: () => UserContextType = () => {
  return React.useContext(UserContext)
}
