import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Tab } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { PageNeedLoginError } from '@bangumi/website/error';
import { useUser } from '@bangumi/website/hooks/use-user';

import type { PMFolder } from '../types';
import { ConversationList } from './ConversationList';

const header = css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' });

const title = css({ fontWeight: '600', fontSize: '24px', lineHeight: '34px', color: '#1f1c1c' });

const tab = css({ marginTop: '24px', marginBottom: '12px' });

const tabs = [
  { key: 'inbox', label: '收件箱', to: '/pm' },
  { key: 'outbox', label: '发件箱', to: '/pm/outbox' },
];

export function PmListPage({ folder }: { folder: PMFolder }): React.ReactElement {
  const { user, isLoading } = useUser();
  // 等待当前用户信息加载完成，避免首次渲染误判为未登录
  if (isLoading) {
    return <></>;
  }
  if (!user) {
    throw PageNeedLoginError;
  }

  return (
    <PageContainer as='main'>
      <Helmet title={folder === 'inbox' ? '收件箱' : '发件箱'} />
      <div className={header}>
        <div className={title}>私信</div>
        <Button.Link to='/pm/compose' size='medium'>
          写信
        </Button.Link>
      </div>
      <div className={tab}>
        <Tab.Group type='borderless'>
          {tabs.map((item) => (
            <NavLink to={item.to} key={item.key}>
              {({ isActive }) => <Tab.Item isActive={isActive}>{item.label}</Tab.Item>}
            </NavLink>
          ))}
        </Tab.Group>
      </div>
      <ConversationList folder={folder} />
    </PageContainer>
  );
}
