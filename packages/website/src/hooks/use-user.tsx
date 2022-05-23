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
          if (error.response.status === 400) {
            throw new Error(LoginErrorCode.E_REQUEST_ERROR)
          } else if (error.response.status === 401) {
            throw new Error(LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT)
          } else {
            throw new Error(LoginErrorCode.E_UNKNOWN_ERROR)
          }
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
