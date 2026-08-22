import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SubjectRelation } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

const PAGE_SIZE = 100;

async function fetchSubjectRelations(subjectID: number): Promise<SubjectRelation[]> {
  const firstPage = await ok(
    ozaClient.getSubjectRelations(subjectID, { limit: PAGE_SIZE, offset: 0 }),
  );
  const remainingPageCount = Math.ceil((firstPage.total - firstPage.data.length) / PAGE_SIZE);

  if (remainingPageCount <= 0) {
    return firstPage.data;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: remainingPageCount }, async (_, index) =>
      ok(
        ozaClient.getSubjectRelations(subjectID, {
          limit: PAGE_SIZE,
          offset: firstPage.data.length + index * PAGE_SIZE,
        }),
      ),
    ),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

export function useSubjectRelations(subjectID: number): SubjectRelation[] | undefined {
  const { data } = useSWR(
    `subject-relations ${subjectID}`,
    async () => fetchSubjectRelations(subjectID),
    { suspense: true },
  );

  return data;
}
