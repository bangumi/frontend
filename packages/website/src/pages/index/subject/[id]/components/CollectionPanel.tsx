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
  padding: '0',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.subtle',
  borderRadius: 'md',
  background: 'bg.raised',
  boxShadow: 'surface.panel.shadow',
  textStyle: 'meta',
  overflowWrap: 'break-word',
});

const panelTitle = css({
  minHeight: 'control.sm',
  margin: '0',
  paddingRight: '3',
  paddingLeft: '3',
  border: '0',
  background: 'bg.subtle',
  color: 'text.primary',
  textStyle: 'label',
  display: 'flex',
  alignItems: 'center',
});

const panelBody = css({ padding: '3' });

const interestDetails = css({
  marginBottom: '3',
});

const interestNow = css({
  textStyle: 'bodySm',
  marginBottom: '1',
});

const privateTag = css({ marginLeft: '2', color: 'text.tertiary' });

const interestTime = css({
  marginBottom: '2',
  color: 'text.tertiary',
  textStyle: 'meta',
});

const modifyBtn = css({
  border: 'none',
  background: 'none',
  color: 'link',
  cursor: 'pointer',
  textStyle: 'meta',
  marginLeft: '2',
  padding: '0',
  _disabled: {
    color: 'text.disabled',
    cursor: 'default',
  },
});

const myRate = css({
  textStyle: 'meta',
  color: 'text.secondary',
  marginBottom: '1',
  display: 'flex',
  alignItems: 'center',
  gap: '2',
});

const myComment = css({
  textStyle: 'bodySm',
  marginTop: '1',
  color: 'text.primary',
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
  paddingRight: '1',
  paddingLeft: '1',
  borderWidth: '1px',
  borderColor: 'link',
  borderRightWidth: '0',
  color: 'link',
  background: 'bg.raised',
  cursor: 'pointer',
  textStyle: 'meta',
  '&:first-child': {
    borderRadius: '4px 0 0 4px',
  },
  '&:last-child': {
    borderRightWidth: '1px',
    borderRadius: '0 4px 4px 0',
  },
  _hover: {
    background: 'accent.subtle',
  },
  '&.collectBtnActive': {
    background: 'accent',
    color: 'accent.fg',
  },
  _disabled: {
    borderColor: 'border.subtle',
    color: 'text.disabled',
    cursor: 'default',
    background: 'bg.raised',
  },
});

const editForm = css({
  marginTop: '10px',
  borderTopWidth: '1px',
  borderTopColor: 'border.subtle',
  paddingTop: '3',
});

const formRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2',
  marginBottom: '2',
  textStyle: 'bodySm',
});

const formLabel = css({
  flex: 'none',
  color: 'text.secondary',
  paddingTop: '1',
});

const typeOptions = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3',
});

const typeOption = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
});

const rateStars = css({
  display: 'flex',
  gap: '1',
});

const rateStar = css({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: 'titleSm',
  color: 'border.subtle',
  padding: '0',
  lineHeight: '1',
});

const rateStarFilled = css({
  color: 'accent',
});

const rateValue = css({
  color: 'text.tertiary',
  textStyle: 'meta',
  paddingTop: '1',
});

const commentInput = css({
  flex: '1',
  minWidth: '0',
  padding: '2',
  borderWidth: '1px',
  borderColor: 'border.default',
  borderRadius: 'sm',
  textStyle: 'bodySm',
  resize: 'vertical',
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
});

const formActions = css({ textAlign: 'right' });

const ratingBlock = css({
  borderTopWidth: '1px',
  borderTopColor: 'border.subtle',
});

const ratingWithInterest = css({
  marginTop: '3',
  paddingTop: '3',
});

const ratingHeadline = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
});

const ratingInfo = css({ minWidth: '0' });

const rateEmo = css({
  display: 'flex',
  width: '30px',
  height: '30px',
  flex: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'accent',
  color: 'accent',
  textStyle: 'meta',
  fontWeight: 'bold',
  lineHeight: '1',
});

const scoreLink = css({
  display: 'block',
  _hover: {
    '& > :last-child, & > :last-child *': {
      color: 'link.hover',
    },
  },
});

const scoreLine = css({
  display: 'flex',
  alignItems: 'bottom',
  gap: '1',
});

const score = css({
  fontSize: 'title',
  fontWeight: 'title',
  color: 'accent',
  lineHeight: '1',
});

const ratingLabel = css({
  color: 'text.primary',
  textStyle: 'bodySm',
});

const rankDesc = css({
  display: 'block',
  textStyle: 'meta',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  '& strong': {
    color: 'text.primary',
  },
});

const votes = css({
  position: 'absolute',
  top: '0',
  right: '0',
  paddingTop: '1',
  paddingRight: '2',
  paddingBottom: '1',
  paddingLeft: '2',
  background: 'bg.muted',
  textStyle: 'meta',
  color: 'text.tertiary',
});

const chartWrapper = css({
  position: 'relative',
});

const chart = css({
  listStyle: 'none',
  marginTop: '3',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
  gap: '1',
  borderBottomWidth: '1px',
  borderBottomColor: 'border.subtle',
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
  height: '72px',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

const chartBar = css({
  width: 'min(100%, 13px)',
  minHeight: '1px',
  background: 'text.tertiary',
  borderRadius: '2px 2px 0 0',
});

const chartLabel = css({
  textStyle: 'meta',
  color: 'text.tertiary',
});

const progressBlock = css({
  marginTop: '3',
  paddingTop: '3',
  borderTopWidth: '1px',
  borderTopColor: 'border.subtle',
});

const progressTitle = css({
  marginBottom: '2',
  color: 'text.secondary',
  textStyle: 'bodySm',
  fontWeight: 'normal',
});

const progressBar = css({
  position: 'relative',
  height: '18px',
  overflow: 'hidden',
  borderWidth: '1px',
  borderColor: 'border.subtle',
  borderRadius: 'sm',
  background: 'bg.inset',
});

const progressInner = css({
  display: 'block',
  height: '100%',
  background: 'accent',
});

const progressText = css({
  position: 'absolute',
  top: '0',
  left: '2',
  color: 'accent.fg',
  textStyle: 'meta',
  lineHeight: '18px',
});

const progressForm = css({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '2',
  marginTop: '2',
  color: 'text.tertiary',
  textStyle: 'meta',
});

const progressLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
});

const progressInput = css({
  width: '48px',
  paddingTop: '1',
  paddingRight: '1',
  paddingBottom: '1',
  paddingLeft: '1',
  borderWidth: '1px',
  borderColor: 'border.default',
  borderRadius: 'sm',
  textStyle: 'meta',
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
});

const progressUpdate = css({
  paddingTop: '1',
  paddingRight: '3',
  paddingBottom: '1',
  paddingLeft: '3',
  borderWidth: '1px',
  borderColor: 'link',
  borderRadius: 'sm',
  background: 'bg.raised',
  color: 'link',
  cursor: 'pointer',
  textStyle: 'meta',
  _hover: { background: 'accent', color: 'accent.fg', borderColor: 'accent' },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
  _disabled: {
    borderColor: 'border.subtle',
    background: 'bg.raised',
    color: 'text.disabled',
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
                我的评价：
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

        <div className={cx(ratingBlock, user && ratingWithInterest)}>
          <div className={ratingHeadline}>
            <span className={rateEmo} aria-hidden='true'>
              ≥▽≤
            </span>
            <div className={ratingInfo}>
              <Link to={getSubjectStatsLink(subject.id)} className={scoreLink} variant='subtle'>
                <span className={scoreLine}>
                  <span className={score}>{rating.score.toFixed(1)}</span>
                  <span className={ratingLabel}>{getRatingLabel(rating.score)}</span>
                </span>
                <span className={rankDesc}>
                  Bangumi {RATING_CATEGORY[subject.type]} Ranked:{' '}
                  <strong>{rating.rank === 0 ? '--' : `#${rating.rank}`}</strong>
                </span>
              </Link>
            </div>
          </div>
          <div className={chartWrapper}>
            <div className={votes}>{rating.total} votes</div>
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
      </div>
    </section>
  );
};

export default CollectionPanel;
