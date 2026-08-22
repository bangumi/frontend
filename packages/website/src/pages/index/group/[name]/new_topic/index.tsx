import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useGroup } from '@bangumi/website/hooks/use-group.ts';
import TopicForm from '@bangumi/website/pages/index/group/components/TopicForm.tsx';

const grid = css({
  display: 'grid',
  rowGap: '1rem',
  columnGap: '2.5rem',
  gridTemplateColumns: '2fr 1fr',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
  },
});

const tipText = css({
  display: 'block',
  marginBottom: '10px',
});

const groupLink = css({
  padding: '0 10px',
});

const GroupNewTopicPage = () => {
  const { name } = useParams();
  const { group } = useGroup(name!);

  return (
    <PageContainer as='main'>
      <Helmet title={`在${group.title}小组发表新话题`} />
      <Typography.Text type='secondary' className={tipText}>
        在
        <Typography.Link to={`/group/${group.name}`} fontWeight='bold' className={groupLink}>
          {group.title}
        </Typography.Link>
        发表新话题
      </Typography.Text>
      <div className={grid}>
        <TopicForm groupName={name} />
      </div>
    </PageContainer>
  );
};

export default withErrorBoundary(GroupNewTopicPage, { 404: <>Group Not found</> });
