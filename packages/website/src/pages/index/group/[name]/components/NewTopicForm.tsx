import React, { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import { EditorForm, Form, Input, toast } from '@bangumi/design';
import { useGroup } from '@bangumi/website/hooks/use-group';

import styles from './NewTopicForm.module.less';

interface FormData {
  title: string;
  content: string;
}

interface FormFieldProps {
  quickPost?: boolean;
}

const NewTopicForm = ({ quickPost = false }: { quickPost?: boolean }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { group } = useGroup(name!);

  const { register, handleSubmit, control } = useForm<FormData>();
  const [sending, setSending] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async ({ content, title }) => {
    setSending(true);
    const response = await ozaClient.createNewGroupTopic(group.group.name, {
      title,
      text: content,
    });
    if (response.status === 200) {
      navigate(`/group/topic/${response.data.id}`);
    } else {
      console.error(response);
      toast(response.data.message);
    }
    setSending(false);
  };

  const showErrors: SubmitErrorHandler<FormData> = (errors) => {
    toast(Object.values(errors).map((field) => field.message)[0]!);
  };

  const FormInput = ({ quickPost = false }: FormFieldProps) => (
    <Input
      rounded
      placeholder={quickPost ? '给新帖取一个标题' : '取个标题…'}
      {...register('title', { required: '请填写标题' })}
    />
  );

  const FormEditor = ({ quickPost = false }: FormFieldProps) => (
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
        className={styles.quickPostForm}
        // 统一由 EditorForm 的 onConfirm 处理
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item>
          <FormInput quickPost />
        </Form.Item>
        <Form.Item>
          <FormEditor quickPost />
        </Form.Item>
      </Form>
    );
  }

  return (
    <>
      <div className={styles.titleInput}>
        <FormInput />
      </div>
      <div className={styles.contentEditor}>
        <FormEditor />
      </div>
    </>
  );
};

export default NewTopicForm;
