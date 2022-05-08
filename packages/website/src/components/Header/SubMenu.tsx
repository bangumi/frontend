import React, { VFC } from 'react'
import { Menu, Divider, MenuItemType } from '@bangumi/design'
import style from './SubMenu.module.less'

const subMenuBottomBuilder = (verb: '看' | '读' | '听' | '玩'): MenuItemType[] => [
  {
    key: 'do',
    className: style['subMenuItem--do'],
    label: `在${verb}`
  },
  {
    key: 'wish',
    className: style['subMenuItem--wish'],
    label: `想${verb}`
  },
  {
    key: 'collect',
    className: style['subMenuItem--collect'],
    label: `${verb}过`
  },
  {
    key: 'on_hold',
    className: style['subMenuItem--on_hold'],
    label: '搁置'
  },
  {
    key: 'dropped',
    className: style['subMenuItem--dropped'],
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

const subMenuBottomWrapper = (type: string): MenuItemType[] => {
  switch (type) {
    case 'anime':
      return subMenuBottomBuilder('看')
    case 'book':
      return subMenuBottomBuilder('读')
    case 'music':
      return subMenuBottomBuilder('听')
    case 'game':
      return subMenuBottomBuilder('玩')
    case 'real':
      return subMenuBottomBuilder('看')
    case 'mono':
      return MonoSubMenuBottom
    case 'group':
      return GroupSubMenuBottom
    default:
      return []
  }
}

// eslint-disable-next-line react/prop-types
const SubMenu: VFC<{ itemsTop: MenuItemType[], itemsBottom: MenuItemType[] }> = ({ itemsTop, itemsBottom }) => (
  <>
    <Menu items={itemsTop} mode="vertical" wrapperClass={style.subMenu} />
    <Divider className={style.subMenuDivider} />
    <Menu items={itemsBottom} mode="vertical" wrapperClass={style.subMenu} />
  </>
)

export const AnimeSubMenu = <SubMenu itemsTop={AnimeSubMenuItems} itemsBottom={subMenuBottomWrapper('anime')} />

export const BookSubMenu = <SubMenu itemsTop={BookSubMenuItems} itemsBottom={subMenuBottomWrapper('book')} />

export const MusicSubMenu = <SubMenu itemsTop={MusicSubMenuItems} itemsBottom={subMenuBottomWrapper('music')} />

export const GameSubMenu = <SubMenu itemsTop={GameSubMenuItems} itemsBottom={subMenuBottomWrapper('game')} />

export const RealSubMenu = <SubMenu itemsTop={RealSubMenuItems} itemsBottom={subMenuBottomWrapper('real')} />

export const MonoSubMenu = <SubMenu itemsTop={MonoSubMenuItems} itemsBottom={subMenuBottomWrapper('mono')} />

export const GroupSubMenu = <SubMenu itemsTop={GroupSubMenuItems} itemsBottom={subMenuBottomWrapper('group')} />
