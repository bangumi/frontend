import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SubjectCharacter } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

const PAGE_SIZE = 100;

async function fetchSubjectCharacters(subjectID: number): Promise<SubjectCharacter[]> {
  const firstPage = await ok(
    ozaClient.getSubjectCharacters(subjectID, { limit: PAGE_SIZE, offset: 0 }),
  );
  const remainingPageCount = Math.ceil((firstPage.total - firstPage.data.length) / PAGE_SIZE);

  if (remainingPageCount <= 0) {
    return firstPage.data;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: remainingPageCount }, async (_, index) =>
      ok(
        ozaClient.getSubjectCharacters(subjectID, {
          limit: PAGE_SIZE,
          offset: firstPage.data.length + index * PAGE_SIZE,
        }),
      ),
    ),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

export function useSubjectCharacters(subjectID: number): SubjectCharacter[] | undefined {
  const { data } = useSWR(
    `subject-characters ${subjectID}`,
    async () => fetchSubjectCharacters(subjectID),
    { suspense: true },
  );

  return data;
}
