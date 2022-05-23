import React from 'react'
import style from './index.module.less'
import { ReactComponent as Error } from '../../assets/error.svg'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={style.container}>
      <Error />
      {message}
    </div>
  )
}

export default ErrorMessage
