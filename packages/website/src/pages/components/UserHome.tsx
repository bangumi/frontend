import React from 'react';

import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { useUser } from '../../hooks/use-user';

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
