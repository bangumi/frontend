import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { User } from '@bangumi/client/client.ts';
import { Avatar } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getUserCollectionsLink, getUserProfileLink } from '@bangumi/utils/pages.ts';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

const header = css({
  position: 'relative',
  marginBottom: '0',
});

const profile = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  height: '84px',
  '@media (max-width: 768px)': { height: '72px' },
  '@media (max-width: 640px)': { gap: '10px' },
});

// &[class] 提升优先级，覆盖 design Avatar 的默认圆角/尺寸（同层内同级特异性顺序不可控）
const avatar = css({
  '&[class]': {
    zIndex: '1',
    alignSelf: 'flex-start',
    flex: '0 0 120px',
    width: '120px',
    height: '120px',
    overflow: 'hidden',
    border: '1px solid #e8e3e3',
    borderRadius: '50%',
    background: '#fff',
    marginTop: '8px',
  },
  '&[class] img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  '@media (max-width: 768px)': {
    '&[class]': {
      flexBasis: '64px',
      width: '64px',
      height: '64px',
    },
  },
});

const nameRow = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  minWidth: '0',
  '@media (max-width: 640px)': { display: 'block' },
});

const nickname = css({
  overflow: 'hidden',
  color: '#1f1c1c',
  fontSize: '22px',
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media (max-width: 768px)': { fontSize: '18px' },
});

const username = css({
  color: '#9f9b9b',
  fontSize: '16px',
  whiteSpace: 'nowrap',
  '@media (max-width: 768px)': { fontSize: '14px' },
  '@media (max-width: 640px)': { display: 'block', marginTop: '2px' },
});

const editBtn = css({
  flex: 'none',
  marginLeft: 'auto',
  padding: '7px 16px',
  border: '1px solid #e8e3e3',
  borderRadius: '18px',
  background: '#fff',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
  color: '#595555',
  fontSize: '15px',
  textDecoration: 'none',
  '@media (max-width: 768px)': {
    padding: '5px 10px',
    fontSize: '13px',
  },
});

const tabBar = css({
  height: '52px',
  borderBottom: '1px solid #e8e3e3',
  background: '#fafafa',
  '@media (max-width: 768px)': { height: '46px' },
});

const tabNav = css({
  height: '100%',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

const tabs = css({
  display: 'flex',
  alignItems: 'stretch',
  gap: '5px',
  width: 'max-content',
  height: '100%',
  margin: '0 0 0 132px',
  padding: '0',
  listStyle: 'none',
  '& li': { height: '100%' },
  '& a': {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 14px',
    boxSizing: 'border-box',
    color: '#595555',
    fontSize: '16px',
    textDecoration: 'none',
  },
  '@media (max-width: 768px)': {
    // 头像 64px + 容器 padding 16px
    marginLeft: '80px',
    '& a': {
      padding: '0 12px',
      fontSize: '14px',
    },
  },
  '@media (max-width: 640px)': { marginLeft: '0' },
});

const tabActive = css({
  '& a': {
    color: '#f09199',
    borderBottom: '2px solid #f09199',
  },
});

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
    <header className={header}>
      <PageContainer gutterOnly className={profile}>
        <Avatar
          src={user.avatar.large}
          size='large'
          alt={`${user.nickname} 头像`}
          wrapperClass={avatar}
        />
        <div className={nameRow}>
          <span className={nickname}>{user.nickname}</span>
          <span className={username}>@{user.username}</span>
        </div>
        {isSelf && (
          <a className={editBtn} href='/settings/profile'>
            修改资料
          </a>
        )}
      </PageContainer>
      <div className={tabBar}>
        <PageContainer as='nav' gutterOnly className={tabNav} aria-label='用户主页导航'>
          <ul className={tabs}>
            {PROFILE_TABS.map(({ label, getLink }, index) => {
              const link = getLink(user.username);
              const isActive = index === 0 ? isProfileHome : pathname.startsWith(link);
              return (
                <li key={label} className={isActive ? tabActive : undefined}>
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
