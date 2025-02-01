import type { Reply } from 'packages/client/client';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Layout, RichContent, Topic } from '@bangumi/design';
import ReplyForm from '@bangumi/design/components/Topic/ReplyForm';
import Helmet from '@bangumi/website/components/Helmet';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic';
import { useUser } from '@bangumi/website/hooks/use-user';

import GroupInfo from '../../components/GroupInfo';
import GroupTopicHeader from './components/GroupTopicHeader';
import styles from './index.module.less';

const { Comment, CommentActions } = Topic;

const TopicPage: FC = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }

  const { data: topic, mutate } = useGroupTopic(Number(id));
  const { user } = useUser();
  const originalPosterId = topic.creatorID;
  const isClosed = topic.state === 1;

  const [replyContent, setReplyContent] = useState('');

  const navigate = useNavigate();

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
      <GroupTopicHeader
        id={topic.id}
        title={topic.title}
        creator={topic.creator}
        createdAt={topic.createdAt}
        group={topic.group}
      />
      <Layout
        type='alpha'
        leftChildren={
          <>
            {/* Topic content */}
            <div id={`post_${topic.id}`}>
              <RichContent bbcode={topic.content} />
              {user && (
                <div className={styles.topicActions}>
                  <CommentActions
                    showText
                    id={topic.id}
                    isAuthor={user.id === topic.creatorID}
                    onReply={startReply}
                    // TODO: 实现删除主题操作
                  />
                </div>
              )}
            </div>
            {/* Topic Comments */}
            <div className={styles.replies}>
              {topic.replies.map((comment: Reply, idx: number) => (
                <Comment
                  topicId={topic.id}
                  key={comment.id}
                  isReply={false}
                  floor={idx + 2}
                  originalPosterId={originalPosterId}
                  user={user}
                  onCommentUpdate={mutate}
                  {...comment}
                />
              ))}
              {/* Reply BBCode Editor */}
              {!isClosed && user && (
                <div className={styles.replyFormContainer} id='replyForm'>
                  <Avatar src={user.avatar.large} size='medium' />
                  <ReplyForm
                    topicId={topic.id}
                    className={styles.replyForm}
                    content={replyContent}
                    onChange={setReplyContent}
                    onSuccess={handleReplySuccess}
                    hideCancel
                  />
                </div>
              )}
            </div>
          </>
        }
        rightChildren={<GroupInfo group={topic.group} />}
      />
    </>
  );
};
export default TopicPage;
