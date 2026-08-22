import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { IndexType } from '@bangumi/client/client.ts';
import { Layout, Pagination, Section, Tab } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useIndexes } from '@bangumi/website/hooks/use-indexes.ts';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';

import IndexCard from './components/IndexCard.tsx';
import IndexChannelSidebar from './components/IndexChannelSidebar.tsx';

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

const typeItems: { key: IndexType | undefined; label: string }[] = [
  { key: undefined, label: '全部' },
  { key: IndexType.User, label: '用户目录' },
  { key: IndexType.Public, label: '公共' },
];

const IndexBrowser: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const [, navigate] = useTransitionNavigate();
  const typeParam = searchParams.get('type');
  const type = (Object.values(IndexType) as IndexType[]).includes(Number(typeParam))
    ? (Number(typeParam) as IndexType)
    : undefined;
  const { indexes, total } = useIndexes('latest', type, pageSize, offset);

  const handlePageChange = (page: number): void => {
    const typeQuery = type === undefined ? '' : `type=${type}&`;
    navigate({ search: `${typeQuery}page=${page}` });
  };

  return (
    <>
      <Helmet title='浏览目录' />
      <PageContainer className={pageContainer}>
        <Layout
          type='alpha'
          leftChildren={
            <Section title='浏览目录' wrapperClass={mainSection}>
              <div className={tabs}>
                <Tab.Group type='borderless'>
                  {typeItems.map((item) => (
                    <Link
                      to={{ search: item.key === undefined ? '' : `type=${item.key}` }}
                      key={item.label}
                    >
                      <Tab.Item isActive={type === item.key}>{item.label}</Tab.Item>
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

export default IndexBrowser;
