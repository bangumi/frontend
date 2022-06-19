import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/use-user'
import { UserGroup } from '../../types/user'

interface RequireAuthProps {
  groupRequired: UserGroup[]
  redirectUrlWhenUnauthorized: string
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ groupRequired, redirectUrlWhenUnauthorized, children }) => {
  const { user, redirectToLogin } = useUser()
  const navigate = useNavigate()

  if (!user) {
    redirectToLogin()
    return null
  }

  if (!groupRequired.includes(user?.user_group)) {
    navigate(redirectUrlWhenUnauthorized, { replace: true })
    return null
  }

  return <>{children}</>
}
