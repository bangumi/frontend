import React, { VFC } from 'react';
import { Menu, Divider, MenuItemType } from '@bangumi/design';
import style from './SubMenu.module.less';

const buildMenuBottom = (verb: '看' | '读' | '听' | '玩'): MenuItemType[] => [
  {
    key: 'do',
    className: style['subMenuItem--do'],
    label: `在${verb}`,
  },
  {
    key: 'wish',
    className: style['subMenuItem--wish'],
    label: `想${verb}`,
  },
  {
    key: 'collect',
    className: style['subMenuItem--collect'],
    label: `${verb}过`,
  },
  {
    key: 'on_hold',
    className: style['subMenuItem--on_hold'],
    label: '搁置',
  },
  {
    key: 'dropped',
    className: style['subMenuItem--dropped'],
    label: '抛弃',
  },
];

const animeSubMenuItems = [
  {
    key: 'chart',
    label: '排行榜',
  },
  {
    key: 'calendar',
    label: '每日放送',
  },
  {
    key: 'tag',
    label: '动画标签',
  },
  {
    key: 'browser',
    label: '分类浏览',
  },
  {
    key: 'blog',
    label: '动画日志',
  },
];

const bookSubMenuItems = [
  {
    key: 'chart',
    label: '排行榜',
  },
  {
    key: 'tag',
    label: '图书标签',
  },
  {
    key: 'browser',
    label: '分类浏览',
  },
  {
    key: 'blog',
    label: '图书日志',
  },
];

const musicSubMenuItems = [
  {
    key: 'chart',
    label: '排行榜',
  },
  {
    key: 'tag',
    label: '音乐标签',
  },
  {
    key: 'browser',
    label: '浏览全部',
  },
  {
    key: 'blog',
    label: '音乐日志',
  },
];

const gameSubMenuItems = [
  {
    key: 'chart',
    label: '排行榜',
  },
  {
    key: 'tag',
    label: '游戏标签',
  },
  {
    key: 'browser',
    label: '平台浏览',
  },
  {
    key: 'blog',
    label: '游戏日志',
  },
];

const realSubMenuItems = [
  {
    key: 'chart',
    label: '排行榜',
  },
  {
    key: 'tag',
    label: '三次元标签',
  },
  {
    key: 'browser',
    label: '三次元日志',
  },
  {
    key: 'jp',
    label: '日剧',
  },
  {
    key: 'en',
    label: '欧美剧',
  },
];

const monoSubMenuItems = [
  {
    key: 'character',
    label: '虚构人物',
  },
  {
    key: 'person',
    label: '现实人物',
  },
];
const monoSubMenuBottom = [
  {
    key: 'update',
    label: '关注人物更新',
  },
  {
    key: 'character',
    label: '收藏的角色',
  },
  {
    key: 'person',
    label: '收藏的人物',
  },
];

const groupSubMenuItems = [
  {
    key: '/group/discover',
    label: '随便看看',
  },
  {
    key: '/group/all',
    label: '所有小组',
  },
];
const groupSubMenuBottom = [
  {
    key: '/group/my_topic',
    label: '发表的话题',
  },
  {
    key: '/group/my_reply',
    label: '回复的话题',
  },
  {
    key: '/group/mine',
    label: '参加的小组',
  },
];

const subMenuBottomWrapper = (type: string): MenuItemType[] => {
  switch (type) {
    case 'anime':
      return buildMenuBottom('看');
    case 'book':
      return buildMenuBottom('读');
    case 'music':
      return buildMenuBottom('听');
    case 'game':
      return buildMenuBottom('玩');
    case 'real':
      return buildMenuBottom('看');
    case 'mono':
      return monoSubMenuBottom;
    case 'group':
      return groupSubMenuBottom;
    default:
      return [];
  }
};

// eslint-disable-next-line react/prop-types
const SubMenu: VFC<{
  itemsTop: MenuItemType[];
  itemsBottom: MenuItemType[];
}> = ({ itemsTop, itemsBottom }) => (
  <>
    <Menu items={itemsTop} mode="vertical" wrapperClass={style.subMenu} />
    <Divider className={style.subMenuDivider} />
    <Menu items={itemsBottom} mode="vertical" wrapperClass={style.subMenu} />
  </>
);

export const animeSubMenu = (
  <SubMenu itemsTop={animeSubMenuItems} itemsBottom={subMenuBottomWrapper('anime')} />
);

export const bookSubMenu = (
  <SubMenu itemsTop={bookSubMenuItems} itemsBottom={subMenuBottomWrapper('book')} />
);

export const musicSubMenu = (
  <SubMenu itemsTop={musicSubMenuItems} itemsBottom={subMenuBottomWrapper('music')} />
);

export const gameSubMenu = (
  <SubMenu itemsTop={gameSubMenuItems} itemsBottom={subMenuBottomWrapper('game')} />
);

export const realSubMenu = (
  <SubMenu itemsTop={realSubMenuItems} itemsBottom={subMenuBottomWrapper('real')} />
);

export const monoSubMenu = (
  <SubMenu itemsTop={monoSubMenuItems} itemsBottom={subMenuBottomWrapper('mono')} />
);

export const groupSubMenu = (
  <SubMenu itemsTop={groupSubMenuItems} itemsBottom={subMenuBottomWrapper('group')} />
);
