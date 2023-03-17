/**
 * 没有具体的设计稿，所以只是提供基础功能
 *
 * TODO: clear notify
 */

import { ok } from 'oazapfts';
import React from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import Notice from '@bangumi/design/components/Notice';
import { useUser } from '@bangumi/website/hooks/use-user';

const useNotifications = () => {
  const { data: notice, mutate } = useSWR(`listNotice`, async () => ok(ozaClient.listNotice()), {
    suspense: true,
  });
  return { notice: notice?.data ?? [], mutate };
};

const Page: React.FC = () => {
  const { notice, mutate } = useNotifications();

  const onClose = async (id: number) => {
    console.log('clear notify', id);
    await ozaClient.clearNotice({
      id: [id],
    });
    await mutate();
  };

  return (
    <div>
      {notice.map((x) => (
        <Notice key={x.id} {...x} onClose={onClose} />
      ))}
    </div>
  );
};

const NotificationPage: React.FC = () => {
  const { user } = useUser();
  if (!user) {
    return <div>PLEASE LOGIN FIRST</div>;
  }

  return <Page />;
};

export default NotificationPage;
