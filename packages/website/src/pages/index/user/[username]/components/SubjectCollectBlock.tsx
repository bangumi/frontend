import React from 'react';

import type { SlimSubject, User } from '@bangumi/client/client';
import { CollectionType } from '@bangumi/client/client';
import { Image, Typography } from '@bangumi/design';
import { getSubjectLink, getUserCollectionsLink } from '@bangumi/utils/pages';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections';

import { COLLECTION_LABELS, SUBJECT_BLOCKS } from '../../components/constants';
import styles from './SubjectCollectBlock.module.less';

const { Link } = Typography;

/** 状态标签展示顺序，对齐旧版用户主页 */
const STAT_ORDER = [3, 2, 1, 4, 5] as const;

interface CollectionSectionProps {
  items: SlimSubject[];
  label: string;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ items, label }) => (
  <div className={styles.collectionSection}>
    <h3 className={styles.sectionTitle}>{label}</h3>
    <ul className={styles.coverList}>
      {items.map((subject) => (
        <li key={subject.id} className={styles.coverItem}>
          <Link to={getSubjectLink(subject.id)} title={subject.name}>
            <Image src={subject.images?.medium ?? ''} alt={subject.name} />
            <span className={styles.coverName}>{subject.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/** 用户主页的条目收藏块（动画/书籍/音乐/游戏/三次元） */
const SubjectCollectBlock: React.FC<{ user: User; block: string }> = ({ user, block }) => {
  const meta = SUBJECT_BLOCKS[block];
  if (!meta) {
    return null;
  }

  const { data: doingCollections } = useUserSubjectCollections(user.username, meta.subjectType, {
    type: CollectionType.Doing,
    limit: 9,
  });
  const { data: collectedCollections } = useUserSubjectCollections(
    user.username,
    meta.subjectType,
    {
      type: CollectionType.Collect,
      limit: 9,
    },
  );

  if (
    (!doingCollections || doingCollections.length === 0) &&
    (!collectedCollections || collectedCollections.length === 0)
  ) {
    return null;
  }

  const stats = user.stats.subject[meta.subjectType];

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Link to={getUserCollectionsLink(meta.path, user.username)}>{meta.homepageTitle}</Link>
        </h2>
        {stats && (
          <ul className={styles.statList}>
            {STAT_ORDER.map((type) => (
              <li key={type}>
                <span className={styles.statLabel}>{COLLECTION_LABELS[type]}</span>
                <span className={styles.statCount}>{stats[type] ?? 0}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {doingCollections && doingCollections.length > 0 && (
        <CollectionSection
          items={doingCollections}
          label={COLLECTION_LABELS[CollectionType.Doing]}
        />
      )}
      {collectedCollections && collectedCollections.length > 0 && (
        <CollectionSection
          items={collectedCollections}
          label={COLLECTION_LABELS[CollectionType.Collect]}
        />
      )}
    </section>
  );
};

export default SubjectCollectBlock;
