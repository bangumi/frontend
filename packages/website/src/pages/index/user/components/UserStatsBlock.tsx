import React, { useState } from 'react';

import type { User } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';

import styles from './UserStatsBlock.module.less';

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
    <section className={styles.block}>
      <h2 className={styles.title}>收藏统计</h2>
      <div className={styles.tabs}>
        <button
          type='button'
          className={`${styles.tab} ${activeKey === 'all' ? styles.tabActive : ''}`}
          onClick={() => setActiveKey('all')}
        >
          全部
        </button>
        {STAT_TABS.map(({ key, label }) => (
          <button
            key={key}
            type='button'
            className={`${styles.tab} ${activeKey === key ? styles.tabActive : ''}`}
            onClick={() => setActiveKey(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {statItems.map(({ label, value, color }) => (
          <div key={label} className={`${styles.item} ${styles[color]}`}>
            <span className={styles.num}>{value}</span>
            <span className={styles.desc}>{label}</span>
          </div>
        ))}
      </div>
      <ol className={styles.chart} aria-label='评分分布暂无数据'>
        {SCORE_LABELS.map((score) => (
          <li key={score}>
            <span className={styles.bar} />
            <span>{score}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default UserStatsBlock;
