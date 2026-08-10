import { ok } from '@oazapfts/runtime';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { ProgressItem, UpdateSubjectProgress } from '@bangumi/client/client';
import { EpisodeCollectionStatus, SubjectType } from '@bangumi/client/client';
import { toast, Typography } from '@bangumi/design';
import { getSubjectLink } from '@bangumi/utils/pages';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';

import styles from './PrgManager.module.less';

const { Link } = Typography;

const CATEGORIES = [
  { type: 0, label: '全部' },
  { type: SubjectType.Anime, label: '动画' },
  { type: SubjectType.Real, label: '三次元' },
  { type: SubjectType.Book, label: '书籍' },
];

function totalText(total: number): string {
  return total === 0 ? '??' : String(total);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '操作失败，请稍后再试';
}

function PrgRow({ item }: { item: ProgressItem }) {
  const { mutate } = useHomePage();
  const [epValue, setEpValue] = useState(String(item.interest.epStatus));
  const [volValue, setVolValue] = useState(String(item.interest.volStatus));
  const [submitting, setSubmitting] = useState(false);

  const { subject } = item;
  const isBook = subject.type === SubjectType.Book;
  const lastUnwatchedEp = item.lastUnwatchedEp;

  const submit = async (body: UpdateSubjectProgress) => {
    setSubmitting(true);
    try {
      await ok(ozaClient.updateSubjectProgress(subject.id, body));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatchUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const ep = Number(epValue);
    if (Number.isNaN(ep) || ep < 0) {
      toast('请输入有效的章节进度', { type: 'error' });
      return;
    }
    const body: UpdateSubjectProgress = { epStatus: ep };
    if (isBook && subject.series) {
      const vol = Number(volValue);
      if (Number.isNaN(vol) || vol < 0) {
        toast('请输入有效的卷数进度', { type: 'error' });
        return;
      }
      body.volStatus = vol;
    }
    void submit(body);
  };

  const handleCheckIn = async (epId: number) => {
    setSubmitting(true);
    try {
      await ok(ozaClient.updateEpisodeProgress(epId, { type: EpisodeCollectionStatus.Done }));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li className={styles.row}>
      <Link
        to={getSubjectLink(subject.id)}
        className={styles.coverLink}
        title={subject.nameCN || subject.name}
      >
        <img src={subject.images?.large} className={styles.cover} loading='lazy' alt='' />
        {item.todayOnAir && <span className={styles.onAir}>放送中</span>}
      </Link>
      <div className={styles.info}>
        <div className={styles.header}>
          <Link
            to={getSubjectLink(subject.id)}
            className={styles.subjectName}
            title={subject.nameCN || subject.name}
          >
            {subject.nameCN || subject.name}
          </Link>
          <small className={styles.percentText}>
            [{item.interest.epStatus}/{totalText(subject.eps)}]
          </small>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressInner} style={{ width: `${item.percent}%` }} />
        </div>

        <div className={styles.actions}>
          {!isBook && lastUnwatchedEp && (
            <button
              type='button'
              className={styles.checkInBtn}
              disabled={submitting}
              onClick={() => void handleCheckIn(lastUnwatchedEp.id)}
              title={`标记 ep.${lastUnwatchedEp.sort} 为看过`}
            >
              ep.{lastUnwatchedEp.sort} 看过
            </button>
          )}
          <form className={styles.batchForm} onSubmit={handleBatchUpdate}>
            {isBook ? (
              <>
                <label className={styles.batchLabel}>
                  Chap.
                  <input
                    className={styles.batchInput}
                    type='number'
                    min={0}
                    value={epValue}
                    onChange={(e) => setEpValue(e.target.value)}
                  />
                  / {totalText(subject.eps)}
                </label>
                {subject.series && (
                  <label className={styles.batchLabel}>
                    Vol.
                    <input
                      className={styles.batchInput}
                      type='number'
                      min={0}
                      value={volValue}
                      onChange={(e) => setVolValue(e.target.value)}
                    />
                    / {totalText(subject.volumes)}
                  </label>
                )}
              </>
            ) : (
              <label className={styles.batchLabel}>
                <input
                  className={styles.batchInput}
                  type='number'
                  min={0}
                  value={epValue}
                  onChange={(e) => setEpValue(e.target.value)}
                />
                / {totalText(subject.eps)}
              </label>
            )}
            <button type='submit' className={styles.updateBtn} disabled={submitting}>
              更新
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}

/**
 * 进度管理器，对齐 PHP home_prg：分类 tab + 条目列表（快捷看过 + 批量更新进度）
 */
const PrgManager: React.FC<{ progress: ProgressItem[] }> = ({ progress }) => {
  const [activeType, setActiveType] = useState(0);

  const filtered =
    activeType === 0 ? progress : progress.filter((item) => item.subject.type === activeType);

  return (
    <section className={styles.block}>
      <div className={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.type}
            type='button'
            className={`${styles.tab} ${activeType === cat.type ? styles.tabActive : ''}`}
            onClick={() => setActiveType(cat.type)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className={styles.empty}>还没有在看的番组，去搜索看看？</p>
      ) : (
        <ul className={styles.list}>
          {filtered.map((item) => (
            <PrgRow key={item.subject.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PrgManager;
