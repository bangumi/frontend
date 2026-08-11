import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SubjectTopic, TrendingSubject } from '@bangumi/client/client';
import { SubjectType } from '@bangumi/client/client';

export interface AnimeChannelData {
  subjects: TrendingSubject[];
  topics: SubjectTopic[];
}

export function useAnimeChannel(): AnimeChannelData {
  const { data } = useSWR(
    'anime-channel',
    async () => {
      const [subjects, topics] = await Promise.all([
        ok(ozaClient.getTrendingSubjects(SubjectType.Anime, { limit: 15, offset: 0 })),
        ok(ozaClient.getTrendingSubjectTopics({ limit: 20, offset: 0 })),
      ]);

      return {
        subjects: subjects.data,
        topics: topics.data.filter((topic) => topic.subject.type === SubjectType.Anime),
      };
    },
    { suspense: true },
  );

  return data ?? { subjects: [], topics: [] };
}
