import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import { EditorForm, toast, Typography } from '@bangumi/design';
import useGroupPost from '@bangumi/website/hooks/use-group-post';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic';

import styles from './edit.module.less';

const EditReplyPage = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: post id is required');
  }

  const { data, mutate } = useGroupPost(Number(id));
  const { data: topic, mutate: mutateTopic } = useGroupTopic(data.topicID);
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [content, setContent] = useState(data.text);

  const handleSubmit = async (text: string) => {
    if (!text) {
      toast('请填写回复内容');
      return;
    }
    setSending(true);
    const response = await ozaClient.editGroupPost(Number(id), { text });
    if (response.status === 200) {
      // 确保再次回到此页面时内容是最新的
      mutate({ ...data, text });
      await mutateTopic();
      navigate(`/group/topic/${data.topicID}`);
    } else {
      console.error(response);
      toast(response.data.message);
    }
    setSending(false);
  };

  return (
    <>
      <Typography.Text type='secondary' className={styles.tipText}>
        修改主题
        <Typography.Link
          to={`/group/topic/${data.topicID}`}
          fontWeight='bold'
          className={styles.topicLink}
        >
          {topic.title}
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
