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
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
    });

    ws.on('notify', (event: string) => {
      const { count } = JSON.parse(event) as { count: number };
      setNoticeCount(count);
    });

    ws.on('connect_error', () => {
      // fallback to polling in netlify env
      ws.io.opts.transports = ['polling', 'websocket'];
    });

    setSocket(ws);
    return () => {
      console.log('close connection');
      ws.disconnect();
    };
  }, [user]);

  return { noticeCount };
}
