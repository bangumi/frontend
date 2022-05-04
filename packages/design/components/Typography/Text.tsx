import React from 'react'
import classNames from 'classnames'

export interface TextProps {
  className?: string
  style?: React.CSSProperties
  type?: 'default' | 'secondary'
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  style,
  type = 'default'
}) => {
  return (
    <span
      className={
        classNames(
          'bgm-text', {
            'bgm-text--secondary': type === 'secondary'
          },
          className
        )
      }
      style={style}
    >
      {children}
    </span>
  )
}

export default Text
