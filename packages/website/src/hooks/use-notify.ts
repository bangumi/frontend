import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import type { User } from '@bangumi/client/client';

let socket: Socket | null;
export function useNotify(user: User | undefined) {
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    // TODO: reset title when count is 0
    if (noticeCount > 0) {
      document.title = `(${noticeCount})...${document.title}`;
    }
    // 正常来说，document.title 变成不会触发 rerender，这个 effect 也不会重新运行
    // 但现在 useNotify 只在 Header 使用，而 Header 使用了 react-router 的 hook，当路由变化时
    // Header 会 rerender，使得该 effect 有重新执行的机会。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeCount, document.title]);

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
        // if (noticeCount) {
        // document.title = `(${noticeCount})...${document.title}`;
        // }
        setNoticeCount(count);
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [user]);

  return { noticeCount };
}
