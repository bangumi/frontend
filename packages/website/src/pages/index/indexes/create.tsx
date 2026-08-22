import React from 'react';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

import IndexForm from './components/IndexForm.tsx';

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

const IndexCreatePage: React.FC = () => {
  return (
    <PageContainer as='main'>
      <Helmet title='创建目录' />
      <Typography.Text type='secondary' className={tip}>
        创建目录
      </Typography.Text>
      <div className={page}>
        <IndexForm />
      </div>
    </PageContainer>
  );
};

export default IndexCreatePage;
