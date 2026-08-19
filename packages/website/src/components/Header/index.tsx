import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Input, Menu } from '@bangumi/design';
import { Notification, Search as SearchIcon } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';
import { UnreadableCodeError } from '@bangumi/utils';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { useNotify } from '@bangumi/website/hooks/use-notify';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Musume1 } from '../../assets/musume_1.svg';
import { ReactComponent as Musume2 } from '../../assets/musume_2.svg';
import { ReactComponent as Musume3 } from '../../assets/musume_3.svg';
import { ReactComponent as Musume4 } from '../../assets/musume_4.svg';
import { useUser } from '../../hooks/use-user';
import { channelSubMenu, exploreSubMenu, groupSubMenu, monoSubMenu } from './SubMenu';

// todo: SVG Sprites

/* 原站 a.top_lite（超展开）字重较轻 */
const navLiteItem = css({
  fontWeight: '400',
});

/** 构建顶部导航（登录后下拉追加「我X」组，对齐原站 navMenuNeue 结构） */
const buildNavLeft = (username?: string) => [
  {
    key: 'animation',
    label: '动画',
    href: '/anime',
    subMenu: channelSubMenu('anime', username),
  },
  {
    key: 'book',
    label: '书籍',
    href: '/book',
    subMenu: channelSubMenu('book', username),
  },
  {
    key: 'music',
    label: '音乐',
    href: '/music',
    subMenu: channelSubMenu('music', username),
  },
  {
    key: 'game',
    label: '游戏',
    href: '/game',
    subMenu: channelSubMenu('game', username),
  },
  {
    key: 'drama',
    label: '三次元',
    href: '/real',
    subMenu: channelSubMenu('real', username),
  },
];

const buildNavRight = (username?: string) => [
  {
    key: 'mono',
    label: '人物',
    subMenu: monoSubMenu(username),
  },
  {
    key: 'rakuen',
    label: '超展开',
    href: '/rakuen',
    className: navLiteItem,
  },
  {
    key: 'group',
    label: '小组',
    href: '/group',
    subMenu: groupSubMenu(username),
  },
  {
    key: 'explore',
    label: '探索',
    subMenu: exploreSubMenu,
  },
];

type MobilePanel = 'closed' | 'menu' | 'search';

const searchCategories = [
  { value: 'all', label: '全部' },
  { value: '2', label: '动画' },
  { value: '1', label: '书籍' },
  { value: '4', label: '游戏' },
  { value: '3', label: '音乐' },
  { value: '6', label: '三次元' },
  { value: 'mono', label: '人物' },
] as const;

/** 根据当前路径推导频道导航的高亮 key，与原站 a.focus 行为对齐 */
const getActiveNavKey = (pathname: string): string | undefined => {
  const channelEntries: Array<[string, string]> = [
    ['/anime', 'animation'],
    ['/book', 'book'],
    ['/music', 'music'],
    ['/game', 'game'],
    ['/real', 'drama'],
  ];
  for (const [prefix, key] of channelEntries) {
    if (pathname.startsWith(prefix)) {
      return key;
    }
  }
  if (pathname.startsWith('/rakuen')) {
    return 'rakuen';
  }
  if (pathname.startsWith('/group')) {
    return 'group';
  }
  if (
    pathname.startsWith('/mono') ||
    pathname.startsWith('/character') ||
    pathname.startsWith('/person')
  ) {
    return 'mono';
  }
  return undefined;
};

/* 与原站 #headerNeue2 对齐：50px 高度、浅灰渐变底、底部 1px 边框 */
const container = css({
  position: 'relative',
  zIndex: '5000',
  height: '50px',
  boxSizing: 'border-box',
  backgroundColor: 'bgmNavBg',
  backgroundImage: 'linear-gradient(rgba(252, 252, 252, 0.9), rgba(250, 250, 249, 0.9))',
  borderBottom: '1px solid token(colors.bgmNavBorder)',
  boxShadow: '0 0 0 1px rgba(250, 250, 250, 0.8)',
});

const main = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  maxWidth: '1200px',
  boxSizing: 'border-box',
  padding: '2px 10px 0',
  margin: '0 auto',
  /* 移动端保留新站既有的 5px 紧凑间距 */
  smDown: { padding: '0 5px' },
});

const headerLeft = css({ minWidth: '0', display: 'flex', alignItems: 'center' });

const logo = css({
  position: 'relative',
  flexShrink: '0',
  width: '150px',
  height: '50px',
  marginRight: '10px',
});

const musume = css({
  position: 'absolute',
  bottom: '0',
  width: '44px',
  height: '44px',
});

const textLogo = css({
  position: 'absolute',
  top: '6px',
  right: '0',
  width: '100px',
  height: '30px',
});

/* 与原站 .menuCompact 对齐的移动端菜单按钮 */
const mobileMenuToggle = css({
  display: 'none',
  smDown: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 40px',
    width: '40px',
    height: '32px',
    padding: '0',
    marginLeft: '5px',
    color: '#999',
    background: 'transparent !important',
    border: '1px solid token(colors.bgmNavBorder)',
    borderRadius: '100px',
    transition: 'all .2s ease-in-out',
    _hover: {
      color: 'bgmPrimary',
      borderColor: 'bgmPrimary',
    },
    "&[aria-expanded='true']": {
      color: '#fff',
      background: 'token(colors.bgmPrimary) !important',
      borderColor: 'bgmPrimary',
      '& span': { background: 'transparent' },
      '& span::before': { top: '0', transform: 'rotate(45deg)' },
      '& span::after': { top: '0', transform: 'rotate(-45deg)' },
    },
  },
});

const mobileMenuIcon = css({
  position: 'relative',
  display: 'block',
  flexShrink: '0',
  width: '14px',
  height: '2px',
  background: 'currentcolor',
  borderRadius: '1px',
  transition: 'background ease .2s, top ease .2s .2s, transform ease .2s',
  _before: {
    position: 'absolute',
    top: '-5px',
    left: '0',
    width: '14px',
    height: '2px',
    content: '""',
    background: 'currentcolor',
    borderRadius: '1px',
    transition: 'top ease-in .2s, transform ease-in .2s .2s',
  },
  _after: {
    position: 'absolute',
    top: '5px',
    left: '0',
    width: '14px',
    height: '2px',
    content: '""',
    background: 'currentcolor',
    borderRadius: '1px',
    transition: 'top ease-in .2s, transform ease-in .2s .2s',
  },
});

const nav = css({
  display: 'flex',
  alignItems: 'center',
  smDown: { display: 'none' },
});

/* 频道组（动画~三次元）：与原站 a.chl 对齐的拼接渐变胶囊，hover/高亮为粉底白字；
   选择器限定各菜单项的直接子链接，避免污染下拉菜单；
   &[class] 用于提升特异性，稳定压过 MenuItem 的 pill 基类（圆角/文字色） */
const navChannel = css({
  '&[class] > .bgm-menu-item > .bgm-menu-item__link': {
    background: 'linear-gradient(token(colors.bgmNavMenuBgStart), token(colors.bgmNavMenuBgEnd))',
    borderRadius: '0',
    transition: 'all .2s ease-in-out',
  },
  '&[class] > .bgm-menu-item:first-of-type > .bgm-menu-item__link': {
    paddingLeft: '15px',
    borderRadius: '100px 0 0 100px',
  },
  '&[class] > .bgm-menu-item:last-of-type > .bgm-menu-item__link': {
    paddingRight: '15px',
    marginRight: '5px',
    borderRadius: '0 100px 100px 0',
  },
  '&[class] > .bgm-menu-item:hover > .bgm-menu-item__link, &[class] > .bgm-menu-item--active > .bgm-menu-item__link':
    {
      background: 'bgmPrimary',
      color: '#FFF',
    },
});

/* 右侧导航（人物/超展开/小组/探索）：与原站 a.top 对齐，hover 仅文字变粉 */
const navPlain = css({});

const headerRight = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const infoBox = css({
  display: 'flex',
  alignItems: 'center',
  smDown: { display: 'none' },
});

/* 与原站 #headerSearch 对齐：胶囊搜索框 212x29，聚焦时粉底发光 */
const search = css({
  width: '212px',
  height: '29px',
  padding: '3px 8px 3px 5px',
  border: '1px solid token(colors.bgmNavBorder)',
  borderRadius: '100px',
  background: 'rgba(255, 255, 255, 0.2) !important',
  transition: 'all .3s ease-in-out',
  '&.bgm-input__wrapper--focus': {
    borderColor: 'bgmPrimary',
    boxShadow: '0 0 10px rgba(240, 145, 153, 0.6)',
  },
  '& .bgm-input': {
    fontSize: '14px',
    lineHeight: '20px',
  },
  '& .bgm-input__prefix': {
    marginRight: '0',
    fontWeight: '400',
  },
});

const searchSelect = css({
  minWidth: '35px',
  padding: '4px',
  color: '#000',
  textAlign: 'center',
  outline: 'none',
  border: 'none',
  borderRight: '1px solid token(colors.bgmNavBorder)',
  background: 'transparent',
});

const searchSubmitButton = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0',
  color: '#999',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

const mobileSearchButton = css({
  display: 'none',
  smDown: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 32px',
    width: '32px',
    height: '32px',
    padding: '0',
    color: 'bgmPrimary',
    background: 'transparent !important',
    border: '0',
    borderRadius: '50%',
    '& svg': { width: '20px', height: '20px' },
  },
});

const icon = css({ width: '18px', height: '18px' });

const notificationIcon = css({
  position: 'relative',
  color: '#999',
});

const notificationNotice = css({
  _before: {
    position: 'absolute',
    top: '-3px',
    right: '0',
    width: '8px',
    height: '8px',
    content: '""',
    background: '#f00',
    borderRadius: '50%',
  },
  _after: {
    position: 'absolute',
    top: '-3px',
    right: '0',
    width: '8px',
    height: '8px',
    content: '""',
    background: '#f00',
    borderRadius: '50%',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  },
});

/* 与原站 div.idBadgerNeue div.guest 对齐的粉底胶囊登录/注册入口 */
const userLogin = css({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '100px',
  background: 'bgmPrimary',
  '& a': {
    display: 'inline-block',
    color: '#FFF',
    fontSize: '14px',
    lineHeight: '100%',
    textDecoration: 'none',
    transition: 'all .2s ease-in-out',
  },
  '& a:hover': {
    color: '#FFF',
    background: 'bgmBlue',
    textDecoration: 'none',
  },
  '& a:first-of-type': {
    padding: '5px 5px 5px 10px',
    borderRadius: '100px 0 0 100px',
  },
  '& a:last-of-type': {
    padding: '5px 10px 5px 5px',
    borderRadius: '0 100px 100px 0',
  },
});

/* 与原站 div.idBadgerNeue #badgeUserPanel 对齐的头像悬浮用户面板；
   用 visibility/opacity/transform 做淡入下滑，避免生硬闪现 */
const userBadge = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&:hover .bgm-user-panel, &:focus-within .bgm-user-panel': {
    visibility: 'visible',
    opacity: '1',
    transform: 'translateY(0)',
    pointerEvents: 'auto',
    transition: 'opacity .2s ease-out, transform .2s ease-out, visibility 0s',
  },
});

const userPanel = css({
  display: 'block',
  visibility: 'hidden',
  opacity: '0',
  transform: 'translateY(-8px)',
  pointerEvents: 'none',
  transition: 'opacity .2s ease-out, transform .2s ease-out, visibility 0s linear .2s',
  position: 'absolute',
  top: '100%',
  right: '0',
  zIndex: '90',
  /* 与原站 #badgeUserPanel 同宽 */
  width: '250px',
  padding: '5px 0',
  background: 'bgmDropBg',
  borderRadius: '15px',
  boxShadow:
    'inset 0 1px 1px hsla(0, 100%, 100%, 0.3), inset 0 -1px 0 hsla(0, 100%, 100%, .1), 0 3px 15px hsla(214, 100%, 0%, .2)',
  backdropFilter: 'blur(5px)',
});

const userPanelLink = css({
  display: 'block',
  width: 'auto',
  margin: '2px 5px',
  padding: '5px 15px',
  color: 'bgmLink',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
  textDecoration: 'none',
  borderRadius: '100px',
  transition: 'all .2s ease-in-out',
  _hover: {
    color: '#FFF',
    background: 'bgmBlue',
    textDecoration: 'none',
  },
});

const userPanelLogout = css({
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
});

const userPanelDivider = css({
  height: '1px',
  margin: '2px 5px',
  background: 'bgmDropBorder',
});

const mobilePanelStyle = css({
  display: 'none',
  smDown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '1',
    width: '100%',
    padding: '4px 10px 0',
    boxSizing: 'border-box',
    background: '#fff !important',
    borderBottom: '1px solid token(colors.bgmNavBorder)',
    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.04)',
  },
});

const mobilePanelOpen = css({
  smDown: { display: 'block' },
});

const mobileSearch = css({
  display: 'flex',
  width: '100%',
  height: '34px',
  padding: '3px 12px',
  marginBottom: '16px',
  background: '#fff !important',
});

const mobileSearchForm = css({
  width: '100%',
  '& .bgm-input__wrapper--focus': { borderColor: 'bgmPrimary' },
});

const mobileSearchSelect = css({
  padding: '0',
  color: '#555',
  fontWeight: '600',
  appearance: 'none',
  outline: 'none',
  border: 'none',
  background: 'transparent',
});

const mobileSearchDivider = css({
  display: 'inline-block',
  flexShrink: '0',
  width: '1px',
  height: '20px',
  margin: '0 9px 0 7px',
  background: 'token(colors.bgmNavBorder)',
});

const mobileSearchInputIcon = css({ width: '18px', height: '18px', marginLeft: '8px' });

const mobileNavigationMenu = css({
  display: 'flex',
  alignItems: 'stretch',
  width: 'calc(100% + 20px) !important',
  padding: '0 !important',
  margin: '0 -10px',
  '& > .bgm-menu-item': {
    width: '100%',
    boxSizing: 'border-box',
    color: '#999',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '30px',
    textAlign: 'center',
  },
  '& > .bgm-menu-item .bgm-menu-item__link': {
    margin: '0',
    padding: '5px 0',
    color: 'inherit',
    textAlign: 'center',
  },
  '& > .bgm-menu-item:nth-child(-n + 5)': {
    background: '#f7f7f7',
    fontWeight: '600',
  },
});

function getRandomNumber(n: number): number {
  return Math.floor(Math.random() * n);
}

const Musume = [Musume1, Musume2, Musume3, Musume4][getRandomNumber(4)];

if (Musume === undefined) {
  throw new UnreadableCodeError('BUG: unexpected choice result');
}

const Header: FC = () => {
  const { user, logout } = useUser();
  const { noticeCount } = useNotify();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('closed');
  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const showMobileMenu = mobilePanel === 'menu';
  const showMobilePanel = mobilePanel !== 'closed';
  const activeNavKey = getActiveNavKey(location.pathname);
  const navLeft = buildNavLeft(user?.username);
  const navRight = buildNavRight(user?.username);
  const mobileNav = [...navLeft, ...navRight];

  useEffect(() => {
    if (mobilePanel === 'search') {
      searchInputRef.current?.focus();
    }
  }, [mobilePanel]);

  const toggleMobileMenu = (): void => {
    setMobilePanel((panel) => (panel === 'menu' ? 'closed' : 'menu'));
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const keyword = searchValue.trim();
    if (!keyword) {
      return;
    }
    setMobilePanel('closed');
    if (searchCategory === 'mono') {
      navigate(`/mono_search/${encodeURIComponent(keyword)}?cat=prsn`);
    } else {
      navigate(`/subject_search/${encodeURIComponent(keyword)}?cat=${searchCategory}`);
    }
  };

  const searchByCategory = (category: string, keyword: string): void => {
    if (category === 'mono') {
      navigate(`/mono_search/${encodeURIComponent(keyword)}?cat=prsn`);
    } else {
      navigate(`/subject_search/${encodeURIComponent(keyword)}?cat=${category}`);
    }
  };

  const handleDesktopSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const keyword = searchValue.trim();
    if (!keyword) {
      return;
    }
    searchByCategory(searchCategory, keyword);
  };

  const handleLogout = (): void => {
    if (!window.confirm('登出 Bangumi 账户？')) {
      return;
    }
    void logout();
  };

  return (
    <header className={container}>
      <div className={main}>
        {/* left */}
        <div className={headerLeft}>
          {/* Logo */}
          <a className={logo} href='/'>
            <Musume className={musume} />
            <Logo className={textLogo} />
          </a>
          {/* Mobile Menu Toggle Button */}
          <button
            type='button'
            className={mobileMenuToggle}
            aria-controls='mobile-navigation'
            aria-expanded={showMobileMenu}
            aria-label={showMobileMenu ? '关闭菜单' : '菜单'}
            onClick={toggleMobileMenu}
          >
            <span className={mobileMenuIcon} aria-hidden='true' />
          </button>
          {/* Menu */}
          <div className={nav}>
            <Menu
              items={navLeft}
              activeKey={
                navLeft.some((item) => item.key === activeNavKey) ? activeNavKey : undefined
              }
              wrapperClass={navChannel}
            />
            <Menu
              items={navRight}
              activeKey={
                navRight.some((item) => item.key === activeNavKey) ? activeNavKey : undefined
              }
              wrapperClass={navPlain}
            />
          </div>
        </div>

        {/* right */}
        <div className={headerRight}>
          <button
            className={mobileSearchButton}
            type='button'
            aria-controls='mobile-search-panel'
            aria-expanded={showMobilePanel}
            aria-label='搜索'
            onClick={() => {
              setMobilePanel((panel) => (panel === 'search' ? 'closed' : 'search'));
            }}
          >
            <SearchIcon />
          </button>
          <div className={infoBox}>
            <form onSubmit={handleDesktopSearch}>
              <Input
                aria-label='条目搜索'
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                prefix={
                  <select
                    name='cat'
                    className={searchSelect}
                    aria-label='搜索分类'
                    value={searchCategory}
                    onChange={(event) => setSearchCategory(event.target.value)}
                  >
                    {searchCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                }
                suffix={
                  <button type='submit' className={searchSubmitButton} aria-label='提交搜索'>
                    <SearchIcon style={{ flexShrink: 0 }} />
                  </button>
                }
                wrapperClass={search}
              />
            </form>
          </div>
          {/* Avatar */}
          {user ? (
            <>
              <Link
                to='/notifications'
                aria-label='通知'
                className={cx(icon, notificationIcon, noticeCount > 0 && notificationNotice)}
              >
                <Notification />
              </Link>
              <div className={userBadge}>
                <Link to={getUserProfileLink(user.username)}>
                  {/* 对齐原站头部 32px 圆形头像 */}
                  <Avatar src={user.avatar.large} size='xsmall' />
                </Link>
                <div className={cx(userPanel, 'bgm-user-panel')}>
                  <Link className={userPanelLink} to={getUserProfileLink(user.username)}>
                    我的时光机
                  </Link>
                  <div className={userPanelDivider} />
                  <Link className={userPanelLink} to='/notifications'>
                    提醒
                  </Link>
                  <div className={userPanelDivider} />
                  <button
                    type='button'
                    className={cx(userPanelLink, userPanelLogout)}
                    onClick={handleLogout}
                  >
                    登出
                  </button>
                </div>
              </div>
            </>
          ) : (
            <span className={userLogin}>
              <Link to={`/login?backTo=${encodeURIComponent(location.pathname)}`}>登录</Link>
              <Link to='/register'>注册</Link>
            </span>
          )}
        </div>
      </div>
      <div
        id='mobile-search-panel'
        className={cx(mobilePanelStyle, showMobilePanel && mobilePanelOpen)}
      >
        <form className={mobileSearchForm} onSubmit={handleSearch}>
          <Input
            ref={searchInputRef}
            aria-label='搜索'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            prefix={
              <>
                <select
                  name='mobile-cat'
                  className={mobileSearchSelect}
                  value={searchCategory}
                  onChange={(event) => setSearchCategory(event.target.value)}
                >
                  {searchCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <span className={mobileSearchDivider} />
              </>
            }
            suffix={<SearchIcon className={mobileSearchInputIcon} />}
            wrapperClass={mobileSearch}
          />
        </form>
        <nav id='mobile-navigation' aria-label='主导航' hidden={!showMobileMenu}>
          <Menu
            items={mobileNav}
            mode='vertical'
            onClick={() => {
              setMobilePanel('closed');
            }}
            wrapperClass={mobileNavigationMenu}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
