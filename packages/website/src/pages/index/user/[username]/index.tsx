import React from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@bangumi/styled-system/css';
import { UnreadableCodeError } from '@bangumi/utils';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useUserHome } from '@bangumi/website/hooks/use-user-home';

import UserHeader from '../components/UserHeader';
import UserStatsBlock from '../components/UserStatsBlock';
import { HomeLeftBlocks, HomeRightBlocks } from './components/HomeBlocks';
import UserInfoCard from './components/UserInfoCard';
import UserTimelineBlock from './components/UserTimelineBlock';

const columns = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  paddingTop: '15px',
  paddingBottom: '40px',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    // 单列时让子项占满容器宽度，避免内容按 max-content 撑开导致横向溢出
    alignItems: 'stretch',
    paddingTop: '16px',
    paddingBottom: '40px',
  },
});

const columnLeft = css({
  flex: '7 1 0',
  minWidth: '0',
});

const columnRight = css({
  flex: '3 1 0',
  width: 'auto',
  minWidth: '0',
  marginTop: '-7px',
  '@media (max-width: 768px)': {
    flex: 'none',
    width: '100%',
    marginTop: '0',
  },
});

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
      <main>
        <UserHeader user={user} />
        <PageContainer gutterOnly className={columns}>
          <div className={columnLeft}>
            <UserInfoCard user={user} />
            <HomeLeftBlocks user={user} />
          </div>
          <div className={columnRight}>
            <UserTimelineBlock user={user} />
            <UserStatsBlock user={user} />
            <HomeRightBlocks user={user} />
          </div>
        </PageContainer>
      </main>
    </>
  );
};

export default withErrorBoundary(UserHomePage, { 404: <>User Not found</> });
