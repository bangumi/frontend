export interface paths {
  '/p1/blocklist': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的绝交用户列表 */
    get: operations['getBlocklist'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/blocklist/{username}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 与用户绝交 */
    put: operations['addUserToBlocklist'];
    post?: never;
    /** 取消与用户绝交 */
    delete: operations['removeUserFromBlocklist'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/blogs/-/comments/{commentID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 编辑日志的吐槽 */
    put: operations['updateBlogComment'];
    post?: never;
    /** 删除日志的吐槽 */
    delete: operations['deleteBlogComment'];
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
  '/p1/blogs/{entryID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取日志的吐槽箱 */
    get: operations['getBlogComments'];
    put?: never;
    /** 创建日志的吐槽 */
    post: operations['createBlogComment'];
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
  '/p1/characters/-/comments/{commentID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 编辑角色的吐槽 */
    put: operations['updateCharacterComment'];
    post?: never;
    /** 删除角色的吐槽 */
    delete: operations['deleteCharacterComment'];
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
  '/p1/characters/{characterID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色的吐槽箱 */
    get: operations['getCharacterComments'];
    put?: never;
    /** 创建角色的吐槽 */
    post: operations['createCharacterComment'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/characters/{characterID}/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色关联的目录 */
    get: operations['getCharacterIndexes'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/characters/{characterID}/relations': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色关联角色 */
    get: operations['getCharacterRelations'];
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
  '/p1/collections/characters/{characterID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 新增角色收藏 */
    put: operations['addCharacterCollection'];
    post?: never;
    /** 删除角色收藏 */
    delete: operations['deleteCharacterCollection'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/collections/episodes/{episodeID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** 更新章节进度 */
    patch: operations['updateEpisodeProgress'];
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
  '/p1/collections/indexes/{indexID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 新增目录收藏 */
    put: operations['addIndexCollection'];
    post?: never;
    /** 删除目录收藏 */
    delete: operations['deleteIndexCollection'];
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
  '/p1/collections/persons/{personID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 新增人物收藏 */
    put: operations['addPersonCollection'];
    post?: never;
    /** 删除人物收藏 */
    delete: operations['deletePersonCollection'];
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
  '/p1/collections/subjects/{subjectID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 新增或修改条目收藏 */
    put: operations['updateSubjectCollection'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** 更新条目进度 */
    patch: operations['updateSubjectProgress'];
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
    /** 编辑条目的章节吐槽 */
    put: operations['updateEpisodeComment'];
    post?: never;
    /** 删除条目的章节吐槽 */
    delete: operations['deleteEpisodeComment'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/episodes/-/comments/{commentID}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 给条目的章节吐槽点赞 */
    put: operations['likeEpisodeComment'];
    post?: never;
    /** 取消条目的章节吐槽点赞 */
    delete: operations['unlikeEpisodeComment'];
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
    /** 获取章节信息 */
    get: operations['getEpisode'];
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
    /** 获取条目的章节吐槽箱 */
    get: operations['getEpisodeComments'];
    put?: never;
    /** 创建条目的章节吐槽 */
    post: operations['createEpisodeComment'];
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
  '/p1/friendlist': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取当前用户的好友 ID 列表 */
    get: operations['getFriendlist'];
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
  '/p1/friends/{username}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 添加好友 */
    put: operations['addFriend'];
    post?: never;
    /** 取消好友 */
    delete: operations['removeFriend'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取小组列表 */
    get: operations['getGroups'];
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
    /** 获取小组话题回复详情 */
    get: operations['getGroupPost'];
    /** 编辑小组话题回复 */
    put: operations['editGroupPost'];
    post?: never;
    /** 删除小组话题回复 */
    delete: operations['deleteGroupPost'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/-/posts/{postID}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 给小组话题回复点赞 */
    put: operations['likeGroupPost'];
    post?: never;
    /** 取消小组话题回复点赞 */
    delete: operations['unlikeGroupPost'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/groups/-/topics': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取最新的小组话题 */
    get: operations['getRecentGroupTopics'];
    put?: never;
    post?: never;
    delete?: never;
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
    /** 获取小组话题详情 */
    get: operations['getGroupTopic'];
    /** @description 编辑小组话题 */
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
    /** 创建小组话题回复 */
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
    /** 获取小组话题列表 */
    get: operations['getGroupTopics'];
    put?: never;
    /** 创建小组话题 */
    post: operations['createGroupTopic'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 创建目录 */
    post: operations['createIndex'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/indexes/-/comments/{commentID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 编辑目录的评论 */
    put: operations['updateIndexComment'];
    post?: never;
    /** 删除目录的评论 */
    delete: operations['deleteIndexComment'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/indexes/{indexID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取目录详情 */
    get: operations['getIndex'];
    put?: never;
    post?: never;
    /** 删除目录 */
    delete: operations['deleteIndex'];
    options?: never;
    head?: never;
    /** 更新目录 */
    patch: operations['updateIndex'];
    trace?: never;
  };
  '/p1/indexes/{indexID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取目录的评论 */
    get: operations['getIndexComments'];
    put?: never;
    /** 创建目录的评论 */
    post: operations['createIndexComment'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/indexes/{indexID}/related': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取目录的关联内容 */
    get: operations['getIndexRelated'];
    /** 添加目录关联内容 */
    put: operations['putIndexRelated'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/indexes/{indexID}/related/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** 删除目录关联内容 */
    delete: operations['deleteIndexRelated'];
    options?: never;
    head?: never;
    /** 更新目录关联内容 */
    patch: operations['patchIndexRelated'];
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
  '/p1/persons/-/comments/{commentID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 编辑人物的吐槽 */
    put: operations['updatePersonComment'];
    post?: never;
    /** 删除人物的吐槽 */
    delete: operations['deletePersonComment'];
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
  '/p1/persons/{personID}/comments': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物的吐槽箱 */
    get: operations['getPersonComments'];
    put?: never;
    /** 创建人物的吐槽 */
    post: operations['createPersonComment'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/persons/{personID}/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物关联的目录 */
    get: operations['getPersonIndexes'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/persons/{personID}/relations': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物关联人物 */
    get: operations['getPersonRelations'];
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
  '/p1/report': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 报告疑虑 */
    post: operations['createReport'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/search/characters': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 搜索角色 */
    post: operations['searchCharacters'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/search/persons': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 搜索人物 */
    post: operations['searchPersons'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/search/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** 搜索条目 */
    post: operations['searchSubjects'];
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
  '/p1/subjects/-/collects/{collectID}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 给条目收藏点赞 */
    put: operations['likeSubjectCollect'];
    post?: never;
    /** 取消条目收藏点赞 */
    delete: operations['unlikeSubjectCollect'];
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
  '/p1/subjects/-/posts/{postID}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 给条目讨论回复点赞 */
    put: operations['likeSubjectPost'];
    post?: never;
    /** 取消条目讨论回复点赞 */
    delete: operations['unlikeSubjectPost'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/-/topics': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取最新的条目讨论 */
    get: operations['getRecentSubjectTopics'];
    put?: never;
    post?: never;
    delete?: never;
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
  '/p1/subjects/{subjectID}/collects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目的收藏用户 */
    get: operations['getSubjectCollects'];
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
    /** 获取条目的章节 */
    get: operations['getSubjectEpisodes'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/subjects/{subjectID}/indexes': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目关联的目录 */
    get: operations['getSubjectIndexes'];
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
  '/p1/timeline/-/events': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 时间线事件流 (SSE)
     * @description 这是一个 SSE (Server-Sent Events) 流，不是普通的 JSON 响应。客户端需要使用 EventSource 或类似的 SSE 客户端来订阅此接口。每个事件以 `data: {...}\n\n` 格式发送。
     */
    get: operations['getTimelineEvents'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/timeline/{timelineID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** 删除时间线 */
    delete: operations['deleteTimeline'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/timeline/{timelineID}/like': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** 给时间线吐槽点赞 */
    put: operations['likeTimeline'];
    post?: never;
    /** 取消时间线吐槽点赞 */
    delete: operations['unlikeTimeline'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/timeline/{timelineID}/replies': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取时间线回复 */
    get: operations['getTimelineReplies'];
    put?: never;
    /** 创建时间线回复 */
    post: operations['createTimelineReply'];
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
  '/p1/trending/subjects/topics': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取热门条目讨论 */
    get: operations['getTrendingSubjectTopics'];
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
  '/p1/wiki/characters/-/revisions/{revisionID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色历史版本 wiki 信息 */
    get: operations['getCharacterRevisionInfo'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/characters/{characterID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色当前的 wiki 信息 */
    get: operations['getCharacterWikiInfo'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** 编辑角色 */
    patch: operations['patchCharacterInfo'];
    trace?: never;
  };
  '/p1/wiki/characters/{characterID}/history-summary': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取角色 wiki 历史编辑摘要 */
    get: operations['characterEditHistorySummary'];
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
  '/p1/wiki/persons/-/revisions/{revisionID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物历史版本 wiki 信息 */
    get: operations['getPersonRevisionInfo'];
    put?: never;
    post?: never;
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
    /** 获取人物当前的 wiki 信息 */
    get: operations['getPersonWikiInfo'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** 编辑人物 */
    patch: operations['patchPersonInfo'];
    trace?: never;
  };
  '/p1/wiki/persons/{personID}/history-summary': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取人物 wiki 历史编辑摘要 */
    get: operations['personEditHistorySummary'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
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
    /** 创建新条目 */
    post: operations['createNewSubject'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/subjects/-/revisions/{revisionID}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取条目历史版本 wiki 信息 */
    get: operations['getSubjectRevisionInfo'];
    put?: never;
    post?: never;
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
    /** 获取条目当前的 wiki 信息 */
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
    /** 获取条目 wiki 历史编辑摘要 */
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
  '/p1/wiki/users/{username}/contributions/characters': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户 wiki 角色编辑记录 */
    get: operations['getUserContributedCharacters'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/users/{username}/contributions/persons': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户 wiki 人物编辑记录 */
    get: operations['getUserContributedPersons'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/p1/wiki/users/{username}/contributions/subjects': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 获取用户 wiki 条目编辑记录 */
    get: operations['getUserContributedSubjects'];
    put?: never;
    post?: never;
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
      uid: number;
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
      info: string;
      infobox: components['schemas']['Infobox'];
      lock: boolean;
      name: string;
      nameCN: string;
      nsfw: boolean;
      redirect: number;
      role: number;
      summary: string;
    };
    CharacterCast: {
      person: components['schemas']['SlimPerson'];
      relation: components['schemas']['CharacterCastType'];
      summary: string;
    };
    /**
     * @description Character cast relation type
     *       - 0 = CV
     *       - 1 = Dub
     *       - 2 = Actor
     *       - 3 = Chinese dub
     *       - 4 = Japanese dub
     *       - 5 = English dub
     *       - 6 = Korean dub
     * @enum {integer}
     */
    CharacterCastType: 0 | 2 | 1 | 3 | 4 | 5 | 6;
    CharacterRelation: {
      character: components['schemas']['SlimCharacter'];
      comment: string;
      ended: boolean;
      relation: components['schemas']['PersonRelationType'];
      spoiler: boolean;
    };
    CharacterRevisionWikiInfo: {
      extra: {
        img?: string;
      };
      infobox: string;
      name: string;
      summary: string;
    };
    CharacterSearchFilter: {
      /** @description 无权限的用户会直接忽略此字段，不会返回 R18 条目。
       *     `null` 或者 `true` 会返回包含 R18 的所有搜索结果。
       *     `false` 只会返回非 R18 条目。 */
      nsfw?: boolean;
    };
    CharacterSubject: {
      casts: components['schemas']['CharacterCast'][];
      subject: components['schemas']['SlimSubject'];
      type: number;
    };
    CharacterSubjectRelation: {
      subject: components['schemas']['SlimSubject'];
      type: number;
    };
    CharacterWikiInfo: {
      id: number;
      infobox: string;
      name: string;
      summary: string;
    };
    CollectSubject: {
      /** @description 评价 */
      comment?: string;
      /** @description 仅自己可见 */
      private?: boolean;
      /** @description 是否自动完成条目进度，仅在 `type` 为 `看过` 时有效，并且不会产生对应的时间线记录：
       *               - 书籍条目会检查总的话数和卷数，并更新收藏进度到最新;
       *               - 动画和三次元会标记所有正片章节为已完成，并同时更新收藏进度 */
      progress?: boolean;
      /** @description 评分，0 表示删除评分 */
      rate?: number;
      tags?: string[];
      type?: components['schemas']['CollectionType'];
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
    Comment: {
      content: string;
      createdAt: number;
      creatorID: number;
      id: number;
      mainID: number;
      reactions?: components['schemas']['Reaction'][];
      relatedID: number;
      state: number;
      user?: components['schemas']['SlimUser'];
    } & {
      replies: components['schemas']['CommentBase'][];
    };
    CommentBase: {
      content: string;
      createdAt: number;
      creatorID: number;
      id: number;
      mainID: number;
      reactions?: components['schemas']['Reaction'][];
      relatedID: number;
      state: number;
      user?: components['schemas']['SlimUser'];
    };
    CreateContent: {
      content: string;
    };
    /** CreateIndex */
    CreateIndex: {
      /** @description 目录描述 */
      desc: string;
      /** @description 仅自己可见 */
      private?: boolean;
      /** @description 目录标题 */
      title: string;
    };
    /** CreateIndexRelated */
    CreateIndexRelated: {
      award?: string;
      cat: components['schemas']['IndexRelatedCategory'];
      comment?: string;
      order?: number;
      sid: number;
    };
    CreateReply: {
      content: string;
      /**
       * @description 被回复的回复 ID, `0` 代表发送顶层回复
       * @default 0
       */
      replyTo: number;
    };
    /** CreateReport */
    CreateReport: {
      /** @description 举报说明（可选） */
      comment?: string;
      /** @description 被举报对象的 ID */
      id: number;
      type: components['schemas']['ReportType'];
      value: components['schemas']['ReportReason'];
    };
    CreateTopic: {
      /** @description bbcode */
      content: string;
      title: string;
    };
    /** Episode */
    Episode: {
      airdate: string;
      collection?: {
        status: components['schemas']['EpisodeCollectionStatus'];
        updatedAt?: number;
      };
      comment: number;
      desc: string;
      disc: number;
      duration: string;
      id: number;
      name: string;
      nameCN: string;
      sort: number;
      subject?: components['schemas']['SlimSubject'];
      subjectID: number;
      type: components['schemas']['EpisodeType'];
    };
    /**
     * @description 章节收藏状态
     *       - 0 = 撤消/删除
     *       - 1 = 想看
     *       - 2 = 看过
     *       - 3 = 抛弃
     * @enum {integer}
     */
    EpisodeCollectionStatus: 0 | 1 | 2 | 3;
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
      membership?: components['schemas']['GroupMember'];
      name: string;
      nsfw: boolean;
      posts: number;
      title: string;
      topics: number;
    };
    /**
     * @description 小组过滤模式
     *       - all = 所有小组
     *       - joined = 我加入的小组
     *       - managed = 我管理的小组
     * @enum {string}
     */
    GroupFilterMode: 'all' | 'joined' | 'managed';
    /** GroupMember */
    GroupMember: {
      joinedAt: number;
      role: components['schemas']['GroupMemberRole'];
      uid: number;
      user?: components['schemas']['SlimUser'];
    };
    /**
     * @description 小组成员角色
     *       - -2 = 访客
     *       - -1 = 游客
     *       - 0 = 小组成员
     *       - 1 = 小组长
     *       - 2 = 小组管理员
     *       - 3 = 禁言成员
     * @enum {integer}
     */
    GroupMemberRole: -2 | -1 | 0 | 1 | 2 | 3;
    /**
     * @description 小组排序方式
     *       - posts = 帖子数
     *       - topics = 主题数
     *       - members = 成员数
     *       - created = 创建时间
     *       - updated = 最新讨论
     * @default created
     * @enum {string}
     */
    GroupSort: 'posts' | 'topics' | 'members' | 'created' | 'updated';
    /** GroupTopic */
    GroupTopic: components['schemas']['Topic'] & {
      group: components['schemas']['SlimGroup'];
      replies: components['schemas']['Reply'][];
    };
    /**
     * @description 小组话题过滤模式
     *       - all = 全站
     *       - joined = 已加入
     *       - created = 我创建的
     *       - replied = 我回复的
     * @enum {string}
     */
    GroupTopicFilterMode: 'all' | 'joined' | 'created' | 'replied';
    /** Index */
    Index: {
      award: number;
      collectedAt?: number;
      collects: number;
      createdAt: number;
      desc: string;
      id: number;
      private: boolean;
      replies: number;
      stats: components['schemas']['IndexStats'];
      title: string;
      total: number;
      type: components['schemas']['IndexType'];
      uid: number;
      updatedAt: number;
      user?: components['schemas']['SlimUser'];
    };
    /** IndexRelated */
    IndexRelated: {
      award: string;
      blog?: components['schemas']['SlimBlogEntry'];
      cat: components['schemas']['IndexRelatedCategory'];
      character?: components['schemas']['SlimCharacter'];
      comment: string;
      createdAt: number;
      episode?: components['schemas']['Episode'];
      groupTopic?: components['schemas']['GroupTopic'];
      id: number;
      order: number;
      person?: components['schemas']['SlimPerson'];
      rid: number;
      sid: number;
      subject?: components['schemas']['SlimSubject'];
      subjectTopic?: components['schemas']['SubjectTopic'];
      type: number;
    };
    /**
     * @description 目录关联类型
     *       - 0 = 条目
     *       - 1 = 角色
     *       - 2 = 人物
     *       - 3 = 章节
     *       - 4 = 日志
     *       - 5 = 小组话题
     *       - 6 = 条目讨论
     * @enum {integer}
     */
    IndexRelatedCategory: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** IndexStats */
    IndexStats: {
      blog?: number;
      character?: number;
      episode?: number;
      groupTopic?: number;
      person?: number;
      subject: {
        anime?: number;
        book?: number;
        game?: number;
        music?: number;
        real?: number;
      };
      subjectTopic?: number;
    };
    /**
     * @description 目录类型
     *       - 0 = 用户
     *       - 1 = 公共
     *       - 2 = TBA
     * @enum {integer}
     */
    IndexType: 0 | 1 | 2;
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
    /** Notice */
    Notice: {
      createdAt: number;
      id: number;
      /** @description 对应的 topicID, episodeID, userID ... */
      mainID: number;
      /** @description 对应的 postID ... */
      relatedID: number;
      sender: components['schemas']['SlimUser'];
      title: string;
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
      info: string;
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
      comment: string;
      ended: boolean;
      person: components['schemas']['SlimPerson'];
      relation: components['schemas']['PersonRelationType'];
      spoiler: boolean;
    };
    PersonRelationType: {
      cn: string;
      desc: string;
      id: number;
      primary?: boolean;
      skipViceVersa?: boolean;
      viceVersaTo?: number;
    };
    PersonRevisionWikiInfo: {
      extra: {
        img?: string;
      };
      infobox: string;
      name: string;
      profession: {
        actor?: boolean;
        artist?: boolean;
        illustrator?: boolean;
        mangaka?: boolean;
        producer?: boolean;
        seiyu?: boolean;
        writer?: boolean;
      };
      summary: string;
    };
    PersonSearchFilter: {
      career?: string[];
    };
    /**
     * @description 人物类型
     *       - 1 = 个人
     *       - 2 = 公司
     *       - 3 = 组合
     * @enum {integer}
     */
    PersonType: 1 | 2 | 3;
    PersonWikiInfo: {
      id: number;
      infobox: string;
      name: string;
      profession: {
        actor?: boolean;
        artist?: boolean;
        illustrator?: boolean;
        mangaka?: boolean;
        producer?: boolean;
        seiyu?: boolean;
        writer?: boolean;
      };
      summary: string;
      typeID: components['schemas']['PersonType'];
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
    /**
     * @description 举报原因
     *       - 1 = 辱骂、人身攻击
     *       - 2 = 刷屏、无关内容
     *       - 3 = 政治相关
     *       - 4 = 违法信息
     *       - 5 = 泄露隐私
     *       - 6 = 涉嫌刷分
     *       - 7 = 引战
     *       - 8 = 广告
     *       - 9 = 剧透
     *       - 99 = 其他
     * @enum {integer}
     */
    ReportReason: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;
    /**
     * @description 举报类型
     *       - 6 = 用户
     *       - 7 = 小组话题
     *       - 8 = 小组回复
     *       - 9 = 条目话题
     *       - 10 = 条目回复
     *       - 11 = 章节回复
     *       - 12 = 角色回复
     *       - 13 = 人物回复
     *       - 14 = 日志
     *       - 15 = 日志回复
     *       - 16 = 时间线
     *       - 17 = 时间线回复
     *       - 18 = 目录
     *       - 19 = 目录回复
     * @enum {integer}
     */
    ReportType: 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
    RevisionHistory: {
      commitMessage: string;
      /** @description unix timestamp seconds */
      createdAt: number;
      creator: {
        username: string;
      };
      id: number;
      type: components['schemas']['RevisionType'];
    };
    /**
     * @description 修订类型
     *       - 1 = 条目编辑
     *       - 103 = 条目锁定
     *       - 104 = 条目解锁
     *       - 11 = 条目合体
     *       - 12 = 条目删除
     *       - 17 = 条目关联
     *       - 5 = 条目->角色关联
     *       - 6 = 条目->声优关联
     *       - 10 = 条目->人物关联
     *
     *       - 2 = 角色编辑
     *       - 13 = 角色合体
     *       - 14 = 角色删除
     *       - 4 = 角色->条目关联
     *       - 7 = 角色->声优关联
     *
     *       - 3 = 人物编辑
     *       - 15 = 人物合体
     *       - 16 = 人物删除
     *       - 8 = 人物->声优关联
     *       - 9 = 人物->条目关联
     *
     *       - 18 = 章节编辑
     *       - 181 = 章节合体
     *       - 182 = 章节移动
     *       - 183 = 章节锁定
     *       - 184 = 章节解锁
     *       - 185 = 章节删除
     *
     * @enum {integer}
     */
    RevisionType:
      | 1
      | 103
      | 104
      | 11
      | 12
      | 17
      | 5
      | 6
      | 10
      | 2
      | 13
      | 14
      | 4
      | 7
      | 3
      | 15
      | 16
      | 8
      | 9
      | 18
      | 181
      | 182
      | 183
      | 184
      | 185;
    SearchCharacter: {
      filter?: components['schemas']['CharacterSearchFilter'];
      /** @description 搜索关键词 */
      keyword: string;
    };
    SearchPerson: {
      filter?: components['schemas']['PersonSearchFilter'];
      /** @description 搜索关键词 */
      keyword: string;
    };
    SearchSubject: {
      filter?: components['schemas']['SubjectSearchFilter'];
      /** @description 搜索关键词 */
      keyword: string;
      sort?: components['schemas']['SubjectSearchSort'];
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
      user?: components['schemas']['SlimUser'];
    };
    /** SlimCharacter */
    SlimCharacter: {
      comment: number;
      id: number;
      images?: components['schemas']['PersonImages'];
      info: string;
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
      private: boolean;
      stats: components['schemas']['IndexStats'];
      title: string;
      total: number;
      type: components['schemas']['IndexType'];
      uid: number;
      updatedAt: number;
      user?: components['schemas']['SlimUser'];
    };
    /** SlimPerson */
    SlimPerson: {
      /**
       * @description 职业
       * @example producer
       */
      career: string[];
      comment: number;
      id: number;
      images?: components['schemas']['PersonImages'];
      info: string;
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
      id: number;
      rate: number;
      tags: string[];
      type: components['schemas']['CollectionType'];
      updatedAt: number;
    };
    /** SlimUser */
    SlimUser: {
      avatar: components['schemas']['Avatar'];
      group: number;
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
    /**
     * @description 条目浏览排序方式
     *       - rank = 排名
     *       - trends = 热度
     *       - collects = 收藏数
     *       - date = 发布日期
     *       - title = 标题
     * @default rank
     * @enum {string}
     */
    SubjectBrowseSort: 'rank' | 'trends' | 'collects' | 'date' | 'title';
    SubjectCharacter: {
      casts: components['schemas']['CharacterCast'][];
      character: components['schemas']['SlimCharacter'];
      order: number;
      type: number;
    };
    /** SubjectCollect */
    SubjectCollect: {
      interest: components['schemas']['SlimSubjectInterest'];
      user: components['schemas']['SlimUser'];
    };
    /** SubjectCollection */
    SubjectCollection: {
      [key: string]: number;
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
      series?: boolean;
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
      id: number;
      private: boolean;
      rate: number;
      tags: string[];
      type: components['schemas']['CollectionType'];
      updatedAt: number;
      volStatus: number;
    };
    /** SubjectInterestComment */
    SubjectInterestComment: {
      comment: string;
      id: number;
      rate: number;
      reactions?: components['schemas']['Reaction'][];
      type: components['schemas']['CollectionType'];
      updatedAt: number;
      user: components['schemas']['SlimUser'];
    };
    SubjectNew: {
      /** @example 0000-00-00 */
      date?: string;
      infobox: string;
      metaTags: string[];
      name: string;
      nsfw: boolean;
      platform: number;
      series?: boolean;
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
    SubjectRevisionWikiInfo: {
      id: number;
      infobox: string;
      metaTags: string[];
      name: string;
      summary: string;
    };
    SubjectSearchFilter: {
      date?: string[];
      metaTags?: string[];
      /** @description 无权限的用户会直接忽略此字段，不会返回 R18 条目。
       *     `null` 或者 `true` 会返回包含 R18 的所有搜索结果。
       *     `false` 只会返回非 R18 条目。 */
      nsfw?: boolean;
      rank?: string[];
      rating?: string[];
      tags?: string[];
      type?: components['schemas']['SubjectType'][];
    };
    /**
     * @description 条目搜索排序方式
     *       - match = 匹配程度
     *       - heat = 收藏人数
     *       - rank = 排名由高到低
     *       - score = 评分
     * @default match
     * @enum {string}
     */
    SubjectSearchSort: 'match' | 'heat' | 'rank' | 'score';
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
    SubjectTopic: components['schemas']['Topic'] & {
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
      series?: boolean;
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
      reactions?: components['schemas']['Reaction'][];
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
        rate?: number;
        subject: components['schemas']['SlimSubject'];
      }[];
      wiki?: {
        subject?: components['schemas']['SlimSubject'];
      };
    };
    /** TimelineSource */
    TimelineSource: {
      name: string;
      url?: string;
    };
    /** Topic */
    Topic: {
      /** @description 发帖时间，unix time stamp in seconds */
      createdAt: number;
      creator?: components['schemas']['SlimUser'];
      creatorID: number;
      display: number;
      id: number;
      /** @description 小组/条目ID */
      parentID: number;
      replyCount: number;
      state: number;
      title: string;
      /** @description 最后回复时间，unix time stamp in seconds */
      updatedAt: number;
    };
    TrendingSubject: {
      count: number;
      subject: components['schemas']['SlimSubject'];
    };
    TurnstileToken: {
      /** @description 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
       *     next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
       *     dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA` */
      turnstileToken: string;
    };
    UpdateContent: {
      content: string;
    };
    UpdateEpisodeProgress: {
      /** @description 是否批量更新(看到当前章节), 批量更新时 type 无效 */
      batch?: boolean;
      type?: components['schemas']['EpisodeCollectionStatus'];
    };
    /** UpdateIndex */
    UpdateIndex: {
      /** @description 目录描述 */
      desc?: string;
      /** @description 仅自己可见 */
      private?: boolean;
      /** @description 目录标题 */
      title?: string;
    };
    /** UpdateIndexRelated */
    UpdateIndexRelated: {
      comment: string;
      order: number;
    };
    UpdateSubjectProgress: {
      /** @description 书籍条目章节进度 */
      epStatus?: number;
      /** @description 书籍条目卷数进度 */
      volStatus?: number;
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
    UserCharacterContribution: {
      characterID: number;
      commitMessage: string;
      /** @description unix timestamp seconds */
      createdAt: number;
      id: number;
      name: string;
      /** @description 2 = 角色编辑 */
      type: number;
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
    UserPersonContribution: {
      commitMessage: string;
      /** @description unix timestamp seconds */
      createdAt: number;
      id: number;
      name: string;
      personID: number;
      /** @description 3 = 人物编辑，15 = 合并，16 = 删除 */
      type: number;
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
    UserSubjectContribution: {
      commitMessage: string;
      /** @description unix timestamp seconds */
      createdAt: number;
      id: number;
      name: string;
      subjectID: number;
      /** @description 修改类型。`1` 正常修改， `11` 合并，`103` 锁定/解锁 `104` 未知 */
      type: number;
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
  addUserToBlocklist: {
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
          'application/json': {
            blocklist: number[];
          };
        };
      };
      /** @description default error response type */
      429: {
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
  removeUserFromBlocklist: {
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
          'application/json': {
            blocklist: number[];
          };
        };
      };
      /** @description default error response type */
      429: {
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
  updateBlogComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateContent'];
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
  deleteBlogComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
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
  getBlogComments: {
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
          'application/json': ({
            content: string;
            createdAt: number;
            creatorID: number;
            id: number;
            mainID: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['CommentBase'][];
          })[];
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
  createBlogComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        entryID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
            /** @description new comment id */
            id: number;
          };
        };
      };
      /** @description default error response type */
      429: {
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
  updateCharacterComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateContent'];
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
  deleteCharacterComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
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
  getCharacterComments: {
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
          'application/json': ({
            content: string;
            createdAt: number;
            creatorID: number;
            id: number;
            mainID: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['CommentBase'][];
          })[];
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
  createCharacterComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        characterID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
            /** @description new comment id */
            id: number;
          };
        };
      };
      /** @description default error response type */
      429: {
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
  getCharacterIndexes: {
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
  getCharacterRelations: {
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
            data: components['schemas']['CharacterRelation'][];
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
  addCharacterCollection: {
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
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      429: {
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
  deleteCharacterCollection: {
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
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      429: {
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
  updateEpisodeProgress: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateEpisodeProgress'];
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
      429: {
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
  addIndexCollection: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
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
      /** @description default error response type */
      429: {
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
  deleteIndexCollection: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
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
      /** @description default error response type */
      429: {
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
  addPersonCollection: {
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
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      429: {
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
  deletePersonCollection: {
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
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      429: {
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
  updateSubjectCollection: {
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
        'application/json': components['schemas']['CollectSubject'];
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
      429: {
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
  updateSubjectProgress: {
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
        'application/json': components['schemas']['UpdateSubjectProgress'];
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
      429: {
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
  updateEpisodeComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateContent'];
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
  deleteEpisodeComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
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
  likeEpisodeComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        commentID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          value: number;
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
      429: {
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
  unlikeEpisodeComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
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
  getEpisode: {
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
  getEpisodeComments: {
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
            id: number;
            mainID: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['CommentBase'][];
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
  createEpisodeComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        episodeID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
            /** @description new comment id */
            id: number;
          };
        };
      };
      /** @description default error response type */
      429: {
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
  getFriendlist: {
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
            friendlist: number[];
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
  addFriend: {
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
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      429: {
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
  removeFriend: {
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
          'application/json': Record<string, never>;
        };
      };
      /** @description default error response type */
      429: {
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
  getGroups: {
    parameters: {
      query?: {
        mode?: components['schemas']['GroupFilterMode'];
        sort?: components['schemas']['GroupSort'];
        limit?: number;
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
        'application/json': components['schemas']['UpdateContent'];
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
  likeGroupPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          value: number;
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
      429: {
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
  unlikeGroupPost: {
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
  getRecentGroupTopics: {
    parameters: {
      query?: {
        mode?: components['schemas']['GroupTopicFilterMode'];
        limit?: number;
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
            data: components['schemas']['GroupTopic'][];
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
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
      /** @description default error response type */
      429: {
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
        role?: components['schemas']['GroupMemberRole'];
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
        'application/json': components['schemas']['CreateTopic'] &
          components['schemas']['TurnstileToken'];
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
      /** @description default error response type */
      429: {
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
  createIndex: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateIndex'];
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
  updateIndexComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateContent'];
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
  deleteIndexComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
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
  getIndex: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
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
          'application/json': components['schemas']['Index'];
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
  deleteIndex: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
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
  updateIndex: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateIndex'];
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
  getIndexComments: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
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
            id: number;
            mainID: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['CommentBase'][];
          })[];
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
  createIndexComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
            /** @description new comment id */
            id: number;
          };
        };
      };
      /** @description default error response type */
      429: {
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
  getIndexRelated: {
    parameters: {
      query?: {
        cat?: components['schemas']['IndexRelatedCategory'];
        type?: components['schemas']['SubjectType'];
        /** @description max 100 */
        limit?: number;
        /** @description min 0 */
        offset?: number;
      };
      header?: never;
      path: {
        indexID: number;
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
            data: components['schemas']['IndexRelated'][];
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
  putIndexRelated: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateIndexRelated'];
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
  deleteIndexRelated: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
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
  patchIndexRelated: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        indexID: number;
        id: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateIndexRelated'];
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
  updatePersonComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        commentID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateContent'];
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
  deletePersonComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
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
  getPersonComments: {
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
          'application/json': ({
            content: string;
            createdAt: number;
            creatorID: number;
            id: number;
            mainID: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['CommentBase'][];
          })[];
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
  createPersonComment: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        personID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
            /** @description new comment id */
            id: number;
          };
        };
      };
      /** @description default error response type */
      429: {
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
  getPersonIndexes: {
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
  getPersonRelations: {
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
            data: components['schemas']['PersonRelation'][];
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
  createReport: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReport'];
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
            message: string;
          };
        };
      };
      /** @description default error response type */
      429: {
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
  searchCharacters: {
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
    requestBody?: {
      content: {
        'application/json': components['schemas']['SearchCharacter'];
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
  searchPersons: {
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
    requestBody?: {
      content: {
        'application/json': components['schemas']['SearchPerson'];
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
  searchSubjects: {
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
    requestBody?: {
      content: {
        'application/json': components['schemas']['SearchSubject'];
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
  getSubjects: {
    parameters: {
      query?: {
        type?: components['schemas']['SubjectType'];
        sort?: components['schemas']['SubjectBrowseSort'];
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
        /** @description tags 过滤类别：meta=wiki 标签（默认），subject=用户标签 */
        tagsCat?: 'meta' | 'subject';
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
  likeSubjectCollect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        collectID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          value: number;
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
      429: {
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
  unlikeSubjectCollect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        collectID: number;
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
        'application/json': components['schemas']['UpdateContent'];
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
  likeSubjectPost: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        postID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          value: number;
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
      429: {
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
  unlikeSubjectPost: {
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
  getRecentSubjectTopics: {
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
            data: components['schemas']['SubjectTopic'][];
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
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
      /** @description default error response type */
      429: {
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
  getSubjectCollects: {
    parameters: {
      query?: {
        type?: components['schemas']['CollectionType'];
        mode?: components['schemas']['FilterMode'];
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
            data: components['schemas']['SubjectCollect'][];
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
            data: components['schemas']['SubjectInterestComment'][];
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
  getSubjectIndexes: {
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
        'application/json': components['schemas']['CreateTopic'] &
          components['schemas']['TurnstileToken'];
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
      /** @description default error response type */
      429: {
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
  getTimeline: {
    parameters: {
      query?: {
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
        'application/json': components['schemas']['CreateContent'] &
          components['schemas']['TurnstileToken'];
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
      /** @description default error response type */
      429: {
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
  getTimelineEvents: {
    parameters: {
      query?: {
        cat?: components['schemas']['TimelineCat'];
        mode?: components['schemas']['FilterMode'];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description SSE 事件数据 */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @description 事件类型: 'connected' | 'timeline' */
            event: string;
            timeline?: components['schemas']['Timeline'];
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
  deleteTimeline: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        timelineID: number;
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
  likeTimeline: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        timelineID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          value: number;
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
      429: {
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
  unlikeTimeline: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        timelineID: number;
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
  getTimelineReplies: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        timelineID: number;
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
            id: number;
            mainID: number;
            reactions?: components['schemas']['Reaction'][];
            relatedID: number;
            state: number;
            user?: components['schemas']['SlimUser'];
          } & {
            replies: components['schemas']['CommentBase'][];
          })[];
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
  createTimelineReply: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        timelineID: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateReply'] &
          components['schemas']['TurnstileToken'];
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
      /** @description default error response type */
      429: {
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
  getTrendingSubjects: {
    parameters: {
      query?: {
        type?: components['schemas']['SubjectType'];
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
  getTrendingSubjectTopics: {
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
            data: components['schemas']['SubjectTopic'][];
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
  getCharacterRevisionInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        revisionID: number;
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
          'application/json': components['schemas']['CharacterRevisionWikiInfo'];
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
  getCharacterWikiInfo: {
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
          'application/json': components['schemas']['CharacterWikiInfo'];
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
  patchCharacterInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        characterID: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': {
          character: {
            infobox?: string;
            name?: string;
            summary?: string;
          };
          commitMessage: string;
          /** @default {} */
          expectedRevision: {
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
  characterEditHistorySummary: {
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
            data: components['schemas']['RevisionHistory'][];
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
  getPersonRevisionInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        revisionID: number;
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
          'application/json': components['schemas']['PersonRevisionWikiInfo'];
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
      /** @description 人物不存在 */
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
  personEditHistorySummary: {
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
            data: components['schemas']['RevisionHistory'][];
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
          /** @example 0000-00-00 */
          date?: string;
          infobox: string;
          metaTags: string[];
          name: string;
          nsfw: boolean;
          platform: number;
          series?: boolean;
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
  getSubjectRevisionInfo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        revisionID: number;
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
          'application/json': components['schemas']['SubjectRevisionWikiInfo'];
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
          expectedRevision?: {
            infobox?: null | string;
            metaTags?: null | string[];
            name?: null | string;
            platform?: null | number;
            summary?: null | string;
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
          /** @description when header x-admin-token is provided, use this as author id. */
          authorID?: number;
          commitMessage: string;
          expectedRevision?: {
            infobox?: null | string;
            metaTags?: null | string[];
            name?: null | string;
            platform?: null | number;
            summary?: null | string;
          };
          subject: {
            /** @example 0000-00-00 */
            date?: string;
            infobox?: string;
            metaTags?: string[];
            name?: string;
            nsfw?: boolean;
            platform?: number;
            series?: boolean;
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
                group: number;
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
      403: {
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
          'application/json': components['schemas']['RevisionHistory'][];
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
  getUserContributedCharacters: {
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
            data: components['schemas']['UserCharacterContribution'][];
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
  getUserContributedPersons: {
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
            data: components['schemas']['UserPersonContribution'][];
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
  getUserContributedSubjects: {
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
            data: components['schemas']['UserSubjectContribution'][];
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
}
