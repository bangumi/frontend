import React from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@bangumi/styled-system/css';
import { UnreadableCodeError } from '@bangumi/utils/index.ts';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useUserHome } from '@bangumi/website/hooks/use-user-home.ts';
import UserHeader from '@bangumi/website/pages/index/user/components/UserHeader.tsx';
import UserStatsBlock from '@bangumi/website/pages/index/user/components/UserStatsBlock.tsx';

import { HomeLeftBlocks, HomeRightBlocks } from './components/HomeBlocks.tsx';
import UserInfoCard from './components/UserInfoCard.tsx';
import UserTimelineBlock from './components/UserTimelineBlock.tsx';

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
