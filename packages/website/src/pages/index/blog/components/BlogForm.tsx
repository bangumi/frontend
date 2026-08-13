import React, { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { BlogEntry } from '@bangumi/client/client';
import { EditorForm, Form, Input, Radio, toast } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import TurnstileCaptcha from '@bangumi/website/components/TurnstileCaptcha';
import { createBlogEntry, updateBlogEntry } from '@bangumi/website/hooks/use-blog-write';

interface FormData {
  title: string;
  content: string;
  tags: string;
  /** 关联条目 ID，逗号分隔 */
  subjectIDs: string;
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

const tagsInput = css({
  '& .bgm-input': {
    '&::placeholder': {
      color: '#9f9b9b',
    },
  },
});

const editor = css({
  '& .bgm-editor__container': { minHeight: '240px' },
});

const row = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '20px',
  fontSize: '14px',
  color: '#595555',
});

/** 发布/编辑日志表单（对齐契约 POST/PATCH /p1/blogs） */
const BlogForm: React.FC<{ entry?: BlogEntry }> = ({ entry }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: entry
      ? {
          title: entry.title,
          content: entry.content,
          tags: entry.tags.join(' '),
          subjectIDs: '',
        }
      : { title: '', content: '', tags: '', subjectIDs: '' },
  });
  const [isPublic, setIsPublic] = useState(entry?.public ?? true);
  const [sending, setSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSending(true);
    try {
      const tags = data.tags
        .split(/[,，\s]+/)
        .map((tag) => tag.trim())
        .filter(Boolean);
      const subjectIDs = data.subjectIDs
        .split(/[,，\s]+/)
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value > 0)
        .slice(0, 5);
      if (entry) {
        await updateBlogEntry(entry.id, {
          title: data.title,
          content: data.content,
          tags,
          public: isPublic,
          subjectIDs: subjectIDs.length > 0 ? subjectIDs : undefined,
        });
        navigate(`/blog/${entry.id}`);
      } else {
        const { id } = await createBlogEntry({
          title: data.title,
          content: data.content,
          tags,
          public: isPublic,
          subjectIDs: subjectIDs.length > 0 ? subjectIDs : undefined,
          turnstileToken: turnstileToken ?? '',
        });
        navigate(`/blog/${id}`);
      }
    } catch (error) {
      toast(error instanceof Error ? error.message : '保存失败，请稍后再试', { type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const showErrors: SubmitErrorHandler<FormData> = (errors) => {
    toast(Object.values(errors).map((field) => field.message)[0]!);
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
          placeholder='给日志取一个标题'
          {...register('title', { required: '请填写标题' })}
        />
      </div>
      <div className={editor}>
        <Controller
          name='content'
          control={control}
          rules={{ required: '请填写正文内容' }}
          render={({ field }) => (
            <EditorForm
              placeholder='日志正文，支持 BBCode…'
              hideCancel
              rows={15}
              confirmText={sending ? '...' : entry ? '保存修改' : '发表日志'}
              onConfirm={async () => handleSubmit(onSubmit, showErrors)()}
              submitExtra={<TurnstileCaptcha action='post_blog' onToken={setTurnstileToken} />}
              {...field}
            />
          )}
        />
      </div>
      <div className={tagsInput}>
        <Input rounded placeholder='Tag，用空格或逗号分隔（可选）' {...register('tags')} />
      </div>
      <div className={tagsInput}>
        <Input
          rounded
          placeholder='关联条目 ID，用逗号分隔（可选，最多 5 个）'
          {...register('subjectIDs')}
        />
      </div>
      <div className={row}>
        <span>可见性：</span>
        <Radio.Group>
          <Radio
            label='公开'
            name='blog-public'
            checked={isPublic}
            onChange={() => setIsPublic(true)}
          />
          <Radio
            label='仅好友可见'
            name='blog-public'
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
          />
        </Radio.Group>
      </div>
    </Form>
  );
};

export default BlogForm;
