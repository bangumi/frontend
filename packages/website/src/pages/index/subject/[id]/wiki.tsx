import { ok } from 'oazapfts';
import React from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import WikiLayout from './components/WikiLayout';

interface WikiContext {
  subjectId: number;
  subjectWikiInfo: ozaClient.SubjectWikiInfo;
  subjectEditHistory: ozaClient.HistorySummary[];
  mutateHistory: KeyedMutator<ozaClient.HistorySummary[]>;
}

const WikiPage = ({ subjectId }: { subjectId: number }) => {
  const { data } = useSWR(
    `/wiki/subjects/${subjectId}`,
    async () => ok(ozaClient.subjectInfo(subjectId)),
    {
      suspense: true,
    },
  );

  const { data: history, mutate: mutateHistory } = useSWR(
    `/wiki/subjects/${subjectId}/history`,
    async () => ok(ozaClient.subjectEditHistorySummary(subjectId)),
    {
      suspense: true,
    },
  );

  return (
    <WikiLayout id={subjectId.toString()} name={data.name}>
      <Outlet
        context={{
          subjectId,
          subjectWikiInfo: data,
          subjectEditHistory: history,
          mutateHistory,
        }}
      />
    </WikiLayout>
  );
};

export const useWikiContext = () => useOutletContext<WikiContext>();

export default withErrorBoundary(function WikiPageRouterGuard() {
  const { id } = useParams();
  const subjectId = parseInt(id!);
  if (isNaN(subjectId)) {
    throw Error('条目 ID 必须为数字');
  }
  return <WikiPage subjectId={subjectId} />;
});
