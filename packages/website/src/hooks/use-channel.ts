import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type {
  ChannelSubjectTopic,
  FriendSubjectCollectionActivity,
  SlimBlogEntry,
  SubjectTag,
  TrendingSubject,
} from '@bangumi/client/client';
import { useUser } from '@bangumi/website/hooks/use-user';
import type { ChannelConfig } from '@bangumi/website/pages/index/channel/config';

export interface ChannelData {
  subjects: TrendingSubject[];
  topics: ChannelSubjectTopic[];
  blogs: SlimBlogEntry[];
  tags: SubjectTag[];
  friendActivities: FriendSubjectCollectionActivity[];
  showFriendActivities: boolean;
}

export function useChannel(config: ChannelConfig): ChannelData {
  const { user, isLoading: isUserLoading } = useUser();
  const { data } = useSWR(
    ['channel', config.type],
    async () => {
      const [subjects, topics, blogs, tags] = await Promise.all([
        ok(ozaClient.getTrendingSubjects(config.type, { limit: 15, offset: 0 })),
        ok(
          ozaClient.getTrendingSubjectTopics({
            $type: config.type,
            limit: 20,
            offset: 0,
          }),
        ),
        ok(ozaClient.getChannelBlogs(config.type, { limit: 6, offset: 0 })),
        ok(ozaClient.getChannelTags(config.type, { limit: 30, offset: 0 })),
      ]);

      return {
        subjects: subjects.data,
        topics: topics.data,
        blogs: blogs.data,
        tags: tags.data,
      };
    },
    { suspense: true },
  );

  const { data: friendActivities } = useSWR(
    user ? ['channel-friend-activities', config.type, user.id] : null,
    async () => ok(ozaClient.getFriendsSubjectCollections(config.type, { limit: 10, offset: 0 })),
  );

  return {
    subjects: data?.subjects ?? [],
    topics: data?.topics ?? [],
    blogs: data?.blogs ?? [],
    tags: data?.tags ?? [],
    friendActivities: friendActivities?.data ?? [],
    showFriendActivities: !isUserLoading && Boolean(user) && friendActivities !== undefined,
  };
}
