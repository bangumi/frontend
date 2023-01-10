export enum WikiEditTabs {
  Index,
  Detail,
  Covers,
  Characters,
  Person,
  Subjects,
  History,
}

export const WikiEditTabsItems = [
  { key: WikiEditTabs.Index, label: '修订概况', to: (id: number) => `/subject/${id}/edit` },
  { key: WikiEditTabs.Detail, label: '详细描述', to: (id: number) => `/subject/${id}/edit_detail` },
  { key: WikiEditTabs.Covers, label: '条目封面', to: (id: number) => `/subject/${id}/upload_img` },
  {
    key: WikiEditTabs.Characters,
    label: '关联角色',
    to: (id: number) => `/subject/${id}/add_related/character`,
  },
  {
    key: WikiEditTabs.Person,
    label: '关联人物',
    to: (id: number) => `/subject/${id}/add_related/person`,
  },
  {
    key: WikiEditTabs.Subjects,
    label: '关联条目',
    to: (id: number) => `/subject/${id}/add_related/subject/anime`,
  },
  { key: WikiEditTabs.History, label: '修订历史', to: (id: number) => `/subject/${id}/history` },
];

export const _TEST_SUBJECTS_ = 363612;
