import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { api } from '@bangumi/client';
import type { GroupProfile, Pagination } from '@bangumi/client/group';

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
  { limit = 20, offset = 0 }: Partial<Pagination> = {},
) {
  const { data: recentTopicsResp } = useSWR(
    api.getGroupTopicsByGroupName.swrKey({ name }, { limit, offset }),
    api.getGroupTopicsByGroupName.fetcher,
    { suspense: true },
  );

  return recentTopicsResp!;
}

export function useGroup(name: string): UseGroupRet {
  const { data: groupResp } = useSWR(
    api.getGroupProfileByName.swrKey({ name }),
    api.getGroupProfileByName.fetcher,
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
