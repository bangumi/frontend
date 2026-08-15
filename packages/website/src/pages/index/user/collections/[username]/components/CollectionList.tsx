import React from 'react';

import { ozaClient } from '@bangumi/client';
import type { CollectionType, SlimSubject, SubjectType } from '@bangumi/client/client';
import { Image, Pagination, Select, toast, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { useUser } from '@bangumi/website/hooks/use-user';
import { useUserSubjectCollections } from '@bangumi/website/hooks/use-user-collections';

import { COLLECTION_LABELS } from '../../../components/constants';

const { Link } = Typography;

const coverList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'grid',
  // 对齐旧站收藏页封面网格（约 10 列小封面），响应式自动收缩列数
  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
  gap: '10px',
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
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
    borderRadius: '3px',
  },
});

const coverName = css({
  display: 'block',
  marginTop: '4px',
  fontSize: '12px',
  lineHeight: '16px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: '#595555',
  '&:hover': { color: '#54b5df' },
});

const originalName = css({
  display: 'block',
  margin: '0',
  fontSize: '11px',
  lineHeight: '15px',
  color: '#9f9b9b',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const rating = css({
  margin: '2px 0 0',
  fontSize: '11px',
  lineHeight: '15px',
  color: '#9f9b9b',
});

const statusSelect = css({
  marginTop: '4px',
  padding: '0.2rem 0.5rem',
  fontSize: '0.85rem',
});

const pagination = css({
  marginTop: '16px',
});

/** 收藏状态过滤后的条目网格（分页，对齐旧站收藏页封面网格） */
export const CollectionList: React.FC<{
  username: string;
  subjectType: SubjectType;
  type: CollectionType;
}> = ({ username, subjectType, type }) => {
  const { curPage, offset, pageSize } = usePaginationParams(20);
  const { data, total, mutate } = useUserSubjectCollections(username, subjectType, {
    type,
    limit: pageSize,
    offset,
  });
  const { user } = useUser();
  const [, navigate] = useTransitionNavigate();
  const isOwner = user?.username === username;

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <div>
      <ul className={coverList}>
        {(data ?? []).map((subject) => (
          <CollectionItem key={subject.id} subject={subject} isOwner={isOwner} mutate={mutate} />
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

const STATUS_OPTIONS = (Object.entries(COLLECTION_LABELS) as [string, string][]).map(
  ([key, label]) => ({ label, value: key }),
);

const CollectionItem: React.FC<{
  subject: SlimSubject;
  isOwner: boolean;
  mutate: () => Promise<unknown>;
}> = ({ subject, isOwner, mutate }) => {
  const displayName = subject.nameCN || subject.name;
  const currentType = subject.interest?.type;

  const handleTypeChange = async (value: string) => {
    const res = await ozaClient.updateSubjectCollection(subject.id, {
      type: Number(value) as CollectionType,
    });
    if (res.status === 200) {
      await mutate();
    } else {
      toast(res.data.message);
    }
  };

  return (
    <li className={coverItem}>
      <Link to={getSubjectLink(subject.id)} title={displayName}>
        <Image src={subject.images?.medium ?? ''} alt={displayName} />
      </Link>
      <Link to={getSubjectLink(subject.id)} className={coverName} title={displayName}>
        {displayName}
      </Link>
      {subject.nameCN && subject.nameCN !== subject.name && (
        <p className={originalName}>{subject.name}</p>
      )}
      {subject.rating.score > 0 && <p className={rating}>评分 {subject.rating.score.toFixed(1)}</p>}
      {isOwner && currentType !== undefined && (
        <Select
          className={statusSelect}
          defaultValue={String(currentType)}
          options={STATUS_OPTIONS}
          onChange={(option) => {
            if (option) {
              void handleTypeChange(option.value);
            }
          }}
        />
      )}
    </li>
  );
};
