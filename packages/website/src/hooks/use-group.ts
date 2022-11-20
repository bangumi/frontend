import { useState, useEffect } from 'react';
import useSWR from 'swr';

import type { GroupProfile, ResponseWithPagination, Topic, Pagination } from '@bangumi/types/group';

import type { RequestError } from '../api/request';
import { privateGet } from '../api/request';

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

export function useGroupTopic(name: string, pagination?: Partial<Pagination>) {
  const params = new URLSearchParams();
  if (pagination) {
    const { limit = 20, offset = 0 } = pagination;
    params.append('offset', offset.toString());
    params.append('limit', limit.toString());
  }

  const { data: recentTopicsResp } = useSWR<TopicApiRes, RequestError>(
    `/p/groups/${name}/topics?${params.toString()}`,
    privateGet,
    { suspense: true },
  );
  return recentTopicsResp!;
}

export function useGroup(name: string): UseGroupRet {
  const { data: groupResp } = useSWR<GroupProfile>(`/p/groups/${name}`, privateGet, {
    suspense: true,
  });
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
