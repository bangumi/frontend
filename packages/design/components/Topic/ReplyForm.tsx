import { Turnstile } from '@marsidev/react-turnstile';
import React, { memo, useState } from 'react';

import { ozaClient } from '@bangumi/client';

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
  onSuccess?: (id: number) => void;
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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const sendReply = async () => {
    if (!content) return; // TODO: show validation message
    if (sending) return; // TODO: disable button instead
    setSending(true);
    try {
      const response = await ozaClient.createGroupReply(topicId, {
        content,
        replyTo,
        turnstileToken: turnstileToken ?? '',
      });
      if (response.status === 200) {
        // document.getElementById(`post_${res.data.id}`)?.scrollIntoView({ block: 'center' });
        onSuccess?.(response.data.id);
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
    <>
      <EditorForm
        onCancel={onCancel}
        placeholder={placeholder}
        value={content}
        // TODO: use loading state
        confirmText={sending ? '...' : undefined}
        onChange={onChange}
        onConfirm={sendReply}
        submitExtra={
          <Turnstile
            options={{ theme: 'light', size: 'invisible', action: 'post_reply' }}
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        }
        {...props}
      />
    </>
  );
};

export default memo(ReplyForm);
