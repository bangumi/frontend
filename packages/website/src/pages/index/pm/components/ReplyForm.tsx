import React, { useState } from 'react';

import { EditorForm, toast } from '@bangumi/design';
import { pmErrorMessage } from '@bangumi/website/hooks/use-pm';

interface ReplyFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export function ReplyForm({ onSubmit }: ReplyFormProps): React.ReactElement {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    if (!content.trim()) {
      toast('请填写回复内容');
      return;
    }
    if (content.length > 1000) {
      toast('正文不能超过 1000 字');
      return;
    }
    setSending(true);
    try {
      await onSubmit(content);
      setContent('');
    } catch (error) {
      toast(pmErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <EditorForm
      value={content}
      onChange={setContent}
      onConfirm={() => {
        void handleSubmit();
      }}
      confirmText={sending ? '发送中…' : '回复'}
      placeholder='回复内容…'
      hideCancel
    />
  );
}
