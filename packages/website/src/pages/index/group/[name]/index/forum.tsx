import React from 'react';
import { useParams } from 'react-router-dom';

import { Pagination } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useGroupTopics } from '@bangumi/website/hooks/use-group-topics.ts';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';
import TopicsTable from '@bangumi/website/pages/index/group/[name]/components/TopicsTable.tsx';
import { useGroupContext } from '@bangumi/website/pages/index/group/[name]/index.tsx';
import TopicForm from '@bangumi/website/pages/index/group/components/TopicForm.tsx';

const pagination = css({
  marginTop: '20px',
});

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
        wrapperClass={pagination}
        onChange={handlePageChange}
      />
      {user && <TopicForm quickPost groupName={name} />}
    </>
  );
};

export default withErrorBoundary(GroupForum);
