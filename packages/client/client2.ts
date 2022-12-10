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
  };
  parentID: number;
  lastRepliedAt: string;
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
  >(
    '/p1/login',
    oazapfts.json({
      ...opts,
      method: 'POST',
      body,
    }),
  );
}
export async function getP1Me(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: User;
      }
    | {
        status: 401;
        data: Error;
      }
  >('/p1/me', {
    ...opts,
  });
}
/**
 * 获取小组首页
 */
export async function getP1GroupsByGroupNameProfile(
  groupName: string,
  opts?: Oazapfts.RequestOpts,
) {
  return oazapfts.fetchJson<
    | {
        status: 200;
        data: {
          recentAddedMembers: Array<{
            id: number;
            username: string;
            avatar: {
              small: string;
              medium: string;
              large: string;
            };
            nickname: string;
          }>;
          topics: Topic[];
          group: {
            id: number;
            name: string;
            nsfw: boolean;
            summary: string;
            createdAt: number;
          };
        };
      }
    | {
        status: 404;
        data: Error;
      }
  >(`/p1/groups/${encodeURIComponent(groupName)}/profile`, {
    ...opts,
  });
}
/**
 * 获取帖子列表
 */
export async function getP1GroupsByGroupNameTopics(
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
export async function getP1SubjectsBySubjectIdTopics(
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
