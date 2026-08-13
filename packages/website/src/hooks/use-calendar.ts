import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Calendar } from '@bangumi/client/client';

/** 每日放送（GET /p1/calendar，按星期 1-7 分组） */
export function useCalendar(): { calendar: Calendar | undefined } {
  const { data } = useSWR('calendar', async () => ok(ozaClient.getCalendar()), {
    suspense: true,
  });
  return { calendar: data };
}
