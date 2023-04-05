import type { PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { useUser } from '@bangumi/website/hooks/use-user';

let socket: Socket | null;

interface NoticeContextType {
  noticeCount: number;
}

const NoticeContext = React.createContext<NoticeContextType>(null!);

export const NoticeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();
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
        transports: ['websocket'],
      });

      socket.on('notify', (event: string) => {
        const { count } = JSON.parse(event) as { count: number };
        setNoticeCount(count);
      });

      socket.on('connect_error', () => {
        // fallback to polling in netlify env
        if (socket) {
          socket.io.opts.transports = ['polling', 'websocket'];
        }
      });
    }

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [user, setNoticeCount]);

  const value: NoticeContextType = {
    noticeCount,
  };

  return <NoticeContext.Provider value={value}> {children} </NoticeContext.Provider>;
};

export function useNotify(): NoticeContextType {
  return React.useContext(NoticeContext) ?? { noticeCount: 0 };
}
