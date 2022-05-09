import React from 'react'
import { Input } from '@bangumi/design'
import { UserLogin, Password } from '@bangumi/icons'
import HCaptcha from '@hcaptcha/react-hcaptcha'

const Login: React.FC = () => {
  const [, setHCaptchaToken] = React.useState<string | null>(null)

  return (
    <div>
      <form>
        <Input type="email" prefix={<UserLogin />} placeholder="你的 Email 地址" />
        <Input type="password" prefix={<Password />} placeholder="你的登录密码" />
        <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
          onVerify={(token: string) => setHCaptchaToken(token)}
        />
      </form>
    </div>
  )
}

export default Login
