import dayjs from 'dayjs';
import React from 'react';

import type { Index, IndexStats } from '@bangumi/client/client.ts';
import { Avatar, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getIndexLink, getUserProfileLink } from '@bangumi/utils/pages.ts';
import subjectTypeSprite from '@bangumi/website/assets/subject-type-sprite.png';

const { Link } = Typography;

/** 条目类型统计，对齐旧站 .ico_subject_type.num；sprite 背景经内联样式设置 */
const SUBJECT_STAT_KEYS: {
  key: keyof IndexStats['subject'];
  label: string;
  backgroundPosition: string;
}[] = [
  { key: 'anime', label: '动画', backgroundPosition: '0 -19px' },
  { key: 'book', label: '书籍', backgroundPosition: '0 0' },
  { key: 'music', label: '音乐', backgroundPosition: '0 -34px' },
  { key: 'game', label: '游戏', backgroundPosition: '0 -50px' },
  { key: 'real', label: '三次元', backgroundPosition: '0 -65px' },
];

const item = css({
  display: 'flex',
  margin: '5px 0',
  padding: '5px 0',
});

const avatar = css({
  flex: '0 0 50px',
  margin: '0 5px',
  minWidth: '0',
  '& .bgm-avatar': { display: 'block' },
});

const info = css({
  flex: '1 1 auto',
  minWidth: '0',
  padding: '0 5px 5px 0',
  borderBottom: '1px dotted #e0e0e0',
  fontSize: '14px',
  lineHeight: '18px',
});

const head = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
});

const title = css({
  flex: '1 1 auto',
  minWidth: '0',
  '& h3': {
    margin: '0 0 5px',
    overflow: 'hidden',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '18px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const statsClass = css({
  flex: 'none',
  marginLeft: 'auto',
  color: '#9f9b9b',
  fontSize: '12px',
  whiteSpace: 'nowrap',
});

const statClass = css({
  display: 'inline-block',
  height: '15px',
  marginLeft: '8px',
  padding: '0 5px 0 17px',
  lineHeight: '15px',
  color: '#9f9b9b',
  fontSize: '12px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '15px 100px',
});

const meta = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '18px',
});

/** 收藏/评论数，靠右对齐 */
const counts = css({ marginLeft: 'auto' });

const date = css({ color: '#595555' });

function formatDate(unix: number): string {
  return dayjs.unix(unix).format('YYYY-M-D HH:mm');
}

function IndexStatsList({ stats }: { stats: IndexStats }) {
  const entries = SUBJECT_STAT_KEYS.map(({ key, label, backgroundPosition }) => ({
    label,
    backgroundPosition,
    count: stats.subject?.[key],
  })).filter((entry) => (entry.count ?? 0) > 0);

  if (entries.length === 0) {
    return null;
  }

  return (
    <span className={statsClass}>
      {entries.map(({ label, count, backgroundPosition }) => (
        <span
          key={label}
          className={statClass}
          style={{ backgroundImage: `url(${subjectTypeSprite})`, backgroundPosition }}
          title={`${label} ${count}`}
          aria-label={`${label} ${count}`}
        >
          {count}
        </span>
      ))}
    </span>
  );
}

/** 目录列表项（首页/浏览页共用） */
const IndexCard: React.FC<{ index: Index }> = ({ index }) => {
  return (
    <li className={item}>
      <span className={avatar}>
        {index.user && (
          <Link to={getUserProfileLink(index.user.username)} title={index.user.nickname}>
            <Avatar src={index.user.avatar.medium} alt={index.user.nickname} />
          </Link>
        )}
      </span>
      <span className={info}>
        <div className={head}>
          <Link to={getIndexLink(index.id)} className={title} title={index.title}>
            <h3>{index.title}</h3>
          </Link>
          <IndexStatsList stats={index.stats} />
        </div>
        <span className={meta}>
          {index.user && (
            <Link to={getUserProfileLink(index.user.username)}>{index.user.nickname}</Link>
          )}
          <span className={counts}>
            收藏 {index.collects} · 评论 {index.replies} · 创建{' '}
            <span className={date}>{formatDate(index.createdAt)}</span>
          </span>
        </span>
      </span>
    </li>
  );
};

export default IndexCard;
