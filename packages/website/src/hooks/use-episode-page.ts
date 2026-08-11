import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Episode } from '@bangumi/client/client';

const PAGE_SIZE = 100;

type ApiFunction = (...args: never[]) => Promise<unknown>;

type SuccessfulData<T extends ApiFunction> = Extract<
  Awaited<ReturnType<T>>,
  { status: 200 }
>['data'];

export interface EpisodePageData {
  episode: Episode;
  comments: SuccessfulData<typeof ozaClient.getEpisodeComments>;
  episodes: Episode[];
}

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

export function useEpisodePage(episodeID: number): { data: EpisodePageData | undefined } {
  const { data } = useSWR(
    `episode-page ${episodeID}`,
    async (): Promise<EpisodePageData> => {
      const [episode, comments] = await Promise.all([
        ok(ozaClient.getEpisode(episodeID)),
        ok(ozaClient.getEpisodeComments(episodeID)),
      ]);
      const episodes = await fetchSubjectEpisodes(episode.subjectID);

      return { episode, comments, episodes };
    },
    { suspense: true },
  );

  return { data };
}
