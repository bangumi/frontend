import React from 'react'
import { Input, Button } from '@bangumi/design'
import { UserLogin, Password } from '@bangumi/icons'
import { useInput } from 'rooks'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import style from './index.module.less'
import { useUser } from '../../hooks/use-user'
import { ReactComponent as LoginLogo } from './assets/login-logo.svg'

const Login: React.FC = () => {
  const [hCaptchaToken, setHCaptchaToken] = React.useState<string | null>(null)
  const email = useInput('')
  const password = useInput('')
  const { login } = useUser()
  const handleLogin: () => void = () => {
    if (!hCaptchaToken) {
      return
    }
    login(email.value, password.value, hCaptchaToken)
  }

  return (
    <div className={style.container}>
      <LoginLogo />
      <Input
        type="email"
        prefix={<UserLogin className={style.icon} />}
        placeholder="你的 Email 地址" {...email}
      />
      <Input
        type="password"
        prefix={<Password className={style.icon} />}
        placeholder="你的登录密码"
        {...password}
      />
      <div>
        <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
          onVerify={(token: string) => setHCaptchaToken(token)}
        />
      </div>
      <div className={style.buttonGroup}>
        <Button className={style.button} type="secondary" shape="rounded" disabled>注册新用户</Button>
        <Button className={style.button} type="primary" shape="rounded" onClick={handleLogin}>登录</Button>
      </div>
    </div>
  )
}

export default Login
