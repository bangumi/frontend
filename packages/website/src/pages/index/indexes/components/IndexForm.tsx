import React, { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import type { Index } from '@bangumi/client/client';
import { Button, EditorForm, Form, Input, Radio, toast } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

interface FormData {
  title: string;
  desc: string;
}

const titleInput = css({
  display: 'flex',
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

const editor = css({
  '& .bgm-editor__container': { minHeight: '200px' },
});

const privacy = css({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  fontSize: '14px',
  color: '#595555',
});

const footer = css({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginTop: '10px',
});

/** 创建/编辑目录表单 */
const IndexForm: React.FC<{ index?: Index }> = ({ index }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: index ? { title: index.title, desc: index.desc } : undefined,
  });
  const [isPrivate, setIsPrivate] = useState(index?.private ?? false);
  const [sending, setSending] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSending(true);
    try {
      if (index) {
        const res = await ozaClient.updateIndex(index.id, {
          title: data.title,
          desc: data.desc,
          private: isPrivate,
        });
        if (res.status === 200) {
          navigate(`/index/${index.id}`);
        } else {
          toast(res.data.message);
        }
      } else {
        const res = await ozaClient.createIndex({
          title: data.title,
          desc: data.desc,
          private: isPrivate,
        });
        if (res.status === 200) {
          navigate(`/index/${res.data.id}`);
        } else {
          toast(res.data.message);
        }
      }
    } finally {
      setSending(false);
    }
  };

  const showErrors: SubmitErrorHandler<FormData> = (errors) => {
    toast(Object.values(errors).map((field) => field.message)[0]!);
  };

  const handleDelete = async () => {
    if (!index) {
      return;
    }
    if (confirm('确认删除这个目录？删除后不可恢复。')) {
      const res = await ozaClient.deleteIndex(index.id);
      if (res.status === 200) {
        navigate('/index');
      } else {
        toast(res.data.message);
      }
    }
  };

  return (
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        // 统一由 EditorForm 的 onConfirm 处理
        e.preventDefault();
      }}
    >
      <div className={titleInput}>
        <Input
          rounded
          placeholder='给目录取一个标题'
          {...register('title', { required: '请填写标题' })}
        />
      </div>
      <div className={editor}>
        <Controller
          name='desc'
          control={control}
          rules={{ required: '请填写目录描述' }}
          render={({ field }) => (
            <EditorForm
              placeholder='目录描述，支持 BBCode…'
              hideCancel
              rows={10}
              confirmText={sending ? '...' : index ? '保存修改' : '创建目录'}
              onConfirm={async () => handleSubmit(onSubmit, showErrors)()}
              {...field}
            />
          )}
        />
      </div>
      <div className={privacy}>
        <span>可见性：</span>
        <Radio.Group>
          <Radio
            label='公开'
            name='private'
            checked={!isPrivate}
            onChange={() => setIsPrivate(false)}
          />
          <Radio
            label='仅自己可见'
            name='private'
            checked={isPrivate}
            onChange={() => setIsPrivate(true)}
          />
        </Radio.Group>
      </div>
      {index && (
        <div className={footer}>
          <Button type='text' size='medium' onClick={handleDelete}>
            删除目录
          </Button>
        </div>
      )}
    </Form>
  );
};

export default IndexForm;
