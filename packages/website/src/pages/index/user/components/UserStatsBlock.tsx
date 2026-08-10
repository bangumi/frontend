import React, { useState } from 'react';

import type { CollectionType, User } from '@bangumi/client/client';
import { Tab } from '@bangumi/design';

import { COLLECTION_LABELS, SUBJECT_BLOCK_LIST } from './constants';
import styles from './UserStatsBlock.module.less';

type SubjectStats = Record<string, number>;

/** 某类型条目的收藏统计，缺失的状态按 0 处理 */
function renderStatItems(stats?: SubjectStats): { label: string; value: number }[] {
  const types = [1, 2, 3, 4, 5] as CollectionType[];
  const total = stats ? Object.values(stats).reduce((sum, count) => sum + count, 0) : 0;
  return [
    { label: '收藏', value: total },
    ...types.map((type) => ({
      label: COLLECTION_LABELS[type],
      value: stats?.[type] ?? 0,
    })),
  ];
}

const UserStatsBlock: React.FC<{ user: User }> = ({ user }) => {
  const { subject } = user.stats;
  const available = SUBJECT_BLOCK_LIST.filter(({ subjectType }) => {
    const stats = subject[subjectType];
    return stats != null && Object.values(stats).some((count) => count > 0);
  });

  const [activeType, setActiveType] = useState(available[0]?.subjectType);

  if (available.length === 0) {
    return null;
  }

  const active = available.find((item) => item.subjectType === activeType) ?? available[0]!;
  const activeStats = subject[active.subjectType];
  const statItems = renderStatItems(activeStats);

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>收藏统计</h2>
      {available.length > 1 && (
        <Tab
          items={available.map((item) => ({ key: item.subjectType, label: item.label }))}
          activeKey={active.subjectType}
          onChange={(key) => setActiveType(key as typeof active.subjectType)}
        />
      )}
      <div className={styles.grid}>
        {statItems.map(({ label, value }) => (
          <div key={label} className={styles.item}>
            <span className={styles.num}>{value}</span>
            <span className={styles.desc}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserStatsBlock;
