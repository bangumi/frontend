import { keyBy, WikiTemplate } from '@bangumi/utils';

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

export const getWikiTemplate = (subjectType: number, targetTemplate: string | undefined) => {
  if (subjectType === SubjectType.Game) return WikiTemplate.Game;
  if (subjectType === SubjectType.Music) return WikiTemplate.Album;
  if (targetTemplate === undefined) return '';
  return WikiTemplate[targetTemplate as keyof typeof WikiTemplate] ?? '';
};
