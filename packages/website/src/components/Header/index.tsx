import React, { FC, useState } from 'react'
import style from './style.module.less'
import { BangumiLogo, BangumiTextLogo } from '@bangumi/icons/musume'
import { Notification, Search as SearchIcon, Setting } from '@bangumi/icons'
import { Avatar, Button, Divider, Input, Menu } from '@bangumi/design'
import { animeSubMenu, bookSubMenu, musicSubMenu, gameSubMenu, realSubMenu, monoSubMenu, groupSubMenu } from './SubMenu'
import { useUser } from '../../hooks/use-user'
import { Link } from 'react-router-dom'

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
  const { user } = useUser()

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  return (
    <div className={style.container}>
      <div className={style.main}>
        {/* Logo */}
        <BangumiLogo className={style.logo} />
        {/* Mobile Logo */}
        <BangumiTextLogo className={style.logoMobile} />
        {/* Mobile Menu Toggle Button */}
        <Button
          className={style.mobileMenuToggle} shape="rounded" type={showMobileMenu ? 'primary' : 'secondary'}
          onClick={() => setShowMobileMenu(show => !show)}
        >
          {showMobileMenu ? '关闭' : '菜单'}
        </Button>
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
          <Input
            prefix={(
              <>
                <select
                  name="cat"
                  className={style.searchSelect}
                  defaultValue="value1"
                >
                  <option value="value1">全部条目</option>
                  <option value="value2">动画</option>
                  <option value="value3">书籍</option>
                  <option value="value4">游戏</option>
                  <option value="value5">三次元</option>
                  <option value="value6">人物</option>
                </select>
                <Divider orientation="vertical" className={style.searchDivider} />
              </>
            )}
            suffix={<SearchIcon style={{ flexShrink: 0 }} />}
            wrapperClass={style.search}
          />
          <Notification className={style.iconNotification} />
          <Setting className={style.iconSetting} />
        </div>
        {/* Avatar */}
        {user ? <Avatar src={user?.avatar?.large} wrapperClass={style.avatar} /> : <Link className={style.link} to="/login">登录</Link>}
      </div>
    </div>
  )
}

export default Header
