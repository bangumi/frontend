import dayjs from 'dayjs';
import { ok } from 'oazapfts';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { INotice } from '@bangumi/client/user';
import { Button, Input, Tab, Typography } from '@bangumi/design';
import { Enter } from '@bangumi/icons';
import { useUser } from '@bangumi/website/hooks/use-user';
import { _settings } from '@bangumi/website/shared/notifications';

import style from './index.module.less';

const NotificationPageTabs = [
  { key: 'overview', label: '提醒总览', to: '/notifications' },
  { key: 'msg-sv', label: '短信收发', to: '/msg-sv' },
];

function NoticeItem({ notice }: { notice: INotice }) {
  const { id, type, title, postID, topicID, sender, createdAt, unread } = notice;

  const setting = _settings[type];

  if (!setting) {
    return (
      <div id={`notice_${id}`}>
        <div>{title}</div>
      </div>
    );
  }

  return (
    <div id={`notice_${id}`} className={style.noticeItem}>
      {/* <img src={sender.avatar.small} alt='bgm-notify__avatar' /> */}
      <img
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAFdSURBVGhD7ZvBjYMwEEXdADRAb9AA1AF1QB3QADRANbP8IVEMO8nuSnvAn4n0pGBji4c9Nodx2H7yjizLpGkaGYZBpmmSdV0vybIs+oxVVUlRFKZLxPdCNEIHVucp0HXdJ/FjAd4S3pjVUUrM8yxlWR7cHrwuMH2txikDp9hxY/+DkbUaMHAa6T1mGabxOzC9o5gOGuTWjUxgEVZhmFs3MIJtNjDH7pm6riWkvN/+FZ3WzIvVGXwtBquCGRdmx4XZcWF2XJgdF2bHhdlxYXZcmB0XZseF2XFhdlyYHRdmx4XZcWF2XJgdF2bHhdm5n/CVE7//G+Rc3ioxre97CUjHsyoZ0TTiPM/NSkYeKcQh6fMNv6Vt21e+NHuCONwOCeLgVkcAnjAuYJojHTluHC5ojvHA4cdjPE8w3xHkVkcpgP02itkzZqGCRhhxdHDlUR/HUZ8R01fPNRguO0G+AMzbjzhgCRfaAAAAAElFTkSuQmCC'
        className={style.noticeItemAvatar}
        alt=''
      />

      <Typography.Link
        to={`https://bgm.tv/user/${sender.username}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {sender.nickname}
      </Typography.Link>

      <span className={style.noticeItemBody}>
        {setting.prefix}
        <Typography.Link
          to={`${setting.url}/${topicID}${setting.append ?? ''}${setting.anchor}${postID}`}
          target='_blank'
          rel='noopener noreferrer'
          className={style.noticeItemBodyContent}
        >
          {setting.inner ?? title}
        </Typography.Link>
        {setting.suffix}
      </span>

      <span className={style.noticeItemDate}>
        @{dayjs.unix(createdAt).format('YYYY-MM-DD HH:mm')}
      </span>

      {unread && <span className={style.noticeItemRedDot} />}
    </div>
  );
}

const useNotifications = () => {
  const { data: notice, mutate } = useSWR(`listNotice`, async () => ok(ozaClient.listNotice()), {
    suspense: true,
  });
  return { notice: notice?.data ?? [], mutate };
};

function Notifications() {
  const { notice, mutate } = useNotifications();

  const onClose = async (id: number) => {
    console.log('clear notify', id);
    await ozaClient.clearNotice({
      id: [id],
    });
    await mutate();
  };

  return (
    <>
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

      <div className={style.filter}>
        <Input placeholder='筛选所有提醒...' wrapperClass={style.filterInput} suffix={<Enter />} />
        <Button
          type='secondary'
          className={style.readAllBtn}
          onClick={async () => {
            await ozaClient.clearNotice({});
            await mutate();
          }}
        >
          一键全部已读
        </Button>
      </div>

      {notice.length === 0 ? '暂无信息' : notice.map((x) => <NoticeItem key={x.id} notice={x} />)}
    </>
  );
}

function NotificationPage() {
  const { user } = useUser();
  if (!user) {
    return <div>PLEASE LOGIN FIRST</div>;
  }

  return <Notifications />;
}

export default NotificationPage;
