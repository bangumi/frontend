/*
  测试组件
*/
import React, { FC } from 'react'
import classNames from 'classnames'
/*
  Prop type moves to outer
*/
export interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const Button: FC<ButtonProps> = ({ disabled, children, onClick, className }) => {
  return (
    <button
      disabled={disabled}
      className={
        classNames('bgm-button', className, {
          'bgm-button__disabled': disabled
        })
}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false
}

export default Button
