import React, { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import { EditorForm, Form, Input, toast } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import TurnstileCaptcha from '@bangumi/website/components/TurnstileCaptcha';
import type { UseGroupTopicRet } from '@bangumi/website/hooks/use-group-topic';

interface FormData {
  title: string;
  content: string;
}

export interface TopicFormProps {
  quickPost?: boolean;
  /** 小组 slug name，指定此参数时为发表话题 */
  groupName?: string;
  /** 话题，指定此参数时为修改话题 */
  topic?: UseGroupTopicRet;
}

/**
 * 发表新话题或修改话题
 *
 * groupName 和 topic 必须且只能指定其一
 */
const titleInput = css({
  display: 'flex',
  gridColumn: '1',
  '& .bgm-input': {
    fontSize: '1.125rem',
    '&::placeholder': {
      color: '#9f9b9b',
    },
  },
  '& .bgm-input__wrapper': {
    flex: '1',
  },
});

const contentEditor = css({
  gridColumn: '1',
});

const quickPostForm = css({
  width: '75%',
  marginTop: '40px',
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

const TopicForm = ({ quickPost = false, groupName, topic }: TopicFormProps) => {
  if ((!!groupName && !!topic) || (!groupName && !topic)) {
    throw Error('Invalid usage: should specify either groupName or topic');
  }

  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: topic?.data as FormData | undefined,
  });
  const [sending, setSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const postNewTopic = async (data: FormData, groupName: string) => {
    const response = await ozaClient.createGroupTopic(groupName, {
      ...data,
      turnstileToken: turnstileToken ?? '',
    });
    if (response.status === 200) {
      navigate(`/group/topic/${response.data.id}`);
    } else {
      console.error(response);
      toast(response.data.message);
    }
  };

  const editTopic = async (data: FormData, id: number) => {
    const response = await ozaClient.editGroupTopic(id, data);
    if (response.status === 200) {
      topic?.mutate({ ...topic.data, ...data });
      navigate(`/group/topic/${id}`);
    } else {
      console.error(response);
      toast(response.data.message);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSending(true);
    if (groupName) {
      await postNewTopic(data, groupName);
    } else if (topic) {
      await editTopic(data, topic.data.id);
    }
    setSending(false);
  };

  const showErrors: SubmitErrorHandler<FormData> = (errors) => {
    toast(Object.values(errors).map((field) => field.message)[0]!);
  };

  const FormInput = ({ quickPost = false }: TopicFormProps) => (
    <Input
      rounded
      placeholder={quickPost ? '给新帖取一个标题' : '取个标题…'}
      {...register('title', { required: '请填写标题' })}
    />
  );

  const FormEditor = ({ quickPost = false }: TopicFormProps) => (
    <Controller
      name='content'
      control={control}
      rules={{ required: '请填写正文内容' }}
      render={({ field }) => (
        <EditorForm
          placeholder={quickPost ? '想聊点什么的呢…' : '话题正文…'}
          hideCancel
          onConfirm={async () => handleSubmit(onSubmit, showErrors)()}
          // TODO: use loading state
          confirmText={sending ? '...' : quickPost ? '快速发帖' : undefined}
          submitExtra={<TurnstileCaptcha action='post_topic' onToken={setTurnstileToken} />}
          rows={!quickPost ? 15 : undefined}
          {...field}
        />
      )}
    />
  );

  if (quickPost) {
    return (
      <Form
        compact
        className={quickPostForm}
        // 统一由 EditorForm 的 onConfirm 处理
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <FormInput quickPost />
        <FormEditor quickPost />
      </Form>
    );
  }

  return (
    <>
      <div className={titleInput}>
        <FormInput />
      </div>
      <div className={contentEditor}>
        <FormEditor />
      </div>
    </>
  );
};

export default TopicForm;
