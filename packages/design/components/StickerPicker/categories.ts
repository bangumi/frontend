import type { StickerSetId } from '@bangumi/utils/stickers';

/** 导航项的标识。表情集合之外多一个「最近使用」 */
export type StickerNavId = StickerSetId | 'recent';

export const RECENT_NAV_ID = 'recent';

export const RECENT_NAV_LABEL = '最近使用';

/**
 * 各分类导航按钮的代表表情，沿用旧站主页选择器的选图：
 * tv 用 `tv/01.gif`、tv_vs 用 `bgm_200.png`、tv_500 用 `bgm_518.gif`、
 * bgm 用 `bgm/01.png`、角色贴纸用 `_03`，颜文字用旧站菜单图标 `13.gif`。
 */
export const SET_NAV_ICON: Readonly<Record<StickerSetId, string>> = {
  tv: '(bgm24)',
  tv_vs: '(bgm200)',
  tv_500: '(bgm518)',
  bgm: '(bgm01)',
  musume: '(musume_03)',
  blake: '(blake_03)',
  kaomoji: '(=///=)',
};

/** 经典表情格子边长（px） */
export const CLASSIC_CELL_SIZE = 30;

/** 角色贴纸格子边长（px）。原图 240x240，旧站在主页选择器里给到 56 */
export const CHARACTER_CELL_SIZE = 56;

/**
 * 吸顶导航的高度（px），供滚动高亮计算当前分类用。
 *
 * 注意：Panda 是构建期静态提取，`css()` 里不能引用这个常量，
 * 标题的 `scroll-margin-top` 必须写成同值字面量。
 */
export const NAV_HEIGHT = 40;
