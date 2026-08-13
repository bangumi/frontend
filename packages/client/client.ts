/**
 * bangumi private api
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from '@oazapfts/runtime';
import * as QS from '@oazapfts/runtime/query';
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
  headers: {},
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
export type LoginRequestBody = {
  email: string;
  password: string;
  turnstileToken: string;
};
export type Avatar = {
  small: string;
  medium: string;
  large: string;
};
export type SlimUser = {
  id: number;
  username: string;
  nickname: string;
  avatar: Avatar;
  group: number;
  sign: string;
  joinedAt: number;
  /** Whether the authenticated user has added this user as a friend; false when the endpoint does not populate viewer friendship */
  isFriend: boolean;
};
export type BlogEntry = {
  id: number;
  type: number;
  uid: number;
  user: SlimUser;
  title: string;
  icon: string;
  content: string;
  tags: string[];
  views: number;
  replies: number;
  createdAt: number;
  updatedAt: number;
  noreply: number;
  related: number;
  public: boolean;
};
export type SubjectImages = {
  large: string;
  common: string;
  medium: string;
  small: string;
  grid: string;
};
export type SubjectRating = {
  rank: number;
  count: number[];
  score: number;
  total: number;
};
export type SlimSubjectInterest = {
  id: number;
  rate: number;
  type: CollectionType;
  comment: string;
  tags: string[];
  updatedAt: number;
};
export type SlimSubject = {
  id: number;
  name: string;
  nameCN: string;
  type: SubjectType;
  images?: SubjectImages;
  info: string;
  metaTags: string[];
  rating: SubjectRating;
  locked: boolean;
  nsfw: boolean;
  interest?: SlimSubjectInterest;
};
export type BlogPhoto = {
  id: number;
  target: string;
  icon: string;
  vote: number;
  createdAt: number;
};
export type SimpleUser = {
  id: number;
  username: string;
  nickname: string;
};
export type Reaction = {
  users: SimpleUser[];
  value: number;
};
export type CommentBase = {
  id: number;
  mainID: number;
  creatorID: number;
  relatedID: number;
  relatedPhotoID?: number;
  createdAt: number;
  content: string;
  state: number;
  user?: SlimUser;
  reactions?: Reaction[];
};
export type CreateReply = {
  content: string;
  /** 被回复的回复 ID, `0` 代表发送顶层回复 */
  replyTo?: number;
};
export type TurnstileToken = {
  /** 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
    next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
    dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
  turnstileToken: string;
};
export type UpdateContent = {
  content: string;
};
export type Calendar = {
  [key: string]: {
    subject: SlimSubject;
    watchers: number;
  }[];
};
export type SlimBlogEntry = {
  id: number;
  type: number;
  uid: number;
  user?: SlimUser;
  title: string;
  icon: string;
  summary: string;
  replies: number;
  public: boolean;
  createdAt: number;
  updatedAt: number;
};
export type SubjectTag = {
  name: string;
  count: number;
};
export type Infobox = {
  key: string;
  values: {
    k?: string;
    v: string;
  }[];
}[];
export type PersonImages = {
  large: string;
  medium: string;
  small: string;
  grid: string;
};
export type Character = {
  id: number;
  name: string;
  nameCN: string;
  role: CharacterType;
  infobox: Infobox;
  info: string;
  summary: string;
  images?: PersonImages;
  comment: number;
  collects: number;
  lock: boolean;
  redirect: number;
  nsfw: boolean;
  collectedAt?: number;
};
export type SlimCharacter = {
  id: number;
  name: string;
  nameCN: string;
  role: number;
  info: string;
  images?: PersonImages;
  comment: number;
  lock: boolean;
  nsfw: boolean;
};
export type PersonRelationType = {
  id: number;
  cn: string;
  desc: string;
  viceVersaTo?: number;
  skipViceVersa?: boolean;
  primary?: boolean;
};
export type CharacterRelation = {
  character: SlimCharacter;
  relation: PersonRelationType;
  spoiler: boolean;
  ended: boolean;
  comment: string;
};
export type SlimPerson = {
  id: number;
  name: string;
  nameCN: string;
  type: number;
  info: string;
  /** 职业 */
  career: string[];
  images?: PersonImages;
  comment: number;
  lock: boolean;
  nsfw: boolean;
};
export type CharacterCast = {
  person: SlimPerson;
  relation: CharacterCastType;
  summary: string;
};
export type CharacterSubject = {
  subject: SlimSubject;
  casts: CharacterCast[];
  type: number;
};
export type PersonCollect = {
  user: SlimUser;
  createdAt: number;
};
export type MonoPhotoImages = {
  large: string;
  common: string;
  medium: string;
  small: string;
  grid: string;
};
export type MonoPhoto = {
  id: number;
  type: number;
  mainID: number;
  creatorID: number;
  user?: SlimUser;
  target: string;
  images: MonoPhotoImages;
  title: string;
  comment: string;
  tags: string[];
  spoiler: boolean;
  createdAt: number;
  updatedAt: number;
  lastPost: number;
};
export type IndexStats = {
  subject: {
    anime?: number;
    book?: number;
    music?: number;
    game?: number;
    real?: number;
  };
  character?: number;
  person?: number;
  episode?: number;
  blog?: number;
  groupTopic?: number;
  subjectTopic?: number;
};
export type SlimIndex = {
  id: number;
  uid: number;
  user?: SlimUser;
  type: IndexType;
  title: string;
  private: boolean;
  total: number;
  stats: IndexStats;
  createdAt: number;
  updatedAt: number;
};
export type FriendSubjectCollectionActivity = {
  user: SlimUser;
  subject: SlimSubject;
  collectionType: CollectionType;
  /** 收藏最后修改时间，unix time stamp in seconds */
  updatedAt: number;
};
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
  id: number;
  type: string;
  typeCN: string;
  alias: string;
  order?: number;
  enableHeader?: boolean;
  wikiTpl?: string;
  searchString?: string;
  sortKeys?: string[];
};
export type SubjectInterest = {
  id: number;
  rate: number;
  type: CollectionType;
  comment: string;
  tags: string[];
  epStatus: number;
  volStatus: number;
  private: boolean;
  updatedAt: number;
};
export type Subject = {
  airtime: SubjectAirtime;
  collection: SubjectCollection;
  eps: number;
  id: number;
  images?: SubjectImages;
  infobox: Infobox;
  info: string;
  metaTags: string[];
  locked: boolean;
  name: string;
  nameCN: string;
  nsfw: boolean;
  platform: SubjectPlatform;
  rating: SubjectRating;
  redirect: number;
  series: boolean;
  seriesEntry: number;
  summary: string;
  type: SubjectType;
  volumes: number;
  tags: SubjectTag[];
  interest?: SubjectInterest;
};
export type UpdateSubjectProgress = {
  /** 书籍条目章节进度 */
  epStatus?: number;
  /** 书籍条目卷数进度 */
  volStatus?: number;
};
export type CollectSubject = {
  type?: CollectionType;
  /** 评分，0 表示删除评分 */
  rate?: number;
  /** 评价 */
  comment?: string;
  /** 仅自己可见 */
  private?: boolean;
  tags?: string[];
  /** 是否自动完成条目进度，仅在 `type` 为 `看过` 时有效，并且不会产生对应的时间线记录：
              - 书籍条目会检查总的话数和卷数，并更新收藏进度到最新;
              - 动画和三次元会标记所有正片章节为已完成，并同时更新收藏进度 */
  progress?: boolean;
};
export type UpdateEpisodeProgress = {
  type?: EpisodeCollectionStatus;
  /** 是否批量更新(看到当前章节), 批量更新时 type 无效 */
  batch?: boolean;
};
export type Person = {
  id: number;
  name: string;
  nameCN: string;
  type: PersonType;
  infobox: Infobox;
  info: string;
  /** 职业 */
  career: string[];
  summary: string;
  images?: PersonImages;
  comment: number;
  collects: number;
  lock: boolean;
  redirect: number;
  nsfw: boolean;
  collectedAt?: number;
};
export type Index = {
  id: number;
  uid: number;
  user?: SlimUser;
  type: IndexType;
  title: string;
  desc: string;
  private: boolean;
  total: number;
  replies: number;
  collects: number;
  stats: IndexStats;
  award: number;
  createdAt: number;
  updatedAt: number;
  collectedAt?: number;
};
export type Episode = {
  id: number;
  subjectID: number;
  sort: number;
  type: EpisodeType;
  disc: number;
  name: string;
  nameCN: string;
  duration: string;
  airdate: string;
  comment: number;
  desc: string;
  subject?: SlimSubject;
  collection?: {
    status: EpisodeCollectionStatus;
    updatedAt?: number;
  };
};
export type Friend = {
  user: SlimUser;
  grade: number;
  createdAt: number;
  description: string;
};
export type SlimGroup = {
  id: number;
  name: string;
  nsfw: boolean;
  title: string;
  icon: Avatar;
  creatorID: number;
  members: number;
  accessible: boolean;
  createdAt: number;
};
export type GroupMember = {
  uid: number;
  user?: SlimUser;
  role: GroupMemberRole;
  joinedAt: number;
};
export type Group = {
  id: number;
  cat: number;
  name: string;
  nsfw: boolean;
  title: string;
  icon: Avatar;
  creatorID: number;
  creator?: SlimUser;
  topics: number;
  posts: number;
  members: number;
  description: string;
  accessible: boolean;
  createdAt: number;
  membership?: GroupMember;
};
export type Topic = {
  id: number;
  title: string;
  creatorID: number;
  creator?: SlimUser;
  /** 小组/条目ID */
  parentID: number;
  replyCount: number;
  /** 发帖时间，unix time stamp in seconds */
  createdAt: number;
  /** 最后回复时间，unix time stamp in seconds */
  updatedAt: number;
  state: number;
  display: number;
};
export type CreateTopic = {
  title: string;
  /** bbcode */
  content: string;
};
export type ReplyBase = {
  id: number;
  creatorID: number;
  creator?: SlimUser;
  createdAt: number;
  content: string;
  state: number;
  reactions?: Reaction[];
};
export type Reply = ReplyBase & {
  replies: ReplyBase[];
};
export type GroupTopic = Topic & {
  group: SlimGroup;
  replies: Reply[];
};
export type UpdateTopic = {
  title: string;
  /** bbcode */
  content: string;
};
export type Post = {
  id: number;
  creatorID: number;
  creator: SlimUser;
  createdAt: number;
  content: string;
  state: number;
  topic: Topic;
};
export type ProgressSubject = SlimSubject & {
  eps: number;
  volumes: number;
  series: boolean;
  doing: number;
  airDate: string;
  weekday: number;
};
export type ProgressItem = {
  subject: ProgressSubject;
  interest: SubjectInterest;
  percent: number;
  todayOnAir: boolean;
  lastUnwatchedEp: null | {
    id: number;
    sort: number;
  };
  eps: Episode[];
};
export type TimelineMemo = {
  daily?: {
    users?: SlimUser[];
    groups?: SlimGroup[];
  };
  wiki?: {
    subject?: SlimSubject;
  };
  subject?: {
    subject: SlimSubject;
    comment: string;
    rate?: number;
    collectID?: number;
  }[];
  progress?: {
    batch?: {
      epsTotal: string;
      epsUpdate?: number;
      volsTotal: string;
      volsUpdate?: number;
      subject: SlimSubject;
    };
    single?: {
      episode: Episode;
      subject: SlimSubject;
    };
  };
  status?: {
    sign?: string;
    tsukkomi?: string;
    nickname?: {
      before: string;
      after: string;
    };
  };
  blog?: SlimBlogEntry;
  index?: SlimIndex;
  mono?: {
    characters: SlimCharacter[];
    persons: SlimPerson[];
  };
};
export type TimelineSource = {
  name: string;
  url?: string;
};
export type Timeline = {
  id: number;
  uid: number;
  user?: SlimUser;
  cat: TimelineCat;
  type: number;
  memo: TimelineMemo;
  batch: boolean;
  source: TimelineSource;
  replies: number;
  createdAt: number;
  reactions?: Reaction[];
};
export type SubjectTopic = Topic & {
  subject: SlimSubject;
  replies: Reply[];
};
export type HomeResponse = {
  progress: ProgressItem[];
  timeline: Timeline[];
  groupTopics: GroupTopic[];
  famousGroups: SlimGroup[];
  hotSubjectTopics: SubjectTopic[];
  calendar: Calendar;
};
export type CreateIndex = {
  /** 目录标题 */
  title: string;
  /** 目录描述 */
  desc: string;
  /** 仅自己可见 */
  private?: boolean;
};
export type UpdateIndex = {
  /** 目录标题 */
  title?: string;
  /** 目录描述 */
  desc?: string;
  /** 仅自己可见 */
  private?: boolean;
};
export type IndexRelated = {
  id: number;
  cat: IndexRelatedCategory;
  rid: number;
  type: number;
  sid: number;
  order: number;
  comment: string;
  award: string;
  createdAt: number;
  subject?: SlimSubject;
  character?: SlimCharacter;
  person?: SlimPerson;
  episode?: Episode;
  blog?: SlimBlogEntry;
  groupTopic?: GroupTopic;
  subjectTopic?: SubjectTopic;
};
export type CreateIndexRelated = {
  cat: IndexRelatedCategory;
  sid: number;
  order?: number;
  comment?: string;
  award?: string;
};
export type UpdateIndexRelated = {
  order: number;
  comment: string;
};
export type Permissions = {
  subjectWikiEdit: boolean;
};
export type Profile = {
  id: number;
  username: string;
  nickname: string;
  avatar: Avatar;
  sign: string;
  group: number;
  joinedAt: number;
  site: string;
  location: string;
  permissions: Permissions;
};
export type Notice = {
  id: number;
  /** 查看 `./lib/notify.ts` _settings */
  type: number;
  sender: SlimUser;
  title: string;
  /** 对应的 topicID, episodeID, userID ... */
  mainID: number;
  /** 对应的 postID ... */
  relatedID: number;
  createdAt: number;
  unread: boolean;
};
export type PersonRelation = {
  person: SlimPerson;
  relation: PersonRelationType;
  spoiler: boolean;
  ended: boolean;
  comment: string;
};
export type SubjectStaffPositionType = {
  id: number;
  en: string;
  cn: string;
  jp: string;
};
export type SubjectStaffPosition = {
  type: SubjectStaffPositionType;
  summary: string;
  appearEps: string;
};
export type PersonWork = {
  subject: SlimSubject;
  positions: SubjectStaffPosition[];
};
export type CharacterSubjectRelation = {
  subject: SlimSubject;
  type: number;
};
export type PersonCharacter = {
  character: SlimCharacter;
  relations: CharacterSubjectRelation[];
};
export type PrivateMessageStatus = {
  /** 收件箱消息条数（注意：会话列表接口的 total 为会话数） */
  inbox: number;
  /** 发件箱消息条数（注意：会话列表接口的 total 为会话数） */
  outbox: number;
  /** 未读私信消息条数 */
  unread: number;
};
export type CreatePrivateMessage = {
  /** 收件人 username 列表，与 receiverIDs 二选一 */
  receivers?: string[];
  /** 收件人 user id 列表，与 receivers 二选一 */
  receiverIDs?: number[];
  title: string;
  content: string;
  /** 回复时传入会话根消息 id，不传则创建新会话 */
  related?: number;
};
export type PrivateMessage = {
  id: number;
  sender: SlimUser;
  receiverID: number;
  title: string;
  content: string;
  /** unix timestamp seconds */
  createdAt: number;
  /** 接收者是否已读 */
  read: boolean;
  /** 会话根消息 id (msg_related) */
  related: number;
};
export type PrivateMessageConversation = {
  /** 会话根消息 id (msg_related) */
  id: number;
  title: string;
  other: SlimUser;
  lastMessage: PrivateMessage;
  unreadCount: number;
  totalCount: number;
};
export type PrivateMessageContact = {
  user: SlimUser;
  lastMessageAt: number;
};
export type PrivateMessageConversationDetail = {
  conversation: PrivateMessageConversation;
  messages: PrivateMessage[];
};
export type CreateReport = {
  type: ReportType;
  /** 被举报对象的 ID */
  id: number;
  value: ReportReason;
  /** 举报说明（可选） */
  comment?: string;
};
export type SubjectSearchFilter = {
  type?: SubjectType[];
  tags?: string[];
  metaTags?: string[];
  date?: string[];
  rating?: string[];
  rank?: string[];
  /** 无权限的用户会直接忽略此字段，不会返回 R18 条目。
    `null` 或者 `true` 会返回包含 R18 的所有搜索结果。
    `false` 只会返回非 R18 条目。 */
  nsfw?: boolean;
};
export type SearchSubject = {
  /** 搜索关键词 */
  keyword: string;
  sort?: SubjectSearchSort;
  filter?: SubjectSearchFilter;
};
export type CharacterSearchFilter = {
  /** 无权限的用户会直接忽略此字段，不会返回 R18 条目。
    `null` 或者 `true` 会返回包含 R18 的所有搜索结果。
    `false` 只会返回非 R18 条目。 */
  nsfw?: boolean;
};
export type SearchCharacter = {
  /** 搜索关键词 */
  keyword: string;
  filter?: CharacterSearchFilter;
};
export type PersonSearchFilter = {
  career?: string[];
};
export type SearchPerson = {
  /** 搜索关键词 */
  keyword: string;
  filter?: PersonSearchFilter;
};
export type SubjectRelationType = {
  id: number;
  en: string;
  cn: string;
  jp: string;
  desc: string;
};
export type SubjectRelation = {
  subject: SlimSubject;
  relation: SubjectRelationType;
  order: number;
};
export type SubjectCharacter = {
  character: SlimCharacter;
  casts: CharacterCast[];
  type: number;
  order: number;
};
export type SubjectStaff = {
  staff: SlimPerson;
  positions: SubjectStaffPosition[];
};
export type SubjectPositionStaff = {
  person: SlimPerson;
  summary: string;
  appearEps: string;
};
export type SubjectPosition = {
  position: SubjectStaffPositionType;
  staffs: SubjectPositionStaff[];
};
export type SubjectRec = {
  subject: SlimSubject;
  sim: number;
  count: number;
};
export type SubjectInterestComment = {
  id: number;
  user: SlimUser;
  type: CollectionType;
  rate: number;
  comment: string;
  updatedAt: number;
  reactions?: Reaction[];
};
export type SubjectReview = {
  id: number;
  user: SlimUser;
  entry: SlimBlogEntry;
};
export type SubjectCollect = {
  user: SlimUser;
  interest: SlimSubjectInterest;
};
export type SubjectHomeResponse = {
  subject: Subject;
  episodes: Episode[];
  characters: SubjectCharacter[];
  staff: SubjectStaff[];
  relations: SubjectRelation[];
  recs: SubjectRec[];
  comments: SubjectInterestComment[];
  reviews: SubjectReview[];
  indexes: SlimIndex[];
  topics: Topic[];
};
export type CreateContent = {
  content: string;
};
export type TrendingSubject = {
  subject: SlimSubject;
  count: number;
};
export type ChannelSubjectTopic = {
  id: number;
  title: string;
  replyCount: number;
  /** 最后回复时间，unix time stamp in seconds */
  updatedAt: number;
  creator?: SlimUser;
  subject: SlimSubject;
};
export type UserHomepage = {
  left: UserHomepageSection[];
  right: UserHomepageSection[];
};
export type UserSubjectCollectionStats = {
  [key: string]: {
    [key: string]: number;
  };
};
export type UserMonoCollectionStats = {
  character: number;
  person: number;
};
export type UserIndexStats = {
  create: number;
  collect: number;
};
export type UserStats = {
  subject: UserSubjectCollectionStats;
  mono: UserMonoCollectionStats;
  blog: number;
  friend: number;
  group: number;
  index: UserIndexStats;
};
export type User = {
  id: number;
  username: string;
  nickname: string;
  avatar: Avatar;
  group: number;
  joinedAt: number;
  sign: string;
  site: string;
  location: string;
  bio: string;
  networkServices: {
    name: string;
    title: string;
    url: string;
    color: string;
    account: string;
  }[];
  homepage: UserHomepage;
  stats: UserStats;
  /** Whether the authenticated user has added this user as a friend; false when unauthenticated */
  isFriend: boolean;
};
export type WikiPlatform = {
  id: number;
  text: string;
  wiki_tpl?: string;
};
export type SubjectWikiInfo = {
  id: number;
  name: string;
  typeID: SubjectType;
  infobox: string;
  locked: boolean;
  redirect: number;
  platform: number;
  availablePlatform: WikiPlatform[];
  metaTags: string[];
  summary: string;
  series?: boolean;
  nsfw: boolean;
};
export type SubjectEdit = {
  name: string;
  infobox: string;
  platform: number;
  series?: boolean;
  nsfw: boolean;
  date?: string;
  metaTags: string[];
  summary: string;
};
export type SubjectRevisionWikiInfo = {
  id: number;
  name: string;
  infobox: string;
  metaTags: string[];
  summary: string;
};
export type RevisionHistory = {
  id: number;
  creator: {
    username: string;
    nickname: string;
  };
  type: RevisionType;
  commitMessage: string;
  /** unix timestamp seconds */
  createdAt: number;
};
export type SubjectRelationRevisionWikiInfo = {
  subject: {
    id: number;
    typeID: SubjectType;
    name: string;
    nameCN: string;
  };
  type: number;
  order: number;
}[];
export type SubjectCharacterRevisionWikiInfo = {
  character: {
    id: number;
    name: string;
    nameCN: string;
  };
  type: number;
  order: number;
}[];
export type SubjectPersonRevisionWikiInfo = {
  person: {
    id: number;
    name: string;
    nameCN: string;
  };
  position: number;
}[];
export type UserSubjectContribution = {
  id: number;
  /** 修改类型。`1` 正常修改， `11` 合并，`103` 锁定/解锁 `104` 未知 */
  type: number;
  subjectID: number;
  name: string;
  commitMessage: string;
  /** unix timestamp seconds */
  createdAt: number;
};
export type CharacterWikiInfo = {
  id: number;
  name: string;
  infobox: string;
  summary: string;
  locked: boolean;
  redirect: number;
};
export type CharacterRevisionWikiInfo = {
  name: string;
  infobox: string;
  summary: string;
  extra: {
    img?: string;
  };
};
export type CharacterSubjectRevisionWikiInfo = {
  subject: {
    id: number;
    typeID: SubjectType;
    name: string;
    nameCN: string;
  };
  type: number;
  order: number;
}[];
export type CharacterCastRevisionWikiInfo = {
  subject: {
    id: number;
    typeID: SubjectType;
    name: string;
    nameCN: string;
  };
  person: {
    id: number;
    name: string;
    nameCN: string;
  };
}[];
export type UserCharacterContribution = {
  id: number;
  /** 2 = 角色编辑 */
  type: number;
  characterID: number;
  name: string;
  commitMessage: string;
  /** unix timestamp seconds */
  createdAt: number;
};
export type PersonWikiInfo = {
  id: number;
  name: string;
  typeID: PersonType;
  infobox: string;
  summary: string;
  locked: boolean;
  redirect: number;
  profession: {
    producer?: boolean;
    mangaka?: boolean;
    artist?: boolean;
    seiyu?: boolean;
    writer?: boolean;
    illustrator?: boolean;
    actor?: boolean;
  };
};
export type PersonRevisionWikiInfo = {
  name: string;
  infobox: string;
  summary: string;
  profession: {
    producer?: boolean;
    mangaka?: boolean;
    artist?: boolean;
    seiyu?: boolean;
    writer?: boolean;
    illustrator?: boolean;
    actor?: boolean;
  };
  extra: {
    img?: string;
  };
};
export type PersonSubjectRevisionWikiInfo = {
  subject: {
    id: number;
    typeID: SubjectType;
    name: string;
    nameCN: string;
  };
  position: number;
}[];
export type PersonCastRevisionWikiInfo = {
  subject: {
    id: number;
    typeID: SubjectType;
    name: string;
    nameCN: string;
  };
  character: {
    id: number;
    name: string;
    nameCN: string;
  };
}[];
export type UserPersonContribution = {
  id: number;
  /** 3 = 人物编辑，15 = 合并，16 = 删除 */
  type: number;
  personID: number;
  name: string;
  commitMessage: string;
  /** unix timestamp seconds */
  createdAt: number;
};
export type EpisodeWikiInfo = {
  id: number;
  subjectID: number;
  name: string;
  nameCN: string;
  type: EpisodeType;
  ep: number;
  disc?: number;
  duration: string;
  /** YYYY-MM-DD */
  date?: string;
  summary: string;
};
export type RecentWikiChange = {
  subject: {
    id: number;
    createdAt: number;
  }[];
  persons: {
    id: number;
    createdAt: number;
  }[];
};
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
 * 登出
 */
export function logout(body: {}, opts?: Oazapfts.RequestOpts) {
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
 * 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
 *
 * next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
 *
 * dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA`
 */
export function login(loginRequestBody: LoginRequestBody, opts?: Oazapfts.RequestOpts) {
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
 * 获取日志的吐槽箱
 */
export function getBlogComments(entryId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blogs/${encodeURIComponent(entryId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建日志的吐槽
 */
export function createBlogComment(
  entryId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
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
    `/p1/blogs/${encodeURIComponent(entryId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 编辑日志的吐槽
 */
export function updateBlogComment(
  commentId: number,
  updateContent: UpdateContent,
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
    `/p1/blogs/-/comments/${encodeURIComponent(commentId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateContent,
    }),
  );
}
/**
 * 删除日志的吐槽
 */
export function deleteBlogComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blogs/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
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
 * 获取频道日志
 */
export function getChannelBlogs(
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
    `/p1/channels/${encodeURIComponent($type)}/blogs${QS.query(
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
 * 获取频道热门标签
 */
export function getChannelTags(
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
          data: SubjectTag[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/channels/${encodeURIComponent($type)}/tags${QS.query(
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
 * 获取角色关联角色
 */
export function getCharacterRelations(
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
          data: CharacterRelation[];
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
    `/p1/characters/${encodeURIComponent(characterId)}/relations${QS.query(
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
 * 获取角色的吐槽箱
 */
export function getCharacterComments(characterId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/characters/${encodeURIComponent(characterId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建角色的吐槽
 */
export function createCharacterComment(
  characterId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
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
    `/p1/characters/${encodeURIComponent(characterId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取角色首页相册预览
 */
export function getCharacterPhotoPreview(
  characterId: number,
  {
    limit,
  }: {
    limit?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: MonoPhoto[];
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
    `/p1/characters/${encodeURIComponent(characterId)}/photos/preview${QS.query(
      QS.explode({
        limit,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取角色相册列表
 */
export function getCharacterPhotos(
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
          data: MonoPhoto[];
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
    `/p1/characters/${encodeURIComponent(characterId)}/photos${QS.query(
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
 * 获取角色相册图片
 */
export function getCharacterPhoto(
  characterId: number,
  photoId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: MonoPhoto;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/characters/${encodeURIComponent(characterId)}/photos/${encodeURIComponent(photoId)}`, {
    ...opts,
  });
}
/**
 * 获取角色相册图片的评论
 */
export function getCharacterPhotoComments(
  characterId: number,
  photoId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
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
    `/p1/characters/${encodeURIComponent(characterId)}/photos/${encodeURIComponent(photoId)}/comments`,
    {
      ...opts,
    },
  );
}
/**
 * 创建角色相册图片的评论
 */
export function createCharacterPhotoComment(
  characterId: number,
  photoId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
      }
    | {
        status: 404;
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
    `/p1/characters/${encodeURIComponent(characterId)}/photos/${encodeURIComponent(photoId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取角色关联的目录
 */
export function getCharacterIndexes(
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
    `/p1/characters/${encodeURIComponent(characterId)}/indexes${QS.query(
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
 * 编辑角色的吐槽
 */
export function updateCharacterComment(
  commentId: number,
  updateContent: UpdateContent,
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
    `/p1/characters/-/comments/${encodeURIComponent(commentId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateContent,
    }),
  );
}
/**
 * 删除角色的吐槽
 */
export function deleteCharacterComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/characters/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取好友最近的条目收藏
 */
export function getFriendsSubjectCollections(
  subjectType: SubjectType,
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
          data: FriendSubjectCollectionActivity[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/me/friends/subject-collections${QS.query(
      QS.explode({
        subjectType,
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
 * 获取当前用户的条目收藏
 */
export function getMySubjectCollections(
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
    `/p1/collections/subjects${QS.query(
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
 * 更新条目进度
 */
export function updateSubjectProgress(
  subjectId: number,
  updateSubjectProgress: UpdateSubjectProgress,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/collections/subjects/${encodeURIComponent(subjectId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body: updateSubjectProgress,
    }),
  );
}
/**
 * 新增或修改条目收藏
 */
export function updateSubjectCollection(
  subjectId: number,
  collectSubject: CollectSubject,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/collections/subjects/${encodeURIComponent(subjectId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: collectSubject,
    }),
  );
}
/**
 * 更新章节进度
 */
export function updateEpisodeProgress(
  episodeId: number,
  updateEpisodeProgress: UpdateEpisodeProgress,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/collections/episodes/${encodeURIComponent(episodeId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body: updateEpisodeProgress,
    }),
  );
}
/**
 * 获取当前用户的角色收藏
 */
export function getMyCharacterCollections(
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
          data: Character[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/collections/characters${QS.query(
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
 * 新增角色收藏
 */
export function addCharacterCollection(characterId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/collections/characters/${encodeURIComponent(characterId)}`, {
    ...opts,
    method: 'PUT',
  });
}
/**
 * 删除角色收藏
 */
export function deleteCharacterCollection(characterId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/collections/characters/${encodeURIComponent(characterId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取当前用户的人物收藏
 */
export function getMyPersonCollections(
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
          data: Person[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/collections/persons${QS.query(
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
 * 新增人物收藏
 */
export function addPersonCollection(personId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/collections/persons/${encodeURIComponent(personId)}`, {
    ...opts,
    method: 'PUT',
  });
}
/**
 * 删除人物收藏
 */
export function deletePersonCollection(personId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/collections/persons/${encodeURIComponent(personId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取当前用户的目录收藏
 */
export function getMyIndexCollections(
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
          data: Index[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/collections/indexes${QS.query(
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
 * 新增目录收藏
 */
export function addIndexCollection(indexId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/collections/indexes/${encodeURIComponent(indexId)}`, {
    ...opts,
    method: 'PUT',
  });
}
/**
 * 删除目录收藏
 */
export function deleteIndexCollection(indexId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/collections/indexes/${encodeURIComponent(indexId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取章节信息
 */
export function getEpisode(episodeId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Episode;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/episodes/${encodeURIComponent(episodeId)}`, {
    ...opts,
  });
}
/**
 * 获取条目的章节吐槽箱
 */
export function getEpisodeComments(episodeId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/episodes/${encodeURIComponent(episodeId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建条目的章节吐槽
 */
export function createEpisodeComment(
  episodeId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
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
    `/p1/episodes/${encodeURIComponent(episodeId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 给条目的章节吐槽点赞
 */
export function likeEpisodeComment(
  commentId: number,
  body: {
    value: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/episodes/-/comments/${encodeURIComponent(commentId)}/like`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 取消条目的章节吐槽点赞
 */
export function unlikeEpisodeComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/episodes/-/comments/${encodeURIComponent(commentId)}/like`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 编辑条目的章节吐槽
 */
export function updateEpisodeComment(
  commentId: number,
  updateContent: UpdateContent,
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
    `/p1/episodes/-/comments/${encodeURIComponent(commentId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateContent,
    }),
  );
}
/**
 * 删除条目的章节吐槽
 */
export function deleteEpisodeComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/episodes/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取当前用户的好友列表
 */
export function getMyFriends(
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
    `/p1/friends${QS.query(
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
 * 添加好友
 */
export function addFriend(username: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/friends/${encodeURIComponent(username)}`, {
    ...opts,
    method: 'PUT',
  });
}
/**
 * 取消好友
 */
export function removeFriend(username: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/friends/${encodeURIComponent(username)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取当前用户的关注者列表
 */
export function getMyFollowers(
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
    `/p1/followers${QS.query(
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
 * 获取当前用户的好友 ID 列表
 */
export function getFriendlist(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          friendlist: number[];
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/friendlist', {
    ...opts,
  });
}
/**
 * 获取当前用户的绝交用户列表
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
 * 与用户绝交
 */
export function addUserToBlocklist(username: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          blocklist: number[];
        };
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blocklist/${encodeURIComponent(username)}`, {
    ...opts,
    method: 'PUT',
  });
}
/**
 * 取消与用户绝交
 */
export function removeUserFromBlocklist(username: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          blocklist: number[];
        };
      }
    | {
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/blocklist/${encodeURIComponent(username)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取小组列表
 */
export function getGroups(
  sort: GroupSort,
  {
    mode,
    limit,
    offset,
  }: {
    mode?: GroupFilterMode;
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
    `/p1/groups${QS.query(
      QS.explode({
        mode,
        sort,
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
    role,
    limit,
    offset,
  }: {
    role?: GroupMemberRole;
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
        role,
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
 * 获取小组话题列表
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
 * 创建小组话题
 */
export function createGroupTopic(
  groupName: string,
  body: CreateTopic & TurnstileToken,
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
        status: 429;
        data: ErrorResponse;
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
      body,
    }),
  );
}
/**
 * 获取最新的小组话题
 */
export function getRecentGroupTopics(
  mode: GroupTopicFilterMode,
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
          data: GroupTopic[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/-/topics${QS.query(
      QS.explode({
        mode,
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
 * 获取小组话题详情
 */
export function getGroupTopic(topicId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: GroupTopic;
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
 * 编辑小组话题
 */
export function editGroupTopic(
  topicId: number,
  updateTopic: UpdateTopic,
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
 * 获取小组话题回复详情
 */
export function getGroupPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Post;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/-/posts/${encodeURIComponent(postId)}`, {
    ...opts,
  });
}
/**
 * 编辑小组话题回复
 */
export function editGroupPost(
  postId: number,
  updateContent: UpdateContent,
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
      body: updateContent,
    }),
  );
}
/**
 * 删除小组话题回复
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
 * 给小组话题回复点赞
 */
export function likeGroupPost(
  postId: number,
  body: {
    value: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/groups/-/posts/${encodeURIComponent(postId)}/like`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 取消小组话题回复点赞
 */
export function unlikeGroupPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/-/posts/${encodeURIComponent(postId)}/like`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 创建小组话题回复
 */
export function createGroupReply(
  topicId: number,
  body: CreateReply & TurnstileToken,
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
        status: 429;
        data: ErrorResponse;
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
      body,
    }),
  );
}
/**
 * 获取首页数据
 */
export function getHome(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: HomeResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/home', {
    ...opts,
  });
}
/**
 * 创建目录
 */
export function createIndex(createIndex: CreateIndex, opts?: Oazapfts.RequestOpts) {
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
    '/p1/indexes',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createIndex,
    }),
  );
}
/**
 * 获取目录详情
 */
export function getIndex(indexId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Index;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/indexes/${encodeURIComponent(indexId)}`, {
    ...opts,
  });
}
/**
 * 更新目录
 */
export function updateIndex(
  indexId: number,
  updateIndex: UpdateIndex,
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
    `/p1/indexes/${encodeURIComponent(indexId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body: updateIndex,
    }),
  );
}
/**
 * 删除目录
 */
export function deleteIndex(indexId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/indexes/${encodeURIComponent(indexId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取目录的关联内容
 */
export function getIndexRelated(
  indexId: number,
  {
    cat,
    $type,
    limit,
    offset,
  }: {
    cat?: IndexRelatedCategory;
    $type?: SubjectType;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: IndexRelated[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/indexes/${encodeURIComponent(indexId)}/related${QS.query(
      QS.explode({
        cat,
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
 * 添加目录关联内容
 */
export function putIndexRelated(
  indexId: number,
  createIndexRelated: CreateIndexRelated,
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
    `/p1/indexes/${encodeURIComponent(indexId)}/related`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: createIndexRelated,
    }),
  );
}
/**
 * 更新目录关联内容
 */
export function patchIndexRelated(
  indexId: number,
  id: number,
  updateIndexRelated: UpdateIndexRelated,
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
    `/p1/indexes/${encodeURIComponent(indexId)}/related/${encodeURIComponent(id)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body: updateIndexRelated,
    }),
  );
}
/**
 * 删除目录关联内容
 */
export function deleteIndexRelated(indexId: number, id: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/indexes/${encodeURIComponent(indexId)}/related/${encodeURIComponent(id)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取目录的评论
 */
export function getIndexComments(indexId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/indexes/${encodeURIComponent(indexId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建目录的评论
 */
export function createIndexComment(
  indexId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
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
    `/p1/indexes/${encodeURIComponent(indexId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 编辑目录的评论
 */
export function updateIndexComment(
  commentId: number,
  updateContent: UpdateContent,
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
    `/p1/indexes/-/comments/${encodeURIComponent(commentId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateContent,
    }),
  );
}
/**
 * 删除目录的评论
 */
export function deleteIndexComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/indexes/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取当前用户信息
 */
export function getCurrentUser(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Profile;
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
 * 标记通知为已读
 */
export function clearNotice(
  body: {
    id?: number[];
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
    '/p1/clear-notify',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取 Passkey 登录选项
 */
export function passkeyLoginOptions(
  body: {
    credentials?: {
      credentialId: string;
      transports?: string[];
    }[];
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          options: any;
          challenge: string;
          rpId: string;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/passkey/login/options',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 验证 Passkey 登录并签发 session
 */
export function passkeyLoginVerify(
  body: {
    /** 之前 options 返回的 challenge */
    challenge: string;
    credential: {
      id: string;
      rawId: string;
      type: Type;
      response: {
        clientDataJSON: string;
        authenticatorData: string;
        signature: string;
        userHandle?: string;
      };
      clientExtensionResults: {
        [key: string]: any;
      };
      [key: string]: any;
    };
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: any;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/passkey/login/verify',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
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
 * 获取人物关联人物
 */
export function getPersonRelations(
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
          data: PersonRelation[];
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
    `/p1/persons/${encodeURIComponent(personId)}/relations${QS.query(
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
 * 获取人物的吐槽箱
 */
export function getPersonComments(personId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/persons/${encodeURIComponent(personId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建人物的吐槽
 */
export function createPersonComment(
  personId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
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
    `/p1/persons/${encodeURIComponent(personId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取人物首页相册预览
 */
export function getPersonPhotoPreview(
  personId: number,
  {
    limit,
  }: {
    limit?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: MonoPhoto[];
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
    `/p1/persons/${encodeURIComponent(personId)}/photos/preview${QS.query(
      QS.explode({
        limit,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取人物相册列表
 */
export function getPersonPhotos(
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
          data: MonoPhoto[];
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
    `/p1/persons/${encodeURIComponent(personId)}/photos${QS.query(
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
 * 获取人物相册图片
 */
export function getPersonPhoto(personId: number, photoId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: MonoPhoto;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/persons/${encodeURIComponent(personId)}/photos/${encodeURIComponent(photoId)}`, {
    ...opts,
  });
}
/**
 * 获取人物相册图片的评论
 */
export function getPersonPhotoComments(
  personId: number,
  photoId: number,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/persons/${encodeURIComponent(personId)}/photos/${encodeURIComponent(photoId)}/comments`, {
    ...opts,
  });
}
/**
 * 创建人物相册图片的评论
 */
export function createPersonPhotoComment(
  personId: number,
  photoId: number,
  body: CreateReply & TurnstileToken,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** new comment id */
          id: number;
        };
      }
    | {
        status: 404;
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
    `/p1/persons/${encodeURIComponent(personId)}/photos/${encodeURIComponent(photoId)}/comments`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取人物关联的目录
 */
export function getPersonIndexes(
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
    `/p1/persons/${encodeURIComponent(personId)}/indexes${QS.query(
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
 * 编辑人物的吐槽
 */
export function updatePersonComment(
  commentId: number,
  updateContent: UpdateContent,
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
    `/p1/persons/-/comments/${encodeURIComponent(commentId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: updateContent,
    }),
  );
}
/**
 * 删除人物的吐槽
 */
export function deletePersonComment(commentId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/persons/-/comments/${encodeURIComponent(commentId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取私信邮箱状态
 */
export function getPrivateMessageStatus(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PrivateMessageStatus;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/pm', {
    ...opts,
  });
}
/**
 * 发送私信
 */
export function createPrivateMessage(
  createPrivateMessage: CreatePrivateMessage,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          messages: {
            receiverID: number;
            msgID: number;
          }[];
        };
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
      }
    | {
        status: 404;
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
    '/p1/pm',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createPrivateMessage,
    }),
  );
}
/**
 * 获取收件箱会话列表
 */
export function listPrivateMessageInbox(
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
          data: PrivateMessageConversation[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/pm/inbox${QS.query(
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
 * 获取发件箱会话列表
 */
export function listPrivateMessageOutbox(
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
          data: PrivateMessageConversation[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/pm/outbox${QS.query(
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
 * 获取最近私信联系人
 */
export function listPrivateMessageContacts(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PrivateMessageContact[];
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >('/p1/pm/contacts', {
    ...opts,
  });
}
/**
 * 获取私信会话详情
 */
export function getPrivateMessageConversation(msgId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PrivateMessageConversationDetail;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/pm/conversations/${encodeURIComponent(msgId)}`, {
    ...opts,
  });
}
/**
 * 删除私信会话
 */
export function deletePrivateMessageConversation(msgId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/pm/conversations/${encodeURIComponent(msgId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 标记私信会话已读
 */
export function markPrivateMessageConversationRead(msgId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/pm/conversations/${encodeURIComponent(msgId)}/read`, {
    ...opts,
    method: 'PUT',
  });
}
/**
 * 删除单条私信
 */
export function deletePrivateMessage(msgId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/pm/${encodeURIComponent(msgId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * Get current user privacy settings
 */
export function getPrivacy(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          settings: {
            privateMessage: PrivateMessage2;
            timelineReply: TimelineReply;
            timelineCollectReply: TimelineCollectReply;
            follow: Follow;
            mentionNotification: MentionNotification;
            commentNotification: CommentNotification;
            friendNotification: FriendNotification;
          };
          preferences: {
            showNsfwSubject: boolean;
            canSetNsfwSubject: boolean;
            allowNsfw: boolean;
          };
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
  >('/p1/privacy', {
    ...opts,
  });
}
/**
 * Update current user privacy settings
 */
export function patchPrivacy(
  body: {
    settings?: {
      privateMessage?: PrivateMessage2;
      timelineReply?: TimelineReply;
      timelineCollectReply?: TimelineCollectReply;
      follow?: Follow;
      mentionNotification?: MentionNotification;
      commentNotification?: CommentNotification;
      friendNotification?: FriendNotification;
    };
    preferences?: {
      showNsfwSubject?: boolean;
    };
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          settings: {
            privateMessage: PrivateMessage2;
            timelineReply: TimelineReply;
            timelineCollectReply: TimelineCollectReply;
            follow: Follow;
            mentionNotification: MentionNotification;
            commentNotification: CommentNotification;
            friendNotification: FriendNotification;
          };
          preferences: {
            showNsfwSubject: boolean;
            canSetNsfwSubject: boolean;
            allowNsfw: boolean;
          };
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
        status: 403;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    '/p1/privacy',
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body,
    }),
  );
}
/**
 * 报告疑虑
 */
export function createReport(createReport: CreateReport, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          message: string;
        };
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
    '/p1/report',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: createReport,
    }),
  );
}
/**
 * 搜索条目
 */
export function searchSubjects(
  searchSubject: SearchSubject,
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
          data: SlimSubject[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/search/subjects${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: searchSubject,
    }),
  );
}
/**
 * 搜索角色
 */
export function searchCharacters(
  searchCharacter: SearchCharacter,
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
          data: SlimCharacter[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/search/characters${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: searchCharacter,
    }),
  );
}
/**
 * 搜索人物
 */
export function searchPersons(
  searchPerson: SearchPerson,
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
          data: SlimPerson[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/search/persons${QS.query(
      QS.explode({
        limit,
        offset,
      }),
    )}`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: searchPerson,
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
 * 获取条目列表
 */
export function getSubjects(
  $type: SubjectType,
  sort: SubjectBrowseSort,
  {
    page,
    cat,
    series,
    year,
    month,
    tags,
    tagsCat,
  }: {
    page?: number;
    cat?: number;
    series?: boolean;
    year?: number;
    month?: number;
    tags?: string[];
    tagsCat?: 'meta' | 'subject';
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SlimSubject[];
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
        tagsCat,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取条目的章节
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
          data: SubjectInterestComment[];
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
 * 获取条目关联的目录
 */
export function getSubjectIndexes(
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
    `/p1/subjects/${encodeURIComponent(subjectId)}/indexes${QS.query(
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
 * 获取条目的收藏用户
 */
export function getSubjectCollects(
  subjectId: number,
  {
    $type,
    mode,
    limit,
    offset,
  }: {
    $type?: CollectionType;
    mode?: FilterMode;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: SubjectCollect[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/${encodeURIComponent(subjectId)}/collects${QS.query(
      QS.explode({
        type: $type,
        mode,
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
 * 给条目收藏点赞
 */
export function likeSubjectCollect(
  collectId: number,
  body: {
    value: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/subjects/-/collects/${encodeURIComponent(collectId)}/like`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 取消条目收藏点赞
 */
export function unlikeSubjectCollect(collectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/collects/${encodeURIComponent(collectId)}/like`, {
    ...opts,
    method: 'DELETE',
  });
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
  body: CreateTopic & TurnstileToken,
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
        status: 429;
        data: ErrorResponse;
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
      body,
    }),
  );
}
/**
 * 获取最新的条目讨论
 */
export function getRecentSubjectTopics(
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
          data: SubjectTopic[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/subjects/-/topics${QS.query(
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
 * 获取条目讨论详情
 */
export function getSubjectTopic(topicId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectTopic;
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
    title: string;
    /** bbcode */
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
 * 获取条目讨论回复详情
 */
export function getSubjectPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: Post;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/posts/${encodeURIComponent(postId)}`, {
    ...opts,
  });
}
/**
 * 编辑条目讨论回复
 */
export function editSubjectPost(
  postId: number,
  updateContent: UpdateContent,
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
      body: updateContent,
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
 * 给条目讨论回复点赞
 */
export function likeSubjectPost(
  postId: number,
  body: {
    value: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/subjects/-/posts/${encodeURIComponent(postId)}/like`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 取消条目讨论回复点赞
 */
export function unlikeSubjectPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/-/posts/${encodeURIComponent(postId)}/like`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 创建条目讨论回复
 */
export function createSubjectReply(
  topicId: number,
  body: CreateReply & TurnstileToken,
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
        status: 429;
        data: ErrorResponse;
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
      body,
    }),
  );
}
/**
 * 获取条目首页数据
 */
export function getSubjectHome(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectHomeResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/subjects/${encodeURIComponent(subjectId)}/home`, {
    ...opts,
  });
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
  body: CreateContent & TurnstileToken,
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
        status: 429;
        data: ErrorResponse;
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
      body,
    }),
  );
}
/**
 * 删除时间线
 */
export function deleteTimeline(timelineId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/timeline/${encodeURIComponent(timelineId)}`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 获取时间线回复
 */
export function getTimelineReplies(timelineId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: ({
          id: number;
          mainID: number;
          creatorID: number;
          relatedID: number;
          relatedPhotoID?: number;
          createdAt: number;
          content: string;
          state: number;
          user?: SlimUser;
          reactions?: Reaction[];
        } & {
          replies: CommentBase[];
        })[];
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/timeline/${encodeURIComponent(timelineId)}/replies`, {
    ...opts,
  });
}
/**
 * 创建时间线回复
 */
export function createTimelineReply(
  timelineId: number,
  body: CreateReply & TurnstileToken,
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
        status: 429;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/timeline/${encodeURIComponent(timelineId)}/replies`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 给时间线吐槽点赞
 */
export function likeTimeline(
  timelineId: number,
  body: {
    value: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
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
    `/p1/timeline/${encodeURIComponent(timelineId)}/like`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 取消时间线吐槽点赞
 */
export function unlikeTimeline(timelineId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/timeline/${encodeURIComponent(timelineId)}/like`, {
    ...opts,
    method: 'DELETE',
  });
}
/**
 * 时间线事件流 (SSE)
 */
export function getTimelineEvents(
  {
    cat,
    mode,
  }: {
    cat?: TimelineCat;
    mode?: FilterMode;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** 事件类型: 'connected' | 'timeline' */
          event: string;
          timeline?: Timeline;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/timeline/-/events${QS.query(
      QS.explode({
        cat,
        mode,
      }),
    )}`,
    {
      ...opts,
    },
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
 * 获取条目讨论
 */
export function getTrendingSubjectTopics(
  {
    $type,
    limit,
    offset,
  }: {
    $type?: SubjectType;
    limit?: number;
    offset?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          data: ChannelSubjectTopic[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/trending/subjects/topics${QS.query(
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
          data: SlimUser[];
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
          data: SlimUser[];
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
 * 获取用户条目收藏
 */
export function getUserSubjectCollections(
  username: string,
  {
    subjectType,
    $type,
    limit,
    offset,
  }: {
    subjectType?: SubjectType;
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
          data: SlimSubject[];
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
          data: SlimCharacter[];
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
          data: SlimPerson[];
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
export function listSubjectCovers(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          current?: {
            thumbnail: string;
            raw: string;
            id: number;
          };
          covers: {
            id: number;
            thumbnail: string;
            raw: string;
            creator: {
              id: number;
              username: string;
              nickname: string;
              avatar: Avatar;
              group: number;
              sign: string;
              joinedAt: number;
              /** Whether the authenticated user has added this user as a friend; false when the endpoint does not populate viewer friendship */
              isFriend: boolean;
            };
            voted: boolean;
          }[];
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
        status: 403;
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
 * 为条目封面投票
 */
export function voteSubjectCover(subjectId: number, imageId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
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
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
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
export function lockSubject(
  body: {
    subjectID: number;
    reason: string;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
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
export function unlockSubject(
  body: {
    subjectID: number;
    reason: string;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 401;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
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
/**
 * 获取条目当前的 wiki 信息
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
        status: 404;
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
/**
 * 需要 `subjectWikiEdit` 权限
 */
export function putSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
    expectedRevision?: {
      name?: null | string;
      infobox?: null | string;
      platform?: null | number;
      summary?: null | string;
      metaTags?: null | string[];
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
export function patchSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
    expectedRevision?: {
      name?: null | string;
      infobox?: null | string;
      platform?: null | number;
      summary?: null | string;
      metaTags?: null | string[];
    };
    subject: {
      name?: string;
      infobox?: string;
      platform?: number;
      series?: boolean;
      nsfw?: boolean;
      date?: string;
      metaTags?: string[];
      summary?: string;
    };
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
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
 * 创建新条目
 */
export function createNewSubject(
  body: {
    name: string;
    type: SubjectType;
    platform: number;
    infobox: string;
    series?: boolean;
    nsfw: boolean;
    metaTags: string[];
    summary: string;
    date?: string;
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
 * 获取条目历史版本 wiki 信息
 */
export function getSubjectRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/-/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取条目 wiki 历史编辑摘要
 */
export function subjectEditHistorySummary(
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
          data: RevisionHistory[];
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
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/history-summary${QS.query(
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
 * 为条目添加新章节
 */
export function createEpisodes(
  subjectId: number,
  body: {
    episodes: {
      name?: string;
      nameCN?: string;
      type?: EpisodeType;
      disc?: number;
      duration?: string;
      /** YYYY-MM-DD */
      date?: string;
      summary?: string;
      ep: number;
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
 * 批量编辑条目章节
 */
export function patchEpisodes(
  subjectId: number,
  body: {
    commitMessage: string;
    episodes: {
      name?: string;
      nameCN?: string;
      type?: EpisodeType;
      ep?: number;
      disc?: number;
      duration?: string;
      /** YYYY-MM-DD */
      date?: string;
      summary?: string;
      id: number;
    }[];
    expectedRevision?: {
      name?: string;
      nameCN?: string;
      duration?: string;
      date?: string;
      summary?: string;
    }[];
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
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/ep`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body,
    }),
  );
}
/**
 * 获取条目关联 wiki 历史编辑摘要
 */
export function subjectRelationHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/relations/history-summary${QS.query(
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
 * 获取条目关联历史版本 wiki 信息
 */
export function getSubjectRelationRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectRelationRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/-/relations/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取条目-角色关联 wiki 历史编辑摘要
 */
export function subjectCharacterHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/characters/history-summary${QS.query(
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
 * 获取条目-角色关联历史版本 wiki 信息
 */
export function getSubjectCharacterRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectCharacterRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/-/characters/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取条目-人物关联 wiki 历史编辑摘要
 */
export function subjectPersonHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/subjects/${encodeURIComponent(subjectId)}/persons/history-summary${QS.query(
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
 * 获取条目-人物关联历史版本 wiki 信息
 */
export function getSubjectPersonRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectPersonRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/subjects/-/persons/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取用户 wiki 条目编辑记录
 */
export function getUserContributedSubjects(
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
          data: UserSubjectContribution[];
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
    `/p1/wiki/users/${encodeURIComponent(username)}/contributions/subjects${QS.query(
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
 * 获取角色当前的 wiki 信息
 */
export function getCharacterWikiInfo(characterId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: CharacterWikiInfo;
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
  >(`/p1/wiki/characters/${encodeURIComponent(characterId)}`, {
    ...opts,
  });
}
/**
 * 编辑角色
 */
export function patchCharacterInfo(
  characterId: number,
  body: {
    commitMessage: string;
    expectedRevision: {
      name?: string;
      infobox?: string;
      summary?: string;
    };
    character: {
      name?: string;
      infobox?: string;
      summary?: string;
    };
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
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
        status: 403;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/characters/${encodeURIComponent(characterId)}`,
    oazapfts.json({
      ...opts,
      method: 'PATCH',
      body,
    }),
  );
}
/**
 * 创建角色
 */
export function postCharacterInfo(
  body: {
    character: {
      name: string;
      infobox: string;
      summary: string;
      type: CharacterType;
      /** base64 encoded raw bytes, 4mb size limit on **decoded** size */
      img?: string;
    };
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          characterID: number;
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
    '/p1/wiki/characters',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 上传角色肖像
 */
export function uploadCharacterPortrait(
  characterId: number,
  body: {
    /** base64 encoded raw bytes, 4mb size limit on **decoded** size */
    img: string;
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** image filename */
          img: string;
        };
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/characters/${encodeURIComponent(characterId)}/portraits`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取角色 wiki 历史编辑摘要
 */
export function characterEditHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/characters/${encodeURIComponent(characterId)}/history-summary${QS.query(
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
 * 获取角色历史版本 wiki 信息
 */
export function getCharacterRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: CharacterRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/characters/-/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取角色-条目关联 wiki 历史编辑摘要
 */
export function characterSubjectHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/characters/${encodeURIComponent(characterId)}/subjects/history-summary${QS.query(
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
 * 获取角色-条目关联历史版本 wiki 信息
 */
export function getCharacterSubjectRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: CharacterSubjectRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/characters/-/subjects/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取角色-人物关联 wiki 历史编辑摘要
 */
export function characterCastHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/characters/${encodeURIComponent(characterId)}/casts/history-summary${QS.query(
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
 * 获取角色-人物关联历史版本 wiki 信息
 */
export function getCharacterCastRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: CharacterCastRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/characters/-/casts/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取用户 wiki 角色编辑记录
 */
export function getUserContributedCharacters(
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
          data: UserCharacterContribution[];
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
    `/p1/wiki/users/${encodeURIComponent(username)}/contributions/characters${QS.query(
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
 * 获取人物当前的 wiki 信息
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
/**
 * 编辑人物
 */
export function patchPersonInfo(
  personId: number,
  body: {
    commitMessage: string;
    expectedRevision: {
      name?: string;
      infobox?: string;
      summary?: string;
    };
    person: {
      name?: string;
      infobox?: string;
      summary?: string;
      profession?: {
        producer?: boolean;
        mangaka?: boolean;
        artist?: boolean;
        seiyu?: boolean;
        writer?: boolean;
        illustrator?: boolean;
        actor?: boolean;
      };
    };
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
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
        status: 403;
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
 * 创建人物
 */
export function postPersonInfo(
  body: {
    person: {
      name: string;
      infobox: string;
      summary: string;
      type: PersonType;
      profession?: {
        producer?: boolean;
        mangaka?: boolean;
        artist?: boolean;
        seiyu?: boolean;
        writer?: boolean;
        illustrator?: boolean;
        actor?: boolean;
      };
      /** base64 encoded raw bytes, 4mb size limit on **decoded** size */
      img?: string;
    };
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          personID: number;
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
    '/p1/wiki/persons',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 上传人物肖像
 */
export function uploadPersonPortrait(
  personId: number,
  body: {
    /** base64 encoded raw bytes, 4mb size limit on **decoded** size */
    img: string;
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          /** image filename */
          img: string;
        };
      }
    | {
        status: 400;
        data: ErrorResponse;
      }
    | {
        status: 403;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/persons/${encodeURIComponent(personId)}/portraits`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取人物 wiki 历史编辑摘要
 */
export function personEditHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/persons/${encodeURIComponent(personId)}/history-summary${QS.query(
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
 * 获取人物历史版本 wiki 信息
 */
export function getPersonRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PersonRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/persons/-/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取人物-条目关联 wiki 历史编辑摘要
 */
export function personSubjectHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/persons/${encodeURIComponent(personId)}/subjects/history-summary${QS.query(
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
 * 获取人物-条目关联历史版本 wiki 信息
 */
export function getPersonSubjectRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PersonSubjectRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/persons/-/subjects/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取人物-角色关联 wiki 历史编辑摘要
 */
export function personCastHistorySummary(
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
          data: RevisionHistory[];
          /** limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
          total: number;
        };
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/wiki/persons/${encodeURIComponent(personId)}/casts/history-summary${QS.query(
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
 * 获取人物-角色关联历史版本 wiki 信息
 */
export function getPersonCastRevisionInfo(revisionId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: PersonCastRevisionWikiInfo;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/wiki/persons/-/casts/revisions/${encodeURIComponent(revisionId)}`, {
    ...opts,
  });
}
/**
 * 获取用户 wiki 人物编辑记录
 */
export function getUserContributedPersons(
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
          data: UserPersonContribution[];
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
    `/p1/wiki/users/${encodeURIComponent(username)}/contributions/persons${QS.query(
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
      subjectID?: number;
      name?: string;
      nameCN?: string;
      type?: EpisodeType;
      ep?: number;
      disc?: number;
      duration?: string;
      /** YYYY-MM-DD */
      date?: string;
      summary?: string;
    };
    expectedRevision?: {
      name?: string;
      nameCN?: string;
      duration?: string;
      date?: string;
      summary?: string;
    };
    /** when header x-admin-token is provided, use this as author id. */
    authorID?: number;
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
/**
 * 获取最近两天的wiki更新
 */
export function getRecentSubjectWiki(
  {
    since,
  }: {
    since?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
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
  >(
    `/p1/wiki/recent/subjects${QS.query(
      QS.explode({
        since,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取最近两天的人物wiki更新
 */
export function getRecentPersonWiki(
  {
    since,
  }: {
    since?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
          createdAt: number;
        }[];
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
    `/p1/wiki/recent/persons${QS.query(
      QS.explode({
        since,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取最近两天的角色wiki更新
 */
export function getRecentCharacterWiki(
  {
    since,
  }: {
    since?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
          createdAt: number;
        }[];
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
    `/p1/wiki/recent/characters${QS.query(
      QS.explode({
        since,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
/**
 * 获取最近两天的章节wiki更新
 */
export function getRecentEpisodeWiki(
  {
    since,
  }: {
    since?: number;
  } = {},
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
          createdAt: number;
        }[];
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
    `/p1/wiki/recent/episodes${QS.query(
      QS.explode({
        since,
      }),
    )}`,
    {
      ...opts,
    },
  );
}
export enum SubjectType {
  Book = 1,
  Anime = 2,
  Music = 3,
  Game = 4,
  Real = 6,
}
export enum CollectionType {
  Wish = 1,
  Collect = 2,
  Doing = 3,
  OnHold = 4,
  Dropped = 5,
}
export enum CharacterType {
  Crt = 1,
  Mecha = 2,
  Vessel = 3,
  Org = 4,
}
export enum CharacterCastType {
  Cv = 0,
  Actor = 2,
  Dub = 1,
  ChineseDub = 3,
  JapaneseDub = 4,
  EnglishDub = 5,
  KoreanDub = 6,
}
export enum IndexType {
  User = 0,
  Public = 1,
  Award = 2,
}
export enum EpisodeCollectionStatus {
  None = 0,
  Wish = 1,
  Done = 2,
  Dropped = 3,
}
export enum PersonType {
  Individual = 1,
  Company = 2,
  Group = 3,
}
export enum EpisodeType {
  Normal = 0,
  Special = 1,
  Op = 2,
  Ed = 3,
  Pre = 4,
  Mad = 5,
  Other = 6,
}
export enum GroupSort {
  Posts = 'posts',
  Topics = 'topics',
  Members = 'members',
  Created = 'created',
  Updated = 'updated',
}
export enum GroupFilterMode {
  All = 'all',
  Joined = 'joined',
  Managed = 'managed',
}
export enum GroupMemberRole {
  Visitor = -2,
  Guest = -1,
  Member = 0,
  Creator = 1,
  Moderator = 2,
  Blocked = 3,
}
export enum GroupTopicFilterMode {
  All = 'all',
  Joined = 'joined',
  Created = 'created',
  Replied = 'replied',
}
export enum TimelineCat {
  Daily = 1,
  Wiki = 2,
  Subject = 3,
  Progress = 4,
  Status = 5,
  Blog = 6,
  Index = 7,
  Mono = 8,
  Doujin = 9,
}
export enum IndexRelatedCategory {
  Subject = 0,
  Character = 1,
  Person = 2,
  Episode = 3,
  Blog = 4,
  GroupTopic = 5,
  SubjectTopic = 6,
}
export enum Type {
  PublicKey = 'public-key',
}
export enum PrivateMessage2 {
  All = 'all',
  Friends = 'friends',
  None = 'none',
}
export enum TimelineReply {
  All = 'all',
  Friends = 'friends',
  None = 'none',
}
export enum TimelineCollectReply {
  All = 'all',
  Friends = 'friends',
  None = 'none',
}
export enum Follow {
  All = 'all',
  None = 'none',
}
export enum MentionNotification {
  All = 'all',
  Friends = 'friends',
  None = 'none',
}
export enum CommentNotification {
  All = 'all',
  Friends = 'friends',
  None = 'none',
}
export enum FriendNotification {
  All = 'all',
  None = 'none',
}
export enum ReportType {
  User = 6,
  GroupTopic = 7,
  GroupReply = 8,
  SubjectTopic = 9,
  SubjectReply = 10,
  EpisodeReply = 11,
  CharacterReply = 12,
  PersonReply = 13,
  Blog = 14,
  BlogReply = 15,
  Timeline = 16,
  TimelineReply = 17,
  Index = 18,
  IndexReply = 19,
}
export enum ReportReason {
  Abuse = 1,
  Spam = 2,
  Political = 3,
  Illegal = 4,
  Privacy = 5,
  CheatScore = 6,
  Flame = 7,
  Advertisement = 8,
  Spoiler = 9,
  Other = 99,
}
export enum SubjectSearchSort {
  Match = 'match',
  Heat = 'heat',
  Rank = 'rank',
  Score = 'score',
}
export enum SubjectBrowseSort {
  Rank = 'rank',
  Trends = 'trends',
  Collects = 'collects',
  Date = 'date',
  Title = 'title',
}
export enum FilterMode {
  All = 'all',
  Friends = 'friends',
}
export enum UserHomepageSection {
  Anime = 'anime',
  Game = 'game',
  Book = 'book',
  Music = 'music',
  Real = 'real',
  Mono = 'mono',
  Blog = 'blog',
  Friend = 'friend',
  Group = 'group',
  Index = 'index',
}
export enum RevisionType {
  SubjectEdit = 1,
  SubjectLock = 103,
  SubjectUnlock = 104,
  SubjectMerge = 11,
  SubjectErase = 12,
  SubjectRelation = 17,
  SubjectCharacterRelation = 5,
  SubjectCastRelation = 6,
  SubjectPersonRelation = 10,
  CharacterEdit = 2,
  CharacterMerge = 13,
  CharacterErase = 14,
  CharacterSubjectRelation = 4,
  CharacterCastRelation = 7,
  PersonEdit = 3,
  PersonMerge = 15,
  PersonErase = 16,
  PersonCastRelation = 8,
  PersonSubjectRelation = 9,
  EpisodeEdit = 18,
  EpisodeMerge = 181,
  EpisodeMove = 182,
  EpisodeLock = 183,
  EpisodeUnlock = 184,
  EpisodeErase = 185,
}
