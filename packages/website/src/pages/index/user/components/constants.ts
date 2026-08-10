import { CollectionType, SubjectType } from '@bangumi/client/client';

/** 用户主页可展示的条目收藏模块（homepage 配置中的 block 名） */
export const SUBJECT_BLOCK_LIST = [
  {
    block: 'anime',
    subjectType: SubjectType.Anime,
    label: '动画',
    homepageTitle: '我的动画',
    path: 'anime',
  },
  {
    block: 'book',
    subjectType: SubjectType.Book,
    label: '书籍',
    homepageTitle: '我的书籍',
    path: 'book',
  },
  {
    block: 'music',
    subjectType: SubjectType.Music,
    label: '音乐',
    homepageTitle: '我的音乐',
    path: 'music',
  },
  {
    block: 'game',
    subjectType: SubjectType.Game,
    label: '游戏',
    homepageTitle: '我的游戏',
    path: 'game',
  },
  {
    block: 'real',
    subjectType: SubjectType.Real,
    label: '三次元',
    homepageTitle: '我的电视剧',
    path: 'real',
  },
] as const;

export const SUBJECT_BLOCKS: Record<string, (typeof SUBJECT_BLOCK_LIST)[number]> =
  Object.fromEntries(SUBJECT_BLOCK_LIST.map((item) => [item.block, item]));

/** 收藏状态的中文名（对齐 CollectionPanel 的命名） */
export const COLLECTION_LABELS: Record<CollectionType, string> = {
  [CollectionType.Wish]: '想看',
  [CollectionType.Collect]: '看过',
  [CollectionType.Doing]: '在看',
  [CollectionType.OnHold]: '搁置',
  [CollectionType.Dropped]: '抛弃',
};

/** 收藏列表页 URL 中的状态段 → CollectionType */
export const COLLECTION_STATUS_ALIASES: Record<string, CollectionType> = {
  wish: CollectionType.Wish,
  collect: CollectionType.Collect,
  doing: CollectionType.Doing,
  onhold: CollectionType.OnHold,
  dropped: CollectionType.Dropped,
};

/** CollectionType → 收藏列表页 URL 中的状态段 */
export const COLLECTION_STATUS_PATHS: Record<CollectionType, string> = {
  [CollectionType.Wish]: 'wish',
  [CollectionType.Collect]: 'collect',
  [CollectionType.Doing]: 'doing',
  [CollectionType.OnHold]: 'onhold',
  [CollectionType.Dropped]: 'dropped',
};
