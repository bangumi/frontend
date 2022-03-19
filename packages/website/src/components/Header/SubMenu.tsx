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

const BookSubMenuItems = [
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

const MusicSubMenuItems = [
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

const GameSubMenuItems = [
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

const RealSubMenuItems = [
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

const MonoSubMenuItems = [
  {
    key: 'character',
    label: '虚构人物'
  },
  {
    key: 'person',
    label: '现实人物'
  }
]
const MonoSubMenuBottom = [
  {
    key: 'update',
    label: '关注人物更新'
  },
  {
    key: 'character',
    label: '收藏的角色'
  },
  {
    key: 'person',
    label: '收藏的人物'
  }
]

const GroupSubMenuItems = [
  {
    key: '/group/discover',
    label: '随便看看'
  },
  {
    key: '/group/all',
    label: '所有小组'
  }
]
const GroupSubMenuBottom = [
  {
    key: '/group/my_topic',
    label: '发表的话题'
  },
  {
    key: '/group/my_reply',
    label: '回复的话题'
  },
  {
    key: '/group/mine',
    label: '参加的小组'
  }
]

// eslint-disable-next-line react/prop-types
const SubMenu: VFC<{ itemsTop: Items, itemsBottom?: Items }> = ({ itemsTop, itemsBottom = SubMenuBottom }) => (
  <>
    <Menu items={itemsTop} mode="vertical" wrapperClass={style.subMenu} />
    <Divider className={style.subMenuDivider} />
    <Menu items={itemsBottom} mode="vertical" wrapperClass={style.subMenu}>
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

export const BookSubMenu = <SubMenu itemsTop={BookSubMenuItems} />

export const MusicSubMenu = <SubMenu itemsTop={MusicSubMenuItems} />

export const GameSubMenu = <SubMenu itemsTop={GameSubMenuItems} />

export const RealSubMenu = <SubMenu itemsTop={RealSubMenuItems} />

export const MonoSubMenu = <SubMenu itemsTop={MonoSubMenuItems} itemsBottom={MonoSubMenuBottom} />

export const GroupSubMenu = <SubMenu itemsTop={GroupSubMenuItems} itemsBottom={GroupSubMenuBottom} />
