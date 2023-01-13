import { keyBy } from '@bangumi/utils';

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
  { key: WikiEditTabs.Index, label: '修订概况', to: (id: number) => `/subject/${id}/wiki/edit` },
  {
    key: WikiEditTabs.Detail,
    label: '详细描述',
    to: (id: number) => `/subject/${id}/wiki/edit_detail`,
  },
  {
    key: WikiEditTabs.Covers,
    label: '条目封面',
    to: (id: number) => `/subject/${id}/wiki/upload_img`,
  },
  {
    key: WikiEditTabs.Characters,
    label: '关联角色',
    to: (id: number) => `/subject/${id}/wiki/relate_character`,
  },
  {
    key: WikiEditTabs.Person,
    label: '关联人物',
    to: (id: number) => `/subject/${id}/wiki/relate_person`,
  },
  {
    key: WikiEditTabs.Subjects,
    label: '关联条目',
    to: (id: number) => `/subject/${id}/wiki/relate_subject`,
  },
  {
    key: WikiEditTabs.History,
    label: '修订历史',
    to: (id: number) => `/subject/${id}/wiki/history`,
  },
];

export const WikiEditTabsItemsByKey = keyBy(WikiEditTabsItems, 'key');

export const _TEST_SUBJECTS_ = 363612;
