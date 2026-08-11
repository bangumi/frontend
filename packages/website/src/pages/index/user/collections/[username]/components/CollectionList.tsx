import React from 'react';

import type { CollectionType, SlimSubject, SubjectType } from '@bangumi/client/client';
import { Image, Pagination, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections';

const { Link } = Typography;

const list = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const item = css({
  display: 'flex',
  gap: '12px',
  padding: '10px 0',
  borderBottom: '1px solid #e8e3e3',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const cover = css({
  flexShrink: '0',
  '& img': {
    width: '72px',
    aspectRatio: '3 / 4',
    objectFit: 'cover',
    borderRadius: '3px',
  },
});

const info = css({
  minWidth: '0',
  '& h3': {
    margin: '0 0 4px',
    fontSize: '15px',
    '& a': {
      color: '#1f1c1c',
      textDecoration: 'none',
      _hover: {
        color: '#54b5df',
      },
    },
  },
});

const originalName = css({
  margin: '0 0 4px',
  fontSize: '12px',
  color: '#9f9b9b',
});

const rating = css({
  margin: '0',
  fontSize: '12px',
  color: '#9f9b9b',
});

const pagination = css({
  marginTop: '16px',
});

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
      <ul className={list}>
        {(data ?? []).map((subject) => (
          <CollectionItem key={subject.id} subject={subject} />
        ))}
      </ul>
      <Pagination
        wrapperClass={pagination}
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
    <li className={item}>
      <Link to={getSubjectLink(subject.id)} className={cover}>
        <Image src={subject.images?.medium ?? ''} alt={displayName} />
      </Link>
      <div className={info}>
        <h3>
          <Link to={getSubjectLink(subject.id)}>{displayName}</Link>
        </h3>
        {subject.nameCN && subject.nameCN !== subject.name && (
          <p className={originalName}>{subject.name}</p>
        )}
        {subject.rating.score > 0 && (
          <p className={rating}>评分 {subject.rating.score.toFixed(1)}</p>
        )}
      </div>
    </li>
  );
};
