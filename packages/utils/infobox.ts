/**
 * infobox 展示格式化工具，对齐 PHP 旧站 ChiiCodeCore::formatWikiCode 的规则：
 * - 空值项不显示（解析阶段 PHP 会跳过空值，API 返回仍可能携带空项）
 * - 置顶 key 优先显示，链接类 key 排到末尾，其余保持原顺序
 */

export interface InfoboxValue {
  k?: string;
  v: string;
}

export interface InfoboxItem {
  key: string;
  values: InfoboxValue[];
}

export type Infobox = InfoboxItem[];

/** 置顶 key，按此顺序排列在 infobox 最前（对应 PHP $wiki_pin_set） */
const PIN_KEYS = ['中文名', '册数', '话数', '放送开始', '放送星期'];

/** 置底 key，按此顺序排列在 infobox 末尾（对应 PHP $wiki_link_set） */
const LINK_KEYS = [
  '链接',
  '相关链接',
  '官网',
  '官方网站',
  'website',
  '引用来源',
  'HP',
  '个人博客',
  '博客',
  'Blog',
  '主页',
];

/**
 * 过滤空值并按预定顺序重排 subject infobox。
 *
 * @param infobox 服务端返回的 infobox
 * @returns 过滤空值后的 infobox，顺序为：置顶 key → 其余原顺序 → 链接类 key
 */
export function formatSubjectInfobox(infobox: Infobox): Infobox {
  const items = infobox
    .map((item) => ({
      ...item,
      values: item.values.filter((value) => value.v.trim() !== ''),
    }))
    .filter((item) => item.key !== '' && item.values.length > 0);

  const pinItems: InfoboxItem[] = [];
  const restItems: InfoboxItem[] = [];
  const linkItems: InfoboxItem[] = [];

  for (const item of items) {
    if (PIN_KEYS.includes(item.key)) {
      pinItems.push(item);
    } else if (LINK_KEYS.includes(item.key)) {
      linkItems.push(item);
    } else {
      restItems.push(item);
    }
  }

  pinItems.sort((a, b) => PIN_KEYS.indexOf(a.key) - PIN_KEYS.indexOf(b.key));
  linkItems.sort((a, b) => LINK_KEYS.indexOf(a.key) - LINK_KEYS.indexOf(b.key));

  return [...pinItems, ...restItems, ...linkItems];
}
