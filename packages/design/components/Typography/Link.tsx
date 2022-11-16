import classNames from 'classnames'
import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

export interface LinkProps extends RouterLinkProps {
  isExternal?: boolean
  fontWeight?: 'bold'
}

const Link: React.FC<LinkProps> = ({
  to,
  className,
  children,
  fontWeight,
  isExternal = false,
  ...rest
}) => {
  const resolvedClassnames = classNames(
    'bgm-link',
    {
      'bgm-link--bold': fontWeight === 'bold',
    },
    className,
  )

  if (isExternal && typeof to === 'string') {
    return (
      <a className={resolvedClassnames} href={to} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <RouterLink className={resolvedClassnames} to={to} {...rest}>
      {children}
    </RouterLink>
  )
}

export default Link
