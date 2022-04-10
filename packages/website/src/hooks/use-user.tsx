import React from 'react'
import { getMe } from '../api/user'
import { User } from '../types/user'

interface UserContextType {
  user: User | null
  redirectToLogin: () => void
  signOut: () => void
}
const UserContext = React.createContext<UserContextType>(null!)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState< User | null>(null)

  const redirectToLogin: () => void = () => {
    console.log('redirectToLogin')
  }

  const signOut: () => void = () => {
    console.log('signout')
  }

  React.useEffect(() => {
    getMe().then((res) => {
      setUser(res)
    })
  }, [])

  const value: UserContextType = { redirectToLogin, signOut, user }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser: () => UserContextType = () => {
  return React.useContext(UserContext)
}
