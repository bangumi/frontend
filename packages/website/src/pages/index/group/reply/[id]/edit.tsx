import type { GroupTopic } from 'packages/client/client';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { ozaClient } from '@bangumi/client';
import { EditorForm, toast, Typography } from '@bangumi/design';
import Helmet from '@bangumi/website/components/Helmet';
import { OperationNeedLoginError } from '@bangumi/website/error';
import useGroupPost from '@bangumi/website/hooks/use-group-post';
import { useUser } from '@bangumi/website/hooks/use-user';

import styles from './edit.module.less';

const EditReplyPage = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(parseInt(id))) {
    throw new Error('参数错误：post ID');
  }
  const postId = parseInt(id);

  const { user } = useUser();
  if (!user) {
    throw OperationNeedLoginError;
  }

  const { data, mutate } = useGroupPost(postId);
  if (data.creatorID !== user.id) {
    throw new Error('抱歉，你只能修改自己发表的帖子。');
  }

  const { mutate: mutateTopic } = useSWRConfig();
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [content, setContent] = useState(data.content);

  const handleSubmit = async (content: string) => {
    if (!content) {
      toast('请填写回复内容', { type: 'error' });
      return;
    }
    setSending(true);
    const response = await ozaClient.editGroupPost(postId, { content });
    if (response.status === 200) {
      const topicPath = `/group/topic/${data.topic.id}`;
      // 确保再次回到此页面时内容是最新的，不需要向后端请求数据，因此将 revalidate 设置为 false
      mutate({ ...data, content }, { revalidate: false });
      // 乐观更新回复内容
      await mutateTopic(topicPath, (topic?: GroupTopic) => {
        if (!topic) {
          return topic;
        }
        const reply = topic.replies.find((reply) => reply.id === postId);
        if (reply) {
          reply.content = content;
        }
        return topic;
      });
      navigate(topicPath);
    } else {
      console.error(response);
      toast(response.data.message, { type: 'error' });
    }
    setSending(false);
  };

  return (
    <>
      <Helmet title={`修改主题“${data.topic.title}”的回复`} />
      <Typography.Text type='secondary' className={styles.tipText}>
        修改主题
        <Typography.Link
          to={`/group/topic/${data.topic.id}`}
          fontWeight='bold'
          className={styles.topicLink}
        >
          {data.topic.title}
        </Typography.Link>
        的回复
      </Typography.Text>
      <div className={styles.form}>
        <EditorForm
          placeholder='回复内容…'
          hideCancel
          value={content}
          onChange={setContent}
          onConfirm={handleSubmit}
          // TODO: use loading state
          confirmText={sending ? '...' : undefined}
          rows={15}
        />
      </div>
      {/* TODO: add right column */}
    </>
  );
};

export default EditReplyPage;
