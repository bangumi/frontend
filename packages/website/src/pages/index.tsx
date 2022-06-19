import React from 'react'
import { useUser } from '../hooks/use-user'
import UserHome from './components/UserHome'

const Home: React.FC = () => {
  const { user } = useUser()

  if (user) {
    return <UserHome />
  }

  // TODO: 未登录态主页
  return null
}

export default Home
