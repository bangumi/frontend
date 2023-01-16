import { keyBy } from '@bangumi/utils';

export const enum SubjectType {
  Unknown = 0,
  Book = 1, // 书籍
  Anime = 2, // 动画
  Music = 3, // 音乐
  Game = 4, // 游戏
  Real = 6, // 三次元
}

export enum WikiEditTabs {
  Index = 'edit',
  Detail = 'edit_detail',
  Covers = 'upload_img',
  Characters = 'character',
  Person = 'person',
  Subjects = 'anime',
  History = 'history',
}

export const WikiEditTabsItems = [
  { key: WikiEditTabs.Index, label: '修订概况', to: (id = '') => `/subject/${id}/wiki/edit` },
  {
    key: WikiEditTabs.Detail,
    label: '详细描述',
    to: (id = '') => `/subject/${id}/wiki/edit_detail`,
  },
  {
    key: WikiEditTabs.Covers,
    label: '条目封面',
    to: (id = '') => `/subject/${id}/wiki/upload_img`,
  },
  {
    key: WikiEditTabs.Characters,
    label: '关联角色',
    to: (id = '') => `/subject/${id}/wiki/relate_character`,
  },
  {
    key: WikiEditTabs.Person,
    label: '关联人物',
    to: (id = '') => `/subject/${id}/wiki/relate_person`,
  },
  {
    key: WikiEditTabs.Subjects,
    label: '关联条目',
    to: (id = '') => `/subject/${id}/wiki/relate_subject`,
  },
  {
    key: WikiEditTabs.History,
    label: '修订历史',
    to: (id = '') => `/subject/${id}/wiki/history`,
  },
];

export const WikiEditTabsItemsByKey = keyBy(WikiEditTabsItems, 'key');

const WikiTemplate = {
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

export const getWikiTemplate = (subjectType: number, targetTemplate: string | undefined) => {
  if (subjectType === SubjectType.Game) return WikiTemplate.Game;
  if (subjectType === SubjectType.Music) return WikiTemplate.Album;
  if (targetTemplate === undefined) return '';
  return WikiTemplate[targetTemplate as keyof typeof WikiTemplate] ?? '';
};
