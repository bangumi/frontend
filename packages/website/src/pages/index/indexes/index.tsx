import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Layout, Pagination, Section, Tab } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import type { IndexOrder } from '@bangumi/website/hooks/use-indexes';
import { useIndexes } from '@bangumi/website/hooks/use-indexes';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

import IndexCard from './components/IndexCard';
import IndexChannelSidebar from './components/IndexChannelSidebar';

const PAGE_SIZE = 20;

const pageContainer = css({
  '& > *': {
    marginBottom: '10px',
  },
});

const mainSection = css({
  marginTop: '0',
});

const tabs = css({
  marginBottom: '20px',
});

const list = css({ margin: '0', padding: '0', listStyle: 'none' });

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const orderItems: { key: IndexOrder; label: string }[] = [
  { key: 'latest', label: '最新' },
  { key: 'hot', label: '热门' },
];

const IndexChannel: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const [, navigate] = useTransitionNavigate();
  const order: IndexOrder = searchParams.get('order') === 'hot' ? 'hot' : 'latest';
  const { indexes, total } = useIndexes(order, undefined, pageSize, offset);

  const handlePageChange = (page: number): void => {
    navigate({ search: `order=${order}&page=${page}` });
  };

  return (
    <>
      <Helmet title='目录' />
      <PageContainer className={pageContainer}>
        <Layout
          type='alpha'
          leftChildren={
            <Section title='目录' wrapperClass={mainSection}>
              <div className={tabs}>
                <Tab.Group type='borderless'>
                  {orderItems.map((item) => (
                    <Link to={{ search: `order=${item.key}` }} key={item.key}>
                      <Tab.Item isActive={order === item.key}>{item.label}</Tab.Item>
                    </Link>
                  ))}
                </Tab.Group>
              </div>
              <ul className={list}>
                {indexes?.map((index) => (
                  <IndexCard key={index.id} index={index} />
                ))}
              </ul>
              {indexes?.length === 0 && <p className={empty}>暂无目录</p>}
              <Pagination
                total={total ?? 0}
                currentPage={curPage}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </Section>
          }
          rightChildren={<IndexChannelSidebar />}
        />
      </PageContainer>
    </>
  );
};

export default IndexChannel;
