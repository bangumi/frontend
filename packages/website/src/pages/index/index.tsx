import { useUser } from '@bangumi/website/hooks/use-user'
import React from 'react'
import UserHome from '../components/UserHome'

const HomePage = () => {
  const { user } = useUser()

  if (user) {
    return <UserHome />
  }

  // TODO: 未登录态主页
  return <div>Hi! This is Home page</div>
}

export default HomePage
