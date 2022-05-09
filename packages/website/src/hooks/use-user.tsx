import React from 'react'
import { User } from '../types/user'
import useSWR from 'swr'
import { privateRequest, request } from '../api/request'
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
  const { data: user, mutate } = useSWR<AxiosResponse<User>>('/v0/me', request.get)

  const redirectToLogin: () => void = () => {
    console.log('redirectToLogin')
  }

  const login: (
    username: string,
    password: string,
    hCaptchaResp: string
  ) => Promise<void> =
    async (username, password, hCaptchaResp) => {
      try {
        const resp = await privateRequest.post('/p/login')
        if (resp.status === 200) {
          mutate()
        } else if (resp.status === 401) {
          throw new Error(LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT)
        } else {
          console.error('未知错误', resp)
          throw new Error(LoginErrorCode.E_UNKNOWN)
        }
      } catch {
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
