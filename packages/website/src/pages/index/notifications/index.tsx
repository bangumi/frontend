import dayjs from 'dayjs';
import { ok } from 'oazapfts';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Pagination, Tab, Typography } from '@bangumi/design';
import { ArrowPath } from '@bangumi/icons';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { PageNeedLoginError } from '@bangumi/website/error';
import { useUser } from '@bangumi/website/hooks/use-user';
import { settings } from '@bangumi/website/shared/notifications';

import style from './index.module.less';

const NotificationPageTabs = [
  { key: 'overview', label: '提醒总览', to: '/notifications' },
  // TODO: 短信收发
  // { key: 'msg-sv', label: '短信收发', to: '/msg-sv' },
];

function NoticeItem({ notice }: { notice: ozaClient.Notice }) {
  const { id, type, title, postID, topicID, sender, createdAt, unread } = notice;

  const setting = settings[type];

  if (!setting) {
    return (
      <div id={`notice_${id}`}>
        <div>{title}</div>
      </div>
    );
  }

  return (
    <div id={`notice_${id}`} className={style.noticeItem}>
      <img src={sender.avatar.small} alt='bgm-notify__avatar' className={style.noticeItemAvatar} />

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
          onClick={() => {
            ozaClient.clearNotice({
              id: [id],
            });
          }}
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
  return { notice: notice?.data ?? [], mutate, total: notice.total };
};

function Notifications() {
  const { notice, mutate, total } = useNotifications();
  const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

  return (
    <>
      <Helmet title='电波提醒' />
      <div className={style.title}>电波提醒</div>
      <div className={style.subtitle}>
        <span>更新于 {updatedAt}</span>
        <ArrowPath
          onClick={() => {
            mutate();
          }}
        />
      </div>
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
        {/* TODO: 筛选 */}
        {/* <Input placeholder='筛选所有提醒...' wrapperClass={style.filterInput} suffix={<Enter />} /> */}
        <Button
          type='secondary'
          className={style.readAllBtn}
          onClick={async () => {
            await ozaClient.clearNotice({
              id: notice.map((x) => x.id),
            });
            await mutate();
          }}
        >
          一键全部已读
        </Button>
      </div>
      {notice.map((x) => (
        <NoticeItem key={x.id} notice={x} />
      ))}
      <div>
        <Pagination total={total} pageSize={20} />
      </div>
    </>
  );
}

function NotificationPage() {
  const { user } = useUser();
  if (!user) {
    throw PageNeedLoginError;
  }

  return <Notifications />;
}

export default withErrorBoundary(NotificationPage);
