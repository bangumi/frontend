export interface paths {
  '/p1/blocklist': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取绝交用户列表 */
    get: operations['getBlocklist'];
    put?: never;
    /** 将用户添加到绝交列表 */
    post: operations['addToBlocklist'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/blocklist/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** 将用户从绝交列表移出 */
    delete: operations['removeFromBlocklist'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/blogs/{entryID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取日志详情 */
    get: operations['getBlogEntry'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/blogs/{entryID}/photos': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取日志的图片 */
    get: operations['getBlogPhotos'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/blogs/{entryID}/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取日志的关联条目 */
    get: operations['getBlogRelatedSubjects'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/calendar': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取每日放送 */
    get: operations['getCalendar'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/characters/{characterID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色 */
    get: operations['getCharacter'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/characters/{characterID}/casts': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色出演作品 */
    get: operations['getCharacterCasts'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/characters/{characterID}/collects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色的收藏用户 */
    get: operations['getCharacterCollects'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/clear-notify': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 标记通知为已读
     * @description 标记通知为已读
     *
     *     不传id时会清空所有未读通知
     */
    post: operations['clearNotice'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/collections/characters': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的角色收藏 */
    get: operations['getMyCharacterCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/collections/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的目录收藏 */
    get: operations['getMyIndexCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/collections/persons': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的人物收藏 */
    get: operations['getMyPersonCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/collections/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的条目收藏 */
    get: operations['getMySubjectCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/debug': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * debug
     * @description debug 路由
     */
    get: operations['debug'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/episodes/-/comments/{commentID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 编辑条目的剧集吐槽 */
    put: operations['updateSubjectEpComment'];
    post?: never;
    /** 删除条目的剧集吐槽 */
    delete: operations['deleteSubjectEpComment'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/episodes/{episodeID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取剧集信息 */
    get: operations['getSubjectEpisode'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/episodes/{episodeID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的剧集吐槽箱 */
    get: operations['getSubjectEpisodeComments'];
    put?: never;
    /** 创建条目的剧集吐槽 */
    post: operations['createSubjectEpComment'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/followers': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的关注者列表 */
    get: operations['getMyFollowers'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/friends': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的好友列表 */
    get: operations['getMyFriends'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/-/posts/{postID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取小组帖子回复详情 */
    get: operations['getGroupPost'];
    /** 编辑小组帖子回复 */
    put: operations['editGroupPost'];
    post?: never;
    /** 删除小组帖子回复 */
    delete: operations['deleteGroupPost'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/-/topics/{topicID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取小组帖子详情 */
    get: operations['getGroupTopic'];
    /** @description 编辑小组帖子 */
    put: operations['editGroupTopic'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/-/topics/{topicID}/replies': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 创建小组帖子回复 */
    post: operations['createGroupReply'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/{groupName}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取小组详情 */
    get: operations['getGroup'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/{groupName}/members': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取小组成员列表 */
    get: operations['getGroupMembers'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/{groupName}/topics': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取小组帖子列表 */
    get: operations['getGroupTopics'];
    put?: never;
    /** 创建小组帖子 */
    post: operations['createGroupTopic'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
     *
     *     next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
     *
     *     dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
    post: operations['login'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 登出 */
    post: operations['logout'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/me': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户信息 */
    get: operations['getCurrentUser'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/notify': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取未读通知 */
    get: operations['listNotice'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/persons/{personID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物 */
    get: operations['getPerson'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/persons/{personID}/casts': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物的出演角色 */
    get: operations['getPersonCasts'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/persons/{personID}/collects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物的收藏用户 */
    get: operations['getPersonCollects'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/persons/{personID}/works': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物的参与作品 */
    get: operations['getPersonWorks'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目列表 */
    get: operations['getSubjects'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/episode/{episodeID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          episodeID: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/episode/{episodeID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          episodeID: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/episodes/{episodeID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          episodeID: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/episodes/{episodeID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          episodeID: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/posts/{postID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目讨论回复详情 */
    get: operations['getSubjectPost'];
    /** 编辑条目讨论回复 */
    put: operations['editSubjectPost'];
    post?: never;
    /** 删除条目讨论回复 */
    delete: operations['deleteSubjectPost'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/topics/{topicID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目讨论详情 */
    get: operations['getSubjectTopic'];
    /** 编辑自己创建的条目讨论 */
    put: operations['updateSubjectTopic'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/topics/{topicID}/replies': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 创建条目讨论回复 */
    post: operations['createSubjectReply'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目 */
    get: operations['getSubject'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/characters': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的角色 */
    get: operations['getSubjectCharacters'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的吐槽箱 */
    get: operations['getSubjectComments'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/episodes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的剧集 */
    get: operations['getSubjectEpisodes'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/recs': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的推荐 */
    get: operations['getSubjectRecs'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/relations': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的关联条目 */
    get: operations['getSubjectRelations'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/reviews': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的评论 */
    get: operations['getSubjectReviews'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/staffs/persons': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的制作人员 */
    get: operations['getSubjectStaffPersons'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/staffs/positions': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的制作人员职位 */
    get: operations['getSubjectStaffPositions'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/topics': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目讨论版 */
    get: operations['getSubjectTopics'];
    put?: never;
    /** 创建条目讨论 */
    post: operations['createSubjectTopic'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/timeline': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取时间线 */
    get: operations['getTimeline'];
    put?: never;
    /** 发送时间线吐槽 */
    post: operations['createTimelineSay'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/trending/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取热门条目 */
    get: operations['getTrendingSubjects'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/turnstile': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 获取 Turnstile 令牌
     * @description 为防止滥用，Redirect URI 为白名单机制，如需添加请提交 PR。
     */
    get: operations['getTurnstileToken'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户信息 */
    get: operations['getUser'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/blogs': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户创建的日志 */
    get: operations['getUserBlogs'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/collections/characters': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户角色收藏 */
    get: operations['getUserCharacterCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/collections/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户目录收藏 */
    get: operations['getUserIndexCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/collections/persons': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户人物收藏 */
    get: operations['getUserPersonCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/collections/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户条目收藏 */
    get: operations['getUserSubjectCollections'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/followers': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户的关注者列表 */
    get: operations['getUserFollowers'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/friends': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户的好友列表 */
    get: operations['getUserFriends'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/groups': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户加入的小组 */
    get: operations['getUserGroups'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户创建的目录 */
    get: operations['getUserIndexes'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/users/{username}/timeline': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户时间胶囊 */
    get: operations['getUserTimeline'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/ep/{episodeID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getEpisodeWikiInfo'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations['patchEpisodeWikiInfo'];
    trace?: never;
  };
  '/p1/wiki/lock/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['lockSubject'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/persons/{personID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 获取当前的 wiki 信息 */
    get: operations['getPersonWikiInfo'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations['patchPersonInfo'];
    trace?: never;
  };
  '/p1/wiki/recent': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 获取最近两天的wiki更新 */
    get: operations['getRecentWiki'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description 创建新条目 */
    post: operations['createNewSubject'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/subjects/{subjectID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 获取当前的 wiki 信息 */
    get: operations['subjectInfo'];
    /** @description 需要 `subjectWikiEdit` 权限 */
    put: operations['putSubjectInfo'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations['patchSubjectInfo'];
    trace?: never;
  };
  '/p1/wiki/subjects/{subjectID}/covers': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['listSubjectCovers'];
    put?: never;
    /** @description 需要 `subjectWikiEdit` 权限 */
    post: operations['uploadSubjectCover'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/subjects/{subjectID}/covers/{imageID}/vote': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 为条目封面投票
     * @description 需要 `subjectWikiEdit` 权限
     */
    post: operations['voteSubjectCover'];
    /**
     * 撤消条目封面投票
     * @description 需要 `subjectWikiEdit` 权限
     */
    delete: operations['unvoteSubjectCover'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/subjects/{subjectID}/ep': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 为条目添加新章节
     * @description 需要 `epEdit` 权限，一次最多可以添加 40 个章节
     */
    post: operations['createEpisodes'];
    delete?: never;
    options?: never;
    head?: never;
    /**
     * 批量编辑条目章节
     * @description 需要 `epEdit` 权限，一次最多可以编辑 20 个章节
     */
    patch: operations['patchEpisodes'];
    trace?: never;
  };
  '/p1/wiki/subjects/{subjectID}/history-summary': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description 获取当前的 wiki 信息 */
    get: operations['subjectEditHistorySummary'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/unlock/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['unlockSubject'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** Avatar */
    Avatar: {
      large: string;
      /** @example sai */
      medium: string;
      small: string;
    };
    /** BlogEntry */
    BlogEntry: {
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
      user: components['schemas']['SlimUser'];
      views: number;
    };
    /** BlogPhoto */
    BlogPhoto: {
      createdAt: number;
      icon: string;
      id: number;
      target: string;
      vote: number;
    };
    Calendar: {
      [key: string]: {
        subject: components['schemas']['SlimSubject'];
        watchers: number;
      }[];
    };
    CalendarItem: {
      subject: components['schemas']['SlimSubject'];
      watchers: number;
    };
    /** Character */
    Character: {
      collectedAt?: number;
      collects: number;
      comment: number;
      id: number;
      images?: components['schemas']['PersonImages'];
      infobox: components['schemas']['Infobox'];
      lock: boolean;
      name: string;
      nameCN: string;
      nsfw: boolean;
      redirect: number;
      role: number;
      summary: string;
    };
    CharacterRelation: {
      character: components['schemas']['SlimCharacter'];
      /** @description 角色关系: 任职于,从属,聘用,嫁给... */
      relation: number;
    };
    CharacterSubject: {
      actors: components['schemas']['SlimPerson'][];
      subject: components['schemas']['SlimSubject'];
      type: number;
    };
    CharacterSubjectRelation: {
      subject: components['schemas']['SlimSubject'];
      type: number;
    };
    /**
     * @description 条目收藏状态
     *       - 1 = 想看
     *       - 2 = 看过
     *       - 3 = 在看
     *       - 4 = 搁置
     *       - 5 = 抛弃
     * @enum {integer}
     */
    CollectionType: 1 | 2 | 3 | 4 | 5;
    CreateEpisodeComment: {
      content: string;
      /**
       * @description 被回复的吐槽 ID, `0` 代表发送顶层吐槽
       * @default 0
       */
      replyTo: number;
      /** @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
       *     next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
       *     dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
      turnstileToken: string;
    };
    CreatePost: {
      content: string;
      /**
       * @description 被回复的帖子 ID, `0` 代表回复楼主
       * @default 0
       */
      replyTo: number;
      /** @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
       *     next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
       *     dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
      turnstileToken: string;
    };
    CreateTimelineSay: {
      content: string;
      /** @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
       *     next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
       *     dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
      turnstileToken: string;
    };
    /** @example {
     *       "content": "topic content",
     *       "title": "topic title",
     *       "turnstileToken": "10000000-aaaa-bbbb-cccc-000000000001"
     *     } */
    CreateTopic: {
      /** @description bbcode */
      content: string;
      title: string;
      /** @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
       *     next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
       *     dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
      turnstileToken: string;
    };
    /** Episode */
    Episode: {
      airdate: string;
      comment: number;
      desc?: string;
      disc: number;
      duration: string;
      id: number;
      name: string;
      nameCN: string;
      sort: number;
      status?: components['schemas']['EpisodeCollectionStatus'];
      subject?: components['schemas']['SlimSubject'];
      subjectID: number;
      type: components['schemas']['EpisodeType'];
    };
    /**
     * @description 剧集收藏状态
     *       - 0 = 撤消/删除
     *       - 1 = 想看
     *       - 2 = 看过
     *       - 3 = 抛弃
     * @enum {integer}
     */
    EpisodeCollectionStatus: 0 | 1 | 2 | 3;
    EpisodeCommentBase: {
      content: string;
      createdAt: number;
      creatorID: number;
      epID: number;
      id: number;
      reactions?: components['schemas']['Reaction'][];
      relatedID: number;
      state: number;
      user?: components['schemas']['SlimUser'];
    };
    EpisodeComments: {
      content: string;
      createdAt: number;
      creatorID: number;
      epID: number;
      id: number;
      reactions?: components['schemas']['Reaction'][];
      relatedID: number;
      state: number;
      user?: components['schemas']['SlimUser'];
    } & {
      replies: components['schemas']['EpisodeCommentBase'][];
    };
    /**
     * @description 话数类型
     *       - 0 = 本篇
     *       - 1 = 特别篇
     *       - 2 = OP
     *       - 3 = ED
     *       - 4 = 预告/宣传/广告
     *       - 5 = MAD
     *       - 6 = 其他
     * @enum {integer}
     */
    EpisodeType: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    EpisodeWikiInfo: {
      /**
       * @description YYYY-MM-DD
       * @example 2022-02-02
       */
      date?: string;
      disc?: number;
      /** @example 24:53 */
      duration: string;
      ep: number;
      id: number;
      name: string;
      nameCN: string;
      subjectID: number;
      summary: string;
      type: components['schemas']['EpisodeType'];
    };
    EpsisodesEdit: {
      commitMessage: string;
      episodes: {
        /**
         * @description YYYY-MM-DD
         * @example 2022-02-02
         */
        date?: string;
        disc?: number;
        /** @example 24:53 */
        duration?: string;
        ep?: number;
        id: number;
        name?: string;
        nameCN?: string;
        summary?: string;
        type?: components['schemas']['EpisodeType'];
      }[];
      expectedRevision?: {
        date?: string;
        duration?: string;
        name?: string;
        nameCN?: string;
        summary?: string;
      }[];
    };
    EpsisodesNew: {
      episodes: {
        /**
         * @description YYYY-MM-DD
         * @example 2022-02-02
         */
        date?: string;
        disc?: number;
        /** @example 24:53 */
        duration?: string;
        ep: number;
        name?: string;
        nameCN?: string;
        summary?: string;
        type?: components['schemas']['EpisodeType'];
      }[];
    };
    /** @description default error response type */
    ErrorResponse: {
      code: string;
      error: string;
      message: string;
      statusCode: number;
    };
    /**
     * @description 过滤模式
     *       - all = 全站
     *       - friends = 好友
     * @enum {string}
     */
    FilterMode: 'all' | 'friends';
    /** Friend */
    Friend: {
      createdAt: number;
      description: string;
      grade: number;
      user: components['schemas']['SlimUser'];
    };
    /** Group */
    Group: {
      accessible: boolean;
      cat: number;
      createdAt: number;
      creator?: components['schemas']['SlimUser'];
      creatorID: number;
      description: string;
      icon: components['schemas']['Avatar'];
      id: number;
      members: number;
      name: string;
      nsfw: boolean;
      posts: number;
      title: string;
      topics: number;
    };
    /** GroupMember */
    GroupMember: {
      joinedAt: number;
      moderator: boolean;
      uid: number;
      user?: components['schemas']['SlimUser'];
    };
    /** GroupTopic */
    GroupTopic: components['schemas']['TopicBase'] & {
      content: string;
      creator: components['schemas']['SlimUser'];
      group: components['schemas']['SlimGroup'];
      replies: components['schemas']['Reply'][];
    };
    HistorySummary: {
      commitMessage: string;
      /** @description unix timestamp seconds */
      createdAt: number;
      creator: {
        username: string;
      };
      /** @description 修改类型。`1` 正常修改， `11` 合并，`103` 锁定/解锁 `104` 未知 */
      type: number;
    };
    /** Index */
    Index: {
      collectedAt?: number;
      collects: number;
      createdAt: number;
      desc: string;
      id: number;
      replies: number;
      stats: components['schemas']['IndexStats'];
      title: string;
      total: number;
      type: number;
      updatedAt: number;
    };
    /** IndexStats */
    IndexStats: {
      [key: string]: number;
    };
    /** Infobox */
    Infobox: {
      key: string;
      values: {
        k?: string;
        v: string;
      }[];
    }[];
    /** InfoboxItem */
    InfoboxItem: {
      key: string;
      values: {
        k?: string;
        v: string;
      }[];
    };
    /** InfoboxValue */
    InfoboxValue: {
      k?: string;
      v: string;
    };
    /** @example {
     *       "email": "treeholechan@gmail.com",
     *       "password": "lovemeplease",
     *       "turnstileToken": "10000000-aaaa-bbbb-cccc-000000000001"
     *     } */
    LoginRequestBody: {
      email: string;
      password: string;
      turnstileToken: string;
    };
    Notice: {
      /** @description unix timestamp in seconds */
      createdAt: number;
      id: number;
      postID: number;
      /** SlimUser */
      sender: {
        avatar: components['schemas']['Avatar'];
        /** @example 1 */
        id: number;
        joinedAt: number;
        /** @example Sai🖖 */
        nickname: string;
        sign: string;
        /** @example sai */
        username: string;
      };
      title: string;
      topicID: number;
      /** @description 查看 `./lib/notify.ts` _settings */
      type: number;
      unread: boolean;
    };
    /** Permissions */
    Permissions: {
      subjectWikiEdit: boolean;
    };
    /** Person */
    Person: {
      /**
       * @description 职业
       * @example producer
       */
      career: string[];
      collectedAt?: number;
      collects: number;
      comment: number;
      id: number;
      images?: components['schemas']['PersonImages'];
      infobox: components['schemas']['Infobox'];
      lock: boolean;
      name: string;
      nameCN: string;
      nsfw: boolean;
      redirect: number;
      summary: string;
      type: number;
    };
    PersonCharacter: {
      character: components['schemas']['SlimCharacter'];
      relations: components['schemas']['CharacterSubjectRelation'][];
    };
    PersonCollect: {
      createdAt: number;
      user: components['schemas']['SlimUser'];
    };
    /** PersonImages */
    PersonImages: {
      grid: string;
      large: string;
      medium: string;
      small: string;
    };
    PersonRelation: {
      person: components['schemas']['SlimPerson'];
      /** @description 人物关系: 任职于,从属,聘用,嫁给... */
      relation: number;
    };
    PersonWikiInfo: {
      id: number;
      infobox: string;
      name: string;
      summary: string;
      typeID: components['schemas']['SubjectType'];
    };
    PersonWork: {
      positions: components['schemas']['SubjectStaffPosition'][];
      subject: components['schemas']['SlimSubject'];
    };
    /** Post */
    Post: {
      content: string;
      createdAt: number;
      creator: components['schemas']['SlimUser'];
      creatorID: number;
      id: number;
      state: number;
      topic: components['schemas']['Topic'];
    };
    /** Profile */
    Profile: {
      avatar: components['schemas']['Avatar'];
      bio: string;
      friendIDs: number[];
      group: number;
      id: number;
      joinedAt: number;
      location: string;
      nickname: string;
      permissions: components['schemas']['Permissions'];
      sign: string;
      site: string;
      username: string;
    };
    /** Reaction */
    Reaction: {
      users: components['schemas']['SimpleUser'][];
      value: number;
    };
    RecentWikiChange: {
      persons: {
        createdAt: number;
        id: number;
      }[];
      subject: {
        createdAt: number;
        id: number;
      }[];
    };
    /** Reply */
    Reply: components['schemas']['ReplyBase'] & {
      replies: components['schemas']['ReplyBase'][];
    };
    /** ReplyBase */
    ReplyBase: {
      content: string;
      createdAt: number;
      creator?: components['schemas']['SlimUser'];
      creatorID: number;
      id: number;
      reactions?: components['schemas']['Reaction'][];
      state: number;
    };
    /** SimpleUser */
    SimpleUser: {
      id: number;
      nickname: string;
      username: string;
    };
    /** SlimBlogEntry */
    SlimBlogEntry: {
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
    /** SlimCharacter */
    SlimCharacter: {
      comment: number;
      id: number;
      images?: components['schemas']['PersonImages'];
      lock: boolean;
      name: string;
      nameCN: string;
      nsfw: boolean;
      role: number;
    };
    /** SlimGroup */
    SlimGroup: {
      accessible: boolean;
      createdAt: number;
      creatorID: number;
      icon: components['schemas']['Avatar'];
      id: number;
      members: number;
      name: string;
      nsfw: boolean;
      title: string;
    };
    /** SlimIndex */
    SlimIndex: {
      createdAt: number;
      id: number;
      title: string;
      total: number;
      type: number;
    };
    /** SlimPerson */
    SlimPerson: {
      comment: number;
      id: number;
      images?: components['schemas']['PersonImages'];
      lock: boolean;
      name: string;
      nameCN: string;
      nsfw: boolean;
      type: number;
    };
    /**
     * SlimSubject
     * @example {
     *       "id": 8,
     *       "images": {
     *         "common": "https://lain.bgm.tv/pic/cover/c/c9/f0/8_wK0z3.jpg",
     *         "grid": "https://lain.bgm.tv/pic/cover/g/c9/f0/8_wK0z3.jpg",
     *         "large": "https://lain.bgm.tv/pic/cover/l/c9/f0/8_wK0z3.jpg",
     *         "medium": "https://lain.bgm.tv/pic/cover/m/c9/f0/8_wK0z3.jpg",
     *         "small": "https://lain.bgm.tv/pic/cover/s/c9/f0/8_wK0z3.jpg"
     *       },
     *       "locked": false,
     *       "name": "コードギアス 反逆のルルーシュR2",
     *       "nameCN": "Code Geass 反叛的鲁路修R2",
     *       "nsfw": false,
     *       "type": 2
     *     }
     */
    SlimSubject: {
      id: number;
      images?: components['schemas']['SubjectImages'];
      info: string;
      interest?: components['schemas']['SlimSubjectInterest'];
      locked: boolean;
      name: string;
      nameCN: string;
      nsfw: boolean;
      rating: components['schemas']['SubjectRating'];
      type: components['schemas']['SubjectType'];
    };
    /** SlimSubjectInterest */
    SlimSubjectInterest: {
      comment: string;
      rate: number;
      tags: string[];
      type: components['schemas']['CollectionType'];
      updatedAt: number;
    };
    /** SlimUser */
    SlimUser: {
      avatar: components['schemas']['Avatar'];
      /** @example 1 */
      id: number;
      joinedAt: number;
      /** @example Sai🖖 */
      nickname: string;
      sign: string;
      /** @example sai */
      username: string;
    };
    /**
     * Subject
     * @example {
     *       "airtime": {
     *         "date": "2008-04-06",
     *         "month": 4,
     *         "weekday": 7,
     *         "year": 2008
     *       },
     *       "collection": {
     *         "1": 622,
     *         "2": 13216,
     *         "3": 147,
     *         "4": 224,
     *         "5": 115
     *       },
     *       "eps": 25,
     *       "id": 8,
     *       "images": {
     *         "common": "https://lain.bgm.tv/pic/cover/c/c9/f0/8_wK0z3.jpg",
     *         "grid": "https://lain.bgm.tv/pic/cover/g/c9/f0/8_wK0z3.jpg",
     *         "large": "https://lain.bgm.tv/pic/cover/l/c9/f0/8_wK0z3.jpg",
     *         "medium": "https://lain.bgm.tv/pic/cover/m/c9/f0/8_wK0z3.jpg",
     *         "small": "https://lain.bgm.tv/pic/cover/s/c9/f0/8_wK0z3.jpg"
     *       },
     *       "infobox": {
     *         "Copyright": [
     *           {
     *             "v": "（C）2006 SUNRISE inc./MBS"
     *           }
     *         ],
     *         "中文名": [
     *           {
     *             "v": "Code Geass 反叛的鲁路修R2"
     *           }
     *         ],
     *         "人物原案": [
     *           {
     *             "v": "CLAMP"
     *           }
     *         ],
     *         "人物设定": [
     *           {
     *             "v": "木村貴宏"
     *           }
     *         ],
     *         "其他": [
     *           {
     *             "v": ""
     *           }
     *         ],
     *         "其他电视台": [
     *           {
     *             "v": ""
     *           }
     *         ],
     *         "别名": [
     *           {
     *             "v": "叛逆的鲁路修R2"
     *           },
     *           {
     *             "v": "Code Geass: Hangyaku no Lelouch R2"
     *           },
     *           {
     *             "v": "叛逆的勒鲁什R2"
     *           },
     *           {
     *             "v": "叛逆的鲁鲁修R2"
     *           },
     *           {
     *             "v": "コードギアス 反逆のルルーシュR2"
     *           },
     *           {
     *             "v": "Code Geass: Lelouch of the Rebellion R2"
     *           },
     *           {
     *             "v": "叛逆的勒路什R2"
     *           }
     *         ],
     *         "动画制作": [
     *           {
     *             "v": "サンライズ"
     *           }
     *         ],
     *         "官方网站": [
     *           {
     *             "v": "http://www.geass.jp/r2/"
     *           }
     *         ],
     *         "导演": [
     *           {
     *             "v": "谷口悟朗"
     *           }
     *         ],
     *         "摄影监督": [
     *           {
     *             "v": "大矢創太"
     *           }
     *         ],
     *         "播放电视台": [
     *           {
     *             "v": "每日放送"
     *           }
     *         ],
     *         "播放结束": [
     *           {
     *             "v": "2008年9月28日"
     *           }
     *         ],
     *         "放送开始": [
     *           {
     *             "v": "2008年4月6日"
     *           }
     *         ],
     *         "放送星期": [
     *           {
     *             "v": ""
     *           }
     *         ],
     *         "系列构成": [
     *           {
     *             "v": "大河内一楼"
     *           }
     *         ],
     *         "美术监督": [
     *           {
     *             "v": "菱沼由典"
     *           }
     *         ],
     *         "色彩设计": [
     *           {
     *             "v": "岩沢れい子"
     *           }
     *         ],
     *         "话数": [
     *           {
     *             "v": "25"
     *           }
     *         ],
     *         "音乐": [
     *           {
     *             "v": "中川幸太郎、黒石ひとみ"
     *           }
     *         ],
     *         "音乐制作": [
     *           {
     *             "v": "AUDIO PLANNING U"
     *           }
     *         ],
     *         "音响监督": [
     *           {
     *             "v": "浦上靖夫、井澤基"
     *           }
     *         ]
     *       },
     *       "locked": false,
     *       "metaTags": [],
     *       "name": "コードギアス 反逆のルルーシュR2",
     *       "nameCN": "Code Geass 反叛的鲁路修R2",
     *       "nsfw": false,
     *       "platform": {
     *         "alias": "tv",
     *         "enableHeader": true,
     *         "id": 1,
     *         "order": 0,
     *         "type": "TV",
     *         "typeCN": "TV",
     *         "wikiTpl": "TVAnime"
     *       },
     *       "rating": {
     *         "count": [
     *           44,
     *           15,
     *           32,
     *           66,
     *           145,
     *           457,
     *           1472,
     *           3190,
     *           2640,
     *           1377
     *         ],
     *         "score": 8.19,
     *         "total": 9438
     *       },
     *       "redirect": 0,
     *       "series": false,
     *       "seriesEntry": 0,
     *       "summary": "　　“东京决战”一年后，布里塔尼亚少年鲁路修在11区（原日本国）过着平凡的学生生活。但是，鲁路修与弟弟罗洛的一次出行，遇到了黑色骑士团的余党。在与少女C.C再次结成契约之后，尘封的记忆摆在了鲁路修的面前。",
     *       "type": 2,
     *       "volumes": 0
     *     }
     */
    Subject: {
      airtime: components['schemas']['SubjectAirtime'];
      collection: components['schemas']['SubjectCollection'];
      eps: number;
      id: number;
      images?: components['schemas']['SubjectImages'];
      info: string;
      infobox: components['schemas']['Infobox'];
      interest?: components['schemas']['SubjectInterest'];
      locked: boolean;
      metaTags: string[];
      name: string;
      nameCN: string;
      nsfw: boolean;
      platform: components['schemas']['SubjectPlatform'];
      rating: components['schemas']['SubjectRating'];
      redirect: number;
      series: boolean;
      seriesEntry: number;
      summary: string;
      tags: components['schemas']['SubjectTag'][];
      type: components['schemas']['SubjectType'];
      volumes: number;
    };
    /** SubjectAirtime */
    SubjectAirtime: {
      date: string;
      month: number;
      weekday: number;
      year: number;
    };
    SubjectCharacter: {
      actors: components['schemas']['SlimPerson'][];
      character: components['schemas']['SlimCharacter'];
      order: number;
      type: number;
    };
    /** SubjectCollection */
    SubjectCollection: {
      [key: string]: number;
    };
    /** SubjectComment */
    SubjectComment: {
      comment: string;
      id: number;
      rate: number;
      reactions?: components['schemas']['Reaction'][];
      type: components['schemas']['CollectionType'];
      updatedAt: number;
      user: components['schemas']['SlimUser'];
    };
    /** @example {
     *       "infobox": "{{Infobox animanga/TVAnime\n|中文名= 沙盒\n|别名={\n}\n|话数= 7\n|放送开始= 0000-10-06\n|放送星期= \n|官方网站= \n|播放电视台= \n|其他电视台= \n|播放结束= \n|其他= \n|Copyright= \n|平台={\n[龟壳]\n[Xbox Series S]\n[Xbox Series X]\n[Xbox Series X/S]\n[PC]\n[Xbox Series X|S]\n}\n}}",
     *       "name": "沙盒",
     *       "nsfw": false,
     *       "platform": 0,
     *       "summary": "本条目是一个沙盒，可以用于尝试bgm功能。\n\n普通维基人可以随意编辑条目信息以及相关关联查看编辑效果，但是请不要完全删除沙盒说明并且不要关联非沙盒条目/人物/角色。\n\nhttps://bgm.tv/group/topic/366812#post_1923517"
     *     } */
    SubjectEdit: {
      /** @example 0000-00-00 */
      date?: string;
      infobox: string;
      metaTags: string[];
      name: string;
      nsfw: boolean;
      platform: number;
      summary: string;
    };
    /** SubjectImages */
    SubjectImages: {
      common: string;
      grid: string;
      large: string;
      medium: string;
      small: string;
    };
    /** SubjectInterest */
    SubjectInterest: {
      comment: string;
      epStatus: number;
      private: boolean;
      rate: number;
      tags: string[];
      type: components['schemas']['CollectionType'];
      updatedAt: number;
      volStatus: number;
    };
    SubjectNew: {
      infobox: string;
      metaTags: string[];
      name: string;
      nsfw: boolean;
      platform: number;
      summary: string;
      type: components['schemas']['SubjectType'];
    };
    /** SubjectPlatform */
    SubjectPlatform: {
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
    SubjectPosition: {
      position: components['schemas']['SubjectStaffPositionType'];
      staffs: components['schemas']['SubjectPositionStaff'][];
    };
    SubjectPositionStaff: {
      appearEps: string;
      person: components['schemas']['SlimPerson'];
      summary: string;
    };
    /** SubjectRating */
    SubjectRating: {
      count: number[];
      rank: number;
      score: number;
      total: number;
    };
    /** SubjectRec */
    SubjectRec: {
      count: number;
      sim: number;
      subject: components['schemas']['SlimSubject'];
    };
    SubjectRelation: {
      order: number;
      relation: components['schemas']['SubjectRelationType'];
      subject: components['schemas']['SlimSubject'];
    };
    SubjectRelationType: {
      cn: string;
      desc: string;
      en: string;
      id: number;
      jp: string;
    };
    /** SubjectReview */
    SubjectReview: {
      entry: components['schemas']['SlimBlogEntry'];
      id: number;
      user: components['schemas']['SlimUser'];
    };
    /**
     * @description 条目排序方式
     *       - rank = 排名
     *       - trends = 热度
     *       - collects = 收藏数
     *       - date = 发布日期
     *       - title = 标题
     * @default rank
     * @enum {string}
     */
    SubjectSort: 'rank' | 'trends' | 'collects' | 'date' | 'title';
    SubjectStaff: {
      positions: components['schemas']['SubjectStaffPosition'][];
      staff: components['schemas']['SlimPerson'];
    };
    SubjectStaffPosition: {
      appearEps: string;
      summary: string;
      type: components['schemas']['SubjectStaffPositionType'];
    };
    SubjectStaffPositionType: {
      cn: string;
      en: string;
      id: number;
      jp: string;
    };
    /** SubjectTag */
    SubjectTag: {
      count: number;
      name: string;
    };
    /** SubjectTopic */
    SubjectTopic: components['schemas']['TopicBase'] & {
      content: string;
      creator: components['schemas']['SlimUser'];
      replies: components['schemas']['Reply'][];
      subject: components['schemas']['SlimSubject'];
    };
    /**
     * @description 条目类型
     *       - 1 = 书籍
     *       - 2 = 动画
     *       - 3 = 音乐
     *       - 4 = 游戏
     *       - 6 = 三次元
     *
     *       没有 5
     * @enum {integer}
     */
    SubjectType: 1 | 2 | 3 | 4 | 6;
    SubjectWikiInfo: {
      availablePlatform: components['schemas']['WikiPlatform'][];
      id: number;
      infobox: string;
      metaTags: string[];
      name: string;
      nsfw: boolean;
      platform: number;
      summary: string;
      typeID: components['schemas']['SubjectType'];
    };
    /** Timeline */
    Timeline: {
      batch: boolean;
      cat: components['schemas']['TimelineCat'];
      createdAt: number;
      id: number;
      memo: components['schemas']['TimelineMemo'];
      replies: number;
      source: components['schemas']['TimelineSource'];
      type: number;
      uid: number;
      user?: components['schemas']['SlimUser'];
    };
    /**
     * @description 时间线类型
     *       - 1 = 日常行为
     *       - 2 = 维基操作
     *       - 3 = 收藏条目
     *       - 4 = 收视进度
     *       - 5 = 状态
     *       - 6 = 日志
     *       - 7 = 目录
     *       - 8 = 人物
     *       - 9 = 天窗
     * @enum {integer}
     */
    TimelineCat: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /** TimelineMemo */
    TimelineMemo: {
      blog?: components['schemas']['SlimBlogEntry'];
      daily?: {
        groups?: components['schemas']['SlimGroup'][];
        users?: components['schemas']['SlimUser'][];
      };
      index?: components['schemas']['SlimIndex'];
      mono?: {
        characters: components['schemas']['SlimCharacter'][];
        persons: components['schemas']['SlimPerson'][];
      };
      progress?: {
        batch?: {
          epsTotal: string;
          epsUpdate?: number;
          subject: components['schemas']['SlimSubject'];
          volsTotal: string;
          volsUpdate?: number;
        };
        single?: {
          episode: components['schemas']['Episode'];
          subject: components['schemas']['SlimSubject'];
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
        reactions?: components['schemas']['Reaction'][];
        subject: components['schemas']['SlimSubject'];
      }[];
      wiki?: {
        subject?: components['schemas']['SlimSubject'];
      };
    };
    /**
     * @description 时间线来源
     *       - 0 = 网站
     *       - 1 = 移动端
     *       - 2 = https://bgm.tv/onair
     *       - 3 = https://netaba.re/
     *       - 4 = WP
     *       - 5 = API
     * @enum {integer}
     */
    TimelineSource: 0 | 1 | 2 | 3 | 4 | 5;
    /** Topic */
    Topic: components['schemas']['TopicBase'] & {
      creator?: components['schemas']['SlimUser'];
      replies: number;
    };
    /** TopicBase */
    TopicBase: {
      /** @description 发帖时间，unix time stamp in seconds */
      createdAt: number;
      creatorID: number;
      display: number;
      id: number;
      /** @description 小组/条目ID */
      parentID: number;
      state: number;
      title: string;
      /** @description 最后回复时间，unix time stamp in seconds */
      updatedAt: number;
    };
    TrendingSubject: {
      count: number;
      subject: components['schemas']['Subject'];
    };
    UpdateEpisodeComment: {
      content: string;
    };
    UpdatePost: {
      /** @description bbcode */
      content: string;
    };
    UpdateTopic: {
      /** @description bbcode */
      content: string;
      title: string;
    };
    /** User */
    User: {
      avatar: components['schemas']['Avatar'];
      bio: string;
      group: number;
      homepage: components['schemas']['UserHomepage'];
      /** @example 1 */
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
      /** @example Sai🖖 */
      nickname: string;
      sign: string;
      site: string;
      stats: components['schemas']['UserStats'];
      /** @example sai */
      username: string;
    };
    /** UserHomepage */
    UserHomepage: {
      left: components['schemas']['UserHomepageSection'][];
      right: components['schemas']['UserHomepageSection'][];
    };
    /**
     * @description 用户时光机板块
     * @enum {string}
     */
    UserHomepageSection:
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
    /** UserIndexStats */
    UserIndexStats: {
      collect: number;
      create: number;
    };
    /** UserMonoCollectionStats */
    UserMonoCollectionStats: {
      character: number;
      person: number;
    };
    /** UserNetworkService */
    UserNetworkService: {
      account: string;
      color: string;
      name: string;
      title: string;
      url: string;
    };
    /** UserStats */
    UserStats: {
      blog: number;
      friend: number;
      group: number;
      index: components['schemas']['UserIndexStats'];
      mono: components['schemas']['UserMonoCollectionStats'];
      subject: components['schemas']['UserSubjectCollectionStats'];
    };
    /** UserSubjectCollectionStats */
    UserSubjectCollectionStats: {
      [key: string]: {
        [key: string]: number;
      };
    };
    WikiPlatform: {
      id: number;
      text: string;
      wiki_tpl?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  getBlocklist: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            blocklist: number[];
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  addToBlocklist: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          id: number;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            blocklist: number[];
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  removeFromBlocklist: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            blocklist: number[];
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getBlogEntry: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        entryID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BlogEntry'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getBlogPhotos: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        entryID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['BlogPhoto'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getBlogRelatedSubjects: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        entryID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SlimSubject'][];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getCalendar: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Calendar'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getCharacter: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        characterID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Character'];
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getCharacterCasts: {
    parameters: {
      query?: {
        subjectType?: components['schemas']['SubjectType'];
        /** @description 角色出场类型: 主角，配角，客串 */
        type?: number;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        characterID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['CharacterSubject'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getCharacterCollects: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        characterID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['PersonCollect'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  clearNotice: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          id?: number[];
        };
      };
    };
    responses: {
      /** @description 没有返回值 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description 未登录 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getMyCharacterCollections: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Character'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getMyIndexCollections: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Index'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getMyPersonCollections: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Person'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getMySubjectCollections: {
    parameters: {
      query?: {
        subjectType?: components['schemas']['SubjectType'];
        type?: components['schemas']['CollectionType'];
        /** @description 起始时间戳 */
        since?: number;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Subject'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  debug: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  updateSubjectEpComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @example 1075440 */
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateEpisodeComment'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  deleteSubjectEpComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @example 1034989 */
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectEpisode: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @example 1075440 */
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Episode'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectEpisodeComments: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': ({
            content: string;
            createdAt: number;
            creatorID: number;
            epID: number;
            id: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['EpisodeCommentBase'][];
          })[];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createSubjectEpComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @example 1075440 */
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateEpisodeComment'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @description new reply id */
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getMyFollowers: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Friend'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getMyFriends: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Friend'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getGroupPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Post'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  editGroupPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdatePost'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  deleteGroupPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getGroupTopic: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        topicID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['GroupTopic'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  editGroupTopic: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        topicID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateTopic'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createGroupReply: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        topicID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreatePost'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getGroup: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupName: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Group'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getGroupMembers: {
    parameters: {
      query?: {
        moderator?: boolean;
        limit?: number;
        offset?: number;
      };
      header?: never;
      path: {
        groupName: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['GroupMember'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getGroupTopics: {
    parameters: {
      query?: {
        limit?: number;
        offset?: number;
      };
      header?: never;
      path: {
        groupName: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Topic'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createGroupTopic: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupName: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateTopic'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @description new topic id */
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  login: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['LoginRequestBody'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          /** @description example: "chiiNextSessionID=12345abc" */
          'Set-Cookie'?: string;
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SlimUser'];
        };
      };
      /** @description request validation error */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 验证码错误/账号密码不匹配 */
      401: {
        headers: {
          /** @description total limit per 10 minutes */
          'X-RateLimit-Limit'?: number;
          /** @description remaining rate limit */
          'X-RateLimit-Remaining'?: number;
          /** @description seconds to reset rate limit */
          'X-RateLimit-Reset'?: number;
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 失败次数太多，需要过一段时间再重试 */
      429: {
        headers: {
          /** @description limit per 10 minutes */
          'X-RateLimit-Limit'?: number;
          /** @description remaining rate limit */
          'X-RateLimit-Remaining'?: number;
          /** @description seconds to reset rate limit */
          'X-RateLimit-Reset'?: number;
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  logout: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': Record<string, never>;
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': unknown;
        };
      };
      /** @description 未登录 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getCurrentUser: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Profile'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  listNotice: {
    parameters: {
      query?: {
        /** @description max 40 */
        limit?: number;
        unread?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Notice'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 未登录 */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getPerson: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Person'];
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getPersonCasts: {
    parameters: {
      query?: {
        subjectType?: components['schemas']['SubjectType'];
        /** @description 角色出场类型: 主角，配角，客串 */
        type?: number;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['PersonCharacter'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getPersonCollects: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['PersonCollect'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getPersonWorks: {
    parameters: {
      query?: {
        subjectType?: components['schemas']['SubjectType'];
        /** @description 职位 */
        position?: number;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['PersonWork'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjects: {
    parameters: {
      query: {
        type: components['schemas']['SubjectType'];
        sort: components['schemas']['SubjectSort'];
        /** @description min 1 */
        page?: number;
        /** @description 每种条目类型分类不同，具体参考 https://github.com/bangumi/common 的 subject_platforms.yaml */
        cat?: number;
        /** @description 是否为系列，仅对书籍类型的条目有效 */
        series?: boolean;
        /** @description 年份 */
        year?: number;
        /** @description 月份 */
        month?: number;
        tags?: string[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Subject'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Post'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  editSubjectPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdatePost'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  deleteSubjectPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectTopic: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        topicID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SubjectTopic'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  updateSubjectTopic: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        topicID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          /** @description bbcode */
          content: string;
          title: string;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createSubjectReply: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        topicID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreatePost'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubject: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Subject'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectCharacters: {
    parameters: {
      query?: {
        /** @description 角色出场类型: 主角，配角，客串 */
        type?: number;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectCharacter'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectComments: {
    parameters: {
      query?: {
        type?: components['schemas']['CollectionType'];
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectComment'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectEpisodes: {
    parameters: {
      query?: {
        type?: components['schemas']['EpisodeType'];
        /** @description max 1000 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Episode'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectRecs: {
    parameters: {
      query?: {
        /** @description max 10 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectRec'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectRelations: {
    parameters: {
      query?: {
        type?: components['schemas']['SubjectType'];
        /** @description 是否单行本 */
        offprint?: boolean;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectRelation'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectReviews: {
    parameters: {
      query?: {
        /** @description max 20 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectReview'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectStaffPersons: {
    parameters: {
      query?: {
        /** @description 人物职位: 监督，原案，脚本,.. */
        position?: number;
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectStaff'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectStaffPositions: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SubjectPosition'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getSubjectTopics: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['Topic'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createSubjectTopic: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateTopic'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @description new topic id */
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getTimeline: {
    parameters: {
      query?: {
        /** @description 登录时默认为 friends, 未登录或没有好友时始终为 all */
        mode?: components['schemas']['FilterMode'];
        /** @description min 1, max 20 */
        limit?: number;
        /** @description max timeline id to fetch from */
        until?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Timeline'][];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createTimelineSay: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateTimelineSay'];
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getTrendingSubjects: {
    parameters: {
      query: {
        type: components['schemas']['SubjectType'];
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['TrendingSubject'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getTurnstileToken: {
    parameters: {
      query: {
        theme?: 'dark' | 'light' | 'auto';
        redirect_uri: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUser: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserBlogs: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimBlogEntry'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserCharacterCollections: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimCharacter'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserIndexCollections: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimIndex'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserPersonCollections: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimPerson'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserSubjectCollections: {
    parameters: {
      query?: {
        subjectType?: components['schemas']['SubjectType'];
        type?: components['schemas']['CollectionType'];
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimSubject'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserFollowers: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimUser'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserFriends: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimUser'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserGroups: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimGroup'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserIndexes: {
    parameters: {
      query?: {
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: components['schemas']['SlimIndex'][];
            /** @description limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数 */
            total: number;
          };
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getUserTimeline: {
    parameters: {
      query?: {
        /** @description min 1, max 20 */
        limit?: number;
        /** @description max timeline id to fetch from */
        until?: number;
      };
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Timeline'][];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getEpisodeWikiInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EpisodeWikiInfo'];
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  patchEpisodeWikiInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        /** @example {
         *       "commitMessage": "why this episode is edited",
         *       "episode": {
         *         "date": "2022-01-20",
         *         "duration": "24:53",
         *         "ep": 4,
         *         "name": "name",
         *         "nameCN": "中文名",
         *         "summary": "a short description",
         *         "type": 0
         *       },
         *       "expectedRevision": {
         *         "name": "old name",
         *         "nameCN": "old cn name"
         *       }
         *     } */
        'application/json': {
          commitMessage: string;
          episode: {
            /**
             * @description YYYY-MM-DD
             * @example 2022-02-02
             */
            date?: string;
            disc?: number;
            /** @example 24:53 */
            duration?: string;
            ep?: number;
            name?: string;
            nameCN?: string;
            subjectID?: number;
            summary?: string;
            type?: components['schemas']['EpisodeType'];
          };
          /** @description a optional object to check if input is changed by others
           *     if some key is given, and current data in database doesn't match input, subject will not be changed */
          expectedRevision?: {
            date?: string;
            duration?: string;
            name?: string;
            nameCN?: string;
            summary?: string;
          };
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description invalid input */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description default error response type */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  lockSubject: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          reason: string;
          /** @example 184017 */
          subjectID: number;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getPersonWikiInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['PersonWikiInfo'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 角色不存在 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  patchPersonInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          commitMessage: string;
          /** @default {} */
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
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  getRecentWiki: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description unix time stamp, only return last update time >= since
         *
         *     only allow recent 2 days */
        since: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['RecentWikiChange'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createNewSubject: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          infobox: string;
          metaTags: string[];
          name: string;
          nsfw: boolean;
          platform: number;
          summary: string;
          type: components['schemas']['SubjectType'];
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            subjectID: number;
          };
        };
      };
      /** @description default error response type */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  subjectInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SubjectWikiInfo'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  putSubjectInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        /** @example {
         *       "commitMessage": "修正笔误",
         *       "subject": {
         *         "infobox": "{{Infobox animanga/TVAnime\n|中文名= 沙盒\n|别名={\n}\n|话数= 7\n|放送开始= 0000-10-06\n|放送星期= \n|官方网站= \n|播放电视台= \n|其他电视台= \n|播放结束= \n|其他= \n|Copyright= \n|平台={\n[龟壳]\n[Xbox Series S]\n[Xbox Series X]\n[Xbox Series X/S]\n[PC]\n[Xbox Series X|S]\n}\n}}",
         *         "name": "沙盒",
         *         "nsfw": false,
         *         "platform": 0,
         *         "summary": "本条目是一个沙盒，可以用于尝试bgm功能。\n\n普通维基人可以随意编辑条目信息以及相关关联查看编辑效果，但是请不要完全删除沙盒说明并且不要关联非沙盒条目/人物/角色。\n\nhttps://bgm.tv/group/topic/366812#post_1923517"
         *       }
         *     } */
        'application/json': {
          commitMessage: string;
          /** @description a optional object to check if input is changed by others
           *     if `infobox` is given, and current data in database doesn't match input, subject will not be changed */
          expectedRevision?: {
            infobox?: string;
            metaTags?: string[];
            name?: string;
            platform?: number;
          };
          subject: components['schemas']['SubjectEdit'];
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  patchSubjectInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        /** @example {
         *       "commitMessage": "修正笔误",
         *       "subject": {
         *         "infobox": "{{Infobox animanga/TVAnime\n|中文名= 沙盒\n|别名={\n}\n|话数= 7\n|放送开始= 0000-10-06\n|放送星期= \n|官方网站= \n|播放电视台= \n|其他电视台= \n|播放结束= \n|其他= \n|Copyright= \n|平台={\n[龟壳]\n[Xbox Series S]\n[Xbox Series X]\n[Xbox Series X/S]\n[PC]\n[Xbox Series X|S]\n}\n}}"
         *       }
         *     } */
        'application/json': {
          commitMessage: string;
          /** @description a optional object to check if input is changed by others
           *     if `infobox` is given, and current data in database doesn't match input, subject will not be changed */
          expectedRevision?: {
            infobox?: string;
            metaTags?: string[];
            name?: string;
            platform?: number;
          };
          /** @example {
           *       "infobox": "{{Infobox animanga/TVAnime\n|中文名= 沙盒\n|别名={\n}\n|话数= 7\n|放送开始= 0000-10-06\n|放送星期= \n|官方网站= \n|播放电视台= \n|其他电视台= \n|播放结束= \n|其他= \n|Copyright= \n|平台={\n[龟壳]\n[Xbox Series S]\n[Xbox Series X]\n[Xbox Series X/S]\n[PC]\n[Xbox Series X|S]\n}\n}}",
           *       "name": "沙盒",
           *       "nsfw": false,
           *       "platform": 0,
           *       "summary": "本条目是一个沙盒，可以用于尝试bgm功能。\n\n普通维基人可以随意编辑条目信息以及相关关联查看编辑效果，但是请不要完全删除沙盒说明并且不要关联非沙盒条目/人物/角色。\n\nhttps://bgm.tv/group/topic/366812#post_1923517"
           *     } */
          subject: {
            /** @example 0000-00-00 */
            date?: string;
            infobox?: string;
            metaTags?: string[];
            name?: string;
            nsfw?: boolean;
            platform?: number;
            summary?: string;
          };
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  listSubjectCovers: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @example 184017 */
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            covers: {
              /** SlimUser */
              creator: {
                avatar: components['schemas']['Avatar'];
                /** @example 1 */
                id: number;
                joinedAt: number;
                /** @example Sai🖖 */
                nickname: string;
                sign: string;
                /** @example sai */
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
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  uploadSubjectCover: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          /**
           * Format: byte
           * @description base64 encoded raw bytes, 4mb size limit on **decoded** size
           */
          content: string;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  voteSubjectCover: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
        imageID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  unvoteSubjectCover: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
        imageID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  createEpisodes: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          episodes: {
            /**
             * @description YYYY-MM-DD
             * @example 2022-02-02
             */
            date?: string;
            disc?: number;
            /** @example 24:53 */
            duration?: string;
            ep: number;
            name?: string;
            nameCN?: string;
            summary?: string;
            type?: components['schemas']['EpisodeType'];
          }[];
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            episodeIDs: number[];
          };
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  patchEpisodes: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @example 363612 */
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          commitMessage: string;
          episodes: {
            /**
             * @description YYYY-MM-DD
             * @example 2022-02-02
             */
            date?: string;
            disc?: number;
            /** @example 24:53 */
            duration?: string;
            ep?: number;
            id: number;
            name?: string;
            nameCN?: string;
            summary?: string;
            type?: components['schemas']['EpisodeType'];
          }[];
          expectedRevision?: {
            date?: string;
            duration?: string;
            name?: string;
            nameCN?: string;
            summary?: string;
          }[];
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  subjectEditHistorySummary: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        subjectID: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['HistorySummary'][];
        };
      };
      /** @description default error response type */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  unlockSubject: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          reason: string;
          /** @example 184017 */
          subjectID: number;
        };
      };
    };
    responses: {
      /** @description Default Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': Record<string, never>;
        };
      };
      /** @description 意料之外的服务器错误 */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
}
