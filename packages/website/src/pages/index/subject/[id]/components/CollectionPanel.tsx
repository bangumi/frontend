import { ok } from '@oazapfts/runtime';
import React, { useEffect, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Subject } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { Button, toast, Typography } from '@bangumi/design';
import { getSubjectStatsLink } from '@bangumi/utils/pages';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';

import styles from './CollectionPanel.module.less';
import { COLLECT_DESC } from './subject-common';

const { Link } = Typography;

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

/**
 * 收藏盒：我的收藏状态 + 收藏操作 + 全局评分，对齐 PHP panel_interest
 */
const CollectionPanel: React.FC<{ subject: Subject }> = ({ subject }) => {
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
        <div className={styles.collectButtons}>
          {COLLECT_OPTIONS.map((option) => (
            <button
              key={option.type}
              type='button'
              className={`${styles.collectBtn} ${
                interest?.type === option.type ? styles.collectBtnActive : ''
              }`}
              aria-pressed={interest?.type === option.type}
              disabled={sending}
              onClick={() => void updateType(option.type)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {interest != null ? (
          <div className={styles.interestDetails}>
            <p className={styles.interestNow}>
              我{COLLECT_DESC[interest.type]}这部作品
              <button
                type='button'
                className={styles.modifyBtn}
                onClick={() => setEditing(!editing)}
                disabled={sending}
              >
                {editing ? '取消' : '修改'}
              </button>
            </p>
            {!editing && interest.rate > 0 && (
              <p className={styles.myRate}>
                我的评价：
                <ClickableRate value={interest.rate} onChange={() => undefined} />
              </p>
            )}
            {!editing && interest.comment != null && interest.comment !== '' && (
              <p className={styles.myComment}>{interest.comment}</p>
            )}
          </div>
        ) : null}

        {editing && (
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

        <div className={styles.rating}>
          <div className={styles.ratingHeadline}>
            <Link to={getSubjectStatsLink(subject.id)} className={styles.scoreLink}>
              <span className={styles.score}>{rating.score.toFixed(1)}</span>
              <span className={styles.ratingLabel}>{getRatingLabel(rating.score)}</span>
            </Link>
            <div className={styles.votes}>{rating.total} votes</div>
          </div>
          <Link to={getSubjectStatsLink(subject.id)} className={styles.rankDesc}>
            Bangumi {RATING_CATEGORY[subject.type]} Ranked:{' '}
            <strong>{rating.rank === 0 ? '--' : `#${rating.rank}`}</strong>
          </Link>
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
