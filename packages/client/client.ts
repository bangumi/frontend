/**
 * hello
 * 0.0.50
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
/**
 * 登出
 */
export async function logout(opts?: Oazapfts.RequestOpts) {
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
  >('/p1/logout', {
    ...opts,
    method: 'POST',
  });
}
/**
 * 需要 [hCaptcha的验证码](https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage)
 *
 * site-key 是 `4874acee-9c6e-4e47-99ad-e2ea1606961f`
 */
export async function login(
  body: {
    email: string;
    password: string;
    'h-captcha-response': string;
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
    '/p1/login',
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
export async function getCurrentUser(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: User;
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
    relatedID: number;
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
 *
 * 不传id时会清空所有未读通知
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
/**
 * 使用 websocket 订阅通知
 *
 * openapi不能很好的描述websocket api，但是这个api只会返回一种数据
 *
 * swagger 的 `Try it out` 不支持 websocket，所以会直接显示为 404 响应
 */
export async function subscribeNotify(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          count: number;
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
  >('/p1/sub/notify', {
    ...opts,
  });
}
