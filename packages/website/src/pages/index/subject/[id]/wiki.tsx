import { ok } from 'oazapfts';
import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { _TEST_SUBJECTS_ } from '@bangumi/website/shared';

import WikiLayout from './components/WikiLayout';

interface WikiContext {
  subjectWikiInfo: ozaClient.SubjectWikiInfo;
  subjectEditHistory: ozaClient.HistorySummary;
}

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

  const { data: history } = useSWR(
    `/wiki/subjects/${id}/history`,
    async () => ok(ozaClient.subjectEditHistorySummary(Number(id))),
    {
      suspense: true,
    },
  );

  return (
    <WikiLayout id={id} name={data!.name}>
      <Outlet
        context={{
          subjectWikiInfo: data,
          subjectEditHistory: history,
        }}
      />
    </WikiLayout>
  );
};

export const useWikiContext = () => useOutletContext<WikiContext>();

export default withErrorBoundary(WikiPage);
