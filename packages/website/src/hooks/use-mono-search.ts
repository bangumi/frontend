import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SlimCharacter, SlimPerson } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

const PAGE_SIZE = 15;

/** 角色搜索；keyword 为 null 时不发起请求 */
export function useCharacterSearch(keyword: string | null, offset: number) {
  const { data } = useSWR(
    keyword === null ? null : ['character-search', keyword, offset],
    async () =>
      ok(ozaClient.searchCharacters({ keyword: keyword as string }, { limit: PAGE_SIZE, offset })),
    { keepPreviousData: true, suspense: true },
  );

  return { characters: data?.data ?? [], total: data?.total ?? 0 };
}

/** 人物搜索（可按职业过滤）；keyword 为 null 时不发起请求 */
export function usePersonSearch(
  keyword: string | null,
  career: string | undefined,
  offset: number,
) {
  const { data } = useSWR(
    keyword === null ? null : ['person-search', keyword, career, offset],
    async () =>
      ok(
        ozaClient.searchPersons(
          { keyword: keyword as string, filter: career ? { career: [career] } : undefined },
          { limit: PAGE_SIZE, offset },
        ),
      ),
    { keepPreviousData: true, suspense: true },
  );

  return { persons: data?.data ?? [], total: data?.total ?? 0 };
}

export type { SlimCharacter, SlimPerson };
