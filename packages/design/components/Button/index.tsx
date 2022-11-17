import React, { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'

export interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'primary' | 'secondary' | 'text'
  shape?: 'square' | 'rounded'
  size?: 'normal'
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  disabled = false,
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

export default Button
