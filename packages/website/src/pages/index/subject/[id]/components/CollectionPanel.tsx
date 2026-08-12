import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Subject, SubjectInterest, UpdateSubjectProgress } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { Button, toast, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectStatsLink } from '@bangumi/utils/pages';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';
import { useUser } from '@bangumi/website/hooks/use-user';

import styles from './CollectionPanel.module.less';
import { COLLECT_DESC, makeDescriptiveTime } from './subject-common';

const { Link } = Typography;

const privateTag = css({ marginLeft: '6px', color: '#9f9b9b' });

const interestTime = css({
  margin: '0 0 8px',
  color: '#9f9b9b',
  fontSize: '12px',
});

/* 我的完成度，对齐 PHP block_prg_manager */
const progressBlock = css({
  marginTop: '10px',
  paddingTop: '10px',
  borderTop: '1px solid #e8e3e3',
});

const progressTitle = css({
  margin: '0 0 6px',
  fontSize: '13px',
  fontWeight: 'normal',
  color: '#595555',
});

const progressBar = css({
  position: 'relative',
  height: '18px',
  overflow: 'hidden',
  border: '1px solid #e8e3e3',
  borderRadius: '3px',
  background: '#f4f4f4',
});

const progressInner = css({
  display: 'block',
  height: '100%',
  background: '#54b5df',
});

const progressText = css({
  position: 'absolute',
  top: '0',
  left: '6px',
  color: '#fff',
  fontSize: '11px',
  lineHeight: '18px',
});

const progressForm = css({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
  fontSize: '12px',
  color: '#9f9b9b',
});

const progressLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const progressInput = css({
  width: '48px',
  padding: '2px 4px',
  border: '1px solid #e8e3e3',
  borderRadius: '2px',
  fontSize: '12px',
});

const progressUpdate = css({
  border: '1px solid #54b5df',
  borderRadius: '3px',
  padding: '3px 12px',
  background: '#fff',
  color: '#54b5df',
  cursor: 'pointer',
  fontSize: '12px',
  _hover: { background: '#54b5df', color: '#fff' },
  _disabled: {
    borderColor: '#e8e3e3',
    color: '#9f9b9b',
    cursor: 'default',
    background: '#fff',
  },
});

const COLLECT_OPTIONS: { type: CollectionType; label: string }[] = [
  { type: CollectionType.Wish, label: '想看' },
  { type: CollectionType.Collect, label: '看过' },
  { type: CollectionType.Doing, label: '在看' },
  { type: CollectionType.OnHold, label: '搁置' },
  { type: CollectionType.Dropped, label: '抛弃' },
];

const RATING_CATEGORY: Record<SubjectType, string> = {
  [SubjectType.Book]: 'Book',
  [SubjectType.Anime]: 'Anime',
  [SubjectType.Music]: 'Music',
  [SubjectType.Game]: 'Game',
  [SubjectType.Real]: 'Real',
};

/** 支持进度管理的条目类型，对齐 PHP SubjectCore::$enable_progress_manager */
const PROGRESS_MANAGE_TYPES: SubjectType[] = [
  SubjectType.Book,
  SubjectType.Anime,
  SubjectType.Real,
];

function getRatingLabel(score: number): string {
  if (score >= 9) return '神作';
  if (score >= 8) return '力荐';
  if (score >= 7) return '推荐';
  if (score >= 6) return '还行';
  if (score >= 5) return '不过不失';
  if (score >= 4) return '较差';
  if (score >= 3) return '差';
  if (score >= 2) return '很差';
  return '不忍直视';
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '操作失败，请稍后再试';
}

/** 进度百分比，对齐 PHP SubjectCore::GetProgress */
function getProgressPercent(total: number, recent: number): number {
  if (total <= 0) {
    return 1;
  }
  if (recent > total) {
    return 50;
  }
  const progress = Math.round((recent * 100) / total);
  return progress === 0 ? 1 : progress;
}

function totalText(total: number): string {
  return total === 0 ? '??' : String(total);
}

/** 可点击评分星星（1-10 分，每颗星 2 分） */
function ClickableRate({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className={styles.rateStars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type='button'
          className={`${styles.rateStar} ${value >= i * 2 ? styles.rateStarFilled : ''}`}
          onClick={() => onChange(i * 2)}
          title={`${i * 2} 分`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/** 我的完成度，对齐 PHP block_prg_manager：进度条 + 章节/卷数输入 + 更新 */
function ProgressManager({
  subject,
  interest,
  mutate,
}: {
  subject: Subject;
  interest: SubjectInterest;
  mutate: () => Promise<unknown>;
}) {
  const isBook = subject.type === SubjectType.Book;
  const [epValue, setEpValue] = useState(String(interest.epStatus));
  const [volValue, setVolValue] = useState(String(interest.volStatus));
  const [sending, setSending] = useState(false);
  const percent = getProgressPercent(subject.eps, interest.epStatus);

  const submit = async (event: React.FormEvent) => {
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
    setSending(true);
    try {
      await ok(ozaClient.updateSubjectProgress(subject.id, body));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={progressBlock}>
      <h4 className={progressTitle}>我的完成度</h4>
      <div className={progressBar}>
        <span className={progressInner} style={{ width: `${percent}%` }}>
          <small className={progressText}>
            {interest.epStatus}/{totalText(subject.eps)}
          </small>
        </span>
      </div>
      <form className={progressForm} onSubmit={(e) => void submit(e)}>
        {isBook && (
          <label className={progressLabel}>
            Chap.
            <input
              className={progressInput}
              type='number'
              min={0}
              value={epValue}
              onChange={(e) => setEpValue(e.target.value)}
            />
            / {totalText(subject.eps)}
          </label>
        )}
        {isBook && subject.series && (
          <label className={progressLabel}>
            Vol.
            <input
              className={progressInput}
              type='number'
              min={0}
              value={volValue}
              onChange={(e) => setVolValue(e.target.value)}
            />
            / {totalText(subject.volumes)}
          </label>
        )}
        {!isBook && (
          <label className={progressLabel}>
            <input
              className={progressInput}
              type='number'
              min={0}
              value={epValue}
              aria-label='章节进度'
              onChange={(e) => setEpValue(e.target.value)}
            />
            / {totalText(subject.eps)}
          </label>
        )}
        <button type='submit' className={progressUpdate} disabled={sending}>
          更新
        </button>
      </form>
    </div>
  );
}

/**
 * 收藏盒：我的收藏状态 + 收藏操作 + 全局评分，对齐 PHP panel_interest
 */
const CollectionPanel: React.FC<{ subject: Subject }> = ({ subject }) => {
  const { user } = useUser();
  const { mutate } = useSubjectHome(subject.id);
  const interest = subject.interest;

  const [editing, setEditing] = useState(false);
  const [sending, setSending] = useState(false);
  const [type, setType] = useState<CollectionType | undefined>(interest?.type);
  const [rate, setRate] = useState(interest?.rate ?? 0);
  const [comment, setComment] = useState(interest?.comment ?? '');

  useEffect(() => {
    setType(interest?.type);
    setRate(interest?.rate ?? 0);
    setComment(interest?.comment ?? '');
  }, [interest]);

  const submit = async () => {
    if (type == null) {
      toast('请选择收藏状态', { type: 'error' });
      return;
    }
    setSending(true);
    try {
      await ok(
        ozaClient.updateSubjectCollection(subject.id, {
          type,
          rate,
          comment: comment.trim() === '' ? undefined : comment.trim(),
        }),
      );
      await mutate();
      setEditing(false);
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const updateType = async (nextType: CollectionType) => {
    setSending(true);
    try {
      await ok(ozaClient.updateSubjectCollection(subject.id, { type: nextType }));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const rating = subject.rating;
  const maxRateCount = Math.max(...rating.count, 1);
  const ratingCounts = rating.count.map((count, index) => ({ count, score: index + 1 })).reverse();

  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>收藏盒</h2>
      <div className={styles.panelBody}>
        {user &&
          (interest != null ? (
            <div className={styles.interestDetails}>
              <p className={styles.interestNow}>
                我{COLLECT_DESC[interest.type]}这部作品
                {interest.private && <span className={privateTag}>[私密]</span>}
                <button
                  type='button'
                  className={styles.modifyBtn}
                  onClick={() => setEditing(!editing)}
                  disabled={sending}
                >
                  {editing ? '取消' : '修改'}
                </button>
              </p>
              <p className={interestTime}>
                {dayjs.unix(interest.updatedAt).format('YYYY-M-D HH:mm')}
                <span> / {makeDescriptiveTime(interest.updatedAt)}</span>
              </p>
              {!editing && interest.rate > 0 && (
                <p className={styles.myRate}>
                  我的评价：
                  <ClickableRate value={interest.rate} onChange={() => undefined} />
                </p>
              )}
              {!editing && interest.comment !== '' && (
                <p className={styles.myComment}>{interest.comment}</p>
              )}
              {!editing &&
                interest.type !== CollectionType.Wish &&
                PROGRESS_MANAGE_TYPES.includes(subject.type) && (
                  <ProgressManager subject={subject} interest={interest} mutate={mutate} />
                )}
            </div>
          ) : (
            <div className={styles.collectButtons}>
              {COLLECT_OPTIONS.map((option) => (
                <button
                  key={option.type}
                  type='button'
                  className={styles.collectBtn}
                  aria-pressed={false}
                  disabled={sending}
                  onClick={() => void updateType(option.type)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ))}

        {user && editing && (
          <div className={styles.editForm}>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>收藏状态</span>
              <div className={styles.typeOptions}>
                {COLLECT_OPTIONS.map((option) => (
                  <label key={option.type} className={styles.typeOption}>
                    <input
                      type='radio'
                      name='collect-type'
                      checked={type === option.type}
                      onChange={() => setType(option.type)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>评分</span>
              <ClickableRate value={rate} onChange={setRate} />
              {rate > 0 && <span className={styles.rateValue}>{rate} 分</span>}
            </div>
            <div className={styles.formRow}>
              <span className={styles.formLabel}>吐槽</span>
              <textarea
                className={styles.commentInput}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder='说点什么...'
              />
            </div>
            <div className={styles.formActions}>
              <Button type='primary' onClick={() => void submit()} disabled={sending} size='small'>
                保存
              </Button>
            </div>
          </div>
        )}

        <div className={user ? styles.rating : `${styles.rating} ${styles.ratingAnonymous}`}>
          <div className={styles.ratingHeadline}>
            <span className={styles.rateEmo} aria-hidden='true'>
              ≥▽≤
            </span>
            <div className={styles.ratingInfo}>
              <Link to={getSubjectStatsLink(subject.id)} className={styles.scoreLink}>
                <span className={styles.score}>{rating.score.toFixed(1)}</span>
                <span className={styles.ratingLabel}>{getRatingLabel(rating.score)}</span>
              </Link>
              <Link to={getSubjectStatsLink(subject.id)} className={styles.rankDesc}>
                Bangumi {RATING_CATEGORY[subject.type]} Ranked:{' '}
                <strong>{rating.rank === 0 ? '--' : `#${rating.rank}`}</strong>
              </Link>
            </div>
            <div className={styles.votes}>{rating.total} votes</div>
          </div>
          <ul className={styles.chart} aria-label='评分分布'>
            {ratingCounts.map(({ count, score }) => (
              <li key={score} className={styles.chartItem} title={`${score}分: ${count}人`}>
                <span className={styles.chartBarArea}>
                  <span
                    className={styles.chartBar}
                    style={{ height: `${Math.round((count / maxRateCount) * 100)}%` }}
                  />
                </span>
                <span className={styles.chartLabel}>{score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CollectionPanel;
