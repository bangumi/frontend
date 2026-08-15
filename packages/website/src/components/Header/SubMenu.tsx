import type { FC } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

/**
 * 顶部导航下拉菜单，结构对齐原站 #navMenuNeue li ul：
 * - 频道菜单为 explore 结构：inline 组（链接并排）+ 整行 single 项 + 带标题的「我看」组
 * - 人物/小组为 plain 结构：整行链接 + div.sep 分隔标题
 */

interface SubMenuLink {
  key: string;
  label: string;
  href?: string;
}

interface SubMenuSection {
  /** 组标题（频道的「我看」用 root 样式，人物/小组的「我」用 sep 样式） */
  title?: string;
  /** 组内链接是否并排排列（原站 li.group），否则每项整行（原站 li.single / a.nav） */
  inline?: boolean;
  items: SubMenuLink[];
}

/* 原站 explore/plain 下拉共用的链接交互：蓝字胶囊，hover 蓝底白字 */
const link = css({
  color: 'bgmLink',
  borderRadius: '100px',
  textDecoration: 'none',
  transition: 'all .2s ease-in-out',
  overflow: 'hidden',
  _hover: {
    background: 'bgmBlue',
    color: '#fff',
    textDecoration: 'none',
  },
});

/* 原站 li.group 内并排链接 */
const linkInline = css({
  display: 'inline-block',
  padding: '5px 10px',
});

/* 原站 li.single / a.nav 整行链接 */
const linkBlock = css({
  display: 'block',
  margin: '2px 5px',
  padding: '5px 15px',
});

/* 无链接项（新站暂无对应页面）：与原站同视觉但不可点 */
const textItem = css({
  cursor: 'default',
  _hover: {
    background: 'transparent',
    color: 'bgmLink',
  },
});

/* 原站 ul.explore li：组间 #EEE 底部分隔线，末组无；链接不粗体（覆盖导航 ul 的粗体继承） */
const group = css({
  padding: '5px 0',
  fontWeight: '400',
  borderBottom: '1px solid token(colors.bgmDropBorder)',
  '&:last-child': {
    borderBottom: 'none',
  },
});

/* 原站 li.group 的 padding；flex-wrap 让固定宽度内链接自适应换行 */
const groupInline = css({
  padding: '10px 10px 5px',
  display: 'flex',
  flexWrap: 'wrap',
});

/* 原站 span.root 组标题（我看/我读/我听/我玩）：独占一行置于组内链接上方；
   字号比链接（14px）小一号，且不是手型（覆盖外层 li 的 cursor:pointer） */
const groupTitleRoot = css({
  display: 'block',
  /* 在 flex-wrap 组内强制独占一行，避免与链接并排 */
  flex: '0 0 100%',
  padding: '0 10px 5px',
  color: '#666',
  fontSize: '12px',
  cursor: 'default',
});

/* 原站 div.sep 分隔标题（人物/小组菜单的「我」） */
const groupTitleSep = css({
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  margin: '2px 0',
  padding: '5px 20px',
  fontSize: '14px',
  lineHeight: '100%',
  textAlign: 'left',
  background: '#f1f1f1',
  color: '#555',
  cursor: 'default',
  borderBottom: '1px solid token(colors.bgmDropBorder)',
});

const SubMenu: FC<{ sections: SubMenuSection[]; sepTitle?: boolean }> = ({
  sections,
  sepTitle = false,
}) => (
  <>
    {sections.map((section, index) => (
      <div key={index} className={cx(group, section.inline && groupInline)}>
        {section.title && (
          <span className={sepTitle ? groupTitleSep : groupTitleRoot}>{section.title}</span>
        )}
        {section.items.map((item) =>
          item.href ? (
            <a
              key={item.key}
              className={cx(link, section.inline ? linkInline : linkBlock)}
              href={item.href}
            >
              {item.label}
            </a>
          ) : (
            <span
              key={item.key}
              className={cx(link, textItem, section.inline ? linkInline : linkBlock)}
            >
              {item.label}
            </span>
          ),
        )}
      </div>
    ))}
  </>
);

type ChannelType = 'anime' | 'book' | 'music' | 'game' | 'real';

const CHANNEL_META: Record<
  ChannelType,
  { verb: string; browserLabel: string; tagLabel: string; blogLabel: string }
> = {
  anime: { verb: '看', browserLabel: '分类浏览', tagLabel: '动画标签', blogLabel: '动画日志' },
  book: { verb: '读', browserLabel: '分类浏览', tagLabel: '图书标签', blogLabel: '图书日志' },
  music: { verb: '听', browserLabel: '浏览全部', tagLabel: '音乐标签', blogLabel: '音乐日志' },
  game: { verb: '玩', browserLabel: '平台浏览', tagLabel: '游戏标签', blogLabel: '游戏日志' },
  real: { verb: '看', browserLabel: '分类浏览', tagLabel: '三次元标签', blogLabel: '三次元日志' },
};

/** 频道下拉（动画/书籍/音乐/游戏/三次元），登录后附加「我X」组（对齐原站结构） */
export const channelSubMenu = (type: ChannelType, username?: string): React.JSX.Element => {
  const meta = CHANNEL_META[type];
  const sections: SubMenuSection[] = [
    {
      inline: true,
      items: [
        { key: 'trends', label: '近期注目', href: `/${type}/browser?sort=trends` },
        { key: 'chart', label: '排行榜', href: `/${type}/chart` },
        { key: 'browser', label: meta.browserLabel, href: `/${type}/browser` },
        { key: 'tag', label: meta.tagLabel, href: `/${type}/tag` },
      ],
    },
    {
      items: [
        ...(type === 'anime' ? [{ key: 'calendar', label: '每日放送', href: '/calendar' }] : []),
        { key: 'blog', label: meta.blogLabel, href: `/${type}/blog` },
      ],
    },
  ];
  if (username) {
    sections.push({
      title: `我${meta.verb}`,
      inline: true,
      items: [
        { key: 'doing', label: `在${meta.verb}`, href: `/${type}/list/${username}/doing` },
        { key: 'wish', label: `想${meta.verb}`, href: `/${type}/list/${username}/wish` },
        { key: 'collect', label: `${meta.verb}过`, href: `/${type}/list/${username}/collect` },
        { key: 'onhold', label: '搁置', href: `/${type}/list/${username}/onhold` },
        { key: 'dropped', label: '抛弃', href: `/${type}/list/${username}/dropped` },
      ],
    });
  }
  return <SubMenu sections={sections} />;
};

/** 人物下拉（plain 结构，对齐原站 /mono 菜单） */
export const monoSubMenu = (username?: string): React.JSX.Element => {
  const sections: SubMenuSection[] = [
    {
      items: [
        { key: 'character', label: '虚构角色' },
        { key: 'person', label: '现实人物' },
      ],
    },
  ];
  if (username) {
    sections.push({
      title: '我',
      items: [
        { key: 'update', label: '关注人物更新' },
        { key: 'character', label: '收藏的角色' },
        { key: 'person', label: '收藏的人物' },
      ],
    });
  }
  return <SubMenu sections={sections} sepTitle />;
};

/** 小组下拉（plain 结构，对齐原站 /group 菜单） */
export const groupSubMenu = (username?: string): React.JSX.Element => {
  const sections: SubMenuSection[] = [
    {
      items: [
        { key: 'discover', label: '随便看看', href: '/group/discover' },
        { key: 'all', label: '所有小组', href: '/group/all' },
      ],
    },
  ];
  if (username) {
    sections.push({
      title: '我',
      items: [
        { key: 'my_topic', label: '发表的话题', href: '/group/my_topic' },
        { key: 'my_reply', label: '回复的话题', href: '/group/my_reply' },
        { key: 'mine', label: '参加的小组', href: '/group/mine' },
      ],
    });
  }
  return <SubMenu sections={sections} sepTitle />;
};

/** 探索下拉（对齐原站「探索」菜单结构，仅保留新站可用的入口） */
export const exploreSubMenu = (
  <SubMenu
    sections={[
      {
        inline: true,
        items: [
          { key: 'index', label: '目录', href: '/index' },
          { key: 'wiki', label: '维基人', href: '/wiki' },
        ],
      },
      {
        items: [{ key: 'dev', label: '开发者平台', href: '/dev/app' }],
      },
      {
        inline: true,
        items: [
          { key: 'magi', label: 'MAGI 问答', href: '/magi' },
          { key: 'dollars', label: 'Dollars', href: '/dollars' },
        ],
      },
      {
        title: '客户端',
        inline: true,
        items: [
          { key: 'onair', label: 'onAir', href: '/onair' },
          { key: 'mobile', label: 'Mobile', href: '/group/topic/5155' },
        ],
      },
      {
        items: [{ key: 'doujin', label: '天窗联盟', href: 'https://doujin.bgm.tv' }],
      },
    ]}
  />
);
