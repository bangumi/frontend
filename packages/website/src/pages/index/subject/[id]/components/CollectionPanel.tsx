import { ok } from '@oazapfts/runtime';
import React, { useEffect, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Subject } from '@bangumi/client/client';
import { CollectionType } from '@bangumi/client/client';
import { Button, toast, Typography } from '@bangumi/design';
import { getSubjectStatsLink } from '@bangumi/utils/pages';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';

import styles from './CollectionPanel.module.less';
import { COLLECT_DESC } from './subject-common';
import SubjectSection from './SubjectSection';

const { Link } = Typography;

const COLLECT_OPTIONS: { type: CollectionType; label: string }[] = [
  { type: CollectionType.Wish, label: '想看' },
  { type: CollectionType.Collect, label: '看过' },
  { type: CollectionType.Doing, label: '在看' },
  { type: CollectionType.OnHold, label: '搁置' },
  { type: CollectionType.Dropped, label: '抛弃' },
];

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

  const rating = subject.rating;
  const maxRateCount = Math.max(...rating.count, 1);

  return (
    <SubjectSection title='收藏盒'>
      {interest != null ? (
        <div>
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
      ) : (
        <div className={styles.collectButtons}>
          {COLLECT_OPTIONS.map((option) => (
            <button
              key={option.type}
              type='button'
              className={styles.collectBtn}
              disabled={sending}
              onClick={async () => {
                setSending(true);
                try {
                  await ok(ozaClient.updateSubjectCollection(subject.id, { type: option.type }));
                  await mutate();
                } catch (error) {
                  toast(getErrorMessage(error), { type: 'error' });
                } finally {
                  setSending(false);
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

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
        <Link to={getSubjectStatsLink(subject.id)}>
          <div className={styles.scoreBlock}>
            <span className={styles.score}>{rating.score.toFixed(1)}</span>
            <span className={styles.rankDesc}>{rating.rank === 0 ? '--' : `#${rating.rank}`}</span>
          </div>
        </Link>
        <div className={styles.ratingChart}>
          <div className={styles.votes}>{rating.total} votes</div>
          <ul className={styles.chart}>
            {rating.count.map((count, i) => (
              <li key={i} className={styles.chartItem} title={`${i + 1}分: ${count}人`}>
                <span
                  className={styles.chartBar}
                  style={{ height: `${Math.round((count / maxRateCount) * 100)}%` }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SubjectSection>
  );
};

export default CollectionPanel;
