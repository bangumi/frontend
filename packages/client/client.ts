/**
 * bangumi private api
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from 'oazapfts/lib/runtime';
import * as QS from 'oazapfts/lib/runtime/query';
export const defaults: Oazapfts.RequestOpts = {
  baseUrl: '/',
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {};
export type ErrorResponse = {
  code: string;
  error: string;
  message: string;
  statusCode: number;
};
export type Avatar = {
  large: string;
  medium: string;
  small: string;
};
export type SlimUser = {
  avatar: Avatar;
  id: number;
  joinedAt: number;
  nickname: string;
  sign: string;
  username: string;
};
export type BlogEntry = {
  content: string;
  createdAt: number;
  icon: string;
  id: number;
  noreply: number;
  public: boolean;
  related: number;
  replies: number;
  tags: string[];
  title: string;
  type: number;
  updatedAt: number;
  user: SlimUser;
  views: number;
};
export type BlogPhoto = {
  createdAt: number;
  icon: string;
  id: number;
  target: string;
  vote: number;
};
export type SubjectImages = {
  common: string;
  grid: string;
  large: string;
  medium: string;
  small: string;
};
export type SubjectRating = {
  count: number[];
  rank: number;
  score: number;
  total: number;
};
export type SubjectType = 1 | 2 | 3 | 4 | 6;
export type SlimSubject = {
  id: number;
  images?: SubjectImages;
  info: string;
  locked: boolean;
  name: string;
  nameCN: string;
  nsfw: boolean;
  rating: SubjectRating;
  type: SubjectType;
};
export type Calendar = {
  [key: string]: {
    subject: SlimSubject;
    watchers: number;
  }[];
};
export type PersonImages = {
  grid: string;
  large: string;
  medium: string;
  small: string;
};
export type Infobox = {
  key: string;
  values: {
    k?: string;
    v: string;
  }[];
}[];
export type Character = {
  collects: number;
  comment: number;
  id: number;
  images?: PersonImages;
  infobox: Infobox;
  lock: boolean;
  name: string;
  nameCN: string;
  nsfw: boolean;
  redirect: number;
  role: number;
  summary: string;
};
export type SlimPerson = {
  comment: number;
  id: number;
  images?: PersonImages;
  lock: boolean;
  name: string;
  nameCN: string;
  nsfw: boolean;
  type: number;
};
export type CharacterSubject = {
  actors: SlimPerson[];
  subject: SlimSubject;
  type: number;
};
export type PersonCollect = {
  createdAt: number;
  user: SlimUser;
};
export type UpdatePost = {
  /** bbcode */
  content: string;
};
export type SlimGroup = {
  accessible: boolean;
  createdAt: number;
  creatorID: number;
  icon: Avatar;
  id: number;
  members: number;
  name: string;
  nsfw: boolean;
  title: string;
};
export type SimpleUser = {
  id: number;
  nickname: string;
  username: string;
};
export type Reaction = {
  users: SimpleUser[];
  value: number;
};
export type SubReply = {
  createdAt: number;
  creator?: SlimUser;
  creatorID: number;
  id: number;
  reactions: Reaction[];
  state: number;
  text: string;
};
export type Reply = {
  createdAt: number;
  creator?: SlimUser;
  creatorID: number;
  id: number;
  reactions: Reaction[];
  replies: SubReply[];
  state: number;
  text: string;
};
export type TopicDetail = {
  content: string;
  createdAt: number;
  creator: SlimUser;
  display: number;
  id: number;
  parent: SlimGroup | SlimSubject;
  reactions: Reaction[];
  replies: Reply[];
  state: number;
  title: string;
};
export type UpdateTopic = {
  /** bbcode */
  content: string;
  title: string;
};
export type CreatePost = {
  /** 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
    next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
    dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
  'cf-turnstile-response': string;
  content: string;
  /** 被回复的帖子 ID, `0` 代表回复楼主 */
  replyTo?: number;
};
export type Group = {
  accessible: boolean;
  cat: number;
  createdAt: number;
  creator: SlimUser;
  creatorID: number;
  description: string;
  icon: Avatar;
  id: number;
  members: number;
  name: string;
  nsfw: boolean;
  posts: number;
  title: string;
  topics: number;
};
export type GroupMember = {
  joinedAt: number;
  moderator: boolean;
  uid: number;
  user?: SlimUser;
};
export type Topic = {
  /** 发帖时间，unix time stamp in seconds */
  createdAt: number;
  creator?: SlimUser;
  creatorID: number;
  display: number;
  id: number;
  /** 小组/条目ID */
  parentID: number;
  replies: number;
  state: number;
  title: string;
  /** 最后回复时间，unix time stamp in seconds */
  updatedAt: number;
};
export type CreateTopic = {
  /** 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
    next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
    dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
  'cf-turnstile-response': string;
  /** bbcode */
  content: string;
  title: string;
};
export type LoginRequestBody = {
  'cf-turnstile-response': string;
  email: string;
  password: string;
};
export type CurrentUser = {
  avatar: Avatar;
  id: number;
  joinedAt: number;
  nickname: string;
  sign: string;
  username: string;
} & {
  permission: {
    subjectWikiEdit: boolean;
  };
};
export type Notice = {
  /** unix timestamp in seconds */
  createdAt: number;
  id: number;
  postID: number;
  sender: {
    avatar: Avatar;
    id: number;
    joinedAt: number;
    nickname: string;
    sign: string;
    username: string;
  };
  title: string;
  topicID: number;
  /** 查看 `./lib/notify.ts` _settings */
  type: number;
  unread: boolean;
};
export type Person = {
  /** 职业 */
  career: string[];
  collects: number;
  comment: number;
  id: number;
  images?: PersonImages;
  infobox: Infobox;
  lock: boolean;
  name: string;
  nameCN: string;
  nsfw: boolean;
  redirect: number;
  summary: string;
  type: number;
};
export type SlimCharacter = {
  comment: number;
  id: number;
  images?: PersonImages;
  lock: boolean;
  name: string;
  nameCN: string;
  nsfw: boolean;
  role: number;
};
export type CharacterSubjectRelation = {
  subject: SlimSubject;
  type: number;
};
export type PersonCharacter = {
  character: SlimCharacter;
  relations: CharacterSubjectRelation[];
};
export type SubjectStaffPositionType = {
  cn: string;
  en: string;
  id: number;
  jp: string;
};
export type SubjectStaffPosition = {
  appearEps: string;
  summary: string;
  type: SubjectStaffPositionType;
};
export type PersonWork = {
  positions: SubjectStaffPosition[];
  subject: SlimSubject;
};
export type SubjectSort = 'rank' | 'trends' | 'collects' | 'date' | 'title';
export type SubjectAirtime = {
  date: string;
  month: number;
  weekday: number;
  year: number;
};
export type SubjectCollection = {
  [key: string]: number;
};
export type SubjectPlatform = {
  alias: string;
  enableHeader?: boolean;
  id: number;
  order?: number;
  searchString?: string;
  sortKeys?: string[];
  type: string;
  typeCN: string;
  wikiTpl?: string;
};
export type SubjectTag = {
  count: number;
  name: string;
};
export type Subject = {
  airtime: SubjectAirtime;
  collection: SubjectCollection;
  eps: number;
  id: number;
  images?: SubjectImages;
  info: string;
  infobox: Infobox;
  locked: boolean;
  metaTags: string[];
  name: string;
  nameCN: string;
  nsfw: boolean;
  platform: SubjectPlatform;
  rating: SubjectRating;
  redirect: number;
  series: boolean;
  seriesEntry: number;
  summary: string;
  tags: SubjectTag[];
  type: SubjectType;
  volumes: number;
};
export type UpdateEpisodeComment = {
  content: string;
};
export type EpisodeType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Episode = {
  airdate: string;
  comment: number;
  desc?: string;
  disc: number;
  duration: string;
  id: number;
  name: string;
  nameCN: string;
  sort: number;
  subject?: SlimSubject;
  subjectID: number;
  type: EpisodeType;
};
export type EpisodeCommentBase = {
  content: string;
  createdAt: number;
  creatorID: number;
  epID: number;
  id: number;
  reactions: Reaction[];
  relatedID: number;
  state: number;
  user: SlimUser;
};
export type CreateEpisodeComment = {
  /** 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
    next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
    dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
  'cf-turnstile-response': string;
  content: string;
  /** 被回复的吐槽 ID, `0` 代表发送顶层吐槽 */
  replyTo?: number;
};
export type SubjectCharacter = {
  actors: SlimPerson[];
  character: SlimCharacter;
  order: number;
  type: number;
};
export type CollectionType = 1 | 2 | 3 | 4 | 5;
export type SubjectComment = {
  comment: string;
  id: number;
  rate: number;
  reactions?: Reaction[];
  type: CollectionType;
  updatedAt: number;
  user: SlimUser;
};
export type SubjectRec = {
  count: number;
  sim: number;
  subject: SlimSubject;
};
export type SubjectRelationType = {
  cn: string;
  desc: string;
  en: string;
  id: number;
  jp: string;
};
export type SubjectRelation = {
  order: number;
  relation: SubjectRelationType;
  subject: SlimSubject;
};
export type SlimBlogEntry = {
  createdAt: number;
  icon: string;
  id: number;
  public: boolean;
  replies: number;
  summary: string;
  title: string;
  type: number;
  uid: number;
  updatedAt: number;
};
export type SubjectReview = {
  entry: SlimBlogEntry;
  id: number;
  user: SlimUser;
};
export type SubjectStaff = {
  positions: SubjectStaffPosition[];
  staff: SlimPerson;
};
export type SubjectPositionStaff = {
  appearEps: string;
  person: SlimPerson;
  summary: string;
};
export type SubjectPosition = {
  position: SubjectStaffPositionType;
  staffs: SubjectPositionStaff[];
};
export type FilterMode = 'all' | 'friends';
export type TimelineCat = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SlimIndex = {
  createdAt: number;
  id: number;
  title: string;
  total: number;
  type: number;
};
export type TimelineMemo = {
  blog?: SlimBlogEntry;
  daily?: {
    groups?: SlimGroup[];
    users?: SlimUser[];
  };
  index?: SlimIndex;
  mono?: {
    characters: SlimCharacter[];
    persons: SlimPerson[];
  };
  progress?: {
    batch?: {
      epsTotal: string;
      epsUpdate?: number;
      subject: SlimSubject;
      volsTotal: string;
      volsUpdate?: number;
    };
    single?: {
      episode: Episode;
      subject: SlimSubject;
    };
  };
  status?: {
    nickname?: {
      after: string;
      before: string;
    };
    sign?: string;
    tsukkomi?: string;
  };
  subject?: {
    collectID?: number;
    comment: string;
    rate: number;
    reactions?: Reaction[];
    subject: SlimSubject;
  }[];
  wiki?: {
    subject?: SlimSubject;
  };
};
export type TimelineSource = 0 | 1 | 2 | 3 | 4 | 5;
export type Timeline = {
  batch: boolean;
  cat: TimelineCat;
  createdAt: number;
  id: number;
  memo: TimelineMemo;
  replies: number;
  source: TimelineSource;
  type: number;
  uid: number;
  user?: SlimUser;
};
export type CreateTimelineSay = {
  /** 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
    next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
    dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
  'cf-turnstile-response': string;
  content: string;
};
export type TrendingSubject = {
  count: number;
  subject: Subject;
};
export type EpisodeCollectionStatus = 0 | 1 | 2 | 3;
export type UserSubjectEpisodeCollection = {
  episode: Episode;
  type: EpisodeCollectionStatus;
};
export type UserHomepageSection =
  | 'anime'
  | 'game'
  | 'book'
  | 'music'
  | 'real'
  | 'mono'
  | 'blog'
  | 'friend'
  | 'group'
  | 'index';
export type UserHomepage = {
  left: UserHomepageSection[];
  right: UserHomepageSection[];
};
export type UserIndexStats = {
  collect: number;
  create: number;
};
export type UserMonoCollectionStats = {
  character: number;
  person: number;
};
export type UserSubjectCollectionStats = {
  [key: string]: {
    [key: string]: number;
  };
};
export type UserStats = {
  blog: number;
  friend: number;
  group: number;
  index: UserIndexStats;
  mono: UserMonoCollectionStats;
  subject: UserSubjectCollectionStats;
};
export type User = {
  avatar: Avatar;
  bio: string;
  group: number;
  homepage: UserHomepage;
  id: number;
  joinedAt: number;
  location: string;
  networkServices: {
    account: string;
    color: string;
    name: string;
    title: string;
    url: string;
  }[];
  nickname: string;
  sign: string;
  site: string;
  stats: UserStats;
  /** deprecated, use group instead */
  user_group: number;
  username: string;
};
export type UserCharacterCollection = {
  character: Character;
  createdAt: number;
};
export type IndexStats = {
  [key: string]: number;
};
export type Index = {
  collects: number;
  createdAt: number;
  creator: SlimUser;
  desc: string;
  id: number;
  replies: number;
  stats: IndexStats;
  title: string;
  total: number;
  type: number;
  updatedAt: number;
};
export type UserIndexCollection = {
  createdAt: number;
  index: Index;
};
export type UserPersonCollection = {
  createdAt: number;
  person: Person;
};
export type UserSubjectCollection = {
  comment: string;
  epStatus: number;
  private: boolean;
  rate: number;
  subject: Subject;
  tags: string[];
  type: CollectionType;
  updatedAt: number;
  volStatus: number;
};
export type Friend = {
  createdAt: number;
  description: string;
  grade: number;
  user: SlimUser;
};
export type EpisodeWikiInfo = {
  /** YYYY-MM-DD */
  date?: string;
  duration: string;
  ep: number;
  id: number;
  name: string;
  nameCN: string;
  subjectID: number;
  summary: string;
  type: EpisodeType;
};
export type PersonWikiInfo = {
  id: number;
  infobox: string;
  name: string;
  summary: string;
  typeID: SubjectType;
};
export type RecentWikiChange = {
  persons: {
    createdAt: number;
    id: number;
  }[];
  subject: {
    createdAt: number;
    id: number;
  }[];
};
export type WikiPlatform = {
  id: number;
  text: string;
  wiki_tpl?: string;
};
export type SubjectWikiInfo = {
  availablePlatform: WikiPlatform[];
  id: number;
  infobox: string;
  metaTags: string[];
  name: string;
  nsfw: boolean;
  platform: number;
  summary: string;
  typeID: SubjectType;
};
export type SubjectEdit = {
  date?: string;
  infobox: string;
  metaTags: string[];
  name: string;
  nsfw: boolean;
  platform: number;
  summary: string;
};
export type HistorySummary = {
  commitMessage: string;
  /** unix timestamp seconds */
  createdAt: number;
  creator: {
    username: string;
  };
  /** 修改类型。`1` 正常修改， `11` 合并，`103` 锁定/解锁 `104` 未知 */
  type: number;
};
/**
 * 获取绝交用户列表
 */
export function getBlocklist(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          blocklist: number[];
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/blocklist', {
    ...opts,
  });
}
/**
 * 将用户添加到绝交列表
 */
export function addToBlocklist(
  body: {
    id: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          blocklist: number[];
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/blocklist',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 将用户从绝交列表移出
 */
export function removeFromBlocklist(id: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          blocklist: number[];
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blocklist/${encodeURIComponent(id)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取日志详情
 */
export function getBlogEntry(entryId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: BlogEntry;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blogs/${encodeURIComponent(entryId)}`, {
    ...opts,
  });
}
/**
 * 获取日志的图片
 */
export function getBlogPhotos(
  entryId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: BlogPhoto[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/blogs/${encodeURIComponent(entryId)}/photos${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取日志的关联条目
 */
export function getBlogRelatedSubjects(entryId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SlimSubject[];
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blogs/${encodeURIComponent(entryId)}/subjects`, {
    ...opts,
  });
}
/**
 * 获取每日放送
 */
export function getCalendar(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Calendar;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/calendar', {
    ...opts,
  });
}
/**
 * 获取角色
 */
export function getCharacter(characterId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Character;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/characters/${encodeURIComponent(characterId)}`, {
    ...opts,
  });
}
/**
 * 获取角色出演作品
 */
export function getCharacterCasts(
  characterId: number,
  {
    subjectType,
    $type,
    limit,
    offset,
  }: {
    subjectType?: SubjectType;
    $type?: number;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: CharacterSubject[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/characters/${encodeURIComponent(characterId)}/casts${QS.query(
      QS.explode({
        subjectType,
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取角色的收藏用户
 */
export function getCharacterCollects(
  characterId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: PersonCollect[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/characters/${encodeURIComponent(characterId)}/collects${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 标记通知为已读
 */
export function clearNotice(
  body?: {
    id?: number[];
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/clear-notify',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * debug
 */
export function debug(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: any;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/debug', {
    ...opts,
  });
}
/**
 * 删除小组帖子回复
 */
export function deleteGroupPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/-/posts/${encodeURIComponent(postId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 编辑小组帖子回复
 */
export function editGroupPost(
  postId: number,
  updatePost?: UpdatePost,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/-/posts/${encodeURIComponent(postId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updatePost,
    }),
  );
}
/**
 * 获取小组帖子详情
 */
export function getGroupTopic(topicId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: TopicDetail;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/-/topics/${encodeURIComponent(topicId)}`, {
    ...opts,
  });
}
/**
 * 编辑小组帖子
 */
export function editGroupTopic(
  topicId: number,
  updateTopic?: UpdateTopic,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/-/topics/${encodeURIComponent(topicId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateTopic,
    }),
  );
}
/**
 * 创建小组帖子回复
 */
export function createGroupReply(
  topicId: number,
  createPost?: CreatePost,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/-/topics/${encodeURIComponent(topicId)}/replies`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createPost,
    }),
  );
}
/**
 * 获取小组详情
 */
export function getGroup(groupName: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Group;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/${encodeURIComponent(groupName)}`, {
    ...opts,
  });
}
/**
 * 获取小组成员列表
 */
export function getGroupMembers(
  groupName: string,
  {
    moderator,
    limit,
    offset,
  }: {
    moderator?: boolean;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: GroupMember[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/${encodeURIComponent(groupName)}/members${QS.query(
      QS.explode({
        moderator,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取小组帖子列表
 */
export function getGroupTopics(
  groupName: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Topic[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/${encodeURIComponent(groupName)}/topics${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 创建小组帖子
 */
export function createGroupTopic(
  groupName: string,
  createTopic?: CreateTopic,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new topic id */
          id: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/${encodeURIComponent(groupName)}/topics`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createTopic,
    }),
  );
}
/**
 * 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
 *
 * next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
 *
 * dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA`
 */
export function login(loginRequestBody?: LoginRequestBody, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SlimUser;
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/login',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: loginRequestBody,
    }),
  );
}
/**
 * 登出
 */
export function logout(body?: {}, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: any;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/logout',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取当前用户信息
 */
export function getCurrentUser(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: CurrentUser;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/me', {
    ...opts,
  });
}
/**
 * 获取未读通知
 */
export function listNotice(
  {
    limit,
    unread,
  }: {
    limit?: number;
    unread?: boolean;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Notice[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/notify${QS.query(
      QS.explode({
        limit,
        unread,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取人物
 */
export function getPerson(personId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Person;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/persons/${encodeURIComponent(personId)}`, {
    ...opts,
  });
}
/**
 * 获取人物的出演角色
 */
export function getPersonCasts(
  personId: number,
  {
    subjectType,
    $type,
    limit,
    offset,
  }: {
    subjectType?: SubjectType;
    $type?: number;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: PersonCharacter[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/persons/${encodeURIComponent(personId)}/casts${QS.query(
      QS.explode({
        subjectType,
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取人物的收藏用户
 */
export function getPersonCollects(
  personId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: PersonCollect[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/persons/${encodeURIComponent(personId)}/collects${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取人物的参与作品
 */
export function getPersonWorks(
  personId: number,
  {
    subjectType,
    position,
    limit,
    offset,
  }: {
    subjectType?: SubjectType;
    position?: number;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: PersonWork[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/persons/${encodeURIComponent(personId)}/works${QS.query(
      QS.explode({
        subjectType,
        position,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目列表
 */
export function getSubjects(
  $type: SubjectType,
  sort: SubjectSort,
  {
    page,
    cat,
    series,
    year,
    month,
    tags,
  }: {
    page?: number;
    cat?: number;
    series?: boolean;
    year?: number;
    month?: number;
    tags?: string[];
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Subject[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects${QS.query(
      QS.explode({
        type: $type,
        sort,
        page,
        cat,
        series,
        year,
        month,
        tags,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
export function deleteP1SubjectsEpisodeCommentsByCommentId(
  commentId: string,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchText(`/p1/subjects/-/episode/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
export function putP1SubjectsEpisodeCommentsByCommentId(
  commentId: string,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchText(`/p1/subjects/-/episode/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'PUT',
  });
}
export function getP1SubjectsEpisodeByEpisodeId(episodeId: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchText(`/p1/subjects/-/episode/${encodeURIComponent(episodeId)}`, {
    ...opts,
  });
}
export function getP1SubjectsEpisodeByEpisodeIdComments(
  episodeId: string,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchText(`/p1/subjects/-/episode/${encodeURIComponent(episodeId)}/comments`, {
    ...opts,
  });
}
export function postP1SubjectsEpisodeByEpisodeIdComments(
  episodeId: string,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchText(`/p1/subjects/-/episode/${encodeURIComponent(episodeId)}/comments`, {
    ...opts,
    method: 'POST',
  });
}
/**
 * 删除条目的剧集吐槽
 */
export function deleteSubjectEpComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/episodes/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 编辑条目的剧集吐槽
 */
export function updateSubjectEpComment(
  commentId: number,
  updateEpisodeComment?: UpdateEpisodeComment,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/-/episodes/-/comments/${encodeURIComponent(commentId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateEpisodeComment,
    }),
  );
}
/**
 * 获取剧集信息
 */
export function getSubjectEpisode(episodeId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Episode;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/episodes/${encodeURIComponent(episodeId)}`, {
    ...opts,
  });
}
/**
 * 获取条目的剧集吐槽箱
 */
export function getSubjectEpisodeComments(episodeId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          content: string;
          createdAt: number;
          creatorID: number;
          epID: number;
          id: number;
          reactions: Reaction[];
          relatedID: number;
          state: number;
          user: SlimUser;
        } & {
          replies: EpisodeCommentBase[];
        })[];
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/episodes/${encodeURIComponent(episodeId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建条目的剧集吐槽
 */
export function createSubjectEpComment(
  episodeId: number,
  createEpisodeComment?: CreateEpisodeComment,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new reply id */
          id: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/-/episodes/${encodeURIComponent(episodeId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createEpisodeComment,
    }),
  );
}
/**
 * 删除条目讨论回复
 */
export function deleteSubjectPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/posts/${encodeURIComponent(postId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 编辑条目讨论回复
 */
export function editSubjectPost(
  postId: number,
  updatePost?: UpdatePost,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/-/posts/${encodeURIComponent(postId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updatePost,
    }),
  );
}
/**
 * 获取条目讨论详情
 */
export function getSubjectTopic(topicId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: TopicDetail;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/topics/${encodeURIComponent(topicId)}`, {
    ...opts,
  });
}
/**
 * 编辑自己创建的条目讨论
 */
export function updateSubjectTopic(
  topicId: number,
  body: {
    /** bbcode */
    content: string;
    title: string;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/-/topics/${encodeURIComponent(topicId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 创建条目讨论回复
 */
export function createSubjectReply(
  topicId: number,
  createPost?: CreatePost,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/-/topics/${encodeURIComponent(topicId)}/replies`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createPost,
    }),
  );
}
/**
 * 获取条目
 */
export function getSubject(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Subject;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/${encodeURIComponent(subjectId)}`, {
    ...opts,
  });
}
/**
 * 获取条目的角色
 */
export function getSubjectCharacters(
  subjectId: number,
  {
    $type,
    limit,
    offset,
  }: {
    $type?: number;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectCharacter[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/characters${QS.query(
      QS.explode({
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的吐槽箱
 */
export function getSubjectComments(
  subjectId: number,
  {
    $type,
    limit,
    offset,
  }: {
    $type?: CollectionType;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectComment[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/comments${QS.query(
      QS.explode({
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的剧集
 */
export function getSubjectEpisodes(
  subjectId: number,
  {
    $type,
    limit,
    offset,
  }: {
    $type?: EpisodeType;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Episode[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/episodes${QS.query(
      QS.explode({
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的推荐
 */
export function getSubjectRecs(
  subjectId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectRec[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/recs${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的关联条目
 */
export function getSubjectRelations(
  subjectId: number,
  {
    $type,
    offprint,
    limit,
    offset,
  }: {
    $type?: SubjectType;
    offprint?: boolean;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectRelation[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/relations${QS.query(
      QS.explode({
        type: $type,
        offprint,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的评论
 */
export function getSubjectReviews(
  subjectId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectReview[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/reviews${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的制作人员
 */
export function getSubjectStaffPersons(
  subjectId: number,
  {
    position,
    limit,
    offset,
  }: {
    position?: number;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectStaff[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/staffs/persons${QS.query(
      QS.explode({
        position,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的制作人员职位
 */
export function getSubjectStaffPositions(
  subjectId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectPosition[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/staffs/positions${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目讨论版
 */
export function getSubjectTopics(
  subjectId: number,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Topic[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/topics${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 创建条目讨论
 */
export function createSubjectTopic(
  subjectId: number,
  createTopic?: CreateTopic,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new topic id */
          id: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/topics`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createTopic,
    }),
  );
}
/**
 * 获取时间线
 */
export function getTimeline(
  {
    mode,
    limit,
    until,
  }: {
    mode?: FilterMode;
    limit?: number;
    until?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Timeline[];
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/timeline${QS.query(
      QS.explode({
        mode,
        limit,
        until,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 发送时间线吐槽
 */
export function createTimelineSay(
  createTimelineSay?: CreateTimelineSay,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/timeline',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createTimelineSay,
    }),
  );
}
/**
 * 获取热门条目
 */
export function getTrendingSubjects(
  $type: SubjectType,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: TrendingSubject[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/trending/subjects${QS.query(
      QS.explode({
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取 Turnstile 令牌
 */
export function getTurnstileToken(
  redirectUri: string,
  {
    theme,
  }: {
    theme?: 'dark' | 'light' | 'auto';
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<{
    status: 500;
    data: ErrorResponse;
  }>(
    `/p1/turnstile${QS.query(
      QS.explode({
        theme,
        redirect_uri: redirectUri,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户单个条目的单个章节收藏
 */
export function getUserSubjectCollectionEpisodeByEpisodeId(
  episodeId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: UserSubjectEpisodeCollection;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/users/-/collections/subjects/-/episodes/${encodeURIComponent(episodeId)}`, {
    ...opts,
  });
}
/**
 * 获取用户单个条目的章节收藏
 */
export function getUserSubjectCollectionEpisodesBySubjectId(
  subjectId: number,
  {
    $type,
    limit,
    offset,
  }: {
    $type?: EpisodeType;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: UserSubjectEpisodeCollection[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/-/collections/subjects/${encodeURIComponent(subjectId)}/episodes${QS.query(
      QS.explode({
        type: $type,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户信息
 */
export function getUser(username: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: User;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/users/${encodeURIComponent(username)}`, {
    ...opts,
  });
}
/**
 * 获取用户创建的日志
 */
export function getUserBlogs(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SlimBlogEntry[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/blogs${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户角色收藏
 */
export function getUserCharacterCollections(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: UserCharacterCollection[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/characters${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户单个角色收藏
 */
export function getUserCharacterCollectionByCharacterId(
  username: string,
  characterId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: UserCharacterCollection;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/characters/${encodeURIComponent(
      characterId,
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户目录收藏
 */
export function getUserIndexCollections(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: UserIndexCollection[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/indexes${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户单个目录收藏
 */
export function getUserIndexCollectionByIndexId(
  username: string,
  indexId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: UserIndexCollection;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/indexes/${encodeURIComponent(indexId)}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户人物收藏
 */
export function getUserPersonCollections(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: UserPersonCollection[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/persons${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户单个人物收藏
 */
export function getUserPersonCollectionByPersonId(
  username: string,
  personId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: UserPersonCollection;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/persons/${encodeURIComponent(personId)}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户条目收藏
 */
export function getUserSubjectCollections(
  username: string,
  {
    subjectType,
    $type,
    since,
    limit,
    offset,
  }: {
    subjectType?: SubjectType;
    $type?: CollectionType;
    since?: number;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: UserSubjectCollection[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/subjects${QS.query(
      QS.explode({
        subjectType,
        type: $type,
        since,
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户单个条目收藏
 */
export function getUserSubjectCollectionBySubjectId(
  username: string,
  subjectId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: UserSubjectCollection;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/collections/subjects/${encodeURIComponent(
      subjectId,
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户的关注者列表
 */
export function getUserFollowers(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Friend[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/followers${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户的好友列表
 */
export function getUserFriends(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: Friend[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/friends${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户加入的小组
 */
export function getUserGroups(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SlimGroup[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/groups${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户创建的目录
 */
export function getUserIndexes(
  username: string,
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SlimIndex[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/indexes${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取用户时间胶囊
 */
export function getUserTimeline(
  username: string,
  {
    limit,
    until,
  }: {
    limit?: number;
    until?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Timeline[];
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/users/${encodeURIComponent(username)}/timeline${QS.query(
      QS.explode({
        limit,
        until,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
export function getEpisodeWikiInfo(episodeId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: EpisodeWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/ep/${encodeURIComponent(episodeId)}`, {
    ...opts,
  });
}
export function patchEpisodeWikiInfo(
  episodeId: number,
  body: {
    commitMessage: string;
    episode: {
      /** YYYY-MM-DD */
      date?: string;
      duration?: string;
      ep?: number;
      name?: string;
      nameCN?: string;
      subjectID?: number;
      summary?: string;
      type?: EpisodeType;
    };
    /** a optional object to check if input is changed by others
    if some key is given, and current data in database doesn't match input, subject will not be changed */
    expectedRevision?: {
      date?: string;
      duration?: string;
      name?: string;
      nameCN?: string;
      summary?: string;
    };
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/ep/${encodeURIComponent(episodeId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body,
    }),
  );
}
export function lockSubject(
  body: {
    reason: string;
    subjectID: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/wiki/lock/subjects',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取当前的 wiki 信息
 */
export function getPersonWikiInfo(personId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PersonWikiInfo;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/persons/${encodeURIComponent(personId)}`, {
    ...opts,
  });
}
export function patchPersonInfo(
  personId: number,
  body: {
    commitMessage: string;
    expectedRevision: {
      infobox?: string;
      name?: string;
      summary?: string;
    };
    person: {
      infobox?: string;
      name?: string;
      summary?: string;
    };
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/persons/${encodeURIComponent(personId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body,
    }),
  );
}
/**
 * 获取最近两天的wiki更新
 */
export function getRecentWiki(since: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: RecentWikiChange;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/wiki/recent', {
    ...opts,
  });
}
/**
 * 创建新条目
 */
export function createNewSubject(
  body: {
    infobox: string;
    metaTags: string[];
    name: string;
    nsfw: boolean;
    platform: number;
    summary: string;
    type: SubjectType;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          subjectID: number;
        };
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/wiki/subjects',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取当前的 wiki 信息
 */
export function subjectInfo(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectWikiInfo;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/${encodeURIComponent(subjectId)}`, {
    ...opts,
  });
}
export function patchSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
    /** a optional object to check if input is changed by others
    if `infobox` is given, and current data in database doesn't match input, subject will not be changed */
    expectedRevision?: {
      infobox?: string;
      metaTags?: string[];
      name?: string;
      platform?: number;
    };
    subject: {
      date?: string;
      infobox?: string;
      metaTags?: string[];
      name?: string;
      nsfw?: boolean;
      platform?: number;
      summary?: string;
    };
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body,
    }),
  );
}
/**
 * 需要 `subjectWikiEdit` 权限
 */
export function putSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
    /** a optional object to check if input is changed by others
    if `infobox` is given, and current data in database doesn't match input, subject will not be changed */
    expectedRevision?: {
      infobox?: string;
      metaTags?: string[];
      name?: string;
      platform?: number;
    };
    subject: SubjectEdit;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
export function listSubjectCovers(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          covers: {
            creator: {
              avatar: Avatar;
              id: number;
              joinedAt: number;
              nickname: string;
              sign: string;
              username: string;
            };
            id: number;
            raw: string;
            thumbnail: string;
            voted: boolean;
          }[];
          current?: {
            id: number;
            raw: string;
            thumbnail: string;
          };
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/${encodeURIComponent(subjectId)}/covers`, {
    ...opts,
  });
}
/**
 * 需要 `subjectWikiEdit` 权限
 */
export function uploadSubjectCover(
  subjectId: number,
  body: {
    /** base64 encoded raw bytes, 4mb size limit on **decoded** size */
    content: string;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/covers`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 撤消条目封面投票
 */
export function unvoteSubjectCover(
  subjectId: number,
  imageId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/covers/${encodeURIComponent(imageId)}/vote`,
    {
      ...opts,
      method: 'DELETE',
    },
  );
}
/**
 * 为条目封面投票
 */
export function voteSubjectCover(subjectId: number, imageId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/covers/${encodeURIComponent(imageId)}/vote`,
    {
      ...opts,
      method: 'POST',
    },
  );
}
/**
 * 为条目添加新章节
 */
export function createEpisodes(
  subjectId: number,
  body: {
    episodes: {
      date?: string;
      disc?: number;
      duration?: string;
      ep: number;
      name?: string;
      nameCN?: string;
      summary?: string;
      type?: EpisodeType;
    }[];
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          episodeIDs: number[];
        };
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/ep`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取当前的 wiki 信息
 */
export function subjectEditHistorySummary(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: HistorySummary[];
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/${encodeURIComponent(subjectId)}/history-summary`, {
    ...opts,
  });
}
export function unlockSubject(
  body: {
    reason: string;
    subjectID: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/wiki/unlock/subjects',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
