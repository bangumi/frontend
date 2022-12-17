import { useEffect, useState } from 'react';

import type { User } from '@bangumi/client/client';
import { wsURL } from '@bangumi/utils';

const notifySubscribeURL = wsURL('/p1/sub/notify');

export function useNotify(user: User | undefined) {
  const [noticeCount, setNoticeCount] = useState(0);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log('new websocket');
    const ws = new WebSocket(notifySubscribeURL);
    ws.onmessage = function (event) {
      const { count } = JSON.parse(event.data as string) as { count: number };
      setNoticeCount(count);
    };

    ws.onclose = function (event) {
      setTimeout(() => {
        setWebSocket(new WebSocket(notifySubscribeURL));
      }, 5000);
    };
    return () => {
      webSocket?.close();
    };
  }, [user]);

  return { noticeCount };
}
