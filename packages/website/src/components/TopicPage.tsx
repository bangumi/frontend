import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Reply } from '@bangumi/client/client.ts';
import ReplyForm from '@bangumi/design/components/Topic/ReplyForm.tsx';
import type { TopicApi } from '@bangumi/design/components/Topic/topic-api.ts';
import { Avatar, Layout, Topic } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

const { Comment } = Topic;

const replies = css({
  marginTop: '10px',
});

const replyFormContainer = css({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '20px',
});

const replyForm = css({
  flexBasis: '75%',
  marginLeft: '10px',
  '@media (max-width: 768px)': {
    flexBasis: '100%',
  },
});

interface TopicPageProps<T> {
  topic: T & {
    id: number;
    title: string;
    creatorID: number;
    replyCount: number;
    state: number;
    replies: Reply[];
  };
  /** 刷新话题数据（回复/删除/点赞后调用） */
  mutate: () => Promise<unknown>;
  /** 回复/删除/点赞等操作实现 */
  api: TopicApi;
  /** 顶部导航（小组/条目上下文） */
  header: ReactNode;
  /** 右侧栏内容（小组信息/条目信息），可为空 */
  sideContent?: ReactNode;
}

/**
 * 话题详情页骨架：帖子与回复列表 + 回复表单 + 侧栏。
 * 小组话题与条目讨论共用，顶部导航与右侧栏通过 props 注入。
 */
const TopicPage = <T extends { id: number }>({
  topic,
  mutate,
  api,
  header,
  sideContent,
}: TopicPageProps<T>) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const originalPosterId = topic.creatorID;
  const isClosed = topic.state === 1;

  const [replyContent, setReplyContent] = useState('');

  // 首次渲染时评论列表可能还没加载完，浏览器无法定位，所以需要在评论加载完后再滚动到指定位置
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    document.getElementById(anchor)?.scrollIntoView(true);
  }, [topic]);

  const handleReplySuccess = async (id: number) => {
    navigate(`#post_${id}`);
    // 刷新评论列表
    await mutate();
    setReplyContent('');
  };

  const startReply = () => {
    const replyForm = document.getElementById('replyForm');
    replyForm?.scrollIntoView(true);
    replyForm?.querySelector('textarea')?.focus();
  };

  return (
    <>
      <Helmet title={topic.title} />
      {header}
      <Layout
        type='alpha'
        leftChildren={
          <>
            {/* Topic Comments */}
            <div className={replies}>
              {topic.replies.map((comment: Reply, idx: number) => (
                <Comment
                  topicId={topic.id}
                  key={comment.id}
                  isReply={false}
                  isMainPost={idx === 0}
                  replyCount={topic.replyCount}
                  floor={idx + 1}
                  originalPosterId={originalPosterId}
                  user={user}
                  onCommentUpdate={mutate}
                  api={api}
                  {...comment}
                />
              ))}
              {/* Reply BBCode Editor */}
              {!isClosed && user && (
                <div className={replyFormContainer} id='replyForm'>
                  <Avatar src={user.avatar.large} size='small' />
                  <ReplyForm
                    topicId={topic.id}
                    className={replyForm}
                    content={replyContent}
                    onChange={setReplyContent}
                    onSuccess={handleReplySuccess}
                    hideCancel
                    api={api}
                  />
                </div>
              )}
            </div>
          </>
        }
        rightChildren={sideContent}
      />
    </>
  );
};

export default TopicPage;
