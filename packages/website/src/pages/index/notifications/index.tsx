import { ok } from 'oazapfts';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Input, Tab } from '@bangumi/design';
import Notice from '@bangumi/design/components/Notice';
import { Enter } from '@bangumi/icons';
import { useUser } from '@bangumi/website/hooks/use-user';

import style from './index.module.less';

const NotificationPageTabs = [
  { key: 'overview', label: '提醒总览', to: '/notifications' },
  { key: 'msg-sv', label: '短信收发', to: '/msg-sv' },
];

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
      <div className={style.title}>电波提醒</div>
      <div className={style.subtile}>更新于 2022-9-20 10:25</div>
      <div className={style.tab}>
        <Tab.Group type='borderless'>
          {NotificationPageTabs.map((item) => (
            <NavLink to={item.to} key={item.key}>
              {({ isActive }) => <Tab.Item isActive={isActive}>{item.label}</Tab.Item>}
            </NavLink>
          ))}
        </Tab.Group>
      </div>

      <div className='flex justify-between'>
        <Input placeholder='筛选所有提醒...' wrapperClass={style.filterInput} suffix={<Enter />} />
        <Button type='secondary' className={style.readAllBtn}>
          一键全部已读
        </Button>
      </div>

      {notice.length === 0
        ? '暂无信息'
        : notice.map((x) => <Notice key={x.id} {...x} onClose={onClose} />)}
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
