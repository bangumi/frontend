import React from 'react'
import { BGMUser } from 'bgm-types'

export const UserContext = React.createContext< BGMUser.Me | null>(null)

export type UseUserHook = () => [BGMUser.Me | null]

export const useUser: UseUserHook = () => {
  const user = React.useContext(UserContext)

  return [user]
}
