import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Pagination, Tab, Typography } from '@bangumi/design';
import { ArrowPath } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { PageNeedLoginError } from '@bangumi/website/error';
import { useUser } from '@bangumi/website/hooks/use-user';
import { settings } from '@bangumi/website/shared/notifications';

const pageTitle = css({
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '34px',
  color: '#1f1c1c',
});

const subtitle = css({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  height: '22px',
  color: '#9f9b9b',
  '& > svg': { cursor: 'pointer' },
});

const tab = css({
  marginTop: '24px',
  marginBottom: '20px',
});

const readAllBtn = css({ height: '34px' });

const filter = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
});

const filterInput = css({ height: '34px' });

const noticeItem = css({
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  gap: '10px',
  borderBottom: '1px dashed #e8e3e3',
  color: '#595555',
  '& a, & span': { whiteSpace: 'nowrap' },
  '& a': { fontWeight: '600' },
});

const noticeItemAvatar = css({
  height: '30px',
  width: '30px',
  borderRadius: '6px',
});

const noticeItemBody = css({
  display: 'flex',
  gap: '4px',
  maxWidth: '60%',
});

const noticeItemBodyContent = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const noticeItemDate = css({ color: '#e8e3e3' });

const noticeItemRedDot = css({
  width: '12px',
  height: '12px',
  borderRadius: '9999px',
  marginLeft: 'auto',
  marginRight: '4px',
  background: '#f97f77',
});

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

  const noticeLink = getNoticeLink(setting, mainID, relatedID);

  return (
    <div id={`notice_${id}`} className={noticeItem}>
      <img src={sender.avatar.small} alt='bgm-notify__avatar' className={noticeItemAvatar} />

      <Typography.Link to={getUserProfileLink(sender.username)}>{sender.nickname}</Typography.Link>

      <span className={noticeItemBody}>
        {setting.prefix}
        <Typography.Link
          to={noticeLink}
          isExternal={noticeLink.startsWith('http')}
          onClick={() => {
            ozaClient.clearNotice({
              id: [id],
            });
          }}
          className={noticeItemBodyContent}
        >
          {setting.inner ?? title}
        </Typography.Link>
        {setting.suffix}
      </span>

      <span className={noticeItemDate}>@{dayjs.unix(createdAt).format('YYYY-MM-DD HH:mm')}</span>

      {unread && <span className={noticeItemRedDot} />}
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
      <div className={pageTitle}>电波提醒</div>
      <div className={subtitle}>
        <span>更新于 {updatedAt}</span>
        <ArrowPath
          onClick={() => {
            mutate();
          }}
        />
      </div>
      <div className={tab}>
        <Tab.Group type='borderless'>
          {NotificationPageTabs.map((item) => (
            <NavLink to={item.to} key={item.key}>
              {({ isActive }) => <Tab.Item isActive={isActive}>{item.label}</Tab.Item>}
            </NavLink>
          ))}
        </Tab.Group>
      </div>

      <div className={filter}>
        {/* TODO: 筛选 */}
        {/* <Input placeholder='筛选所有提醒...' wrapperClass={filterInput} suffix={<Enter />} /> */}
        <Button
          type='secondary'
          className={readAllBtn}
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
