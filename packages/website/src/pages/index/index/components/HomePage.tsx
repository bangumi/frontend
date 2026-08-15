import React from 'react';

import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';
import { useUser } from '@bangumi/website/hooks/use-user';

import AnnouncementBlock from './AnnouncementBlock';
import CalendarBlock from './CalendarBlock';
import GroupTopicsBlock from './GroupTopicsBlock';
import HotSubjectTopicsBlock from './HotSubjectTopicsBlock';
import PrgManager from './PrgManager';
import TimelineBlock from './TimelineBlock';

const { Link } = Typography;

/* 对齐原站首页 h1：20px 粗体 #444，margin 15px 0 */
const greets = css({
  fontSize: '20px',
  fontWeight: '700',
  color: '#444',
  margin: '15px 0',
  lineHeight: '1.3',
  '@media (max-width: 640px)': { fontSize: '18px' },
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
