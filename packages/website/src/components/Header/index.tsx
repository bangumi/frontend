import React, { FC } from 'react'
import style from './style.module.less'
import { BangumiLogo, BangumiTextLogo } from '@bangumi/icons/musume'
import { Notification, Setting } from '@bangumi/icons'
import { Avatar, Divider, Menu } from '@bangumi/design'
import { animeSubMenu, bookSubMenu, musicSubMenu, gameSubMenu, realSubMenu, monoSubMenu, groupSubMenu } from './SubMenu'

const navLeft = [
  {
    key: 'animation',
    label: '动画',
    subMenu: animeSubMenu
  },
  {
    key: 'book',
    label: '书籍',
    subMenu: bookSubMenu
  },
  {
    key: 'music',
    label: '音乐',
    subMenu: musicSubMenu
  },
  {
    key: 'game',
    label: '游戏',
    subMenu: gameSubMenu
  },
  {
    key: 'drama',
    label: '三次元',
    subMenu: realSubMenu
  }
]

const navRight = [
  {
    key: 'mono',
    label: '人物',
    subMenu: monoSubMenu
  },
  {
    key: 'rakuen',
    label: '超展开'
  },
  {
    key: 'group',
    label: '小组',
    subMenu: groupSubMenu
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
        <BangumiTextLogo className={style.logoMobile} />
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
        <Avatar src="https://lain.bgm.tv/pic/user/l/000/00/00/1.jpg" wrapperClass={style.avatar} />
      </div>
    </div>
  )
}

export default Header
