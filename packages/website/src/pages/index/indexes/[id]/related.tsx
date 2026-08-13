import React from 'react';
import { useParams } from 'react-router-dom';

import { Section } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import useIndex from '@bangumi/website/hooks/use-index';

import IndexSidebar from '../components/IndexSidebar';
import RelatedManager from '../components/RelatedManager';

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
