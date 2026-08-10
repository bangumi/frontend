import React from 'react';

import { Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { useUser } from '../../hooks/use-user';
import styles from './UserHome.module.less';

const { Link } = Typography;

const UserHome: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <PageContainer as='main'>
      <div className={styles.greets}>
        Hi! <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
      </div>
    </PageContainer>
  );
};

export default UserHome;
