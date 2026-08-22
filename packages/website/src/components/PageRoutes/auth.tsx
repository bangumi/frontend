import type { PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { UserGroup } from '@bangumi/client/user.ts';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

interface RequireAuthProps {
  groupRequired: UserGroup[];
  redirectUrlWhenUnauthorized: string;
}

export const RequireAuth: React.FC<PropsWithChildren<RequireAuthProps>> = ({
  groupRequired,
  redirectUrlWhenUnauthorized,
  children,
}) => {
  const { user, redirectToLogin } = useUser();
  const navigate = useNavigate();

  if (!user) {
    redirectToLogin();
    return null;
  }

  if (!groupRequired.includes(user.group)) {
    navigate(redirectUrlWhenUnauthorized, { replace: true });
    return null;
  }

  return <>{children}</>;
};
