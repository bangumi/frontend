import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SubjectRelation } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

const LIMIT = 100;

/** 首页接口不含单行本，需单独请求；传 `null` 不请求 */
export function useSubjectOffprints(subjectID: number | null): {
  offprints: SubjectRelation[];
  total: number;
} {
  const { data } = useSWR(subjectID === null ? null : `subject-offprints ${subjectID}`, async () =>
    ok(ozaClient.getSubjectRelations(subjectID!, { offprint: true, limit: LIMIT, offset: 0 })),
  );

  return { offprints: data?.data ?? [], total: data?.total ?? 0 };
}
