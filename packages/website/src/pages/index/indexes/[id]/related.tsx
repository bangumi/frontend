import React from 'react';
import { useParams } from 'react-router-dom';

import { Section } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import useIndex from '@bangumi/website/hooks/use-index.ts';
import IndexSidebar from '@bangumi/website/pages/index/indexes/components/IndexSidebar.tsx';
import RelatedManager from '@bangumi/website/pages/index/indexes/components/RelatedManager.tsx';

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

const IndexRelatedPage: React.FC = () => {
  const { id } = useParams();
  const indexId = Number(id);
  const { index } = useIndex(indexId);

  return (
    <>
      <Helmet title={`${index.title} - 管理`} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={mainColumn}>
            <Section title='管理关联内容' wrapperClass={mainSection}>
              <RelatedManager indexId={indexId} />
            </Section>
          </div>
          <IndexSidebar index={index} indexId={indexId} />
        </div>
      </PageContainer>
    </>
  );
};

export default withErrorBoundary(IndexRelatedPage, {
  404: () => <div>没有找到目录</div>,
});
