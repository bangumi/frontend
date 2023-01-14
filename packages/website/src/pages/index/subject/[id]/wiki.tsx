import { ok } from 'oazapfts';
import React from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import WikiLayout from './components/WikiLayout';

interface WikiContext {
  subjectWikiInfo: ozaClient.SubjectWikiInfo;
  subjectEditHistory: ozaClient.HistorySummary[];
  mutateHistory: KeyedMutator<ozaClient.HistorySummary[]>;
}

const WikiPage = () => {
  const { id: subjectId } = useParams();
  const { data } = useSWR(
    `/wiki/subjects/${subjectId!}`,
    async () => ok(ozaClient.subjectInfo(parseInt(subjectId!))),
    {
      suspense: true,
    },
  );

  const { data: history, mutate: mutateHistory } = useSWR(
    `/wiki/subjects/${subjectId!}/history`,
    async () => ok(ozaClient.subjectEditHistorySummary(parseInt(subjectId!))),
    {
      suspense: true,
    },
  );

  return (
    <WikiLayout id={subjectId} name={data!.name}>
      <Outlet
        context={{
          subjectWikiInfo: data,
          subjectEditHistory: history,
          mutateHistory,
        }}
      />
    </WikiLayout>
  );
};

export const useWikiContext = () => useOutletContext<WikiContext>();

export default withErrorBoundary(WikiPage);
