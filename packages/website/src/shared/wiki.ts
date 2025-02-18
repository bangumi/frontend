import { SubjectType } from '@bangumi/client/client';
import { keyBy, WikiTemplate } from '@bangumi/utils';

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

/**
 * 根据当前的 subject 类型，获取维基模板
 *
 * `wiki/subjectInfo` 接口会返回当前 wiki 的 platform（表单项中也称为 ‘类型’），每个 platform 都有可能有不同的模板
 * https://bangumi.github.io/dev-docs/#/wiki/subjectInfo `availablePlatform.wiki_tpl`
 * `wiki_tpl` 应为 WikiTemplate 的键。
 * 但某些 Wiki（Game，Music等）现只有单一模板（它们可能是无 platform，或者 platform 无 wiki_tpl）。
 * 所以针对这些 subject，提前返回 WikiTemplate。
 * 而其它 subject，则根据入参 `targetTemplate`，从 `WikiTemplate` 中提取模板。
 *
 * @param subjectType 枚举类型 SubjectType
 * @param targetTemplate keyof typeof WikiTemplate
 * @returns 维基模板字符串
 */
export const getWikiTemplate = (
  subjectType: SubjectType,
  targetTemplate: keyof typeof WikiTemplate | string | undefined,
) => {
  if (subjectType === SubjectType.Game) return WikiTemplate.Game;
  if (subjectType === SubjectType.Music) return WikiTemplate.Album;
  if (targetTemplate === undefined) return '';
  return WikiTemplate[targetTemplate as keyof typeof WikiTemplate] ?? '';
};
