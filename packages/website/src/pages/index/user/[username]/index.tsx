import React from 'react';
import { useParams } from 'react-router-dom';

import { UnreadableCodeError } from '@bangumi/utils';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useUserHome } from '@bangumi/website/hooks/use-user-home';

import UserHeader from '../components/UserHeader';
import UserStatsBlock from '../components/UserStatsBlock';
import { HomeLeftBlocks, HomeRightBlocks } from './components/HomeBlocks';
import UserInfoCard from './components/UserInfoCard';
import styles from './index.module.less';

const UserHomePage: React.FC = () => {
  const { username } = useParams();
  if (!username) {
    throw new UnreadableCodeError('BUG: username is undefined');
  }

  const { data: user } = useUserHome(username);

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet title={`${user.nickname}的主页`} />
      <main className={styles.page}>
        <UserHeader user={user} />
        <div className={styles.columns}>
          <div className={styles.columnLeft}>
            <UserInfoCard user={user} />
            <HomeLeftBlocks user={user} />
          </div>
          <div className={styles.columnRight}>
            <UserStatsBlock user={user} />
            <HomeRightBlocks user={user} />
          </div>
        </div>
      </main>
    </>
  );
};

export default withErrorBoundary(UserHomePage, { 404: <>User Not found</> });
