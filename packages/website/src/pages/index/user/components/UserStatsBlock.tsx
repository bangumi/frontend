import React, { useState } from 'react';

import type { User } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { css, cx } from '@bangumi/styled-system/css';

const block = css({
  marginBottom: '20px',
  padding: '7px',
  background: '#fff',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
  boxShadow: '0 5px 14px rgba(0, 0, 0, 0.1)',
});

// 视觉隐藏标题（sr-only）
const title = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: '0',
});

const tabs = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2px',
  marginBottom: '7px',
  padding: '3px',
  border: '1px solid #e8e3e3',
  borderRadius: '18px',
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.08)',
});

const tab = css({
  flex: '1 1 auto',
  padding: '5px 6px',
  border: '0',
  borderRadius: '14px',
  background: 'transparent',
  color: '#595555',
  fontSize: '14px',
  cursor: 'pointer',
  _hover: { color: '#1f1c1c' },
  '@media (max-width: 640px)': {
    paddingInline: '4px',
    fontSize: '12px',
  },
});

const tabActive = css({
  background: '#f58f9a',
  boxShadow: '0 2px 5px rgba(238, 107, 126, 0.3)',
  color: '#fff',
  _hover: { color: '#fff' },
});

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '6px',
});

const item = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0',
  minHeight: '58px',
  padding: '7px 8px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  color: '#fff',
  '@media (max-width: 640px)': { minHeight: '54px' },
});

const itemColors = {
  pink: css({
    border: '1px solid #f09199',
    background: 'linear-gradient(120deg, #f09199 4.39%, rgba(240, 145, 153, 0.8) 96.83%)',
    boxShadow: '0 2px 5px rgba(240, 145, 153, 0.5)',
  }),
  green: css({
    borderColor: '#70b941',
    background: 'linear-gradient(120deg, rgba(112, 185, 65, 0.8) 15.21%, #70b941 73.26%)',
    boxShadow: '0 2px 5px rgba(112, 185, 65, 0.5)',
  }),
  blue: css({
    borderColor: '#6baae8',
    background: 'linear-gradient(280deg, rgba(107, 170, 232, 0.8) 11.61%, #6baae8 86.35%)',
    boxShadow: '0 2px 5px rgba(107, 170, 232, 0.5)',
  }),
  orange: css({
    borderColor: '#e68e46',
    background: 'linear-gradient(280deg, rgba(230, 142, 70, 0.8) 0%, #e68e46 111.48%)',
    boxShadow: '0 2px 5px rgba(230, 142, 70, 0.5)',
  }),
  purple: css({
    borderColor: '#9065ed',
    background: 'linear-gradient(95deg, rgba(144, 101, 237, 0.8) 0%, #9065ed 100%)',
    boxShadow: '0 2px 5px rgba(144, 101, 237, 0.5)',
  }),
  sky: css({
    borderColor: '#369cf8',
    background: 'linear-gradient(90deg, #369cf8 0%, rgba(54, 156, 248, 0.6) 100%)',
    boxShadow: '0 2px 5px rgba(54, 156, 248, 0.5)',
  }),
} satisfies Record<StatItem['color'], string>;

const num = css({
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1',
  '@media (max-width: 640px)': { fontSize: '20px' },
});

const desc = css({
  fontSize: '15px',
  lineHeight: '1.2',
  '@media (max-width: 640px)': { fontSize: '13px' },
});

const chart = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 1fr)',
  gap: '4px',
  height: '106px',
  margin: '12px 30px 0',
  padding: '0',
  listStyle: 'none',
  '& li': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#595555',
    fontSize: '13px',
  },
});

const bar = css({
  display: 'block',
  width: '100%',
  minHeight: '2px',
  marginBottom: '3px',
  borderRadius: '2px 2px 0 0',
  background: '#aaa',
});

/** 收藏统计标签展示顺序，对齐旧版用户主页 */
const STAT_TABS = [
  { key: SubjectType.Book, label: '书籍' },
  { key: SubjectType.Anime, label: '动画' },
  { key: SubjectType.Music, label: '音乐' },
  { key: SubjectType.Game, label: '游戏' },
  { key: SubjectType.Real, label: '电视剧' },
] as const;

type Stats = Record<string, number>;

interface StatItem {
  label: string;
  value: string;
  color: 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'sky';
}

/** 汇总所有类型的收藏统计 */
function mergeAllStats(subject: User['stats']['subject']): Stats {
  const merged: Stats = {};
  for (const stats of Object.values(subject)) {
    for (const [type, count] of Object.entries(stats)) {
      merged[type] = (merged[type] ?? 0) + count;
    }
  }
  return merged;
}

/** 某类型条目的收藏统计（缺失的状态按 0 处理），评分相关数据暂不展示 */
function renderStatItems(stats: Stats): StatItem[] {
  const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const collect = stats[CollectionType.Collect] ?? 0;
  const rate = total > 0 ? (collect / total) * 100 : 0;
  return [
    { label: '收藏', value: String(total), color: 'pink' },
    { label: '完成', value: String(collect), color: 'green' },
    { label: '完成率', value: `${rate.toFixed(1)}%`, color: 'blue' },
    { label: '平均分', value: '--', color: 'orange' },
    { label: '标准差', value: '--', color: 'purple' },
    { label: '评分数', value: '0', color: 'sky' },
  ];
}

const SCORE_LABELS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const;

const UserStatsBlock: React.FC<{ user: User }> = ({ user }) => {
  const { subject } = user.stats;
  const allStats = mergeAllStats(subject);

  const [activeKey, setActiveKey] = useState<SubjectType | 'all'>('all');

  const activeStats = activeKey === 'all' ? allStats : (subject[activeKey] ?? {});
  const statItems = renderStatItems(activeStats);

  return (
    <section className={block}>
      <h2 className={title}>收藏统计</h2>
      <div className={tabs}>
        <button
          type='button'
          className={cx(tab, activeKey === 'all' && tabActive)}
          onClick={() => setActiveKey('all')}
        >
          全部
        </button>
        {STAT_TABS.map(({ key, label }) => (
          <button
            key={key}
            type='button'
            className={cx(tab, activeKey === key && tabActive)}
            onClick={() => setActiveKey(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={grid}>
        {statItems.map(({ label, value, color }) => (
          <div key={label} className={cx(item, itemColors[color])}>
            <span className={num}>{value}</span>
            <span className={desc}>{label}</span>
          </div>
        ))}
      </div>
      <ol className={chart} aria-label='评分分布暂无数据'>
        {SCORE_LABELS.map((score) => (
          <li key={score}>
            <span className={bar} />
            <span>{score}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default UserStatsBlock;
