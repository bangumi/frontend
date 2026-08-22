import React from 'react';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages.ts';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

const { Link } = Typography;

const greets = css({
  fontSize: '24px',
});

const UserHome: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <PageContainer as='main'>
      <div className={greets}>
        Hi! <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
      </div>
    </PageContainer>
  );
};

export default UserHome;
