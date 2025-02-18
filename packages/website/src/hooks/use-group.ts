import { ok } from '@oazapfts/runtime';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Group } from '@bangumi/client/client';

export interface UseGroupRet {
  group: Group;
  descriptionCollapsed: boolean;
  setDescriptionCollapsed: (val: boolean) => void;
}

type DescriptionCollapseConfig = Record<string, boolean>;

export function useGroup(name: string): UseGroupRet {
  const { data: groupResp } = useSWR(`/group/${name}`, async () => ok(ozaClient.getGroup(name)), {
    suspense: true,
  });

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

  const setDescriptionCollapseConfig = useCallback((name: string, collapsed: boolean) => {
    const config = getDescriptionCollapseConfig();
    localStorage.setItem(collapseKey, JSON.stringify({ ...config, [name]: collapsed }));
  }, []);

  const collapseKey = 'doesGroupDescriptionNeedCollapse';
  const collapseConfig = getDescriptionCollapseConfig();
  const descriptionCollapse = collapseConfig[name] ?? false;
  const [descriptionCollapsedState, setDescriptionCollapsedState] =
    useState<boolean>(descriptionCollapse);

  useEffect(() => {
    setDescriptionCollapseConfig(name, descriptionCollapsedState);
  }, [name, descriptionCollapsedState, setDescriptionCollapseConfig]);

  return {
    group: groupResp,
    descriptionCollapsed: descriptionCollapsedState,
    setDescriptionCollapsed(val) {
      setDescriptionCollapsedState(val);
    },
  };
}
