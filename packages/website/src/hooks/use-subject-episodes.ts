import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Episode } from '@bangumi/client/client';

const PAGE_SIZE = 100;

async function fetchSubjectEpisodes(subjectID: number): Promise<Episode[]> {
  const firstPage = await ok(
    ozaClient.getSubjectEpisodes(subjectID, { limit: PAGE_SIZE, offset: 0 }),
  );
  const remainingPageCount = Math.ceil((firstPage.total - firstPage.data.length) / PAGE_SIZE);

  if (remainingPageCount <= 0) {
    return firstPage.data;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: remainingPageCount }, async (_, index) =>
      ok(
        ozaClient.getSubjectEpisodes(subjectID, {
          limit: PAGE_SIZE,
          offset: firstPage.data.length + index * PAGE_SIZE,
        }),
      ),
    ),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

export function useSubjectEpisodes(subjectID: number): Episode[] | undefined {
  const { data } = useSWR(
    `subject-episodes ${subjectID}`,
    async () => fetchSubjectEpisodes(subjectID),
    { suspense: true },
  );

  return data;
}
