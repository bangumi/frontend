import React, { useState } from 'react';

import { Avatar, EditorForm, Input, toast } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { pmErrorMessage, usePmContacts } from '@bangumi/website/hooks/use-pm';

import type { CreatePrivateMessage } from '../types';

const container = css({ display: 'flex', flexDirection: 'column', gap: '20px' });

const field = css({ display: 'flex', flexDirection: 'column', gap: '8px' });

const label = css({ fontSize: '1.125rem', lineHeight: '25px', color: '#9f9b9b' });

const recipientsBox = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '8px',
  '& .bgm-input__wrapper': { flex: '1 1 200px', minWidth: '0' },
});

const chip = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 10px',
  borderRadius: '9999px',
  background: '#fdeef0',
  color: '#f09199',
  fontSize: '14px',
});

const chipRemove = css({
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  padding: '0',
  lineHeight: '1',
});

const contactsBox = css({ display: 'flex', flexWrap: 'wrap', gap: '8px' });

const contact = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 10px 4px 4px',
  borderRadius: '9999px',
  border: '1px solid #e8e3e3',
  background: 'transparent',
  color: '#595555',
  cursor: 'pointer',
  fontSize: '14px',
  _hover: { borderColor: '#f09199', color: '#f09199' },
});

const input = css({ width: '100%' });

interface ComposeFormProps {
  onSubmit: (data: CreatePrivateMessage) => Promise<void>;
}

export function ComposeForm({ onSubmit }: ComposeFormProps): React.ReactElement {
  const { data: contacts = [] } = usePmContacts();
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const addRecipient = (username: string): void => {
    const name = username.trim();
    if (name && !recipients.includes(name)) {
      setRecipients((prev) => [...prev, name]);
    }
    setRecipientInput('');
  };

  const removeRecipient = (username: string): void => {
    setRecipients((prev) => prev.filter((r) => r !== username));
  };

  const handleSubmit = async (): Promise<void> => {
    if (recipients.length === 0) {
      toast('请至少添加一个收件人');
      return;
    }
    if (!title.trim()) {
      toast('请填写标题');
      return;
    }
    if (!content.trim()) {
      toast('请填写正文');
      return;
    }
    if (content.length > 1000) {
      toast('正文不能超过 1000 字');
      return;
    }
    setSending(true);
    try {
      await onSubmit({ receivers: recipients, title: title.trim(), content });
    } catch (error) {
      toast(pmErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={container}>
      <div className={field}>
        <span className={label}>收件人</span>
        <div className={recipientsBox}>
          {recipients.map((recipient) => (
            <span key={recipient} className={chip}>
              {recipient}
              <button
                type='button'
                className={chipRemove}
                onClick={() => {
                  removeRecipient(recipient);
                }}
                aria-label={`移除 ${recipient}`}
              >
                ×
              </button>
            </span>
          ))}
          <Input
            value={recipientInput}
            onChange={(event) => {
              setRecipientInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addRecipient(recipientInput);
              }
            }}
            placeholder='输入用户名后回车'
            wrapperClass={input}
          />
        </div>
        {contacts.length > 0 && (
          <div className={contactsBox}>
            {contacts.map(({ user }) => (
              <button
                type='button'
                key={user.id}
                className={contact}
                onClick={() => {
                  addRecipient(user.username);
                }}
              >
                <Avatar src={user.avatar.small} size='xsmall' alt={user.nickname} />
                <span>{user.nickname}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={field}>
        <span className={label}>标题</span>
        <Input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder='标题'
          maxLength={75}
          wrapperClass={input}
        />
      </div>

      <div className={field}>
        <span className={label}>正文</span>
        <EditorForm
          value={content}
          onChange={setContent}
          onConfirm={() => {
            void handleSubmit();
          }}
          confirmText={sending ? '发送中…' : '发送'}
          placeholder='正文…'
          hideCancel
        />
      </div>
    </div>
  );
}
