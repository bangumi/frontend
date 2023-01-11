import type { BasicReply } from 'packages/client/client';
import type { Group } from 'packages/client/group';
import type { FC } from 'react';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Button, Layout, RichContent, Section, Topic, Typography } from '@bangumi/design';
import ReplyForm from '@bangumi/design/components/Topic/ReplyForm';
import { render as renderBBCode } from '@bangumi/utils';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic';
import { useUser } from '@bangumi/website/hooks/use-user';

import { ClampableContent } from '../../components/ClampableContent';
import GroupTopicHeader from './components/GroupTopicHeader';
import styles from './index.module.less';

const { Link } = Typography;

const { Comment } = Topic;

const GroupInfo = memo(({ group }: { group: Group }) => (
  <Section title='小组信息'>
    <div className={styles.groupInfo}>
      <Avatar src={group.icon} size='medium' />
      <div className={styles.groupDetails}>
        <Link to={`/group/${group.name}`}>{group.title}</Link>
        <span>{`${group.totalMembers} 名成员`}</span>
      </div>
    </div>
    <ClampableContent
      content={renderBBCode(group.description)}
      containerClassName={styles.groupDescription}
      threshold={158}
      isClamped
    />
    <div className={styles.groupOpinions}>
      <Button type='text'>
        <Link to={`/group/${group.name}`}>小组概览</Link>
      </Button>
      <Button type='text'>
        <Link to={`/group/${group.name}/forum`}>组内讨论</Link>
      </Button>
      <Button type='text'>
        <Link to={`/group/${group.name}/members`}>小组成员</Link>
      </Button>
    </div>
  </Section>
));

const TopicPage: FC = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }

  const { data: topicDetail, mutate } = useGroupTopic(Number(id));
  const { user } = useUser();
  const originalPosterId = topicDetail.creator.id;
  const isClosed = topicDetail.state === 1;
  const { group } = topicDetail;

  const [replyContent, setReplyContent] = useState('');

  const navigate = useNavigate();

  // 首次渲染时评论列表可能还没加载完，浏览器无法定位，所以需要在评论加载完后再滚动到指定位置
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    document.getElementById(anchor)?.scrollIntoView(true);
  }, [topicDetail]);

  const handleReplySuccess = async (reply: BasicReply) => {
    navigate(`#post_${reply.id}`);
    // 刷新评论列表
    await mutate();
    setReplyContent('');
  };

  return (
    <>
      <GroupTopicHeader
        id={topicDetail.id}
        title={topicDetail.title}
        creator={topicDetail.creator}
        createdAt={topicDetail.createdAt}
        group={topicDetail.group}
      />
      <Layout
        type='alpha'
        leftChildren={
          <>
            {/* Topic content */}
            <div id={`post_${topicDetail.id}`}>
              <RichContent bbcode={topicDetail.text} />
            </div>
            {/* Topic Comments */}
            <div className={styles.replies}>
              {topicDetail.replies.map((comment, idx) => (
                <Comment
                  topicId={topicDetail.id}
                  key={comment.id}
                  isReply={false}
                  floor={idx + 2}
                  originalPosterId={originalPosterId}
                  user={user}
                  onReplySuccess={mutate}
                  {...comment}
                />
              ))}
              {/* Reply BBCode Editor */}
              {!isClosed && user && (
                <div className={styles.replyFormContainer}>
                  <Avatar src={user.avatar.large} size='medium' />
                  <ReplyForm
                    topicId={topicDetail.id}
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
        rightChildren={<GroupInfo group={group} />}
      />
    </>
  );
};
export default TopicPage;
