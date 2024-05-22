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
export type User = {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  id: number;
  nickname: string;
  sign: string;
  user_group: number;
  username: string;
};
export type GroupReply = {
  createdAt: number;
  creator: User;
  id: number;
  state: number;
  text: string;
  topicID: number;
  topicTitle: string;
};
export type Group = {
  createdAt: number;
  description: string;
  icon: string;
  id: number;
  name: string;
  nsfw: boolean;
  title: string;
  totalMembers: number;
};
export type Reaction = {
  selected: boolean;
  total: number;
  value: number;
};
export type SubReply = {
  createdAt: number;
  creator: User;
  id: number;
  isFriend: boolean;
  reactions: Reaction[];
  state: number;
  text: string;
};
export type Reply = {
  createdAt: number;
  creator: User;
  id: number;
  isFriend: boolean;
  reactions: Reaction[];
  replies: SubReply[];
  state: number;
  text: string;
};
export type TopicDetail = {
  createdAt: number;
  creator: User;
  group: Group;
  id: number;
  reactions: Reaction[];
  replies: Reply[];
  state: number;
  text: string;
  title: string;
};
export type TopicCreation = {
  /** bbcode */
  text: string;
  title: string;
};
export type BasicReply = {
  createdAt: number;
  creator: User;
  id: number;
  state: number;
  text: string;
};
export type GroupMember = {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  id: number;
  joinedAt: number;
  nickname: string;
  username: string;
};
export type Topic = {
  /** 发帖时间，unix time stamp in seconds */
  createdAt: number;
  creator: {
    avatar: {
      large: string;
      medium: string;
      small: string;
    };
    id: number;
    nickname: string;
    sign: string;
    user_group: number;
    username: string;
  };
  /** topic id */
  id: number;
  /** 小组/条目ID */
  parentID: number;
  repliesCount: number;
  title: string;
  /** 最后回复时间，unix time stamp in seconds */
  updatedAt: number;
};
export type GroupProfile = {
  group: Group;
  /** 是否已经加入小组 */
  inGroup: boolean;
  recentAddedMembers: GroupMember[];
  topics: Topic[];
  totalTopics: number;
};
export type LoginRequestBody = {
  'cf-turnstile-response': string;
  email: string;
  password: string;
};
export type CurrentUser = {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  id: number;
  nickname: string;
  sign: string;
  user_group: number;
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
    avatar: {
      large: string;
      medium: string;
      small: string;
    };
    id: number;
    nickname: string;
    sign: string;
    user_group: number;
    username: string;
  };
  title: string;
  topicID: number;
  /** 查看 `./lib/notify.ts` _settings */
  type: number;
  unread: boolean;
};
export type EpisodeWikiInfo = {
  /** YYYY-MM-DD */
  date?: string;
  duration: string;
  ep: number;
  id: number;
  name: string;
  nameCN: string;
  summary: string;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
export type WikiPlatform = {
  id: number;
  text: string;
  wiki_tpl?: string;
};
export type SubjectType = 1 | 2 | 3 | 4 | 6;
export type SubjectWikiInfo = {
  availablePlatform: WikiPlatform[];
  id: number;
  infobox: string;
  name: string;
  nsfw: boolean;
  platform: number;
  summary: string;
  typeID: SubjectType;
};
export type SubjectEdit = {
  date?: string;
  infobox: string;
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
export function deleteGroupPost(postId: number, opts?: Oazapfts.RequestOpts) {
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
        status: 404;
        data: ErrorResponse;
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
export function getGroupPost(postId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: GroupReply;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/-/posts/${encodeURIComponent(postId)}`, {
    ...opts,
  });
}
export function editGroupPost(
  postId: number,
  body: {
    text: string;
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
        status: 500;
        data: ErrorResponse;
      }
  >(
    `/p1/groups/-/posts/${encodeURIComponent(postId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body,
    }),
  );
}
/**
 * 获取帖子列表
 */
export function getGroupTopicDetail(id: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: TopicDetail;
      }
    | {
        status: 404;
        data: ErrorResponse;
      }
    | {
        status: 500;
        data: ErrorResponse;
      }
  >(`/p1/groups/-/topics/${encodeURIComponent(id)}`, {
    ...opts,
  });
}
export function editGroupTopic(
  topicId: number,
  topicCreation?: TopicCreation,
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
    `/p1/groups/-/topics/${encodeURIComponent(topicId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: topicCreation,
    }),
  );
}
export function createGroupReply(
  topicId: number,
  body: {
    content: string;
    /** 被回复的 topic ID, `0` 代表回复楼主 */
    replyTo?: number;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: BasicReply;
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
    `/p1/groups/-/topics/${encodeURIComponent(topicId)}/replies`,
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取帖子列表
 */
export function listGroupMembersByName(
  groupName: string,
  {
    $type,
    limit,
    offset,
  }: {
    $type?: 'mod' | 'normal' | 'all';
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
    `/p1/groups/${encodeURIComponent(groupName)}/members${QS.query(
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
 * 获取小组首页
 */
export function getGroupProfile(
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
        data: GroupProfile;
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
    `/p1/groups/${encodeURIComponent(groupName)}/profile${QS.query(
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
 * 获取帖子列表
 */
export function getGroupTopicsByGroupName(
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
export function createNewGroupTopic(
  groupName: string,
  topicCreation?: TopicCreation,
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
      body: topicCreation,
    }),
  );
}
/**
 * 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
 *
 * next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
 *
 * dev.bgm38.com 域名使用测试用的 site-key `1x00000000000000000000AA`
 */
export function login(loginRequestBody?: LoginRequestBody, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: User;
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
        data: {};
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
 * 获取帖子列表
 */
export function getSubjectTopicsBySubjectId(
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
      summary?: string;
      type?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
/**
 * 获取当前的 wiki 信息
 *
 * 暂时只能修改沙盒条目 184017, 309445, 354667, 354677, 363612
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
/**
 * 暂时只能修改沙盒条目 184017,309445,354667,354677,363612
 */
export function patchSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
    subject: {
      date?: string;
      infobox?: string;
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
 * 暂时只能修改沙盒条目 184017,309445,354667,354677,363612
 *
 * 需要 `subjectWikiEdit` 权限
 */
export function putSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
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
              avatar: {
                large: string;
                medium: string;
                small: string;
              };
              id: number;
              nickname: string;
              sign: string;
              user_group: number;
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
 * 获取当前的 wiki 信息
 *
 * 暂时只能修改沙盒条目 184017, 309445, 354667, 354677, 363612
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
