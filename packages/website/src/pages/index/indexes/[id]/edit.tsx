import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import useIndex from '@bangumi/website/hooks/use-index.ts';
import IndexForm from '@bangumi/website/pages/index/indexes/components/IndexForm.tsx';

const page = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
  columnGap: '2.5rem',
  '@media (max-width: 640px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const tip = css({
  display: 'block',
  marginBottom: '10px',
});

const IndexEditPage: React.FC = () => {
  const { id } = useParams();
  const indexId = Number(id);
  const { index } = useIndex(indexId);

  return (
    <PageContainer as='main'>
      <Helmet title={`编辑目录 - ${index.title}`} />
      <Typography.Text type='secondary' className={tip}>
        编辑目录：{index.title}
      </Typography.Text>
      <div className={page}>
        <IndexForm index={index} />
      </div>
    </PageContainer>
  );
};

export default withErrorBoundary(IndexEditPage, {
  404: () => <div>没有找到目录</div>,
});
