import React from 'react';

import { Typography } from '@bangumi/design';
import { getGroupTopicLink } from '@bangumi/utils/pages';

import styles from './AnnouncementBlock.module.less';
import HomeSidePanel from './HomeSidePanel';

const { Link } = Typography;

/** 公告为静态内容，内容对齐 PHP home_announcement.htm */
const ANNOUNCEMENTS: { date: string; content: React.ReactNode }[] = [
  {
    date: '2026.3.8',
    content: (
      <>
        <Link to={getGroupTopicLink(454188)}>Bangumi 娘 & 布莱克·樱超进化</Link> /{' '}
        <Link to={getGroupTopicLink(456009)}>动态表情</Link>
      </>
    ),
  },
  {
    date: '2025.9.6',
    content: <Link to={getGroupTopicLink(434630)}>Introducing Bangumi 番组计划 Riff</Link>,
  },
  {
    date: '2025.8.3',
    content: (
      <>
        <Link to={getGroupTopicLink(431967)}>人物相册</Link> &{' '}
        <Link to={getGroupTopicLink(430897)}>人物关联</Link>
      </>
    ),
  },
  {
    date: '2024.10.3',
    content: <Link to={getGroupTopicLink(406595)}>条目公共标签</Link>,
  },
  {
    date: '2021.12.26',
    content: <Link to={getGroupTopicLink(366561)}>社区化开发 & 开源</Link>,
  },
  {
    date: '2019.08.10',
    content: <Link to={getGroupTopicLink(352033)}>「小圣杯」最萌大战内测进行中</Link>,
  },
];

const AnnouncementBlock: React.FC = () => {
  return (
    <HomeSidePanel title='公告'>
      <ul className={styles.list}>
        {ANNOUNCEMENTS.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.date}>{item.date}</span>
            <span className={styles.content}>{item.content}</span>
          </li>
        ))}
      </ul>
    </HomeSidePanel>
  );
};

export default AnnouncementBlock;
