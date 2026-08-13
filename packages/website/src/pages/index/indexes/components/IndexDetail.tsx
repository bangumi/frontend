import React from 'react';

import type { Index, IndexRelated } from '@bangumi/client/client';
import { Section } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import PageContainer from '@bangumi/website/components/PageContainer';

import IndexInfoCard from './IndexInfoCard';
import type { RelatedFilter } from './IndexRelatedList';
import IndexRelatedList, { buildRelatedTabs } from './IndexRelatedList';
import IndexSidebar from './IndexSidebar';

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  '@media (max-width: 768px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const mainColumn = css({ minWidth: '0' });

const title = css({
  margin: '0 0 10px',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '28px',
  overflowWrap: 'anywhere',
});

const mainSection = css({
  marginTop: '0',
});

/** 目录详情页主体：标题 + 信息卡 + 关联列表（左），留言/其他目录（右） */
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
  const tabs = buildRelatedTabs(index.stats, index.total);

  return (
    <PageContainer as='main'>
      <div className={columns}>
        <div className={mainColumn}>
          <h1 className={title}>{index.title}</h1>
          <IndexInfoCard index={index} mutate={mutate} />
          {index.total > 0 && (
            <Section title='关联内容' wrapperClass={mainSection}>
              <IndexRelatedList
                tabs={tabs}
                related={related}
                total={total}
                currentPage={currentPage}
                pageSize={pageSize}
                activeFilter={activeFilter}
                onTabChange={onTabChange}
                onPageChange={onPageChange}
              />
            </Section>
          )}
        </div>
        <IndexSidebar index={index} indexId={index.id} />
      </div>
    </PageContainer>
  );
};

export default IndexDetail;
