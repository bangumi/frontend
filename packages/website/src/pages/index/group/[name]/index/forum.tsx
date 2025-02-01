import React from 'react';
import { useParams } from 'react-router-dom';

import { Pagination } from '@bangumi/design';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useGroupTopics } from '@bangumi/website/hooks/use-group-topics';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { useUser } from '@bangumi/website/hooks/use-user';

import TopicForm from '../../components/TopicForm';
import { useGroupContext } from '..';
import TopicsTable from '../components/TopicsTable';
import styles from './style.module.less';

const GroupForum = () => {
  const { name } = useParams();
  const [, navigate] = useTransitionNavigate();
  const { curPage, offset, pageSize } = usePaginationParams();
  const { user } = useUser();

  const groupContext = useGroupContext();
  const {
    groupRet: { group },
  } = groupContext;

  const { data: topics, total } = useGroupTopics(name!, {
    offset,
    limit: pageSize,
  });

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <>
      <Helmet title={`${group.title}小组的讨论`} />
      <TopicsTable topics={topics ?? []} />
      <Pagination
        total={total ?? 0}
        pageSize={pageSize}
        currentPage={curPage}
        wrapperClass={styles.pagination}
        onChange={handlePageChange}
      />
      {user && <TopicForm quickPost groupName={name} />}
    </>
  );
};

export default withErrorBoundary(GroupForum);
