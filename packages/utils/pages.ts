// 站内资源统一使用相对路径；尚未实现的页面由前端路由重定向到旧站。
export function getSubjectLink(subjectId: number): string {
  return `/subject/${subjectId}`;
}

export function getSubjectCollectionsLink(subjectId: number, collectionType: number): string {
  return `/subject/${subjectId}/collections?filter=${collectionType}`;
}

export function getSubjectEpisodesLink(subjectId: number): string {
  return `/subject/${subjectId}/ep`;
}

export function getSubjectCharactersLink(subjectId: number): string {
  return `/subject/${subjectId}/characters`;
}

export function getSubjectPersonsLink(subjectId: number): string {
  return `/subject/${subjectId}/persons?group=position`;
}

export function getSubjectRelationsLink(subjectId: number): string {
  return `/subject/${subjectId}/relations`;
}

export function getSubjectCommentsLink(subjectId: number): string {
  return `/subject/${subjectId}/comments`;
}

export function getSubjectReviewsLink(subjectId: number): string {
  return `/subject/${subjectId}/reviews`;
}

export function getSubjectBoardLink(subjectId: number): string {
  return `/subject/${subjectId}/board`;
}

export function getSubjectStatsLink(subjectId: number): string {
  return `/subject/${subjectId}/stats`;
}

export function getSubjectWikiEditLink(subjectId: number): string {
  return `/subject/${subjectId}/wiki/edit`;
}

export function getSubjectTagLink(tagName: string): string {
  return `/subject/tag/${encodeURIComponent(tagName)}`;
}

export function getSubjectTopicLink(topicId: number): string {
  return `/subject/topic/${topicId}`;
}

export function getEpisodeLink(episodeId: number): string {
  return `/ep/${episodeId}`;
}

export function getCharacterLink(characterId: number): string {
  return `/character/${characterId}`;
}

export function getPersonLink(personId: number): string {
  return `/person/${personId}`;
}

export function getBlogLink(blogId: number): string {
  return `/blog/${blogId}`;
}

export function getIndexLink(indexId: number): string {
  return `/index/${indexId}`;
}

export function getUserProfileLink(username: string): string {
  return `/user/${username}`;
}

export function getGroupLink(groupName: string): string {
  return `/group/${groupName}`;
}

export function getGroupTopicLink(topicId: number): string {
  return `/group/topic/${topicId}`;
}

export function getGroupForumPage(groupName: string): string {
  return `/group/${groupName}/forum`;
}

export function getGroupMemberPage(groupName: string): string {
  return `/group/${groupName}/members`;
}

export function getGroupListLink(): string {
  return '/group/all';
}

export function getCalendarLink(): string {
  return '/calendar';
}

export function getLegacyPageLink(path: string): string {
  return `https://bgm.tv${path}`;
}
