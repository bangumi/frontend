import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
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
import type { EditorRef } from '@bangumi/design/components/EditorForm/Editor';
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

  const [sending, setSending] = useState(false);

  const { data: topicDetail, mutate } = useGroupTopic(Number(id));
  const { user } = useUser();
  const originalPosterId = topicDetail.creator.id;
  const parsedText = renderBBCode(topicDetail.text);
  const isClosed = topicDetail.state === 1;
  const { group } = topicDetail;

  const editorRef = useRef<EditorRef>(null);

  // Todo: element highlight style https://github.com/bangumi/frontend/pull/113#issuecomment-1328466708
  // https://github.com/bangumi/frontend/pull/113#issuecomment-1322303601
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    document.getElementById(anchor)?.scrollIntoView(true);
  }, [topicDetail]);

  const postReply = async (content: string) => {
    if (sending) {
      return;
    }

    if (!content) {
      return;
    }

    try {
      setSending(true);
      const res = await ozaClient.createGroupReply(topicDetail.id, { content, replyTo: 0 });
      setSending(false);
      if (res.status === 200) {
        await mutate();
      }
    } catch (e: unknown) {
      setSending(false);
      throw e;
    }
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
              <RichContent html={parsedText} />
            </div>
            {/* Topic Comments */}
            <div className={styles.replies}>
              {topicDetail.replies.map((comment, idx) => (
                <Comment
                  topicID={topicDetail.id}
                  key={comment.id}
                  isReply={false}
                  floor={idx + 2}
                  originalPosterId={originalPosterId}
                  user={user}
                  onReply={mutate}
                  {...comment}
                />
              ))}
              {/* Reply BBCode Editor */}
              {!isClosed && user && (
                <div className={styles.replyFormContainer}>
                  <Avatar src={user.avatar.large} size='medium' />
                  <EditorForm
                    className={styles.replyForm}
                    ref={editorRef}
                    placeholder='添加新回复...'
                    confirmText={sending ? '...' : '写好了'}
                    onConfirm={postReply}
                  />
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
        }
      />
    </>
  );
};
export default TopicPage;
