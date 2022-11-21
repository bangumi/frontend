import React from 'react';
import { useParams } from 'react-router-dom';

import { Pagination } from '@bangumi/design';
import { useGroupTopic } from '@bangumi/website/hooks/use-group';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

import TopicsTable from './components/TopicsTable';
import styles from './style.module.less';

const GroupForum = () => {
  const { name } = useParams();
  const [, navigate] = useTransitionNavigate();
  const { curPage, offset, pageSize } = usePaginationParams();

  const topics = useGroupTopic(name!, {
    offset,
    limit: pageSize,
  });

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  // TODO @waua ErrorBoundary
  return (
    <>
      <TopicsTable topics={topics.data} />
      <Pagination
        total={topics.total}
        pageSize={pageSize}
        currentPage={curPage}
        wrapperClass={styles.pagination}
        onChange={handlePageChange}
      />
    </>
  );
};

export default GroupForum;
