import React, { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import { EditorForm, Input, toast, Typography } from '@bangumi/design';
import { useGroup } from '@bangumi/website/hooks/use-group';

import GroupInfo from '../../components/GroupInfo';
import styles from './style.module.less';

interface FormData {
  title: string;
  content: string;
}

const GroupNewTopicPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { group } = useGroup(name!);

  const { register, handleSubmit, control } = useForm<FormData>();
  const [sending, setSending] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSending(true);
    const response = await ozaClient.createNewGroupTopic(group.group.name, data);
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

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.header}>
          <div className={styles.tipText}>
            <Typography.Text type='secondary'>
              在
              <Typography.Link
                to={`/group/${group.group.name}`}
                fontWeight='bold'
                className={styles.groupLink}
              >
                {group.group.title}
              </Typography.Link>
              发表新话题
            </Typography.Text>
          </div>
          <div className={styles.titleInput}>
            <Input
              rounded
              placeholder='取个标题…'
              {...register('title', { required: '请填写标题' })}
            />
          </div>
        </div>
        <div className={styles.contentEditor}>
          <Controller
            name='content'
            control={control}
            rules={{ required: '请填写正文内容' }}
            render={({ field }) => (
              <EditorForm
                placeholder='话题正文…'
                onConfirm={() => {
                  handleSubmit(onSubmit, showErrors)();
                }}
                hideCancel
                // TODO: use loading state
                confirmText={sending ? '...' : undefined}
                rows={15}
                {...field}
              />
            )}
          />
        </div>
        <div className={styles.rightColumn}>
          <GroupInfo group={group.group} />
        </div>
      </div>
    </>
  );
};

export default GroupNewTopicPage;
