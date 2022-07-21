import classNames from 'classnames'
import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

interface FontConfig {
  fontSize?: React.CSSProperties['fontSize']
  fontWeight?: React.CSSProperties['fontWeight']
}

export interface LinkProps extends RouterLinkProps, FontConfig {
  fontSize?: React.CSSProperties['fontSize']
  fontWeight?: React.CSSProperties['fontWeight']
  isExternal?: boolean
}

const Link: React.FC<LinkProps> = ({
  to,
  className,
  children,
  style,
  fontSize = 16,
  fontWeight = 'bold',
  isExternal = false,
  ...rest
}) => {
  const finalStyle: React.CSSProperties = {
    fontSize,
    fontWeight,
    ...style
  }

  if (isExternal && typeof to === 'string') {
    return (
      <a href={to} className={classNames('bgm-link', className)} style={finalStyle} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <RouterLink className={classNames('bgm-link', className)} style={finalStyle} to={to} {...rest}>
      {children}
    </RouterLink>
  )
}

export default Link
