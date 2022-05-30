import React from 'react'
import { User } from '../types/user'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import axios, { AxiosResponse } from 'axios'

interface UserContextType {
  user?: User
  redirectToLogin: () => void
  signout: () => void
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

  const redirectToLogin: () => void = () => {
    console.log('redirectToLogin')
  }

  const login: (
    email: string,
    password: string,
    hCaptchaResp: string
  ) => Promise<void> =
    (email, password, hCaptchaResp) => {
      return axios.post(
        '/p/login', {
          email,
          password,
          'h-captcha-response': hCaptchaResp
        }
      ).then(() => {
        mutate()
      }).catch((error) => {
        if (error.response) {
          const errorCode = ERROR_CODE_MAP[error.response.status]
          if (errorCode) {
            throw new Error(errorCode)
          }
          throw new Error(LoginErrorCode.E_UNKNOWN_ERROR)
        } else {
          throw new Error(LoginErrorCode.E_NETWORK_ERROR)
        }
      })
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
