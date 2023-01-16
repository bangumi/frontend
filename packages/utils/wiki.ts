import type { Wiki } from '@bgm38/wiki';
import { WikiArrayItem, WikiItem } from '@bgm38/wiki';
import { flow, isArray, isEmpty, isEqual, keyBy, merge, omitBy } from 'lodash/fp';
import { nanoid } from 'nanoid';

// import { keyBy } from '.';

type Value = string | WikiElement[];

export class WikiElement {
  _id: string;
  key?: string;
  value?: Value;

  constructor(params?: Partial<{ id: string; key: string; value: Value }>) {
    const { id = nanoid(), key, value } = params ?? {};
    this._id = id;
    this.key = key;
    this.value = value;
  }
}

/** 方便 fp */
export const mergeWiki =
  (template: Wiki) =>
  (wiki: Wiki): Wiki => {
    // wiki 去掉 value 为 * 和 空值 的项。
    const wikiMap = flow(
      keyBy('key'),
      omitBy<WikiItem>((item, key) => {
        if (isArray(item.values)) return false;
        key = key.trim();
        return isEmpty(key) || isEmpty(item.value) || isEqual(item.value, '*');
      }),
    )(wiki.data);
    const templateMap = keyBy('key')(template.data); /** template is safe */
    const mergedWikiItems = Object.values(merge(templateMap, wikiMap) as WikiItem[]);
    return {
      type: template.type,
      data: mergedWikiItems,
    };
  };

/**
 * 把 wiki 类中的 data 转换为 WikiElement 数组。只支持二级嵌套
 * @param wiki wiki 类
 * @returns WikiElement 数组
 */
export const toWikiElement = (wiki: Wiki): WikiElement[] => {
  return wiki.data.map((item) => {
    return new WikiElement({
      key: item.key,
      value: Array.isArray(item.values)
        ? item.values.map(
            (i) =>
              new WikiElement({
                key: i.k,
                value: i.v,
              }),
          )
        : item.value,
    });
  });
};

/**
 * 把 WikiElement 数组恢复为 WikiItem 数组。只支持二级嵌套
 * @param wiki wiki 类
 * @returns WikiElement 数组
 */
export const fromWikiElement = (elements: WikiElement[]): WikiItem[] => {
  const items: WikiItem[] = [];
  for (const el of elements) {
    // 移除空项目
    if (isEmpty(el.value) && isEmpty(el.key)) continue;
    const value = el.value;
    const initWikiItemValue = typeof value === 'string' ? value : '';
    const item = new WikiItem(el.key ?? '', initWikiItemValue, 'object');
    if (Array.isArray(value) && el.key) {
      delete item.value; /** make up for unit-test */
      item.array = true;
      item.values = [];
      for (const subEl of value) {
        if (isEmpty(subEl.key) && isEmpty(subEl.value)) continue;
        item.values.push(new WikiArrayItem(subEl.key, subEl.value as string));
      }
      // 移除空项目
      if (item.values.length === 0) continue;
    }
    items.push(item);
  }
  return items;
};
