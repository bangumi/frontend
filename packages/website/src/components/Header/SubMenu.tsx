import React, { VFC } from 'react'
import { Menu, Divider, MenuItem } from '@bangumi/design'
import style from './SubMenu.module.less'

type Items = Array<{
  key: string
  label: string
}>

const SubMenuBottom = [
  {
    key: 'do',
    label: '在看'
  },
  {
    key: 'wish',
    label: '想看'
  },
  {
    key: 'collect',
    label: '看过'
  },
  {
    key: 'on_hold',
    label: '搁置'
  },
  {
    key: 'dropped',
    label: '抛弃'
  }
]

const AnimeSubMenuItems = [
  {
    key: 'chart',
    label: '排行榜'
  },
  {
    key: 'calendar',
    label: '每日放送'
  },
  {
    key: 'tag',
    label: '动画标签'
  },
  {
    key: 'browser',
    label: '分类浏览'
  },
  {
    key: 'blog',
    label: '动画日志'
  }
]

const SubMenuBookItems = [
  {
    key: 'chart',
    label: '排行榜'
  },
  {
    key: 'tag',
    label: '图书标签'
  },
  {
    key: 'browser',
    label: '分类浏览'
  },
  {
    key: 'blog',
    label: '图书日志'
  }
]

const SubMenuMusicItems = [
  {
    key: 'chart',
    label: '排行榜'
  },
  {
    key: 'tag',
    label: '音乐标签'
  },
  {
    key: 'browser',
    label: '浏览全部'
  },
  {
    key: 'blog',
    label: '音乐日志'
  }
]

const SubMenuGameItems = [
  {
    key: 'chart',
    label: '排行榜'
  },
  {
    key: 'tag',
    label: '游戏标签'
  },
  {
    key: 'browser',
    label: '平台浏览'
  },
  {
    key: 'blog',
    label: '游戏日志'
  }
]

const SubMenuRealItems = [
  {
    key: 'chart',
    label: '排行榜'
  },
  {
    key: 'tag',
    label: '三次元标签'
  },
  {
    key: 'browser',
    label: '三次元日志'
  },
  {
    key: 'jp',
    label: '日剧'
  },
  {
    key: 'en',
    label: '欧美剧'
  }
]
// eslint-disable-next-line react/prop-types
const SubMenu: VFC<{ itemsTop: Items, itemsBottom?: Items }> = ({ itemsTop, itemsBottom = SubMenuBottom }) => (
  <>
    <Menu items={itemsTop} mode="vertical" className={style.subMenu} />
    <Divider className={style.subMenuDivider} />
    <Menu items={itemsBottom} mode="vertical" className={style.subMenu}>
      {
        item => (
          <MenuItem
            key={item.key} id={item.key}
            className={style[`subMenuItem--${item.key}`]}
          >
            {item.label}
          </MenuItem>
        )
      }
    </Menu>
  </>
)

export const AnimeSubMenu = <SubMenu itemsTop={AnimeSubMenuItems} />

export const BookSubMenu = <SubMenu itemsTop={SubMenuBookItems} />

export const MusicSubMenu = <SubMenu itemsTop={SubMenuMusicItems} />

export const GameSubMenu = <SubMenu itemsTop={SubMenuGameItems} />

export const RealSubMenu = <SubMenu itemsTop={SubMenuRealItems} />
