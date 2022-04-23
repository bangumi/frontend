import React, { FC } from 'react'
import classnames from 'classnames'

export interface InputProps {
  /* 同原生 input 标签 `type` */
  type?: string
  /* 同原生 `placeholder` */
  placeholder?: string
  /* 外层 wrapper 的样式 */
  wrapperStyle?: React.CSSProperties
  /* 外层 wrapper 的自定义类名 */
  wrapperClass?: string
  /* 前缀 */
  prefix?: React.ReactNode
  /* 后缀 */
  suffix?: React.ReactNode
}

const Input: FC<InputProps> = ({
  type = 'text',
  wrapperStyle,
  wrapperClass,
  prefix,
  suffix,
  placeholder
}) => {
  return (
    <div className={classnames('bgm-input__wrapper', wrapperClass)} style={wrapperStyle}>
      {prefix && prefix}
      <input type={type} className="bgm-input__text" placeholder={placeholder} />
      {suffix && suffix}
    </div>
  )
}

export default Input
