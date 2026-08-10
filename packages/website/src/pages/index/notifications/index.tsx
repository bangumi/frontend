import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Pagination, Tab, Typography } from '@bangumi/design';
import { ArrowPath } from '@bangumi/icons';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { PageNeedLoginError } from '@bangumi/website/error';
import { useUser } from '@bangumi/website/hooks/use-user';
import { settings } from '@bangumi/website/shared/notifications';

import style from './index.module.less';

const NotificationPageTabs = [
  { key: 'overview', label: '提醒总览', to: '/notifications' },
  // TODO: 短信收发
  // { key: 'msg-sv', label: '短信收发', to: '/msg-sv' },
];

function getNoticeLink(
  setting: (typeof settings)[number],
  mainID: number,
  relatedID: number,
): string {
  const path = setting.url.replace(/^(SITE_URL|DOUJIN_URL)/, '').replace(/\/+$/, '');
  return `${path}/${mainID}${setting.append ?? ''}${setting.anchor}${relatedID}`;
}

function NoticeItem({ notice }: { notice: ozaClient.Notice }) {
  const { id, type, title, mainID, relatedID, sender, createdAt, unread } = notice;

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

      <Typography.Link to={getUserProfileLink(sender.username)}>{sender.nickname}</Typography.Link>

      <span className={style.noticeItemBody}>
        {setting.prefix}
        <Typography.Link
          to={getNoticeLink(setting, mainID, relatedID)}
          onClick={() => {
            ozaClient.clearNotice({
              id: [id],
            });
          }}
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
    <PageContainer as='main'>
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
    </PageContainer>
  );
}

function NotificationPage() {
  const { user, isLoading } = useUser();
  // 等待当前用户信息加载完成，避免首次渲染误判为未登录
  if (isLoading) {
    return null;
  }
  if (!user) {
    throw PageNeedLoginError;
  }

  return <Notifications />;
}

export default withErrorBoundary(NotificationPage);
