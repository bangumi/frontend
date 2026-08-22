import React from 'react';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

import BlogForm from './components/BlogForm.tsx';

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

const BlogCreatePage: React.FC = () => {
  return (
    <PageContainer as='main'>
      <Helmet title='写日志' />
      <Typography.Text type='secondary' className={tip}>
        写日志
      </Typography.Text>
      <div className={page}>
        <BlogForm />
      </div>
    </PageContainer>
  );
};

export default BlogCreatePage;
