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
export interface Error {
  code: string;
  error: string;
  message: string;
  statusCode: number;
}
export interface User {
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
}
export interface Group {
  createdAt: number;
  description: string;
  icon: string;
  id: number;
  name: string;
  nsfw: boolean;
  title: string;
  totalMembers: number;
}
export interface SubReply {
  createdAt: number;
  creator: User;
  id: number;
  isFriend: boolean;
  state: number;
  text: string;
}
export interface Reply {
  createdAt: number;
  creator: User;
  id: number;
  isFriend: boolean;
  replies: SubReply[];
  state: number;
  text: string;
}
export interface TopicDetail {
  createdAt: number;
  creator: User;
  group: Group;
  id: number;
  replies: Reply[];
  state: number;
  text: string;
  title: string;
}
export interface TopicCreation {
  text: string;
  title: string;
}
export interface BasicReply {
  createdAt: number;
  creator: User;
  id: number;
  state: number;
  text: string;
}
export interface GroupMember {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  id: number;
  joinedAt: number;
  nickname: string;
  username: string;
}
export interface Topic {
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
  id: number;
  parentID: number;
  repliesCount: number;
  title: string;
  updatedAt: number;
}
export interface GroupProfile {
  group: Group;
  inGroup: boolean;
  recentAddedMembers: GroupMember[];
  topics: Topic[];
  totalTopics: number;
}
export interface LoginRequestBody {
  'cf-turnstile-response': string;
  email: string;
  password: string;
}
export interface ValidationError {
  error: string;
  message: string;
  statusCode: number;
}
export interface CurrentUser {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  id: number;
  nickname: string;
  permission: {
    subjectWikiEdit: boolean;
  };
  sign: string;
  user_group: number;
  username: string;
}
export interface Notice {
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
  type: number;
}
export interface WikiPlatform {
  id: number;
  text: string;
  wiki_tpl?: string;
}
export type SubjectType = 1 | 2 | 3 | 4 | 6;
export interface SubjectWikiInfo {
  availablePlatform: WikiPlatform[];
  id: number;
  infobox: string;
  name: string;
  nsfw: boolean;
  platform: number;
  summary: string;
  typeID: SubjectType;
}
export interface SubjectEdit {
  date?: string;
  infobox: string;
  name: string;
  nsfw: boolean;
  platform: number;
  summary: string;
}
export interface HistorySummary {
  commitMessage: string;
  createdAt: number;
  creator: {
    username: string;
  };
  type: number;
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
export async function editGroupReply(
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
export async function editGroupTopic(
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
        data: Error;
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
    `/p1/groups/-/topics/${encodeURIComponent(topicId)}`,
    oazapfts.json({
      ...opts,
      method: 'PUT',
      body: topicCreation,
    }),
  );
}
export async function createGroupReply(
  topicId: number,
  body: {
    content: string;
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
  topicCreation?: TopicCreation,
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
export async function login(loginRequestBody?: LoginRequestBody, opts?: Oazapfts.RequestOpts) {
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
    '/p1/login',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body: loginRequestBody,
    }),
  );
}
/**
 * backward compatibility for #login operator
 */
export async function login2(loginRequestBody?: LoginRequestBody, opts?: Oazapfts.RequestOpts) {
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
      body: loginRequestBody,
    }),
  );
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
 */
export async function patchSubjectInfo(
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
export async function listSubjectCovers(subjectId: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          covers: Array<{
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
          }>;
          current?: {
            raw: string;
            thumbnail: string;
          };
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
        status: 400;
        data: Error;
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
