import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Divider, Input, Menu } from '@bangumi/design';
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
import {
  animeSubMenu,
  bookSubMenu,
  gameSubMenu,
  groupSubMenu,
  monoSubMenu,
  musicSubMenu,
  realSubMenu,
} from './SubMenu';

// todo: SVG Sprites

const navLeft = [
  {
    key: 'animation',
    label: '动画',
    href: '/anime',
    subMenu: animeSubMenu,
  },
  {
    key: 'book',
    label: '书籍',
    href: '/book',
    subMenu: bookSubMenu,
  },
  {
    key: 'music',
    label: '音乐',
    href: '/music',
    subMenu: musicSubMenu,
  },
  {
    key: 'game',
    label: '游戏',
    href: '/game',
    subMenu: gameSubMenu,
  },
  {
    key: 'drama',
    label: '三次元',
    href: '/real',
    subMenu: realSubMenu,
  },
];

const navRight = [
  {
    key: 'mono',
    label: '人物',
    subMenu: monoSubMenu,
  },
  {
    key: 'rakuen',
    label: '超展开',
    href: '/rakuen',
  },
  {
    key: 'group',
    label: '小组',
    href: '/group',
    subMenu: groupSubMenu,
  },
];

const mobileNav = [...navLeft, ...navRight];

type MobilePanel = 'closed' | 'menu' | 'search';

const searchCategories = [
  { value: 'all', label: '全部' },
  { value: '1', label: '动画' },
  { value: '2', label: '书籍' },
  { value: '3', label: '音乐' },
  { value: '4', label: '游戏' },
  { value: '6', label: '三次元' },
  { value: 'mono', label: '人物' },
] as const;

const container = css({
  position: 'relative',
  zIndex: '5000',
  height: '60px',
  boxSizing: 'border-box',
  background: 'rgba(255, 255, 255, 0.95)',
  borderBottom: '1px solid rgba(249, 188, 193, 0.95)',
  smDown: { height: '50px' },
});

const main = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  maxWidth: '1260px',
  boxSizing: 'border-box',
  padding: '0 30px 0 24px',
  margin: '0 auto !important',
  smDown: { padding: '0 5px' },
});

const headerLeft = css({ minWidth: '0', display: 'flex', alignItems: 'center' });

const logo = css({
  position: 'relative',
  flexShrink: '0',
  width: '193px',
  height: '60px',
  smDown: { width: '143px', height: '50px' },
});

const musume = css({
  position: 'absolute',
  bottom: '0',
  width: '58px',
  height: '58px',
  smDown: { display: 'block', width: '36px', height: '42px' },
});

const textLogo = css({
  position: 'absolute',
  top: '8px',
  right: '0',
  width: '126px',
  height: '37px',
  smDown: { top: '5px', width: '110px', height: '32px' },
});

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
    marginLeft: '10px',
    color: '#999',
    background: 'transparent !important',
    border: '1px solid #e5e5e5',
    borderRadius: '16px',
    "&[aria-expanded='true']": {
      color: '#fff',
      background: '#f09199 !important',
      borderColor: '#f09199',
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
  _before: {
    position: 'absolute',
    top: '-5px',
    left: '0',
    width: '14px',
    height: '2px',
    content: '""',
    background: 'currentcolor',
    borderRadius: '1px',
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
  },
});

const nav = css({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '30px',
  '@media (max-width: 1260px)': { margin: 'auto 20px' },
  smDown: { display: 'none' },
});

const navDivider = css({
  display: 'inline-block',
  width: '1px',
  height: '19px',
  margin: '0 27px',
  background: '#e8e3e3',
  '@media (max-width: 1260px)': { margin: '0 20px' },
  '@media (max-width: 992px)': { display: 'none' },
});

const navRightMenu = css({
  color: '#999',
  '@media (max-width: 992px)': { display: 'none !important' },
  '& .bgm-menu-item--underline:hover': {
    color: '#f09199',
    '&::after': { backgroundColor: '#f09199' },
  },
});

const headerRight = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  smDown: { gap: '18px' },
});

const infoBox = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0 7px 0 9px',
  '@media (max-width: 1200px)': { alignItems: 'flex-end' },
  smDown: { display: 'none' },
});

const search = css({
  width: '256px',
  height: '32px',
  padding: '3px 8px 5px',
  background: '#fff !important',
  '@media (max-width: 1200px)': { display: 'none' },
});

const searchSelect = css({
  outline: 'none',
  border: 'none',
  color: '#999',
  background: 'transparent',
});

const searchDivider = css({
  display: 'inline-block',
  flexShrink: '0',
  width: '1px',
  height: '14px',
  margin: '0 9px 0 5px',
  background: '#e8e3e3',
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
    color: '#f09199',
    background: 'transparent !important',
    border: '0',
    borderRadius: '50%',
    '& svg': { width: '20px', height: '20px' },
  },
});

const icon = css({ width: '18px', height: '18px' });

const notificationIcon = css({
  position: 'relative',
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

const avatar = css({ '@media (max-width: 1260px)': { marginRight: '10px' } });

const link = css({
  color: '#999',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '20px',
  textDecoration: 'none',
});

const userLogin = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '117px',
  height: '32px',
  borderRadius: '9999px',
  _hover: {
    background: '#f09199',
    '& a': { color: '#f5a4ab' },
    '& a:first-of-type': { borderRight: '2px solid #f5a4ab' },
  },
  '& a': { color: '#999', fontSize: '14px', lineHeight: '14px', textDecoration: 'none' },
  '& a:hover': { color: '#fff', fontWeight: '700' },
  '& a:first-of-type': { paddingRight: '12px', borderRight: '2px solid #999' },
  '& a:last-of-type': { paddingLeft: '12px' },
  smDown: {
    width: '78px',
    '& a': { fontSize: '12px' },
    '& a:first-of-type': { paddingRight: '7px' },
    '& a:last-of-type': { paddingLeft: '7px' },
  },
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
    borderBottom: '1px solid rgba(249, 188, 193, 0.95)',
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
  '& .bgm-input__wrapper--focus': { borderColor: '#f09199 !important' },
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
  background: '#e8e3e3',
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
    padding: '5px 0',
    boxSizing: 'border-box',
    color: '#999',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '30px',
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
  const { user } = useUser();
  const { noticeCount } = useNotify();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('closed');
  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const showMobileMenu = mobilePanel === 'menu';
  const showMobilePanel = mobilePanel !== 'closed';

  useEffect(() => {
    if (mobilePanel === 'search') {
      searchInputRef.current?.focus();
    }
  }, [mobilePanel]);

  const toggleMobileMenu = (): void => {
    setMobilePanel((panel) => (panel === 'menu' ? 'closed' : 'menu'));
  };

  const handleMobileSearch = (event: React.FormEvent<HTMLFormElement>): void => {
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

  const handleDesktopSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const keyword = searchValue.trim();
    if (!keyword) {
      return;
    }
    if (searchCategory === 'mono') {
      navigate(`/mono_search/${encodeURIComponent(keyword)}?cat=prsn`);
    } else {
      navigate(`/subject_search/${encodeURIComponent(keyword)}?cat=${searchCategory}`);
    }
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
            <Menu items={navLeft} />
            <Divider orientation='vertical' className={navDivider} />
            <Menu items={navRight} wrapperClass={navRightMenu} />
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
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                prefix={
                  <>
                    <select
                      name='cat'
                      className={searchSelect}
                      value={searchCategory}
                      onChange={(event) => setSearchCategory(event.target.value)}
                    >
                      {searchCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <Divider orientation='vertical' className={searchDivider} />
                  </>
                }
                suffix={<SearchIcon style={{ flexShrink: 0 }} />}
                wrapperClass={search}
              />
            </form>
          </div>
          {/* Avatar */}
          {user ? (
            <>
              <Link
                to='/notifications'
                className={cx(icon, notificationIcon, noticeCount > 0 && notificationNotice)}
              >
                <Notification />
              </Link>
              <Link to={getUserProfileLink(user.username)}>
                <Avatar src={user.avatar.large} wrapperClass={avatar} />
              </Link>
            </>
          ) : (
            <span className={userLogin}>
              <Link className={link} to={`/login?backTo=${encodeURIComponent(location.pathname)}`}>
                登录
              </Link>
              <Link className={link} to='/register'>
                注册
              </Link>
            </span>
          )}
        </div>
      </div>
      <div
        id='mobile-search-panel'
        className={cx(mobilePanelStyle, showMobilePanel && mobilePanelOpen)}
      >
        <form className={mobileSearchForm} onSubmit={handleMobileSearch}>
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
                <Divider orientation='vertical' className={mobileSearchDivider} />
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
