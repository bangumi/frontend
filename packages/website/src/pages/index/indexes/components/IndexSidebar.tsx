import React, { useState } from 'react';

import type { Index, SlimUser } from '@bangumi/client/client';
import { Avatar, Button, CollapsibleContent, Section, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { render as renderBBCode } from '@bangumi/utils/bbcode/react';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { useIndexCollection } from '@bangumi/website/hooks/use-index-collection';
import { useUser } from '@bangumi/website/hooks/use-user';

const { Link } = Typography;

const header = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px 0',
});

const title = css({
  margin: '0',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '24px',
  overflowWrap: 'anywhere',
});

const creator = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#9f9b9b',
  fontSize: '12px',
  '& a': { color: '#123' },
});

const stats = css({
  display: 'flex',
  gap: '20px',
  color: '#9f9b9b',
  fontSize: '13px',
});

const stat = css({
  '& b': {
    marginRight: '4px',
    color: '#595555',
    fontWeight: '600',
  },
});

const collectButton = css({
  width: '100%',
});

const descriptionBox = css({
  background: '#f7f7f4',
  borderRadius: '15px',
  padding: '15px',
});

const actions = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

/** 目录详情侧栏：标题/创建者/收藏/统计/描述/作者操作 */
const IndexSidebar: React.FC<{
  index: Index;
  mutate: () => Promise<unknown>;
}> = ({ index, mutate }) => {
  const { user } = useUser();
  const { pending, add, remove } = useIndexCollection(index.id);
  const isCollected = index.collectedAt != null;
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(false);
  const isOwner = user?.id === index.uid;
  const parsedDescription = renderBBCode(index.desc);

  const handleCollect = async () => {
    const success = isCollected ? await remove() : await add();
    if (success) {
      await mutate();
    }
  };

  return (
    <>
      <div className={header}>
        <h1 className={title}>{index.title}</h1>
        {index.user && <Creator user={index.user} />}
        {user && (
          <Button
            type={isCollected ? 'secondary' : 'primary'}
            size='medium'
            className={collectButton}
            onClick={handleCollect}
            disabled={pending}
          >
            {isCollected ? '取消收藏' : '收藏目录'}
          </Button>
        )}
        <div className={stats}>
          <span className={stat}>
            <b>{index.collects}</b>收藏
          </span>
          <span className={stat}>
            <b>{index.replies}</b>评论
          </span>
          <span className={stat}>
            <b>{index.total}</b>关联
          </span>
        </div>
        {isOwner && (
          <div className={actions}>
            <Button.Link type='secondary' size='small' to={`/index/${index.id}/edit`}>
              编辑
            </Button.Link>
            <Button.Link type='secondary' size='small' to={`/index/${index.id}/related`}>
              管理
            </Button.Link>
          </div>
        )}
      </div>
      <Section title='简介'>
        <CollapsibleContent
          containerClassName={descriptionBox}
          threshold={193}
          content={parsedDescription}
          collapsed={descriptionCollapsed}
          onChange={setDescriptionCollapsed}
        />
      </Section>
    </>
  );
};

const Creator: React.FC<{ user: SlimUser }> = ({ user }) => {
  return (
    <div className={creator}>
      <Avatar src={user.avatar.medium} size='xsmall' />
      <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
      <span>创建了此目录</span>
    </div>
  );
};

export default IndexSidebar;
