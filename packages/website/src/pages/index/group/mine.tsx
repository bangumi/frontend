import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { GroupFilterMode, GroupSort } from '@bangumi/client/client.ts';
import { Layout, Pagination, Section } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useGroups } from '@bangumi/website/hooks/use-groups.ts';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';

import GroupChannelSidebar from './components/GroupChannelSidebar.tsx';
import GroupList from './components/GroupList.tsx';

const PAGE_SIZE = 24;

const pageContainer = css({
  '& > *': {
    marginBottom: '10px',
  },
});

const mainSection = css({
  marginTop: '0',
});

const GroupMine: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const [, navigate] = useTransitionNavigate();
  const mode =
    searchParams.get('mode') === GroupFilterMode.Managed
      ? GroupFilterMode.Managed
      : GroupFilterMode.Joined;
  const title = mode === GroupFilterMode.Managed ? '我管理的小组' : '我参加的小组';
  const { data: groups, total } = useGroups(GroupSort.Created, mode, pageSize, offset);

  const handlePageChange = (page: number): void => {
    navigate({ search: `mode=${mode}&page=${page}` });
  };

  return (
    <>
      <Helmet title={title} />
      <PageContainer className={pageContainer}>
        <Layout
          type='alpha'
          leftChildren={
            <Section title={title} wrapperClass={mainSection}>
              <GroupList groups={groups ?? []} />
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

export default GroupMine;
