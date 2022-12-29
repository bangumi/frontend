import React, { memo, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { BasicReply } from '@bangumi/client/client';

import type { EditorFormProps } from '../../components/EditorForm';
import EditorForm from '../../components/EditorForm';

interface ReplyFormProps extends EditorFormProps {
  topicId: number;
  /**
   * 回复的post ID，0代表回复楼主
   * @default 0
   */
  replyTo?: number;
  placeholder?: string;
  content?: string;
  onChange?: (content: string) => void;
  onCancel?: () => void;
  /** 回复成功时的回调函数 */
  onSuccess?: (reply: BasicReply) => void;
}

const ReplyForm = ({
  topicId,
  replyTo = 0,
  placeholder = '添加新回复...',
  content = '',
  onChange,
  onCancel,
  onSuccess,
  ...props
}: ReplyFormProps) => {
  const [sending, setSending] = useState(false);

  const sendReply = async () => {
    if (!content) return; // TODO: show validation message
    if (sending) return; // TODO: disable button instead
    setSending(true);
    try {
      const response = await ozaClient.createGroupReply(topicId, { content, replyTo });
      if (response.status === 200) {
        // document.getElementById(`post_${res.data.id}`)?.scrollIntoView({ block: 'center' });
        onSuccess?.(response.data);
      }
      // TODO: handle error
    } catch (e: unknown) {
      setSending(false);
      throw e;
    } finally {
      setSending(false);
    }
  };

  return (
    <EditorForm
      onCancel={onCancel}
      placeholder={placeholder}
      content={content}
      // TODO: use loading state
      confirmText={sending ? '...' : undefined}
      onChange={onChange}
      onConfirm={sendReply}
      {...props}
    />
  );
};

export default memo(ReplyForm);
