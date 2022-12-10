/**
 * hello
 * 0.0.24
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
  user_group: number;
}
export interface Topic {
  id: number;
  creator: {
    id: number;
    username: string;
    avatar: {
      small: string;
      medium: string;
      large: string;
    };
    nickname: string;
    sign: string;
    user_group: number;
  };
  title: string;
  parentID: number;
  createdAt: number;
  updatedAt: number;
  repliesCount: number;
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
        data: Error;
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
        data: {
          recentAddedMembers: Array<{
            avatar: {
              small: string;
              medium: string;
              large: string;
            };
            id: number;
            nickname: string;
            username: string;
            joinedAt: number;
          }>;
          topics: Topic[];
          inGroup: boolean;
          group: {
            id: number;
            name: string;
            nsfw: boolean;
            title: string;
            icon: string;
            description: string;
            totalMembers: number;
            createdAt: number;
          };
          totalTopics: number;
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
export async function getGroupTopic(id: number, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          id: number;
          group: {
            id: number;
            name: string;
            nsfw: boolean;
            title: string;
            icon: string;
            description: string;
            totalMembers: number;
            createdAt: number;
          };
          creator: {
            id: number;
            username: string;
            avatar: {
              small: string;
              medium: string;
              large: string;
            };
            nickname: string;
            sign: string;
            user_group: number;
          };
          title: string;
          text: string;
          state: number;
          createdAt: number;
          replies: Array<{
            id: number;
            isFriend: boolean;
            replies: Array<{
              id: number;
              creator: {
                id: number;
                username: string;
                avatar: {
                  small: string;
                  medium: string;
                  large: string;
                };
                nickname: string;
                sign: string;
                user_group: number;
              };
              createdAt: number;
              isFriend: boolean;
              text: string;
              state: number;
            }>;
            creator: {
              id: number;
              username: string;
              avatar: {
                small: string;
                medium: string;
                large: string;
              };
              nickname: string;
              sign: string;
              user_group: number;
            };
            createdAt: number;
            text: string;
            state: number;
          }>;
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
