import React from 'react';

import type { SlimSubject, User } from '@bangumi/client/client.ts';
import { CollectionType } from '@bangumi/client/client.ts';
import { Image, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink, getUserCollectionsLink } from '@bangumi/utils/pages.ts';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections.ts';
import {
  COLLECTION_LABELS,
  SUBJECT_BLOCKS,
} from '@bangumi/website/pages/index/user/components/constants.ts';

const { Link } = Typography;

const block = css({ marginBottom: '30px' });

const header = css({
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  minHeight: '34px',
  marginBottom: '8px',
  borderBottom: '1px solid #e8e3e3',
  '@media (max-width: 640px)': {
    display: 'block',
    paddingBottom: '8px',
  },
});

const title = css({
  flex: 'none',
  margin: '0',
  color: '#1f1c1c',
  fontSize: '20px',
  fontWeight: 'normal',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    _hover: { color: '#54b5df' },
  },
  '@media (max-width: 640px)': { marginBottom: '8px' },
});

const statList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  '& li': {
    display: 'flex',
    gap: '4px',
    padding: '2px 10px',
    border: '1px solid #e8e3e3',
    borderRadius: '14px',
    background: '#fff',
    fontSize: '14px',
    color: '#1f1c1c',
  },
  '@media (max-width: 640px)': {
    gap: '5px',
    '& li': {
      padding: '2px 8px',
      fontSize: '13px',
    },
  },
});

const collectionSection = css({
  marginTop: '8px',
  '& + &': { marginTop: '24px' },
});

const sectionTitle = css({
  margin: '0 0 6px',
  color: '#9f9b9b',
  fontSize: '16px',
  fontWeight: 'normal',
});

const statCount = css({ color: '#1f1c1c' });

const coverList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
  gap: '10px',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  },
  '@media (max-width: 640px)': {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '10px',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

const coverItem = css({
  '& a': {
    display: 'block',
    textDecoration: 'none',
  },
  '& img': {
    width: '100%',
    aspectRatio: '3 / 4',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  '@media (max-width: 640px)': { flex: '0 0 20vw' },
});

const coverName = css({
  display: 'block',
  marginTop: '4px',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.25',
  overflowWrap: 'anywhere',
});

/** 状态标签展示顺序，对齐旧版用户主页 */
const STAT_ORDER = [3, 2, 1, 4, 5] as const;

interface CollectionSectionProps {
  items: SlimSubject[];
  label: string;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ items, label }) => (
  <div className={collectionSection}>
    <h3 className={sectionTitle}>{label}</h3>
    <ul className={coverList}>
      {items.map((subject) => (
        <li key={subject.id} className={coverItem}>
          <Link to={getSubjectLink(subject.id)} title={subject.name}>
            <Image src={subject.images?.medium ?? ''} alt={subject.name} />
            <span className={coverName}>{subject.name}</span>
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
    <section className={block}>
      <div className={header}>
        <h2 className={title}>
          <Link to={getUserCollectionsLink(meta.path, user.username)}>{meta.homepageTitle}</Link>
        </h2>
        {stats && (
          <ul className={statList}>
            {STAT_ORDER.map((type) => (
              <li key={type}>
                <span>{COLLECTION_LABELS[type]}</span>
                <span className={statCount}>{stats[type] ?? 0}</span>
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
