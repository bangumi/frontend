import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { User } from '@bangumi/client/client';

let socket: Socket | null;
export function useNotify(user: User | undefined) {
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!socket) {
      socket = io(location.host, {
        path: '/p1/socket-io/',
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionDelayMax: 10000,
        transports: ['websocket', 'polling'],
      });

      socket.on('notify', (event: string) => {
        const { count } = JSON.parse(event) as { count: number };
        // TODO: reset title when count is 0
        document.title = `(${count})...${document.title}`;
        setNoticeCount(count);
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [user]);

  return { noticeCount };
}
