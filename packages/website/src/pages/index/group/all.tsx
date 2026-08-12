import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { GroupSort } from '@bangumi/client/client';
import { Layout, Pagination, Section, Tab } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useGroups } from '@bangumi/website/hooks/use-groups';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

import GroupChannelSidebar from './components/GroupChannelSidebar';
import GroupList from './components/GroupList';

const PAGE_SIZE = 24;

const sortItems = [
  { key: GroupSort.Members, label: '成员数' },
  { key: GroupSort.Topics, label: '主题数' },
  { key: GroupSort.Posts, label: '帖子数' },
  { key: GroupSort.Created, label: '创建时间' },
  { key: GroupSort.Updated, label: '最近活跃' },
];

const pageContainer = css({
  '& > *': {
    marginBottom: '10px',
  },
});

const mainSection = css({
  marginTop: '0',
});

const sortTabs = css({
  marginBottom: '20px',
});

const GroupAll: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const [, navigate] = useTransitionNavigate();
  const sortParam = searchParams.get('sort');
  const sort = (Object.values(GroupSort) as string[]).includes(sortParam ?? '')
    ? (sortParam as GroupSort)
    : GroupSort.Members;
  const { data: groups, total } = useGroups(sort, undefined, pageSize, offset);

  const handlePageChange = (page: number): void => {
    navigate({ search: `sort=${sort}&page=${page}` });
  };

  return (
    <>
      <Helmet title='所有小组' />
      <PageContainer className={pageContainer}>
        <Layout
          type='alpha'
          leftChildren={
            <Section title='所有小组' wrapperClass={mainSection}>
              <div className={sortTabs}>
                <Tab.Group type='borderless'>
                  {sortItems.map((item) => (
                    <Link to={{ search: `sort=${item.key}` }} key={item.key}>
                      <Tab.Item isActive={sort === item.key}>{item.label}</Tab.Item>
                    </Link>
                  ))}
                </Tab.Group>
              </div>
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

export default GroupAll;
