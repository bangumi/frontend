import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { User } from '@bangumi/client/client';

export function useNotify(user: User | undefined) {
  const [noticeCount, setNoticeCount] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    console.log('new websocket');
    const ws = io(location.host, {
      path: '/p1/socket-io/',
    });

    ws.on('notify', (event: string) => {
      const { count } = JSON.parse(event) as { count: number };
      setNoticeCount(count);
    });

    const reconnect = () => {
      setTimeout(() => {
        ws.connect();
      }, 5000);
    };

    ws.on('disconnect', reconnect);

    setSocket(ws);
    return () => {
      console.log('close connection');
      ws.removeListener('disconnect', reconnect);
      ws.disconnect();
    };
  }, [user]);

  return { noticeCount };
}
