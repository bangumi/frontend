import type { PropsWithChildren } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import type { GroupProfile } from '@bangumi/client/group';
import { Section, Tab, Layout } from '@bangumi/design';
import { keyBy } from '@bangumi/utils';
import { ReactComponent as RightArrow } from '@bangumi/website/assets/right-arrow.svg';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';

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
  curTab: GroupTabs;
  groupName: string;
}>;

const GroupLayout: React.FC<IGroupLayoutProps> = ({ group, children, curTab, groupName }) => {
  const [, navigate] = useTransitionNavigate();
  return (
    <div className={styles.pageContainer}>
      <GroupHeader group={group!} />
      <Tab
        type='borderless'
        items={GroupTabsItems}
        activeKey={curTab}
        onChange={(_, value) => navigate(value.to(groupName))}
      />
      <Layout
        type='alpha'
        leftChildren={children}
        rightChildren={
          <Section
            title='最近加入'
            renderFooter={() =>
              group && (
                <Link
                  to={groupTabsByKey.members.to(group.name)}
                  className={CommonStyles.textButton}
                >
                  <span>更多小组成员</span>
                  <RightArrow />
                </Link>
              )
            }
          >
            <div className={styles.newMembers}>
              {group?.new_members.slice(0, 10).map((member) => {
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
