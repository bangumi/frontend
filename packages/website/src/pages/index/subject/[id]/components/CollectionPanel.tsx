import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Subject, SubjectInterest, UpdateSubjectProgress } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { Button, toast, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import { getSubjectStatsLink } from '@bangumi/utils/pages';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';
import { useUser } from '@bangumi/website/hooks/use-user';

import { COLLECT_DESC, makeDescriptiveTime } from './subject-common';

const { Link } = Typography;

const panel = css({
  overflow: 'hidden',
  margin: '0 0 15px',
  padding: '0',
  /* 对齐原站 SidePanel 边框色 @side-panel-border-color */
  border: '1px solid #f0f0f0',
  borderRadius: '15px',
  background: '#fff',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.09)',
  fontSize: '12px',
  overflowWrap: 'break-word',
});

/* 对齐原站 SidePanel：三段式渐变顶条 + 文字阴影 */
const panelTitle = css({
  height: '40px',
  margin: '0',
  padding: '0 10px',
  border: '0',
  background: 'linear-gradient(#f8f9f9, #f0f1f2 99%, #e4e4e5)',
  color: '#555',
  fontSize: '13px',
  fontWeight: 'normal',
  lineHeight: '40px',
  textShadow: '#fff 1px 1px 0px',
});

const panelBody = css({ padding: '10px' });

const interestDetails = css({
  marginBottom: '10px',
});

/* 对齐原站 span.interest_now：#0099CC 13px */
const interestNow = css({
  fontSize: '13px',
  margin: '0 0 4px',
  color: '#0099cc',
});

const privateTag = css({ marginLeft: '6px', color: '#9f9b9b' });

const interestTime = css({
  margin: '0 0 8px',
  color: '#9f9b9b',
  fontSize: '12px',
});

const modifyBtn = css({
  border: 'none',
  background: 'none',
  color: '#54b5df',
  cursor: 'pointer',
  fontSize: '12px',
  marginLeft: '8px',
  padding: '0',
  _disabled: {
    color: '#9f9b9b',
    cursor: 'default',
  },
});

const myRate = css({
  fontSize: '12px',
  color: '#9f9b9b',
  margin: '0 0 4px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const myComment = css({
  fontSize: '13px',
  margin: '4px 0 0',
  color: '#1f1c1c',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
});

const collectButtons = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
});

const collectBtn = css({
  minWidth: '0',
  height: '28px',
  padding: '0 2px',
  border: '1px solid #54b5df',
  borderRightWidth: '0',
  color: '#54b5df',
  background: '#fff',
  cursor: 'pointer',
  fontSize: '12px',
  transition: 'all .2s ease-in-out',
  '&:first-child': {
    borderRadius: '4px 0 0 4px',
  },
  '&:last-child': {
    borderRightWidth: '1px',
    borderRadius: '0 4px 4px 0',
  },
  _hover: {
    background: '#edf8fc',
  },
  '&.collectBtnActive': {
    background: '#54b5df',
    color: '#fff',
  },
  _disabled: {
    borderColor: '#e8e3e3',
    color: '#9f9b9b',
    cursor: 'default',
    background: '#fff',
  },
});

const editForm = css({
  marginTop: '10px',
  borderTop: '1px solid #e8e3e3',
  paddingTop: '10px',
});

const formRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  margin: '0 0 8px',
  fontSize: '13px',
});

const formLabel = css({
  flex: 'none',
  color: '#9f9b9b',
  paddingTop: '2px',
});

const typeOptions = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

const typeOption = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
});

const rateStars = css({
  display: 'flex',
  gap: '2px',
});

/* 对齐原站 star_2x.png sprite：灰 #CFCFCF / 亮 #F06321 / hover #FCAE55 */
const rateStar = css({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: '15px',
  color: '#cfcfcf',
  padding: '0',
  lineHeight: '1',
  transition: 'color .2s ease-in-out',
  _hover: { color: '#fcae55' },
});

const rateStarFilled = css({
  color: '#f06321',
});

/* 原站 #rate-tip（span.alarm）红色评价文案 */
const rateTip = css({
  color: '#cc0000',
  fontSize: '12px',
});

const rateValue = css({
  color: '#9f9b9b',
  fontSize: '12px',
  paddingTop: '2px',
});

const commentInput = css({
  flex: '1',
  minWidth: '0',
  padding: '6px',
  border: '1px solid #e8e3e3',
  borderRadius: '3px',
  fontSize: '13px',
  resize: 'vertical',
});

const formActions = css({ textAlign: 'right' });

const ratingBlock = css({
  marginTop: '10px',
  borderTop: '1px solid #e8e3e3',
  paddingTop: '10px',
});

const ratingAnonymous = css({
  marginTop: '0',
  paddingTop: '0',
  borderTop: '0',
});

const ratingHeadline = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '6px',
});

const ratingInfo = css({ minWidth: '0' });

const rateEmo = css({
  display: 'flex',
  width: '30px',
  height: '30px',
  flex: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #f09199',
  color: '#f09199',
  fontSize: '9px',
  fontWeight: 'bold',
  lineHeight: '1',
});

const scoreLink = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '5px',
});

const score = css({
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#f09199',
  lineHeight: '1',
});

const ratingLabel = css({
  color: '#595555',
  fontSize: '13px',
});

const rankDesc = css({
  display: 'block',
  marginTop: '2px',
  fontSize: '10px',
  color: '#595555',
  '& strong': {
    marginLeft: '3px',
    color: '#1f1c1c',
  },
});

const votes = css({
  marginLeft: 'auto',
  flex: 'none',
  padding: '2px 5px',
  background: '#f3f1f1',
  fontSize: '12px',
  color: '#9f9b9b',
});

const chart = css({
  listStyle: 'none',
  margin: '10px 0 0',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
  gap: '3px',
  borderBottom: '1px solid #e8e3e3',
});

const chartItem = css({
  display: 'flex',
  minWidth: '0',
  flexDirection: 'column',
  alignItems: 'center',
});

const chartBarArea = css({
  display: 'flex',
  width: '100%',
  height: '62px',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

const chartBar = css({
  /* 对齐原站 horizontalChart .count：柱子撑满格子 */
  width: '100%',
  minHeight: '1px',
  background: '#9f9b9b',
  borderRadius: '2px 2px 0 0',
});

const chartLabel = css({
  fontSize: '10px',
  lineHeight: '16px',
  color: '#9f9b9b',
});

const progressBlock = css({
  marginTop: '10px',
  paddingTop: '10px',
  borderTop: '1px solid #e8e3e3',
});

const progressTitle = css({
  margin: '0 0 6px',
  color: '#595555',
  fontSize: '13px',
  fontWeight: 'normal',
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
  color: '#9f9b9b',
  fontSize: '12px',
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
  padding: '3px 12px',
  border: '1px solid #54b5df',
  borderRadius: '3px',
  background: '#fff',
  color: '#54b5df',
  cursor: 'pointer',
  fontSize: '12px',
  _hover: { background: '#54b5df', color: '#fff' },
  _disabled: {
    borderColor: '#e8e3e3',
    background: '#fff',
    color: '#9f9b9b',
    cursor: 'default',
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

/** 原站「我的评价」文案（1-10 分） */
const RATE_LABELS: Record<number, string> = {
  1: '不忍直视',
  2: '很差',
  3: '差',
  4: '较差',
  5: '不过不失',
  6: '还行',
  7: '推荐',
  8: '力荐',
  9: '神作',
  10: '超神作',
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '操作失败，请稍后再试';
}

function getProgressPercent(total: number, recent: number): number {
  if (total <= 0) return 1;
  if (recent > total) return 50;
  const progress = Math.round((recent * 100) / total);
  return progress === 0 ? 1 : progress;
}

function totalText(total: number): string {
  return total === 0 ? '??' : String(total);
}

/** 可点击评分星星（1-10 分，每颗星 2 分） */
function ClickableRate({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <span className={rateStars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type='button'
          className={cx(rateStar, value >= i * 2 && rateStarFilled)}
          onClick={() => onChange(i * 2)}
          title={`${i * 2} 分`}
        >
          ★
        </button>
      ))}
    </span>
  );
}

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
      <form className={progressForm} onSubmit={(event) => void submit(event)}>
        {isBook && (
          <label className={progressLabel}>
            Chap.
            <input
              className={progressInput}
              type='number'
              min={0}
              value={epValue}
              onChange={(event) => setEpValue(event.target.value)}
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
              onChange={(event) => setVolValue(event.target.value)}
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
              onChange={(event) => setEpValue(event.target.value)}
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
    <section className={panel}>
      <h2 className={panelTitle}>收藏盒</h2>
      <div className={panelBody}>
        {user && interest == null && (
          <div className={collectButtons}>
            {COLLECT_OPTIONS.map((option) => (
              <button
                key={option.type}
                type='button'
                className={collectBtn}
                aria-pressed={false}
                disabled={sending}
                onClick={() => void updateType(option.type)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {user && interest != null ? (
          <div className={interestDetails}>
            <p className={interestNow}>
              我{COLLECT_DESC[interest.type]}这部作品
              {interest.private && <span className={privateTag}>[私密]</span>}
              <button
                type='button'
                className={modifyBtn}
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
              <p className={myRate}>
                我的评价
                <span className={rateTip}>{RATE_LABELS[interest.rate]}</span>
                <ClickableRate value={interest.rate} onChange={() => undefined} />
              </p>
            )}
            {!editing && interest.comment != null && interest.comment !== '' && (
              <p className={myComment}>{interest.comment}</p>
            )}
            {!editing &&
              interest.type !== CollectionType.Wish &&
              PROGRESS_MANAGE_TYPES.includes(subject.type) && (
                <ProgressManager subject={subject} interest={interest} mutate={mutate} />
              )}
          </div>
        ) : null}

        {user && editing && (
          <div className={editForm}>
            <div className={formRow}>
              <span className={formLabel}>收藏状态</span>
              <div className={typeOptions}>
                {COLLECT_OPTIONS.map((option) => (
                  <label key={option.type} className={typeOption}>
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
            <div className={formRow}>
              <span className={formLabel}>评分</span>
              <ClickableRate value={rate} onChange={setRate} />
              {rate > 0 && <span className={rateValue}>{rate} 分</span>}
            </div>
            <div className={formRow}>
              <span className={formLabel}>吐槽</span>
              <textarea
                className={commentInput}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder='说点什么...'
              />
            </div>
            <div className={formActions}>
              <Button type='primary' onClick={() => void submit()} disabled={sending} size='small'>
                保存
              </Button>
            </div>
          </div>
        )}

        <div className={cx(ratingBlock, !user && ratingAnonymous)}>
          <div className={ratingHeadline}>
            <span className={rateEmo} aria-hidden='true'>
              ≥▽≤
            </span>
            <div className={ratingInfo}>
              <Link to={getSubjectStatsLink(subject.id)} className={scoreLink}>
                <span className={score}>{rating.score.toFixed(1)}</span>
                <span className={ratingLabel}>{getRatingLabel(rating.score)}</span>
              </Link>
              <Link to={getSubjectStatsLink(subject.id)} className={rankDesc}>
                Bangumi {RATING_CATEGORY[subject.type]} Ranked:{' '}
                <strong>{rating.rank === 0 ? '--' : `#${rating.rank}`}</strong>
              </Link>
            </div>
            <div className={votes}>{rating.total} votes</div>
          </div>
          <ul className={chart} aria-label='评分分布'>
            {ratingCounts.map(({ count, score }) => (
              <li key={score} className={chartItem} title={`${score}分: ${count}人`}>
                <span className={chartBarArea}>
                  <span
                    className={chartBar}
                    style={{ height: `${Math.round((count / maxRateCount) * 100)}%` }}
                  />
                </span>
                <span className={chartLabel}>{score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CollectionPanel;
