import React from 'react';

import type { GroupTopicFilterMode } from '@bangumi/client/client';
import { Layout, Pagination, Section } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { useRecentGroupTopics } from '@bangumi/website/hooks/use-recent-group-topics';

import GroupChannelSidebar from './GroupChannelSidebar';
import GroupTopicTable from './GroupTopicTable';

const PAGE_SIZE = 20;

const pageContainer = css({
  '& > *': {
    marginBottom: '10px',
  },
});

const mainSection = css({
  marginTop: '0',
});

/** 跨小组话题列表页（随便看看/我发表/我回复共用） */
const GroupTopicListPage: React.FC<{ mode: GroupTopicFilterMode; title: string }> = ({
  mode,
  title,
}) => {
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const [, navigate] = useTransitionNavigate();
  const { data: topics, total } = useRecentGroupTopics(pageSize, offset, mode);

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <>
      <Helmet title={title} />
      <PageContainer className={pageContainer}>
        <Layout
          type='alpha'
          leftChildren={
            <Section title={title} wrapperClass={mainSection}>
              <GroupTopicTable topics={topics ?? []} />
              <Pagination
                total={total ?? 0}
                currentPage={curPage}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </Section>
          }
          rightChildren={<GroupChannelSidebar />}
        />
      </PageContainer>
    </>
  );
};

export default GroupTopicListPage;
