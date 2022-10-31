import React from 'react'
import { useUser } from '../hooks/use-user'
import UserHome from './components/UserHome'
import { Outlet } from 'react-router-dom'
import GlobalLayout from '../components/GlobalLayout'

const Home: React.FC = () => {
  const { user } = useUser()

  if (user) {
    return <UserHome />
  }

  // TODO: 未登录态主页
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  )
}

export default Home
