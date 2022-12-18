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
  const { data: notice } = useSWR(`listNotice`, async () => ok(ozaClient.listNotice()), {
    suspense: true,
  });
  return notice?.data ?? [];
};

const SubjectPage: React.FC = () => {
  const { user } = useUser();
  if (!user) {
    return <div>PLEASE LOGIN FIRST</div>;
  }

  const notice = useNotifications();

  console.log(notice);

  return (
    <div>
      {notice.map((x) => (
        <Notice key={x.id} {...x} />
      ))}
    </div>
  );
};

export default SubjectPage;
