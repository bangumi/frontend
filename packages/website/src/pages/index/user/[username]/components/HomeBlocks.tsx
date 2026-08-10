import type { JSX } from 'react';
import React from 'react';

import type { User } from '@bangumi/client/client';

import BlogBlock from './BlogBlock';
import FriendBlock from './FriendBlock';
import GroupBlock from './GroupBlock';
import IndexBlock from './IndexBlock';
import SubjectCollectBlock from './SubjectCollectBlock';

const SUBJECT_COLLECT_BLOCKS = ['anime', 'game', 'book', 'music', 'real'];

function renderBlock(user: User, block: string): JSX.Element | null {
  if (SUBJECT_COLLECT_BLOCKS.includes(block)) {
    return <SubjectCollectBlock key={block} user={user} block={block} />;
  }
  switch (block) {
    case 'blog':
      return <BlogBlock key={block} user={user} />;
    case 'friend':
      return <FriendBlock key={block} user={user} />;
    case 'group':
      return <GroupBlock key={block} user={user} />;
    case 'index':
      return <IndexBlock key={block} user={user} />;
    default:
      // mono 等模块暂未实现
      return null;
  }
}

/** 渲染用户主页左侧模块（收藏块/日志） */
export const HomeLeftBlocks: React.FC<{ user: User }> = ({ user }) => (
  <>{user.homepage.left.map((block) => renderBlock(user, block))}</>
);

/** 渲染用户主页右侧模块（好友/小组/目录） */
export const HomeRightBlocks: React.FC<{ user: User }> = ({ user }) => (
  <>{user.homepage.right.map((block) => renderBlock(user, block))}</>
);
