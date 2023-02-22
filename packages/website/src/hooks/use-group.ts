import { ok } from 'oazapfts';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type {
  GroupProfile,
  PaginationQuery,
  ResponseWithPagination,
  Topic,
} from '@bangumi/client/group';

export interface UseGroupRet {
  group: GroupProfile;
  descriptionCollapsed: boolean;
  setDescriptionCollapsed: (val: boolean) => void;
}

type DescriptionCollapseConfig = Record<string, boolean>;

export function useGroupRecentTopics(
  name: string,
  { limit = 20, offset = 0 }: Partial<PaginationQuery> = {},
): ResponseWithPagination<Topic[]> {
  const { data: recentTopicsResp } = useSWR(
    `/group/${name}/topics?${limit}-${offset}`,
    async () => ok(ozaClient.getGroupTopicsByGroupName(name, { limit, offset })),
    { suspense: true },
  );

  return recentTopicsResp;
}

export function useGroup(name: string): UseGroupRet {
  const { data: groupResp } = useSWR(
    `/group/${name}/profile`,
    async () => ok(ozaClient.getGroupProfile(name)),
    { suspense: true },
  );

  const getDescriptionCollapseConfig = () => {
    try {
      const config = JSON.parse(localStorage.getItem(collapseKey) ?? '{}') as unknown;
      if (typeof config !== 'object') {
        return {};
      }
      return config as DescriptionCollapseConfig;
    } catch (e: unknown) {
      return {};
    }
  };

  const collapseKey = 'doesGroupDescriptionNeedCollapse';
  const collapseConfig = getDescriptionCollapseConfig();
  const descriptionCollapse = collapseConfig[name] ?? false;
  const [descriptionCollapsedState, setDescriptionCollapsedState] =
    useState<boolean>(descriptionCollapse);

  useEffect(() => {
    const config = getDescriptionCollapseConfig();
    localStorage.setItem(
      collapseKey,
      JSON.stringify({ ...config, [name]: descriptionCollapsedState }),
    );
  }, [name, descriptionCollapsedState]);

  return {
    group: groupResp,
    descriptionCollapsed: descriptionCollapsedState,
    setDescriptionCollapsed(val) {
      setDescriptionCollapsedState(val);
    },
  };
}
