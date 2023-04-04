import type { Wiki } from '@bgm38/wiki';
import { WikiArrayItem, WikiItem } from '@bgm38/wiki';
import { flow, isArray, isEmpty, isEqual, keyBy, merge, omitBy } from 'lodash/fp';
import { nanoid } from 'nanoid';

// import { keyBy } from '.';

type Value = string | WikiElement[];

export const WikiTemplate = {
  TVAnime:
    '{{Infobox animanga/TVAnime\n|中文名= \n|别名= {\n\n}\n|话数= * \n|放送开始= * \n|放送星期=\n|官方网站=\n|播放电视台=\n|其他电视台= \n|播放结束= \n|其他= \n|Copyright=\n}}' /** TV,WEB(anime) */,
  OVA: '{{Infobox animanga/OVA\n|中文名= \n|别名= {\n\n}\n|话数= * \n|发售日= * \n|官方网站=\n|开始= \n|结束= \n|其他= \n}}',
  Movie:
    '{{Infobox animanga/Movie\n|中文名= \n|别名= {\n\n}\n|上映年度= * \n|片长= \n|官方网站=\n|其他= \n|Copyright= \n}}' /** 剧场版 */,
  Anime:
    '{{Infobox animanga/Anime\n|中文名= \n|别名= {\n\n}\n|上映年度= * \n|片长= \n|官方网站=\n|其他= \n|Copyright= \n}}' /** 其它(anime) */,
  Book: '{{Infobox animanga/Book\n|中文名= \n|别名= {\n\n}\n|出版社= *\n|价格=\n|其他出版社= \n|连载杂志= \n|发售日= \n|页数=\n|ISBN= \n|其他= \n}}' /** 画集 */,
  Manga:
    '{{Infobox animanga/Manga\n|中文名= \n|别名= {\n\n}\n|出版社= *\n|价格=\n|其他出版社= \n|连载杂志= \n|发售日= \n|册数= \n|页数=\n|话数= \n|ISBN= \n|其他= \n}}' /** 漫画 */,
  Novel:
    '{{Infobox animanga/Novel\n|中文名= \n|别名= {\n\n}\n|出版社= * \n|价格=\n|连载杂志= \n|发售日= \n|册数= \n|页数=\n|话数= \n|ISBN= \n|其他= \n}}' /** 小说 */,
  BookSeries:
    '{{Infobox animanga/BookSeries\n|中文名= \n|别名= {\n\n}\n|出版社= * \n|连载杂志= \n|开始= \n|结束= \n|册数= \n |话数= \n|其他= \n}}',
  Album:
    '{{Infobox Album\n|中文名=\n|别名= {\n\n}\n|版本特性= \n|发售日期= \n|价格= \n|播放时长= \n|录音= \n|碟片数量= \n}}' /** 没有类型选择 */,
  Game: '{{Infobox Game\n|中文名=\n|别名= {\n\n}\n|平台= {\n\n}\n|游戏类型=\n|游戏引擎=\n|游玩人数=\n|发行日期=\n|售价=\n|website=\n}}' /** 没有类型选择 */,
  TV: '{{Infobox real/Television\n|中文名=\n|别名= {\n\n}\n|集数=\n|放送星期=\n|开始=\n|结束=\n|类型=\n|国家/地区=\n|语言=\n|每集长=\n|频道=\n|电视网=\n|电视台=\n|视频制式=\n|音频制式=\n|首播国家=\n|首播地区=\n|台湾名称=\n|港澳名称=\n|马新名称=\n|官方网站=\n|imdb_id=\n|tv_com_id=\n}} ' /** X剧 */,
  Crt: '{{Infobox Crt\n|简体中文名=\n|别名={\n[第二中文名|]\n[英文名|]\n[日文名|]\n[纯假名|]\n[罗马字|]\n[昵称|]\n}\n|性别=\n|生日=\n|血型=\n|身高=\n|体重=\n|BWH=\n|引用来源={\n}\n}}' /** 没有类型选择 */,
  doujinBook:
    '{{Infobox doujin/Book\n|作者={\n\n}\n|原作=\n|CP=\n|语言=\n|页数=\n|尺寸=\n|价格=\n|发售日=\n}}',
  doujinMusic:
    '{{Infobox doujin/Album\n|艺术家={\n\n}\n|原作=\n|语言=\n|版本特性=\n|碟片数量=\n|播放时长=\n|价格=\n|发售日=\n}}',
  doujinGame:
    '{{Infobox doujin/Game\n|别名= {\n\n}\n|开发者={\n\n}\n|原作=\n|平台=\n|游戏类型=\n|游戏引擎=\n|游玩人数=\n|语言=\n|价格=\n|发售日=\n}}',
};

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
  (
    wiki: Omit<Wiki, 'data'> & {
      data: Array<Pick<WikiItem, 'key' | 'value' | 'values' | 'array'>>;
    },
  ): Wiki => {
    // wiki 去掉 value 为 * 和 空值 的项。
    const wikiMap = flow(
      keyBy('key'),
      omitBy<WikiItem>((item, key) => {
        if (isArray(item.values)) return false;
        key = key.trim();
        item.value && (item.value = item.value.trim());
        return isEmpty(key) || isEmpty(item.value) || isEqual(item.value, '*');
      }),
    )(wiki.data);
    const templateMap = keyBy('key')(template.data);
    /** template is safe */
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
export const fromWikiElement = (elements: WikiElement[]): WikiItem[] =>
  elements
    .filter(
      (el) =>
        !isEmpty(el.value) /** 值为空 */ ||
        !isEmpty(el.key) /** 键为空 */ ||
        !(isArray(el.value) && el.value.length === 0) /** value 是数组，但是是空数组 */,
    )
    .map((el) => {
      const value = el.value;
      const initWikiItemValue = typeof value === 'string' ? value : '';
      const item = new WikiItem(el.key ?? '', initWikiItemValue, 'object');
      if (Array.isArray(value) && el.key) {
        // 取悦单元测试
        // @bgm38/wiki@0.1.3
        // 如果 WikiItem 的值（values）是数组，那么，value 应该是 undefined
        // 但 WikiItem 的构造函数签名，value 不能是 undefined（必须是字符串）
        // 为了与单元测试的数据相 match，需要把对象中的 value 移除（设为 undefined）
        delete item.value;

        item.array = true;
        item.values = value.map((subEl) => new WikiArrayItem(subEl.key, subEl.value as string));
        // 移除空项目
      }
      return item;
    });
