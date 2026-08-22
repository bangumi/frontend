import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import useBlogEntry from '@bangumi/website/hooks/use-blog.ts';
import BlogForm from '@bangumi/website/pages/index/blog/components/BlogForm.tsx';

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

const BlogEditPage: React.FC = () => {
  const { id } = useParams();
  const entryId = Number(id);
  const { data: entry } = useBlogEntry(entryId);

  return (
    <PageContainer as='main'>
      <Helmet title={`编辑日志 - ${entry.title}`} />
      <Typography.Text type='secondary' className={tip}>
        编辑日志：{entry.title}
      </Typography.Text>
      <div className={page}>
        <BlogForm entry={entry} />
      </div>
    </PageContainer>
  );
};

export default withErrorBoundary(BlogEditPage, {
  404: () => <div>没有找到日志</div>,
});
