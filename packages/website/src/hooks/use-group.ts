import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { api } from '@bangumi/client';
import type {
  GroupProfile,
  Pagination,
  ResponseWithPagination,
  Topic,
} from '@bangumi/client/group';

export enum DescriptionClamp {
  clamp = 'clamp',
  unclamp = 'unclamp',
}

export type TopicApiRes = ResponseWithPagination<Topic[]>;

export interface UseGroupRet {
  group: GroupProfile | undefined;
  descriptionClamp: DescriptionClamp;
  setDescriptionClamp: (val: DescriptionClamp) => void;
}

export function useGroupTopic(name: string, { limit = 20, offset = 0 }: Partial<Pagination> = {}) {
  const { data: recentTopicsResp } = useSWR<TopicApiRes>(
    api.getGroupTopicsByGroupName.swrKey({ name }, { limit, offset }),
    api.getGroupTopicsByGroupName.X,
    { suspense: true },
  );

  return recentTopicsResp!;
}

export function useGroup(name: string): UseGroupRet {
  const { data: groupResp } = useSWR(
    api.getGroupProfileByName.swrKey({ name }),
    api.getGroupProfileByName.X,
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
