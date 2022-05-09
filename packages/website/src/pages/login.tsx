import React from 'react'
import { Input, Button } from '@bangumi/design'
import { UserLogin, Password } from '@bangumi/icons'

const Login: React.FC = () => {
  return (
    <div>
      <Input type="email" prefix={<UserLogin />} placeholder="你的 Email 地址" />
      <Input type="password" prefix={<Password />} placeholder="你的登录密码" />

      <Button>登录</Button>
    </div>
  )
}

export default Login
