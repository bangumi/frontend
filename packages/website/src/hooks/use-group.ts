import { ok } from 'oazapfts';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupProfile, PaginationQuery } from '@bangumi/client/group';

export enum DescriptionClamp {
  clamp = 'clamp',
  unclamp = 'unclamp',
}

export interface UseGroupRet {
  group: GroupProfile | undefined;
  descriptionClamp: DescriptionClamp;
  setDescriptionClamp: (val: DescriptionClamp) => void;
}

export function useGroupRecentTopics(
  name: string,
  { limit = 20, offset = 0 }: Partial<PaginationQuery> = {},
) {
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
  const clampKey = `doesGroupDescriptionNeedClamp.${name}`;
  const descriptionClamp =
    (localStorage.getItem(clampKey) as DescriptionClamp | undefined) ?? DescriptionClamp.unclamp;
  const [descriptionClampState, setDescriptionClampState] =
    useState<DescriptionClamp>(descriptionClamp);

  useEffect(() => {
    localStorage.setItem(clampKey, descriptionClampState);
  }, [descriptionClampState]);

  return {
    group: groupResp,
    descriptionClamp: descriptionClampState,
    setDescriptionClamp(val) {
      setDescriptionClampState(val);
    },
  };
}
