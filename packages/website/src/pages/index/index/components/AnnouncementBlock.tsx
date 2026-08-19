import React from 'react';

import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getGroupTopicLink } from '@bangumi/utils/pages';

import HomeSidePanel from './HomeSidePanel';

const { Link } = Typography;

/* 对齐原站 ul.timeline.dots：左侧竖线 + 每行粉色圆点 */
const list = css({
  listStyle: 'none',
  margin: '0 5px',
  padding: '0',
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    width: '2px',
    background: 'rgba(0, 0, 0, 0.1)',
    opacity: '0.8',
    top: '0',
    bottom: '0',
    left: '5px',
  },
});

const listItem = css({
  position: 'relative',
  padding: '10px 10px 10px 20px',
  fontSize: '13px',
  lineHeight: '1.2',
  color: '#555',
  _after: {
    content: '""',
    position: 'absolute',
    width: '6px',
    height: '6px',
    left: '1px',
    top: '13px',
    borderRadius: '50%',
    opacity: '0.9',
    background: '#f09199',
    border: '2px solid rgba(255, 255, 255, 0.6)',
  },
});

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
      <ul className={list}>
        {ANNOUNCEMENTS.map((item, i) => (
          <li key={i} className={listItem}>
            {item.date} {item.content}
          </li>
        ))}
      </ul>
    </HomeSidePanel>
  );
};

export default AnnouncementBlock;
