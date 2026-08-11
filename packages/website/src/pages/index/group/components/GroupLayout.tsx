import type { PropsWithChildren } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import type { Group } from '@bangumi/client/client';
import { Button, Layout, Section, Tab } from '@bangumi/design';
import { ArrowRightCircle } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';
import { keyBy } from '@bangumi/utils';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useGroupMembers } from '@bangumi/website/hooks/use-group-members';
import { useUser } from '@bangumi/website/hooks/use-user';

import { GroupHeader } from './GroupHeader';
import GroupNavigation from './GroupNavigation';
import { UserCard } from './UserCard';

export enum GroupTabs {
  Index = 'index',
  Forum = 'forum',
  Members = 'members',
}

const GroupTabsItems = [
  {
    key: GroupTabs.Index,
    label: '小组概览',
    to: (groupName = '') => `/group/${groupName}`,
  },
  {
    key: GroupTabs.Forum,
    label: '小组讨论',
    to: (groupName = '') => `/group/${groupName}/forum`,
  },
  {
    key: GroupTabs.Members,
    label: '小组成员',
    to: (groupName = '') => `/group/${groupName}/members`,
  },
];
const groupTabsByKey = keyBy(GroupTabsItems, 'key');

const pageContainer = css({
  '& > *': {
    marginBottom: '10px',
  },
});

const newMembers = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  columnGap: '30px',
  rowGap: '15px',
});

type IGroupLayoutProps = PropsWithChildren<{
  group: Group | undefined;
  groupName: string;
}>;

const GroupLayout: React.FC<IGroupLayoutProps> = ({ group, children, groupName }) => {
  const { user } = useUser();
  const { data: members } = useGroupMembers(groupName, {
    limit: 10,
    offset: 0,
  });

  return (
    <PageContainer className={pageContainer}>
      <GroupHeader group={group!} />
      <Tab.Group type='borderless'>
        {GroupTabsItems.map((tab) => (
          <NavLink to={tab.to(groupName)} key={tab.key} end>
            {({ isActive }) => <Tab.Item isActive={isActive}>{tab.label}</Tab.Item>}
          </NavLink>
        ))}
      </Tab.Group>
      <Layout
        type='alpha'
        leftChildren={children}
        rightChildren={
          <>
            {user && group && <GroupNavigation group={group} />}
            <Section
              title='最近加入'
              renderFooter={() =>
                group && (
                  <Button.Link type='plain' to={groupTabsByKey.members.to(group.name)}>
                    更多小组成员
                    <ArrowRightCircle />
                  </Button.Link>
                )
              }
            >
              <div className={newMembers}>
                {members?.map((member) => {
                  return (
                    <UserCard
                      user={{
                        nickname: member.user?.nickname ?? '',
                        username: member.user?.username ?? '',
                        avatar: member.user?.avatar.large ?? '',
                      }}
                      key={member.uid}
                    />
                  );
                })}
              </div>
            </Section>
          </>
        }
      />
    </PageContainer>
  );
};

export default GroupLayout;
