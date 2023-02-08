/**
 * hello
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
export interface CurrentUser {
  id: number;
  username: string;
  nickname: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
  sign: string;
  user_group: number;
  permission: {
    subjectWikiEdit: boolean;
  };
}
export interface Error {
  code: string;
  error: string;
  message: string;
  statusCode: number;
}
export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
  sign: string;
  user_group: number;
}
export interface ValidationError {
  error: string;
  message: string;
  statusCode: number;
}
export interface GroupMember {
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
  id: number;
  nickname: string;
  username: string;
  joinedAt: number;
}
export interface Topic {
  id: number;
  creator: {
    id: number;
    username: string;
    nickname: string;
    avatar: {
      small: string;
      medium: string;
      large: string;
    };
    sign: string;
    user_group: number;
  };
  title: string;
  parentID: number;
  createdAt: number;
  updatedAt: number;
  repliesCount: number;
}
export interface Group {
  id: number;
  name: string;
  nsfw: boolean;
  title: string;
  icon: string;
  description: string;
  totalMembers: number;
  createdAt: number;
}
export interface GroupProfile {
  recentAddedMembers: GroupMember[];
  topics: Topic[];
  inGroup: boolean;
  group: Group;
  totalTopics: number;
}
export interface SubReply {
  id: number;
  creator: User;
  createdAt: number;
  isFriend: boolean;
  text: string;
  state: number;
}
export interface Reply {
  id: number;
  isFriend: boolean;
  replies: SubReply[];
  creator: User;
  createdAt: number;
  text: string;
  state: number;
}
export interface TopicDetail {
  id: number;
  group: Group;
  creator: User;
  title: string;
  text: string;
  state: number;
  createdAt: number;
  replies: Reply[];
}
export interface BasicReply {
  id: number;
  creator: User;
  createdAt: number;
  text: string;
  state: number;
}
export interface Notice {
  id: number;
  title: string;
  type: number;
  sender: {
    id: number;
    username: string;
    nickname: string;
    avatar: {
      small: string;
      medium: string;
      large: string;
    };
    sign: string;
    user_group: number;
  };
  topicID: number;
  postID: number;
  createdAt: number;
}
export type SubjectType = 1 | 2 | 3 | 4 | 6;
export interface WikiPlatform {
  id: number;
  text: string;
  wiki_tpl?: string;
}
export interface SubjectWikiInfo {
  id: number;
  name: string;
  typeID: SubjectType;
  infobox: string;
  platform: number;
  availablePlatform: WikiPlatform[];
  summary: string;
  nsfw: boolean;
}
export interface SubjectEdit {
  name: string;
  infobox: string;
  platform: number;
  nsfw: boolean;
  date?: string;
  summary: string;
}
export interface HistorySummary {
  creator: {
    username: string;
  };
  type: number;
  commitMessage: string;
  createdAt: number;
}
export async function getCurrentUser(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: CurrentUser;
      }
    | {
        status: 401;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
      }
  >('/p1/me', {
    ...opts,
  });
}
/**
 * 登出
 */
export async function logout(body?: {}, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {};
      }
    | {
        status: 401;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
 * dev.bgm38.com 域名使用测试用的 site-key `1x00000000000000000000AA`
 */
export async function login2(
  body: {
    email: string;
    password: string;
    'cf-turnstile-response': string;
  },
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: User;
      }
    | {
        status: 400;
        data: ValidationError;
      }
    | {
        status: 401;
        data: Error;
      }
    | {
        status: 429;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
      }
  >(
    '/p1/login2',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
/**
 * 获取小组首页
 */
export async function getGroupProfile(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
export async function getGroupTopicDetail(id: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: TopicDetail;
      }
    | {
        status: 404;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
      }
  >(`/p1/groups/-/topics/${encodeURIComponent(id)}`, {
    ...opts,
  });
}
/**
 * 获取帖子列表
 */
export async function listGroupMembersByName(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
 * 获取帖子列表
 */
export async function getGroupTopicsByGroupName(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
export async function createNewGroupTopic(
  groupName: string,
  body: {
    title: string;
    content: string;
  },
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
        data: Error;
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
 * 获取帖子列表
 */
export async function getSubjectTopicsBySubjectId(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
export async function createGroupReply(
  topicId: number,
  body: {
    replyTo?: number;
    content: string;
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
export async function editReply(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
 * 获取未读通知
 */
export async function listNotice(
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
          data: Notice[];
          total: number;
        };
      }
    | {
        status: 401;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
      }
  >(
    `/p1/notify${QS.query(
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
 * 标记通知为已读
 */
export async function clearNotice(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
export async function listSubjectCovers(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          current?: {
            thumbnail: string;
            raw: string;
          };
          covers: Array<{
            id: number;
            thumbnail: string;
            raw: string;
            creator: {
              id: number;
              username: string;
              nickname: string;
              avatar: {
                small: string;
                medium: string;
                large: string;
              };
              sign: string;
              user_group: number;
            };
            voted: boolean;
          }>;
        };
      }
    | {
        status: 500;
        data: Error;
      }
  >(`/p1/wiki/subjects/${encodeURIComponent(subjectId)}/covers`, {
    ...opts,
  });
}
/**
 * 需要 `subjectWikiEdit` 权限
 */
export async function uploadSubjectCover(
  subjectId: number,
  body: {
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
        data: Error;
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
export async function voteSubjectCover(
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
        data: Error;
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
export async function unvoteSubjectCover(
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
        data: Error;
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
 * 获取当前的 wiki 信息
 *
 * 暂时只能修改沙盒条目 184017, 309445, 354667, 354677, 363612
 */
export async function subjectInfo(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: SubjectWikiInfo;
      }
    | {
        status: 401;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
      }
  >(`/p1/wiki/subjects/${encodeURIComponent(subjectId)}`, {
    ...opts,
  });
}
/**
 * 暂时只能修改沙盒条目 184017,309445,354667,354677,363612
 *
 * 需要 `subjectWikiEdit` 权限
 */
export async function putSubjectInfo(
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
/**
 * 暂时只能修改沙盒条目 184017,309445,354667,354677,363612
 */
export async function patchSubjectInfo(
  subjectId: number,
  body: {
    commitMessage: string;
    subject: {
      name?: string;
      infobox?: string;
      platform?: number;
      nsfw?: boolean;
      date?: string;
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
        data: Error;
      }
    | {
        status: 500;
        data: Error;
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
 * 获取当前的 wiki 信息
 *
 * 暂时只能修改沙盒条目 184017, 309445, 354667, 354677, 363612
 */
export async function subjectEditHistorySummary(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: HistorySummary[];
      }
    | {
        status: 401;
        data: Error;
      }
    | {
        status: 500;
        data: Error;
      }
  >(`/p1/wiki/subjects/${encodeURIComponent(subjectId)}/history-summary`, {
    ...opts,
  });
}
