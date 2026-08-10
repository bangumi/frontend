import React from 'react';

import { Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';
import { useUser } from '@bangumi/website/hooks/use-user';

import AnnouncementBlock from './AnnouncementBlock';
import CalendarBlock from './CalendarBlock';
import GroupTopicsBlock from './GroupTopicsBlock';
import styles from './HomePage.module.less';
import HotSubjectTopicsBlock from './HotSubjectTopicsBlock';
import PrgManager from './PrgManager';
import TimelineBlock from './TimelineBlock';

const { Link } = Typography;

const HomePage: React.FC = () => {
  const { data } = useHomePage();
  const { user } = useUser();

  // useHomePage 为 suspense 模式，data 在渲染时必然存在
  if (!data || !user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.greets}>
        Hi!{' '}
        <Link to={getUserProfileLink(user.username)} isExternal>
          {user.nickname}
        </Link>
      </div>
      <div className={styles.columns}>
        <div className={styles.columnLeft}>
          <PrgManager progress={data.progress} />
          <TimelineBlock timeline={data.timeline} />
        </div>
        <div className={styles.columnRight}>
          <GroupTopicsBlock groupTopics={data.groupTopics} famousGroups={data.famousGroups} />
          <HotSubjectTopicsBlock topics={data.hotSubjectTopics} />
          <CalendarBlock calendar={data.calendar} />
          <AnnouncementBlock />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
