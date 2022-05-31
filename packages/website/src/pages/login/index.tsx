import React from 'react'
import { Input, Button } from '@bangumi/design'
import { UserLogin, Password } from '@bangumi/icons'
import { useInput } from 'rooks'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import style from './index.module.less'
import { LoginErrorCode, useUser } from '../../hooks/use-user'
import { ReactComponent as LoginLogo } from './assets/login-logo.svg'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './components/ErrorMessage'

const Login: React.FC = () => {
  const [hCaptchaToken, setHCaptchaToken] = React.useState<string | null>(null)
  const email = useInput('')
  const password = useInput('')
  const { login } = useUser()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const errorMessageMap: Record<string, string> = {
    [LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT]: '用户名与密码不正确，请检查后重试',
    [LoginErrorCode.E_REQUEST_ERROR]: '验证码错误，请再试一遍',
    [LoginErrorCode.E_NETWORK_ERROR]: '网络错误，请稍后重试',
    [LoginErrorCode.E_UNKNOWN_ERROR]: '未知错误',
    [LoginErrorCode.E_CLIENT_ERROR]: '请求错误',
    [LoginErrorCode.E_SERVER_ERROR]: '服务器错误，请稍后重试'
  }

  const handleLogin: () => void = async () => {
    if (!hCaptchaToken) {
      setErrorMessage('请完成验证')
      return
    }

    if (!email.value) {
      setErrorMessage('请输入 Email 地址')
      return
    }

    if (!password.value) {
      setErrorMessage('请输入密码')
      return
    }

    try {
      await login(email.value, password.value, hCaptchaToken)
      navigate('/', { replace: true })
    } catch (error: any) {
      const errorMsg = errorMessageMap[error.message]
      if (errorMsg) {
        setErrorMessage(errorMsg)
      }
    }
  }

  return (
    <div className={style.mask}>
      <div className={style.container}>
        <LoginLogo />
        {errorMessage && <ErrorMessage message={errorMessage} />}
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
    </div>
  )
}

export default Login
