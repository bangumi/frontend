/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/p1/logout': {
    /** @description 登出 */
    post: operations['logout'];
  };
  '/p1/login': {
    /**
     * @description 需要 [hCaptcha的验证码](https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage)
     *
     * site-key 是 `4874acee-9c6e-4e47-99ad-e2ea1606961f`
     */
    post: operations['login'];
  };
  '/p1/login2': {
    /**
     * @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
     *
     * next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
     *
     * dev.bgm38.com 域名使用测试用的 site-key `1x00000000000000000000AA`
     */
    post: operations['login2'];
  };
  '/p1/me': {
    get: operations['getCurrentUser'];
  };
  '/p1/groups/{groupName}/profile': {
    /** @description 获取小组首页 */
    get: operations['getGroupProfile'];
  };
  '/p1/groups/-/topics/{id}': {
    /** @description 获取帖子列表 */
    get: operations['getGroupTopicDetail'];
  };
  '/p1/groups/{groupName}/members': {
    /** @description 获取帖子列表 */
    get: operations['listGroupMembersByName'];
  };
  '/p1/groups/{groupName}/topics': {
    /** @description 获取帖子列表 */
    get: operations['getGroupTopicsByGroupName'];
    post: operations['createNewGroupTopic'];
  };
  '/p1/subjects/{subjectID}/topics': {
    /** @description 获取帖子列表 */
    get: operations['getSubjectTopicsBySubjectId'];
  };
  '/p1/groups/-/topics/{topicID}/replies': {
    post: operations['createGroupReply'];
  };
  '/p1/notify': {
    /** 获取未读通知 */
    get: operations['listNotice'];
  };
  '/p1/clear-notify': {
    /**
     * 标记通知为已读
     * @description 标记通知为已读
     *
     * 不传id时会清空所有未读通知
     */
    post: operations['clearNotice'];
  };
  '/p1/sub/notify': {
    /**
     * 使用 websocket 订阅通知
     * @description openapi不能很好的描述websocket api，但是这个 api 只会返回一种数据
     *
     * swagger 的 `Try it out` 不支持 websocket，所以会直接显示为 404 响应
     */
    get: operations['subscribeNotify'];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** User */
    User: {
      id: number;
      username: string;
      nickname: string;
      /** Avatar */
      avatar: {
        small: string;
        medium: string;
        large: string;
      };
      sign: string;
      user_group: number;
    };
    /** Avatar */
    Avatar: {
      small: string;
      medium: string;
      large: string;
    };
    /** @description fastify default error response */
    Error: {
      code: string;
      error: string;
      message: string;
      statusCode: number;
    };
    /** @description request data validation error */
    ValidationError: {
      error: string;
      message: string;
      statusCode: number;
    };
    /** Topic */
    Topic: {
      /** @description topic id */
      id: number;
      /** User */
      creator: {
        id: number;
        username: string;
        nickname: string;
        /** Avatar */
        avatar: {
          small: string;
          medium: string;
          large: string;
        };
        sign: string;
        user_group: number;
      };
      title: string;
      /** @description 小组/条目ID */
      parentID: number;
      /** @description 发帖时间，unix time stamp in seconds */
      createdAt: number;
      /** @description 最后回复时间，unix time stamp in seconds */
      updatedAt: number;
      repliesCount: number;
    };
    Group: {
      id: number;
      name: string;
      nsfw: boolean;
      title: string;
      icon: string;
      description: string;
      totalMembers: number;
      createdAt: number;
    };
    GroupProfile: {
      recentAddedMembers: components['schemas']['GroupMember'][];
      topics: components['schemas']['Topic'][];
      /** @description 是否已经加入小组 */
      inGroup: boolean;
      group: components['schemas']['Group'];
      totalTopics: number;
    };
    SubReply: {
      id: number;
      creator: components['schemas']['User'];
      createdAt: number;
      isFriend: boolean;
      text: string;
      state: number;
    };
    BasicReply: {
      id: number;
      creator: components['schemas']['User'];
      createdAt: number;
      text: string;
      state: number;
    };
    Reply: {
      id: number;
      isFriend: boolean;
      replies: components['schemas']['SubReply'][];
      creator: components['schemas']['User'];
      createdAt: number;
      text: string;
      state: number;
    };
    TopicDetail: {
      id: number;
      group: components['schemas']['Group'];
      creator: components['schemas']['User'];
      title: string;
      text: string;
      state: number;
      createdAt: number;
      replies: components['schemas']['Reply'][];
    };
    GroupMember: {
      /** Avatar */
      avatar: {
        small: string;
        medium: string;
        large: string;
      };
      id: number;
      nickname: string;
      username: string;
      joinedAt: number;
    };
    Notice: {
      id: number;
      title: string;
      /** @description 查看 `./lib/notify.ts` _settings */
      type: number;
      /** User */
      sender: {
        id: number;
        username: string;
        nickname: string;
        /** Avatar */
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
      /** @description unix timestamp in seconds */
      createdAt: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {
  logout: {
    /** @description 登出 */
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 未登录 */
      401: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  login: {
    /**
     * @description 需要 [hCaptcha的验证码](https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage)
     *
     * site-key 是 `4874acee-9c6e-4e47-99ad-e2ea1606961f`
     */
    requestBody: {
      content: {
        /**
         * @example {
         *   "email": "treeholechan@gmail.com",
         *   "password": "lovemeplease",
         *   "h-captcha-response": "10000000-aaaa-bbbb-cccc-000000000001"
         * }
         */
        'application/json': {
          email: string;
          password: string;
          'h-captcha-response': string;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          /** @description example: "sessionID=12345abc" */
          'Set-Cookie'?: string;
        };
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      /** @description Default Response */
      400: {
        content: {
          'application/json': components['schemas']['ValidationError'];
        };
      };
      /** @description 验证码错误/账号密码不匹配 */
      401: {
        headers: {
          /** @description remaining rate limit */
          'X-RateLimit-Remaining'?: number;
          /** @description total limit per 10 minutes */
          'X-RateLimit-Limit'?: number;
          /** @description seconds to reset rate limit */
          'X-RateLimit-Reset'?: number;
        };
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 失败次数太多，需要过一段时间再重试 */
      429: {
        headers: {
          /** @description remaining rate limit */
          'X-RateLimit-Remaining'?: number;
          /** @description limit per 10 minutes */
          'X-RateLimit-Limit'?: number;
          /** @description seconds to reset rate limit */
          'X-RateLimit-Reset'?: number;
        };
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  login2: {
    /**
     * @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
     *
     * next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
     *
     * dev.bgm38.com 域名使用测试用的 site-key `1x00000000000000000000AA`
     */
    requestBody: {
      content: {
        /**
         * @example {
         *   "email": "treeholechan@gmail.com",
         *   "password": "lovemeplease",
         *   "cf-turnstile-response": "10000000-aaaa-bbbb-cccc-000000000001"
         * }
         */
        'application/json': {
          email: string;
          password: string;
          'cf-turnstile-response': string;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          /** @description example: "sessionID=12345abc" */
          'Set-Cookie'?: string;
        };
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      /** @description Default Response */
      400: {
        content: {
          'application/json': components['schemas']['ValidationError'];
        };
      };
      /** @description 验证码错误/账号密码不匹配 */
      401: {
        headers: {
          /** @description remaining rate limit */
          'X-RateLimit-Remaining'?: number;
          /** @description total limit per 10 minutes */
          'X-RateLimit-Limit'?: number;
          /** @description seconds to reset rate limit */
          'X-RateLimit-Reset'?: number;
        };
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 失败次数太多，需要过一段时间再重试 */
      429: {
        headers: {
          /** @description remaining rate limit */
          'X-RateLimit-Remaining'?: number;
          /** @description limit per 10 minutes */
          'X-RateLimit-Limit'?: number;
          /** @description seconds to reset rate limit */
          'X-RateLimit-Reset'?: number;
        };
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  getCurrentUser: {
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      /** @description Default Response */
      401: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  getGroupProfile: {
    /** @description 获取小组首页 */
    parameters: {
      query?: {
        limit?: number;
        offset?: number;
      };
      path: {
        groupName: string;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': components['schemas']['GroupProfile'];
        };
      };
      /** @description 小组不存在 */
      404: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  getGroupTopicDetail: {
    /** @description 获取帖子列表 */
    parameters: {
      /** @example 371602 */
      path: {
        id: number;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': components['schemas']['TopicDetail'];
        };
      };
      /** @description 小组不存在 */
      404: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  listGroupMembersByName: {
    /** @description 获取帖子列表 */
    parameters: {
      query?: {
        type?: 'mod' | 'normal' | 'all';
        limit?: number;
        offset?: number;
      };
      path: {
        groupName: string;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': {
            data: components['schemas']['GroupMember'][];
            total: number;
          };
        };
      };
      /** @description 小组不存在 */
      404: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  getGroupTopicsByGroupName: {
    /** @description 获取帖子列表 */
    parameters: {
      query?: {
        limit?: number;
        offset?: number;
      };
      path: {
        groupName: string;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': {
            data: components['schemas']['Topic'][];
            total: number;
          };
        };
      };
      /** @description 小组不存在 */
      404: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  createNewGroupTopic: {
    parameters: {
      /** @example sandbox */
      path: {
        groupName: string;
      };
    };
    requestBody: {
      content: {
        /**
         * @example {
         *   "title": "post title",
         *   "content": "post contents"
         * }
         */
        'application/json': {
          title: string;
          content: string;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': {
            /** @description new post topic id */
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  getSubjectTopicsBySubjectId: {
    /** @description 获取帖子列表 */
    parameters: {
      query?: {
        limit?: number;
        offset?: number;
      };
      path: {
        subjectID: number;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': {
            data: components['schemas']['Topic'][];
            total: number;
          };
        };
      };
      /** @description 条目不存在 */
      404: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  createGroupReply: {
    parameters: {
      /** @example 371602 */
      path: {
        topicID: number;
      };
    };
    requestBody: {
      content: {
        'application/json': {
          /** @default 0 */
          relatedID: number;
          content: string;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': components['schemas']['BasicReply'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  listNotice: {
    /** 获取未读通知 */
    parameters?: {
      query?: {
        limit?: number;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': {
            data: components['schemas']['Notice'][];
            total: number;
          };
        };
      };
      /** @description 未登录 */
      401: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  clearNotice: {
    /**
     * 标记通知为已读
     * @description 标记通知为已读
     *
     * 不传id时会清空所有未读通知
     */
    requestBody?: {
      content: {
        'application/json': {
          id?: number[];
        };
      };
    };
    responses: {
      /** @description 没有返回值 */
      200: never;
      /** @description 未登录 */
      401: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
  subscribeNotify: {
    /**
     * 使用 websocket 订阅通知
     * @description openapi不能很好的描述websocket api，但是这个 api 只会返回一种数据
     *
     * swagger 的 `Try it out` 不支持 websocket，所以会直接显示为 404 响应
     */
    responses: {
      /** @description Default Response */
      200: {
        content: {
          'application/json': {
            count: number;
          };
        };
      };
      /** @description 未登录 */
      401: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        content: {
          'application/json': components['schemas']['Error'];
        };
      };
    };
  };
}
