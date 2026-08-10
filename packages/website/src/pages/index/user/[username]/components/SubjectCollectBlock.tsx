import React from 'react';

import type { User } from '@bangumi/client/client';
import { Image, Typography } from '@bangumi/design';
import { getSubjectLink, getUserCollectionsLink } from '@bangumi/utils/pages';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections';

import { COLLECTION_LABELS, SUBJECT_BLOCKS } from '../../components/constants';
import styles from './SubjectCollectBlock.module.less';

const { Link } = Typography;

/** 用户主页的条目收藏块（动画/书籍/音乐/游戏/三次元） */
const SubjectCollectBlock: React.FC<{ user: User; block: string }> = ({ user, block }) => {
  const meta = SUBJECT_BLOCKS[block];
  if (!meta) {
    return null;
  }

  const { data: collections } = useUserSubjectCollections(user.username, meta.subjectType, {
    limit: 8,
  });

  if (!collections || collections.length === 0) {
    return null;
  }

  const stats = user.stats.subject[meta.subjectType];

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        <Link to={getUserCollectionsLink(meta.path, user.username)}>{meta.label}</Link>
      </h2>
      {stats && (
        <ul className={styles.statList}>
          {Object.entries(COLLECTION_LABELS).map(([type, label]) => (
            <li key={type}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statCount}>{stats[type] ?? 0}</span>
            </li>
          ))}
        </ul>
      )}
      <ul className={styles.coverList}>
        {collections.map((subject) => (
          <li key={subject.id} className={styles.coverItem}>
            <Link to={getSubjectLink(subject.id)} title={subject.nameCN || subject.name}>
              <Image src={subject.images?.medium ?? ''} alt={subject.nameCN || subject.name} />
              <span className={styles.coverName}>{subject.nameCN || subject.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SubjectCollectBlock;
