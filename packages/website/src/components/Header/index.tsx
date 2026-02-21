import cn from 'classnames';
import type { FC } from 'react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Avatar, Button, Divider, Input, Menu } from '@bangumi/design';
import { Notification, Search as SearchIcon } from '@bangumi/icons';
import { UnreadableCodeError } from '@bangumi/utils';
import { useNotify } from '@bangumi/website/hooks/use-notify';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Musume1 } from '../../assets/musume_1.svg';
import { ReactComponent as Musume2 } from '../../assets/musume_2.svg';
import { ReactComponent as Musume3 } from '../../assets/musume_3.svg';
import { ReactComponent as Musume4 } from '../../assets/musume_4.svg';
import { useUser } from '../../hooks/use-user';
import style from './style.module.less';
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
    subMenu: animeSubMenu,
  },
  {
    key: 'book',
    label: '书籍',
    subMenu: bookSubMenu,
  },
  {
    key: 'music',
    label: '音乐',
    subMenu: musicSubMenu,
  },
  {
    key: 'game',
    label: '游戏',
    subMenu: gameSubMenu,
  },
  {
    key: 'drama',
    label: '三次元',
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
  },
  {
    key: 'group',
    label: '小组',
    subMenu: groupSubMenu,
  },
  {
    key: 'explore',
    label: '探索',
  },
  {
    key: 'doujin',
    label: '天窗联盟',
  },
];

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

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className={style.container}>
      <div className={style.main}>
        {/* left */}
        <div className='flex items-center'>
          {/* Logo */}
          <a className={style.logo} href='/'>
            <Musume className={style.musume} />
            <Logo className={style.textLogo} />
          </a>
          {/* Mobile Menu Toggle Button */}
          <Button
            className={style.mobileMenuToggle}
            color={showMobileMenu ? 'default' : 'gray'}
            onClick={() => {
              setShowMobileMenu((show) => !show);
            }}
          >
            {showMobileMenu ? '关闭' : '菜单'}
          </Button>
          {/* Menu */}
          <div className={style.nav}>
            <Menu items={navLeft} wrapperClass={style.navLeft} />
            <Divider orientation='vertical' className={style.divider} />
            <Menu items={navRight} wrapperClass={style.navRight} />
          </div>
        </div>

        {/* right */}
        <div className={style.headerRight}>
          <div className={style.infoBox}>
            {/* Search Todo */}
            <Input
              prefix={
                <>
                  <select name='cat' className={style.searchSelect} defaultValue='value1'>
                    <option value='value1'>全部条目</option>
                    <option value='value2'>动画</option>
                    <option value='value3'>书籍</option>
                    <option value='value4'>游戏</option>
                    <option value='value5'>三次元</option>
                    <option value='value6'>人物</option>
                  </select>
                  <Divider orientation='vertical' className={style.searchDivider} />
                </>
              }
              suffix={<SearchIcon style={{ flexShrink: 0 }} />}
              wrapperClass={style.search}
            />
          </div>
          {/* Avatar */}
          {user ? (
            <>
              <Link
                to='/notifications'
                className={cn(style.icon, style.iconNotification, {
                  [style.iconNotificationNotice!]: noticeCount > 0,
                })}
              >
                <Notification />
              </Link>
              <Avatar src={user.avatar.large} wrapperClass={style.avatar} />
            </>
          ) : (
            <span className={style.userLogin}>
              <Link
                className={style.link}
                to={`/login?backTo=${encodeURIComponent(location.pathname)}`}
              >
                登录
              </Link>
              <Link className={style.link} to='/register'>
                注册
              </Link>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
