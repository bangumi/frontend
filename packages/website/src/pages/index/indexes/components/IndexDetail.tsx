import React from 'react';

import type { Index, IndexRelated } from '@bangumi/client/client';
import { Section } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import PageContainer from '@bangumi/website/components/PageContainer';

import type { RelatedFilter } from './IndexRelatedList';
import IndexRelatedList from './IndexRelatedList';
import IndexSidebar from './IndexSidebar';

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  '@media (max-width: 768px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const mainColumn = css({ minWidth: '0' });

const mainSection = css({
  marginTop: '0',
});

/** 目录详情页主体：左侧关联列表 + 右侧信息栏 */
const IndexDetail: React.FC<{
  index: Index;
  related: IndexRelated[];
  total: number;
  currentPage: number;
  pageSize: number;
  activeFilter: RelatedFilter;
  onTabChange: (filter: RelatedFilter) => void;
  onPageChange: (page: number) => void;
  mutate: () => Promise<unknown>;
}> = ({
  index,
  related,
  total,
  currentPage,
  pageSize,
  activeFilter,
  onTabChange,
  onPageChange,
  mutate,
}) => {
  return (
    <PageContainer as='main'>
      <div className={columns}>
        <div className={mainColumn}>
          <Section title='关联内容' wrapperClass={mainSection}>
            <IndexRelatedList
              related={related}
              total={total}
              currentPage={currentPage}
              pageSize={pageSize}
              activeFilter={activeFilter}
              onTabChange={onTabChange}
              onPageChange={onPageChange}
            />
          </Section>
        </div>
        <IndexSidebar index={index} mutate={mutate} />
      </div>
    </PageContainer>
  );
};

export default IndexDetail;
