import type { PropsWithChildren } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import type { GroupProfile } from '@bangumi/client/group';
import { Button, Layout, Section, Tab } from '@bangumi/design';
import { ArrowRightCircle } from '@bangumi/icons';
import { keyBy } from '@bangumi/utils';
import { useUser } from '@bangumi/website/hooks/use-user';

import { GroupHeader } from './GroupHeader';
import styles from './GroupLayout.module.less';
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

type IGroupLayoutProps = PropsWithChildren<{
  group: GroupProfile | undefined;
  groupName: string;
}>;

const GroupLayout: React.FC<IGroupLayoutProps> = ({ group, children, groupName }) => {
  const { user } = useUser();

  return (
    <div className={styles.pageContainer}>
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
                  <Button.Link type='plain' to={groupTabsByKey.members.to(group.group.name)}>
                    更多小组成员
                    <ArrowRightCircle />
                  </Button.Link>
                )
              }
            >
              <div className={styles.newMembers}>
                {group?.recentAddedMembers.slice(0, 10).map((member) => {
                  return (
                    <UserCard
                      user={{
                        ...member,
                        avatar: member.avatar.large,
                      }}
                      key={member.id}
                    />
                  );
                })}
              </div>
            </Section>
          </>
        }
      />
    </div>
  );
};

export default GroupLayout;
