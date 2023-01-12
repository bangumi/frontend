import { ok } from 'oazapfts';
import React from 'react';
import { Outlet } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { _TEST_SUBJECTS_ } from '@bangumi/website/shared';

import WikiLayout from './components/WikiLayout';

const WikiPage = () => {
  // const { id } = useParams();
  const id = _TEST_SUBJECTS_;
  const { data } = useSWR(
    `/wiki/subjects/${id}`,
    async () => ok(ozaClient.subjectInfo(Number(id))),
    {
      suspense: true,
    },
  );

  return (
    <WikiLayout id={id} name={data!.name}>
      <Outlet />
    </WikiLayout>
  );
};

export default withErrorBoundary(WikiPage);
