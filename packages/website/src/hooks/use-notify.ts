import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import type { User } from '@bangumi/client/client';

export function useNotify(user: User | undefined) {
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    const ws = io(location.host, {
      path: '/p1/socket-io/',
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
    });

    ws.on('notify', (event: string) => {
      const { count } = JSON.parse(event) as { count: number };
      console.log('new notice:', count);
      // setNoticeCount(count);
    });

    ws.on('connect_error', () => {
      // fallback to polling in netlify env
      ws.io.opts.transports = ['polling', 'websocket'];
    });

    // setSocket(ws);
    return () => {
      ws.disconnect();
    };
  }, [user]);

  return { noticeCount };
}
