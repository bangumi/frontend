import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { User } from '@bangumi/client/client';
import { Avatar } from '@bangumi/design';
import { getUserCollectionsLink, getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useUser } from '@bangumi/website/hooks/use-user';

import styles from './UserHeader.module.less';

const PROFILE_TABS = [
  { label: '时光机', getLink: (username: string) => getUserProfileLink(username) },
  { label: '收藏', getLink: (username: string) => getUserCollectionsLink('anime', username) },
  { label: '时间胶囊', getLink: (username: string) => `/user/${username}/timeline` },
  { label: '人物', getLink: (username: string) => `/user/${username}/mono` },
  { label: '日志', getLink: (username: string) => `/user/${username}/blog` },
  { label: '目录', getLink: (username: string) => `/user/${username}/index` },
  { label: '小组', getLink: (username: string) => `/user/${username}/groups` },
  { label: '好友', getLink: (username: string) => `/user/${username}/friends` },
  { label: '维基', getLink: (username: string) => `/user/${username}/wiki` },
  { label: '天窗', getLink: (username: string) => `/user/${username}/doujin` },
] as const;

const UserHeader: React.FC<{ user: User }> = ({ user }) => {
  const { user: currentUser } = useUser();
  const { pathname } = useLocation();
  const isSelf = currentUser?.username === user.username;
  const profileLink = getUserProfileLink(user.username);
  const isProfileHome = pathname === profileLink || pathname === `${profileLink}/`;

  return (
    <header className={styles.header}>
      <PageContainer gutterOnly className={styles.profile}>
        <Avatar
          src={user.avatar.large}
          size='large'
          alt={`${user.nickname} 头像`}
          wrapperClass={styles.avatar}
        />
        <div className={styles.nameRow}>
          <span className={styles.nickname}>{user.nickname}</span>
          <span className={styles.username}>@{user.username}</span>
        </div>
        {isSelf && (
          <a className={styles.editBtn} href='/settings/profile'>
            修改资料
          </a>
        )}
      </PageContainer>
      <div className={styles.tabBar}>
        <PageContainer as='nav' gutterOnly className={styles.tabNav} aria-label='用户主页导航'>
          <ul className={styles.tabs}>
            {PROFILE_TABS.map(({ label, getLink }, index) => {
              const link = getLink(user.username);
              const isActive = index === 0 ? isProfileHome : pathname.startsWith(link);
              return (
                <li key={label} className={isActive ? styles.tabActive : undefined}>
                  <Link to={link}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </PageContainer>
      </div>
    </header>
  );
};

export default UserHeader;
