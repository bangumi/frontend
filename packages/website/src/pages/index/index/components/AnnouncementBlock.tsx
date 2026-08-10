import React from 'react';

import { Typography } from '@bangumi/design';

import styles from './AnnouncementBlock.module.less';
import HomeSidePanel from './HomeSidePanel';

const { Link } = Typography;

/** 公告为静态内容，内容对齐 PHP home_announcement.htm */
const ANNOUNCEMENTS: { date: string; content: React.ReactNode }[] = [
  {
    date: '2026.3.8',
    content: (
      <>
        <Link to='https://bgm.tv/group/topic/454188' isExternal>
          Bangumi 娘 & 布莱克·樱超进化
        </Link>{' '}
        /{' '}
        <Link to='https://bgm.tv/group/topic/456009' isExternal>
          动态表情
        </Link>
      </>
    ),
  },
  {
    date: '2025.9.6',
    content: (
      <Link to='https://bgm.tv/group/topic/434630' isExternal>
        Introducing Bangumi 番组计划 Riff
      </Link>
    ),
  },
  {
    date: '2025.8.3',
    content: (
      <>
        <Link to='https://bgm.tv/group/topic/431967' isExternal>
          人物相册
        </Link>{' '}
        &{' '}
        <Link to='https://bgm.tv/group/topic/430897' isExternal>
          人物关联
        </Link>
      </>
    ),
  },
  {
    date: '2024.10.3',
    content: (
      <Link to='https://bgm.tv/group/topic/406595' isExternal>
        条目公共标签
      </Link>
    ),
  },
  {
    date: '2021.12.26',
    content: (
      <Link to='https://bgm.tv/group/topic/366561' isExternal>
        社区化开发 & 开源
      </Link>
    ),
  },
  {
    date: '2019.08.10',
    content: (
      <Link to='https://bgm.tv/group/topic/352033' isExternal>
        「小圣杯」最萌大战内测进行中
      </Link>
    ),
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
