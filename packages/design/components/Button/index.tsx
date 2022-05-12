import React, { FC } from 'react'
import classNames from 'classnames'

/*
  Prop type moves to outer
*/
export interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'primary' | 'secondary'
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
          'bgm-button__disabled': disabled
        },
          `bgm-button__${type}`,
          `bgm-button__${shape}`,
          `bgm-button__${size}`
        )
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
