import type { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  EditorForm,
  RichContent,
  Avatar,
  Section,
  Typography,
  Button,
  Topic,
  Layout,
} from '@bangumi/design';
import { render as renderBBCode } from '@bangumi/utils';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic';
import { useUser } from '@bangumi/website/hooks/use-user';

import { ClampableContent } from '../../components/ClampableContent';
import GroupTopicHeader from './components/GroupTopicHeader';
import styles from './index.module.less';

const { Link } = Typography;

const { Comment } = Topic;

const TopicPage: FC = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }
  const topicDetail = useGroupTopic(Number(id));
  const { user } = useUser();
  const originalPosterId = topicDetail.creator.id;
  const parsedText = renderBBCode(topicDetail.text);
  const isClosed = topicDetail.state === 1;
  const { group } = topicDetail;
  return (
    <>
      <GroupTopicHeader
        id={topicDetail.id}
        title={topicDetail.title}
        creator={topicDetail.creator}
        createdAt={topicDetail.created_at!}
        group={topicDetail.group}
      />
      <Layout
        type='alpha'
        leftChildren={
          <>
            {/* Topic content */}
            <div id={`post_${topicDetail.id}`}>
              <RichContent html={parsedText} />
            </div>
            {/* Topic Comments */}
            <div className={styles.replies}>
              {topicDetail.comments.map((comment, idx) => (
                <Comment
                  key={comment.id}
                  isReply={false}
                  floor={idx + 2}
                  originalPosterId={originalPosterId}
                  user={user}
                  {...comment}
                />
              ))}
              {/* Reply BBCode Editor */}
              {!isClosed && user && (
                <div className={styles.replyFormContainer}>
                  <Avatar src={user.avatar.large} size='medium' />
                  <EditorForm className={styles.replyForm} placeholder='添加新回复...' />
                </div>
              )}
            </div>
          </>
        }
        rightChildren={
          <Section title='小组信息'>
            <div className={styles.groupInfo}>
              <Avatar src={group.icon} size='medium' />
              <div className={styles.groupDetails}>
                <Link to={`/group/${group.name}`}>{group.title}</Link>
                <span>{`${group.total_members} 名成员`}</span>
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
        }
      />
    </>
  );
};
export default TopicPage;
