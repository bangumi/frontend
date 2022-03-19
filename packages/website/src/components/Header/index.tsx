import React, { FC } from 'react'
import style from './style.module.less'
import { BangumiLogo } from '@bangumi/icons/musume'
import { Notification, Setting } from '@bangumi/icons'
import { Avatar, Divider, Menu } from '@bangumi/design'
import { AnimeSubMenu, BookSubMenu, MusicSubMenu, GameSubMenu, RealSubMenu, MonoSubMenu, GroupSubMenu } from './SubMenu'

const navLeft = [
  {
    key: 'animation',
    label: '动画',
    SubMenu: AnimeSubMenu
  },
  {
    key: 'book',
    label: '书籍',
    SubMenu: BookSubMenu
  },
  {
    key: 'music',
    label: '音乐',
    SubMenu: MusicSubMenu
  },
  {
    key: 'game',
    label: '游戏',
    SubMenu: GameSubMenu
  },
  {
    key: 'drama',
    label: '三次元',
    SubMenu: RealSubMenu
  }
]

const navRight = [
  {
    key: 'mono',
    label: '人物',
    SubMenu: MonoSubMenu
  },
  {
    key: 'rakuen',
    label: '超展开'
  },
  {
    key: 'group',
    label: '小组',
    SubMenu: GroupSubMenu
  },
  {
    key: 'explore',
    label: '探索'
  },
  {
    key: 'doujin',
    label: '天窗联盟'
  }
]

const Header: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.main}>
        {/* Logo */}
        <BangumiLogo className={style.logo} />
        {/* Menu */}
        <div className={style.nav}>
          <Menu
            items={navLeft} wrapperClass={style.navLeft}
          />
          <Divider orientation="vertical" className={style.divider} />
          <Menu
            items={navRight} wrapperClass={style.navRight}
          />
        </div>
        {/* Search Todo */}
        <div className={style.infoBox}>
          <div className={style.search} />
          <Notification className={style.iconNotification} />
          <Setting className={style.iconSetting} />
        </div>
        {/* Avatar */}
        <Avatar src="https://lain.bgm.tv/pic/user/l/000/00/00/1.jpg" />
      </div>
    </div>
  )
}

export default Header
