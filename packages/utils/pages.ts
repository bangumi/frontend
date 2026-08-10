// 一些页面在新站未 Ready， 为了以后切换方便，最好使用函数生成页面 URL
export function getSubjectLink(subjectId: number): string {
  return `/subject/${subjectId}`;
}

export function getUserProfileLink(username: string): string {
  return 'https://bgm.tv/user/' + username;
}

export function getGroupTopicLink(topicId: number): string {
  return `https://bgm.tv/group/topic/${topicId}`;
}

export function getGroupForumPage(groupName: string): string {
  return `https://bgm.tv/group/${groupName}/forum`;
}

export function getGroupMemberPage(groupName: string): string {
  return `https://bgm.tv/group/${groupName}/members`;
}
