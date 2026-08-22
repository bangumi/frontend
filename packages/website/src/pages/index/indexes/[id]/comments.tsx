import React from 'react';
import { useParams } from 'react-router-dom';

import { Section } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import useIndex from '@bangumi/website/hooks/use-index.ts';
import useIndexComments from '@bangumi/website/hooks/use-index-comments.ts';
import IndexComments from '@bangumi/website/pages/index/indexes/components/IndexComments.tsx';
import IndexSidebar from '@bangumi/website/pages/index/indexes/components/IndexSidebar.tsx';

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

const IndexCommentsPage: React.FC = () => {
  const { id } = useParams();
  const indexId = Number(id);
  const { index } = useIndex(indexId);
  const { comments, mutate } = useIndexComments(indexId);

  return (
    <>
      <Helmet title={`${index.title} - 评论`} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={mainColumn}>
            <Section title='评论' wrapperClass={mainSection}>
              <IndexComments comments={comments} indexId={indexId} mutate={mutate} />
            </Section>
          </div>
          <IndexSidebar index={index} indexId={indexId} hideComments />
        </div>
      </PageContainer>
    </>
  );
};

export default withErrorBoundary(IndexCommentsPage, {
  404: () => <div>没有找到目录</div>,
});
