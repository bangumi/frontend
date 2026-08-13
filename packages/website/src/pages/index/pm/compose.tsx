import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { css } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { PageNeedLoginError } from '@bangumi/website/error';
import { sendPm } from '@bangumi/website/hooks/use-pm';
import { useUser } from '@bangumi/website/hooks/use-user';

import { ComposeForm } from './components/ComposeForm';
import type { CreatePrivateMessage } from './types';

const title = css({
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '34px',
  color: '#1f1c1c',
  marginBottom: '20px',
});

function Compose(): React.ReactElement {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  if (isLoading) {
    return <></>;
  }
  if (!user) {
    throw PageNeedLoginError;
  }

  const handleSubmit = async (data: CreatePrivateMessage): Promise<void> => {
    await sendPm(data);
    await mutate((key) => typeof key === 'string' && key.startsWith('pm/'));
    navigate('/pm');
  };

  return (
    <PageContainer as='main'>
      <Helmet title='写私信' />
      <div className={title}>写私信</div>
      <ComposeForm onSubmit={handleSubmit} />
    </PageContainer>
  );
}

export default withErrorBoundary(Compose);
