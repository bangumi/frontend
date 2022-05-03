import React from 'react'
import classNames from 'classnames'

export interface TextProps {
  className?: string
  styles?: React.CSSProperties
  type?: 'default' | 'secondary'
}

const Text: React.FC<TextProps> = ({ children, type = 'default' }) => {
  return (
    <span
      className={
        classNames(
          'bgm-text', {
            'bgm-text--secondary': type === 'secondary'
          }
        )
      }
    >{children}</span>
  )
}

export default Text
