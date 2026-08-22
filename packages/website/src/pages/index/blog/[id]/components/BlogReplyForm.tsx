import { Turnstile } from '@marsidev/react-turnstile';
import React, { memo, useState } from 'react';

import { ozaClient } from '@bangumi/client/index.ts';
import EditorForm from '@bangumi/design/components/EditorForm/index.tsx';

interface BlogReplyFormProps {
  entryId: number;
  /** 最外层 className */
  className?: string;
  /**
   * 回复的评论 ID，0 代表发送顶层评论
   * @default 0
   */
  replyTo?: number;
  placeholder?: string;
  content?: string;
  onChange?: (content: string) => void;
  onCancel?: () => void;
  /** 评论成功时的回调函数 */
  onSuccess?: (id: number) => void;
  autoFocus?: boolean;
  /** 是否隐藏取消按钮 */
  hideCancel?: boolean;
}

const BlogReplyForm = ({
  entryId,
  className,
  replyTo = 0,
  placeholder = '添加新吐槽...',
  content = '',
  onChange,
  onCancel,
  onSuccess,
  autoFocus,
  hideCancel = false,
}: BlogReplyFormProps) => {
  const [sending, setSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const sendReply = async () => {
    if (!content.trim()) return;
    setSending(true);
    try {
      const response = await ozaClient.createBlogComment(entryId, {
        content,
        replyTo,
        turnstileToken: turnstileToken ?? '',
      });
      if (response.status === 200) {
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
    <EditorForm
      autoFocus={autoFocus}
      className={className}
      hideCancel={hideCancel}
      onCancel={onCancel}
      placeholder={placeholder}
      value={content}
      // TODO: use loading state
      confirmText={sending ? '...' : undefined}
      disabled={sending}
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
    />
  );
};

export default memo(BlogReplyForm);
