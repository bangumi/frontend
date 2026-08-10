import React from 'react';

import type { CollectionType, SlimSubject, SubjectType } from '@bangumi/client/client';
import { Image, Pagination, Typography } from '@bangumi/design';
import { getSubjectLink } from '@bangumi/utils/pages';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections';

import styles from './CollectionList.module.less';

const { Link } = Typography;

/** 收藏状态过滤后的条目列表（分页） */
export const CollectionList: React.FC<{
  username: string;
  subjectType: SubjectType;
  type: CollectionType;
}> = ({ username, subjectType, type }) => {
  const { curPage, offset, pageSize } = usePaginationParams(20);
  const { data, total } = useUserSubjectCollections(username, subjectType, {
    type,
    limit: pageSize,
    offset,
  });
  const [, navigate] = useTransitionNavigate();

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <div>
      <ul className={styles.list}>
        {(data ?? []).map((subject) => (
          <CollectionItem key={subject.id} subject={subject} />
        ))}
      </ul>
      <Pagination
        wrapperClass={styles.pagination}
        total={total}
        currentPage={curPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

const CollectionItem: React.FC<{ subject: SlimSubject }> = ({ subject }) => {
  const displayName = subject.nameCN || subject.name;
  return (
    <li className={styles.item}>
      <Link to={getSubjectLink(subject.id)} className={styles.cover}>
        <Image src={subject.images?.medium ?? ''} alt={displayName} />
      </Link>
      <div className={styles.info}>
        <h3>
          <Link to={getSubjectLink(subject.id)}>{displayName}</Link>
        </h3>
        {subject.nameCN && subject.nameCN !== subject.name && (
          <p className={styles.originalName}>{subject.name}</p>
        )}
        {subject.rating.score > 0 && (
          <p className={styles.rating}>评分 {subject.rating.score.toFixed(1)}</p>
        )}
      </div>
    </li>
  );
};
