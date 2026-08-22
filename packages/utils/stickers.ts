/**
 * Bangumi 站内表情目录。
 *
 * 这是表情数据的唯一事实来源：BBCode 解析器用它判断代码是否有效，转换器用它取图片地址，
 * 表情选择器用它枚举分类。三者读同一份数据，新增一套表情只需在下方的 spec 表加一行。
 *
 * 集合划分、分类名称与编号范围均取自旧站编辑器 bundle（`emoji_editor_sections`）。
 */

import type { CharacterStickerGroup } from './sticker-names.ts';
import {
  BLAKE_ONLY_IDS,
  CHARACTER_STICKER_GROUPS,
  CHARACTER_STICKER_NAMES,
} from './sticker-names.ts';

export const STICKER_DOMAIN_URL = 'https://lain.bgm.tv';

/** 表情集合标识 */
export type StickerSetId = 'kaomoji' | 'bgm' | 'tv' | 'tv_vs' | 'tv_500' | 'musume' | 'blake';

/** 单个表情 */
export interface Sticker {
  /** 正文中的表情代码，如 `(bgm38)` `(musume_03)` `(=A=)` */
  readonly code: string;
  readonly url: string;
  /**
   * 旧站 `smileid` 属性值，渲染时原样输出以与旧站保持一致，前端自身不消费该值。
   */
  readonly smileid: string;
  readonly set: StickerSetId;
  /** 官方中文名，目前仅角色贴纸有 */
  readonly name?: string;
  /** 图片原始像素尺寸，用于渲染时预留空间消除布局抖动 */
  readonly width: number;
  readonly height: number;
  /** 是否为 240x240 大图角色贴纸，决定是否限宽与懒加载 */
  readonly large: boolean;
}

/** 集合内的语义分节，目前仅角色贴纸有 */
export interface StickerSection {
  readonly name: string;
  readonly codes: readonly string[];
}

/** 表情集合，表情选择器按此分类展示 */
export interface StickerSet {
  readonly id: StickerSetId;
  /** 官方名称，取自旧站，多为作者署名 */
  readonly label: string;
  readonly large: boolean;
  /** 集合内全部表情代码，数组顺序即展示顺序 */
  readonly codes: readonly string[];
  /** 语义分节；没有分节的集合为 undefined */
  readonly sections?: readonly StickerSection[];
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

/** 角色贴纸编号补零到 2 位，三位数保持原样 */
const padCharacterId = (n: number): string => (n < 100 ? pad2(n) : String(n));

/** bgm 集合中扩展名为 gif 的编号，其余为 png */
const BGM_GIF_IDS = new Set([11, 23]);

/** tv_500 集合中扩展名为 gif 的编号，其余为 png */
const TV_500_GIF_IDS = new Set([500, 501, 505, 515, 516, 517, 518, 519, 521, 522, 523]);

/**
 * 颜文字表情，顺序即旧站的 smileid 顺序，不可重排。
 * 每张图尺寸都不同，故与宽高一并声明。
 */
const KAOMOJI: readonly (readonly [code: string, width: number, height: number])[] = [
  ['(=A=)', 23, 19],
  ['(=w=)', 23, 11],
  ['(-w=)', 23, 9],
  ['(S_S)', 29, 16],
  ['(=v=)', 25, 16],
  ['(@_@)', 27, 14],
  ['(=W=)', 27, 19],
  ['(TAT)', 33, 17],
  ['(T_T)', 23, 16],
  ["(='=)", 26, 14],
  ['(=3=)', 25, 15],
  ["(= =')", 24, 27],
  ['(=///=)', 21, 10],
  ['(=.,=)', 20, 11],
  ['(:P)', 28, 17],
  ['(LOL)', 27, 21],
];

/** 颜文字代码，顺序即 smileid 顺序 */
export const KAOMOJI_CODES: readonly string[] = KAOMOJI.map(([code]) => code);

/** 最长颜文字的长度，供解析器预读 */
export const MAX_KAOMOJI_LENGTH = KAOMOJI_CODES.reduce(
  (max, code) => Math.max(max, code.length),
  0,
);

/** 角色贴纸的代码前缀 */
export const CHARACTER_STICKER_PREFIXES = ['musume', 'blake'] as const;

/** 角色贴纸前缀 */
export type CharacterStickerPrefix = (typeof CHARACTER_STICKER_PREFIXES)[number];

/** 以 `(bgmNN)` 形式寻址的表情集合 */
interface NumberedSetSpec {
  readonly id: StickerSetId;
  readonly label: string;
  readonly ranges: readonly (readonly [start: number, end: number])[];
  readonly width: number;
  readonly height: number;
  readonly code: (n: number) => string;
  readonly path: (n: number) => string;
}

const NUMBERED_SET_SPECS: readonly NumberedSetSpec[] = [
  {
    id: 'tv',
    label: 'BangumiTV by Cinnamor',
    ranges: [[24, 125]],
    width: 21,
    height: 21,
    code: (n) => `(bgm${n})`,
    path: (n) => `/img/smiles/tv/${pad2(n - 23)}.gif`,
  },
  {
    id: 'tv_vs',
    label: 'BangumiTV by 神戸小鳥',
    ranges: [[200, 238]],
    width: 21,
    height: 21,
    code: (n) => `(bgm${n})`,
    path: (n) => `/img/smiles/tv_vs/bgm_${n}.png`,
  },
  {
    id: 'tv_500',
    label: 'BangumiTV by 五行行行行行啊',
    ranges: [[500, 529]],
    width: 21,
    height: 21,
    code: (n) => `(bgm${n})`,
    path: (n) => `/img/smiles/tv_500/bgm_${n}.${TV_500_GIF_IDS.has(n) ? 'gif' : 'png'}`,
  },
  {
    id: 'bgm',
    label: 'BangumiTV by dsm',
    ranges: [[1, 23]],
    width: 20,
    height: 20,
    code: (n) => `(bgm${pad2(n)})`,
    path: (n) => `/img/smiles/bgm/${pad2(n)}.${BGM_GIF_IDS.has(n) ? 'gif' : 'png'}`,
  },
];

const CHARACTER_SET_LABELS: Readonly<Record<CharacterStickerPrefix, string>> = {
  musume: 'Bangumi 娘 by 貓魚',
  blake: 'Blake 娘 by 貓魚',
};

const byCode = new Map<string, Sticker>();
/** `(bgmNN)` 系列按编号索引，使补零写法与非补零写法归一到同一表情 */
const byNumber = new Map<number, Sticker>();

function register(sticker: Sticker, n?: number): Sticker {
  byCode.set(sticker.code, sticker);
  if (n !== undefined) {
    byNumber.set(n, sticker);
  }
  return sticker;
}

function buildKaomojiSet(): StickerSet {
  const codes = KAOMOJI.map(([code, width, height], index) => {
    const id = index + 1;
    register({
      code,
      url: `${STICKER_DOMAIN_URL}/img/smiles/${id}.gif`,
      smileid: String(id),
      set: 'kaomoji',
      width,
      height,
      large: false,
    });
    return code;
  });
  return { id: 'kaomoji', label: '颜文字', large: false, codes };
}

function buildNumberedSet(spec: NumberedSetSpec): StickerSet {
  const codes: string[] = [];
  for (const [start, end] of spec.ranges) {
    for (let n = start; n <= end; n++) {
      const code = spec.code(n);
      register(
        {
          code,
          url: `${STICKER_DOMAIN_URL}${spec.path(n)}`,
          // 旧站的 smileid 把 16 个颜文字排在 bgm 系列之前
          smileid: String(n + KAOMOJI.length),
          set: spec.id,
          width: spec.width,
          height: spec.height,
          large: false,
        },
        n,
      );
      codes.push(code);
    }
  }
  return { id: spec.id, label: spec.label, large: false, codes };
}

/**
 * 角色贴纸按语义分组展开。blake 专属的 97、98 排在「动作道具」之后，与旧站一致。
 */
function characterGroupsFor(prefix: CharacterStickerPrefix): readonly CharacterStickerGroup[] {
  if (prefix !== 'blake') {
    return CHARACTER_STICKER_GROUPS;
  }
  return CHARACTER_STICKER_GROUPS.map((group) =>
    group.name === '动作道具'
      ? { name: group.name, ids: [...group.ids, ...BLAKE_ONLY_IDS] }
      : group,
  );
}

function buildCharacterSet(prefix: CharacterStickerPrefix): StickerSet {
  const sections = characterGroupsFor(prefix).map((group) => ({
    name: group.name,
    codes: group.ids.map((id) => {
      const idStr = padCharacterId(id);
      const code = `(${prefix}_${idStr})`;
      register({
        code,
        url: `${STICKER_DOMAIN_URL}/img/smiles/${prefix}/${prefix}_${idStr}.gif`,
        smileid: `${prefix}_${idStr}`,
        set: prefix,
        name: CHARACTER_STICKER_NAMES[id],
        width: 240,
        height: 240,
        large: true,
      });
      return code;
    }),
  }));
  return {
    id: prefix,
    label: CHARACTER_SET_LABELS[prefix],
    large: true,
    codes: sections.flatMap((section) => section.codes),
    sections,
  };
}

/**
 * 全部表情集合，数组顺序即表情选择器的分类顺序（沿用旧站，最常用的 TV 表情在前）。
 */
export const STICKER_SETS: readonly StickerSet[] = [
  ...NUMBERED_SET_SPECS.map(buildNumberedSet),
  buildCharacterSet('musume'),
  buildCharacterSet('blake'),
  buildKaomojiSet(),
];

/**
 * 按表情代码查找。`(bgm038)` 与 `(bgm38)` 归一化为同一张表情。
 */
export function getSticker(code: string): Sticker | undefined {
  const m = /^\(bgm(\d+)\)$/.exec(code);
  if (m) {
    return byNumber.get(Number.parseInt(m[1]!, 10));
  }
  return byCode.get(code);
}

/** 代码是否为受支持的表情 */
export function isStickerCode(code: string): boolean {
  return getSticker(code) !== undefined;
}
