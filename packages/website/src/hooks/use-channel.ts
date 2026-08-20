import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type {
  ChannelSubjectTopic,
  FriendSubjectCollectionActivity,
  SlimBlogEntry,
  SubjectTag,
  SubjectType,
  TrendingSubject,
} from '@bangumi/client/client';
import { useUser } from '@bangumi/website/hooks/use-user';

/**
 * 频道页各区块的数据请求相互独立，某个接口较慢或失败时只影响对应区块，
 * 不会拖慢或拖垮整个页面加载。
 */

/** 请求失败时返回空数组，区块按空数据降级渲染 */
async function fetchList<T>(fetch: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fetch();
  } catch {
    return [];
  }
}

export function useTrendingSubjects(type: SubjectType): TrendingSubject[] {
  const { data } = useSWR(
    ['channel', type, 'trending-subjects'],
    async () =>
      fetchList(
        async () => (await ok(ozaClient.getTrendingSubjects(type, { limit: 15, offset: 0 }))).data,
      ),
    { suspense: true },
  );
  return data;
}

export function useChannelSubjectTopics(type: SubjectType): ChannelSubjectTopic[] {
  const { data } = useSWR(
    ['channel', type, 'topics'],
    async () =>
      fetchList(
        async () =>
          (await ok(ozaClient.getChannelSubjectTopics(type, { limit: 20, offset: 0 }))).data,
      ),
    { suspense: true },
  );
  return data;
}

export function useChannelBlogs(type: SubjectType): SlimBlogEntry[] {
  const { data } = useSWR(
    ['channel', type, 'blogs'],
    async () =>
      fetchList(
        async () => (await ok(ozaClient.getChannelBlogs(type, { limit: 6, offset: 0 }))).data,
      ),
    { suspense: true },
  );
  return data;
}

export function useChannelTags(type: SubjectType): SubjectTag[] {
  const { data } = useSWR(
    ['channel', type, 'tags'],
    async () =>
      fetchList(
        async () => (await ok(ozaClient.getChannelTags(type, { limit: 30, offset: 0 }))).data,
      ),
    { suspense: true },
  );
  return data;
}

export function useFriendActivities(type: SubjectType): {
  friendActivities: FriendSubjectCollectionActivity[];
  showFriendActivities: boolean;
} {
  const { user, isLoading: isUserLoading } = useUser();
  const { data } = useSWR(
    user ? ['channel-friend-activities', type, user.id] : null,
    async () =>
      (await ok(ozaClient.getFriendsSubjectCollections(type, { limit: 10, offset: 0 }))).data,
  );
  return {
    friendActivities: data ?? [],
    showFriendActivities: !isUserLoading && Boolean(user) && data !== undefined,
  };
}
