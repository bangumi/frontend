import { useEffect, useState } from 'react';

import type { User } from '@bangumi/client/client';

export function useNotify(user: User | undefined) {
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    console.log('new websocket');
    const source = new EventSource('/p1/sse/notify');

    source.addEventListener('notify-change', ({ data }: { data: string }) => {
      const { count } = JSON.parse(data) as { count: number };
      setNoticeCount(count);
    });

    return () => {
      console.log('close connection');
      source.close();
    };
  }, [user]);

  return { noticeCount };
}
