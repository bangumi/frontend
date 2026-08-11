import { ok } from '@oazapfts/runtime';
import React, { useState } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { EpisodeType } from '@bangumi/client/client';
import { Button, Form, Input, toast, Typography } from '@bangumi/design';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';

import styles from './edit.module.less';

const episodeTypes: { label: string; value: EpisodeType }[] = [
  { label: '本篇', value: EpisodeType.Normal },
  { label: '特别篇', value: EpisodeType.Special },
  { label: 'OP', value: EpisodeType.Op },
  { label: 'ED', value: EpisodeType.Ed },
  { label: '预告/宣传/广告', value: EpisodeType.Pre },
  { label: 'MAD', value: EpisodeType.Mad },
  { label: '其他', value: EpisodeType.Other },
];

interface EpisodeFormData {
  name: string;
  nameCN: string;
  type: EpisodeType;
  ep: number;
  disc?: number;
  duration: string;
  date?: string;
  summary: string;
  commitMessage: string;
}

function EpisodeEditPage() {
  const { id } = useParams();
  const episodeID = Number(id);
  if (id === undefined || !Number.isInteger(episodeID) || episodeID <= 0) {
    throw new Error('章节 ID 必须为正整数');
  }

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { data: episode } = useSWR(
    `/wiki/episodes/${episodeID}`,
    async () => ok(ozaClient.getEpisodeWikiInfo(episodeID)),
    { suspense: true },
  );

  const { register, handleSubmit } = useForm<EpisodeFormData>({
    defaultValues: {
      name: episode.name,
      nameCN: episode.nameCN,
      type: episode.type,
      ep: episode.ep,
      disc: episode.disc,
      duration: episode.duration,
      date: episode.date,
      summary: episode.summary,
      commitMessage: '修正章节信息',
    },
  });

  const onSubmit: SubmitHandler<EpisodeFormData> = async (values) => {
    setSubmitting(true);
    try {
      const response = await ozaClient.patchEpisodeWikiInfo(episodeID, {
        commitMessage: values.commitMessage,
        episode: {
          name: values.name,
          nameCN: values.nameCN,
          type: values.type,
          ep: values.ep,
          disc: values.disc,
          duration: values.duration,
          date: values.date,
          summary: values.summary,
        },
        expectedRevision: {
          name: episode.name,
          nameCN: episode.nameCN,
          duration: episode.duration,
          date: episode.date,
          summary: episode.summary,
        },
      });

      if (response.status !== 200) {
        toast(response.data.message, { type: 'error' });
        return;
      }

      toast('章节已更新');
      navigate(`/ep/${episodeID}`);
    } catch {
      toast('提交失败，请稍后再试', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const onInvalid: SubmitErrorHandler<EpisodeFormData> = (errors) => {
    toast(Object.values(errors)[0]?.message ?? '请检查填写内容', { type: 'error' });
  };

  return (
    <main className={styles.page}>
      <Helmet title={`编辑章节 ${episode.ep} - ${episode.name}`} />
      <Typography.Text type='secondary'>正在编辑章节 #{episode.id}</Typography.Text>
      <h1 className={styles.title}>编辑章节</h1>
      <Form labelWidth={92} className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <Form.Item label='原名'>
          <Input
            aria-label='原名'
            wrapperClass={styles.input}
            {...register('name', { required: '请填写章节原名' })}
          />
        </Form.Item>
        <Form.Item label='中文名'>
          <Input aria-label='中文名' wrapperClass={styles.input} {...register('nameCN')} />
        </Form.Item>
        <Form.Item label='类型'>
          <select
            aria-label='类型'
            className={styles.select}
            {...register('type', { valueAsNumber: true })}
          >
            {episodeTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item label='章节编号'>
          <Input
            type='number'
            aria-label='章节编号'
            step='0.1'
            wrapperClass={styles.numberInput}
            {...register('ep', { required: '请填写章节编号', valueAsNumber: true })}
          />
        </Form.Item>
        <Form.Item label='碟号'>
          <Input
            type='number'
            aria-label='碟号'
            min='0'
            step='1'
            wrapperClass={styles.numberInput}
            {...register('disc', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
        </Form.Item>
        <Form.Item label='时长'>
          <Input
            aria-label='时长'
            placeholder='例如 24:53'
            wrapperClass={styles.input}
            {...register('duration')}
          />
        </Form.Item>
        <Form.Item label='首播日期'>
          <Input
            type='date'
            aria-label='首播日期'
            wrapperClass={styles.dateInput}
            {...register('date')}
          />
        </Form.Item>
        <Form.Item label='简介'>
          <textarea
            aria-label='简介'
            className={styles.textarea}
            rows={8}
            {...register('summary')}
          />
        </Form.Item>
        <Form.Item label='编辑摘要'>
          <Input
            aria-label='编辑摘要'
            wrapperClass={styles.input}
            {...register('commitMessage', { required: '请填写编辑摘要' })}
          />
        </Form.Item>
        <div className={styles.actions}>
          <Button
            type='plain'
            onClick={() => {
              void navigate(`/ep/${episodeID}`);
            }}
            disabled={submitting}
          >
            取消
          </Button>
          <Button htmlType='submit' color='blue' disabled={submitting}>
            {submitting ? '提交中...' : '提交修改'}
          </Button>
        </div>
      </Form>
    </main>
  );
}

export default withErrorBoundary(EpisodeEditPage, {
  404: () => <div>没有找到章节</div>,
});
