import React from 'react';

import type { SubjectType, User } from '@bangumi/client/client.ts';
import { CollectionType } from '@bangumi/client/client.ts';
import { Image, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages.ts';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections.ts';
import {
  COLLECTION_LABELS,
  COLLECTION_STATUS_PATHS,
  SUBJECT_BLOCK_LIST,
} from '@bangumi/website/pages/index/user/components/constants.ts';

const { Link } = Typography;

const group = css({
  marginBottom: '20px',
});

const title = css({
  margin: '0 0 10px',
  fontSize: '16px',
  '& a': {
    color: '#1f1c1c',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

const coverList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'grid',
  // minmax(0, 1fr) 允许列收缩到容器宽度，避免封面图固有宽度撑开网格
  // 对齐旧站收藏页封面网格（约 10 列小封面），响应式自动收缩列数
  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
  gap: '10px',
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
    borderRadius: '3px',
  },
});

const coverName = css({
  display: 'block',
  marginTop: '4px',
  fontSize: '12px',
  color: '#595555',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const empty = css({
  color: '#9f9b9b',
});

/** 概览模式下按收藏状态分组渲染的条目封面网格 */
export const CollectionGroup: React.FC<{ user: User; subjectType: SubjectType }> = ({
  user,
  subjectType,
}) => {
  const meta = SUBJECT_BLOCK_LIST.find((item) => item.subjectType === subjectType);
  const stats = user.stats.subject[subjectType];
  const availableStatuses = Object.values(CollectionType).filter(
    (type) => (stats?.[type] ?? 0) > 0,
  ) as CollectionType[];

  if (!meta || availableStatuses.length === 0) {
    return <p className={empty}>还没有收藏条目</p>;
  }

  return (
    <>
      {availableStatuses.map((type) => (
        <CollectionGroupItem
          key={type}
          user={user}
          subjectType={subjectType}
          type={type}
          label={COLLECTION_LABELS[type]}
          statusPath={COLLECTION_STATUS_PATHS[type]}
        />
      ))}
    </>
  );
};

const CollectionGroupItem: React.FC<{
  user: User;
  subjectType: SubjectType;
  type: CollectionType;
  label: string;
  statusPath: string;
}> = ({ user, subjectType, type, label, statusPath }) => {
  const meta = SUBJECT_BLOCK_LIST.find((item) => item.subjectType === subjectType)!;
  const { data } = useUserSubjectCollections(user.username, subjectType, { type, limit: 10 });
  const count = user.stats.subject[subjectType]?.[type] ?? 0;

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className={group}>
      <h2 className={title}>
        <Link to={`/${meta.path}/list/${user.username}/${statusPath}`}>
          {label} ({count})
        </Link>
      </h2>
      <ul className={coverList}>
        {data.map((subject) => (
          <li key={subject.id} className={coverItem}>
            {/* noStyle：.bgm-link 的 less 样式（display: inline-block）会覆盖 coverItem 的 display: block，导致封面按内容宽度撑开 */}
            <Link to={getSubjectLink(subject.id)} noStyle title={subject.nameCN || subject.name}>
              <Image src={subject.images?.medium ?? ''} alt={subject.nameCN || subject.name} />
              <span className={coverName}>{subject.nameCN || subject.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
