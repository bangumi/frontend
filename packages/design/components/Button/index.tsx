import React, { FC } from 'react'
import classNames from 'classnames'
/*
  Prop type moves to outer
*/
export interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  className?: string
  type: 'primary' | 'secondary'
  shape?: 'square' | 'rounded'
  size?: 'normal'
}

const Button: FC<ButtonProps> = ({
  disabled,
  onClick,
  className,
  type = 'primary',
  shape = 'square',
  size = 'normal',
  children
}) => {
  return (
    <button
      disabled={disabled}
      className={
        classNames('bgm-button', className, {
          'bgm-button__disabled': disabled,
          'bgm-button__primary': type === 'primary',
          'bgm-button__secondary': type === 'secondary',
          'bgm-button__square': shape === 'square',
          'bgm-button__rounded': shape === 'rounded',
          'bgm-button__normal': size === 'normal'
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
