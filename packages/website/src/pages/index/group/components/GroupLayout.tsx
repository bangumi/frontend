import type { PropsWithChildren } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import type { GroupProfile } from '@bangumi/client/group';
import { Layout, Section, Tab } from '@bangumi/design';
import { keyBy } from '@bangumi/utils';
import { ReactComponent as RightArrow } from '@bangumi/website/assets/right-arrow.svg';
import { NavLink } from '@bangumi/website/components/Link';

import CommonStyles from '../common.module.less';
import { GroupHeader } from './GroupHeader';
import styles from './GroupLayout.module.less';
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
    to: (groupName: string) => `/group/${groupName}`,
  },
  {
    key: GroupTabs.Forum,
    label: '小组讨论',
    to: (groupName: string) => `/group/${groupName}/forum`,
  },
  {
    key: GroupTabs.Members,
    label: '小组成员',
    to: (groupName: string) => `/group/${groupName}/members`,
  },
];
const groupTabsByKey = keyBy(GroupTabsItems, 'key');

type IGroupLayoutProps = PropsWithChildren<{
  group: GroupProfile | undefined;
  groupName: string;
}>;

const GroupLayout: React.FC<IGroupLayoutProps> = ({ group, children, groupName }) => {
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
          <Section
            title='最近加入'
            renderFooter={() =>
              group && (
                <Link
                  to={groupTabsByKey.members.to(group.group.name)}
                  className={CommonStyles.textButton}
                >
                  <span>更多小组成员</span>
                  <RightArrow />
                </Link>
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
        }
      />
    </div>
  );
};

export default GroupLayout;
