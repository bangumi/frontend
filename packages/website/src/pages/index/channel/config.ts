import { SubjectType } from '@bangumi/client/client';

export type ChannelKey = 'anime' | 'book' | 'music' | 'game' | 'real';

interface ChannelLink {
  label: string;
  path: string;
}

export interface ChannelConfig {
  key: ChannelKey;
  type: SubjectType;
  title: string;
  verb: '看' | '读' | '听' | '玩';
  categories: ChannelLink[];
  links: ChannelLink[];
}

const createCommonLinks = (key: ChannelKey, title: string): ChannelLink[] => [
  { label: '排行榜', path: `/${key}/chart` },
  { label: `${title}日志`, path: `/${key}/blog` },
];

export const CHANNEL_CONFIGS: Record<ChannelKey, ChannelConfig> = {
  anime: {
    key: 'anime',
    type: SubjectType.Anime,
    title: '动画',
    verb: '看',
    categories: [
      { label: '全部', path: '/anime/browser' },
      { label: 'TV', path: '/anime/browser/platform/tv' },
      { label: 'WEB', path: '/anime/browser/platform/web' },
      { label: 'OVA', path: '/anime/browser/platform/ova' },
      { label: '剧场版', path: '/anime/browser/platform/movie' },
    ],
    links: [
      { label: '排行榜', path: '/anime/chart' },
      { label: '每日放送', path: '/calendar' },
      { label: '动画日志', path: '/anime/blog' },
    ],
  },
  book: {
    key: 'book',
    type: SubjectType.Book,
    title: '书籍',
    verb: '读',
    categories: [{ label: '浏览全部', path: '/book/browser' }],
    links: createCommonLinks('book', '书籍'),
  },
  music: {
    key: 'music',
    type: SubjectType.Music,
    title: '音乐',
    verb: '听',
    categories: [{ label: '浏览全部', path: '/music/browser' }],
    links: createCommonLinks('music', '音乐'),
  },
  game: {
    key: 'game',
    type: SubjectType.Game,
    title: '游戏',
    verb: '玩',
    categories: [{ label: '平台浏览', path: '/game/browser' }],
    links: createCommonLinks('game', '游戏'),
  },
  real: {
    key: 'real',
    type: SubjectType.Real,
    title: '三次元',
    verb: '看',
    categories: [{ label: '浏览全部', path: '/real/browser' }],
    links: createCommonLinks('real', '三次元'),
  },
};
