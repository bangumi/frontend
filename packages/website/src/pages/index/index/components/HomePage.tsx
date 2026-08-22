import React from 'react';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages.ts';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useHomePage } from '@bangumi/website/hooks/use-home-page.ts';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

import AnnouncementBlock from './AnnouncementBlock.tsx';
import CalendarBlock from './CalendarBlock.tsx';
import GroupTopicsBlock from './GroupTopicsBlock.tsx';
import HotSubjectTopicsBlock from './HotSubjectTopicsBlock.tsx';
import PrgManager from './PrgManager.tsx';
import TimelineBlock from './TimelineBlock.tsx';

const { Link } = Typography;

const greets = css({
  fontSize: '24px',
  margin: '0 0 12px',
  '@media (max-width: 640px)': { fontSize: '20px' },
});

const columns = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

const columnLeft = css({
  flex: '7 1 0',
  minWidth: 0,
});

const columnRight = css({
  flex: '3 1 0',
  minWidth: 0,
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    flex: 'none',
    width: '100%',
  },
});

const HomePage: React.FC = () => {
  const { data } = useHomePage();
  const { user } = useUser();

  // useHomePage 为 suspense 模式，data 在渲染时必然存在
  if (!data || !user) {
    return null;
  }

  return (
    <PageContainer as='main'>
      <div className={greets}>
        Hi! <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
      </div>
      <div className={columns}>
        <div className={columnLeft}>
          <PrgManager progress={data.progress} />
          <TimelineBlock timeline={data.timeline} />
        </div>
        <div className={columnRight}>
          <GroupTopicsBlock groupTopics={data.groupTopics} famousGroups={data.famousGroups} />
          <HotSubjectTopicsBlock topics={data.hotSubjectTopics} />
          <CalendarBlock calendar={data.calendar} />
          <AnnouncementBlock />
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
