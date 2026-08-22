import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SubjectStaff } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

const PAGE_SIZE = 100;

async function fetchSubjectStaffPersons(subjectID: number): Promise<SubjectStaff[]> {
  const firstPage = await ok(
    ozaClient.getSubjectStaffPersons(subjectID, { limit: PAGE_SIZE, offset: 0 }),
  );
  const remainingPageCount = Math.ceil((firstPage.total - firstPage.data.length) / PAGE_SIZE);

  if (remainingPageCount <= 0) {
    return firstPage.data;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: remainingPageCount }, async (_, index) =>
      ok(
        ozaClient.getSubjectStaffPersons(subjectID, {
          limit: PAGE_SIZE,
          offset: firstPage.data.length + index * PAGE_SIZE,
        }),
      ),
    ),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

export function useSubjectStaffPersons(subjectID: number): SubjectStaff[] | undefined {
  const { data } = useSWR(
    `subject-staff-persons ${subjectID}`,
    async () => fetchSubjectStaffPersons(subjectID),
    { suspense: true },
  );

  return data;
}
