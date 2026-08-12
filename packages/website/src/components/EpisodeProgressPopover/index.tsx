import dayjs from 'dayjs';
import React from 'react';

import type { Episode, UpdateEpisodeProgress } from '@bangumi/client/client';
import { EpisodeCollectionStatus, EpisodeType } from '@bangumi/client/client';
import { Popover, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import { getEpisodeLink } from '@bangumi/utils/pages';

const { Link } = Typography;

const wrapper = css({
  display: 'inline-block',
  verticalAlign: 'top',
});

const popover = css({
  verticalAlign: 'top',
  '& .bgm-popover__container': {
    alignItems: 'flex-start',
  },
  '& .bgm-popover__content': {
    top: '5px',
    left: '12px',
    width: 'min(275px, calc(100vw - 20px))',
    overflow: 'visible',
    border: '0',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(80, 80, 80, 0.5)',
    _before: {
      position: 'absolute',
      top: '0',
      left: '-10px',
      width: '0',
      height: '0',
      borderTop: '11px solid #f09199',
      borderBottom: '11px solid transparent',
      borderLeft: '0',
      borderRight: '11px solid transparent',
      content: '""',
    },
    _after: {
      position: 'absolute',
      top: '-5px',
      left: '-12px',
      width: '36px',
      height: '5px',
      content: '""',
    },
  },
  _focusWithin: {
    '& .bgm-popover__content': { visibility: 'visible', opacity: '1' },
  },
  '@media (max-width: 640px)': {
    '& .bgm-popover__content': {
      position: 'fixed',
      top: '35vh',
      right: '5vw',
      left: '5vw',
      width: 'auto',
      _before: { display: 'none' },
      _after: { display: 'none' },
    },
  },
});

// touch 打开/关闭需要胜过 .popover 的 :focus-within 规则，用 &[class] 提升优先级
const open = css({
  '&[class] .bgm-popover__content': { visibility: 'visible', opacity: '1' },
});

const opensLeftStyle = css({
  '&[class] .bgm-popover__content': {
    right: '12px',
    left: 'auto',
    _before: {
      right: '-10px',
      left: 'auto',
      borderRight: '0',
      borderLeft: '11px solid transparent',
    },
    _after: {
      right: '-12px',
      left: 'auto',
    },
  },
});

const dismissedStyle = css({
  '&[class] .bgm-popover__content': { visibility: 'hidden', opacity: '0' },
});

const content = css({
  width: '100%',
  borderRadius: '5px',
  background: 'rgba(254, 254, 254, 0.96)',
  color: '#1f1c1c',
  fontSize: '12px',
  lineHeight: '1.5',
  '@media (max-width: 640px)': {
    width: 'auto',
  },
});

const popoverTitle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 10px',
  borderRadius: '5px 5px 0 0',
  background: '#f09199',
  color: '#fff',
  fontSize: '13px',
  lineHeight: '18px',
  '& span': {
    minWidth: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& button': {
    flex: 'none',
    marginLeft: 'auto',
    padding: '0',
    border: '0',
    background: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    font: 'inherit',
    lineHeight: 'inherit',
  },
});

const body = css({
  padding: '5px 10px 7px',
  '& p': { margin: '0' },
  '& hr': {
    height: '1px',
    margin: '5px 0',
    border: '0',
    background: '#e8e3e3',
  },
});

const actions = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  minHeight: '31px',
  margin: '0 0 5px',
  borderRadius: '5px',
  background: '#f5f5f5',
  '& button': {
    padding: '5px 10px',
    border: '0',
    borderRadius: '5px',
    background: 'transparent',
    color: '#54b5df',
    cursor: 'pointer',
    font: 'inherit',
    lineHeight: '21px',
    '&:hover, &:focus-visible': {
      background: '#f09199',
      color: '#fff',
      outline: 'none',
    },
    '&:disabled': {
      cursor: 'wait',
      opacity: '0.55',
    },
  },
});

const currentStatus = css({
  alignSelf: 'stretch',
  marginLeft: 'auto',
  padding: '5px 10px',
  borderRadius: '5px',
  background: '#f09199',
  color: '#fff',
  lineHeight: '21px',
});

const footer = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '8px',
});

// 双类选择器原用于胜过 .bgm-link 的默认颜色，用 &[class] 保持同等优先级
const discussionLink = css({
  '&[class]': {
    color: '#54b5df',
    textDecoration: 'none',
    '&:hover, &:focus-visible': {
      textDecoration: 'none',
    },
    '& small': {
      color: '#9f9b9b',
    },
  },
});

const updatedAtStyle = css({
  overflow: 'hidden',
  color: '#9f9b9b',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const EPISODE_STATUS_TEXT: Record<EpisodeCollectionStatus, string> = {
  [EpisodeCollectionStatus.None]: '没看过',
  [EpisodeCollectionStatus.Wish]: '想看',
  [EpisodeCollectionStatus.Done]: '看过',
  [EpisodeCollectionStatus.Dropped]: '抛弃',
};

export interface EpisodeProgressTriggerProps {
  'data-episode-progress-trigger': true;
  onClick: React.MouseEventHandler;
  onPointerCancel: React.PointerEventHandler;
  onPointerDown: React.PointerEventHandler;
}

interface EpisodeProgressPopoverProps {
  episode: Episode;
  canManage?: boolean;
  submitting: boolean;
  onUpdate: (body: UpdateEpisodeProgress) => void;
  children: (triggerProps: EpisodeProgressTriggerProps) => React.ReactNode;
}

function EpisodeProgressContent({
  episode,
  canManage,
  submitting,
  onUpdate,
  onClose,
}: Omit<EpisodeProgressPopoverProps, 'children'> & { onClose: () => void }) {
  const title = `ep.${episode.sort} ${episode.name || episode.nameCN}`;
  const status = episode.collection?.status;
  const updatedAt = episode.collection?.updatedAt;
  const updatedAtText = updatedAt ? dayjs.unix(updatedAt).format('YYYY-M-D HH:mm') : undefined;

  return (
    <div className={content} data-ep-id={episode.id} role='dialog' aria-label={title}>
      <div className={popoverTitle}>
        <span>{title}</span>
        <button type='button' onClick={onClose} aria-label='关闭章节信息'>
          X
        </button>
      </div>
      <div className={body}>
        {canManage && (
          <div className={actions}>
            {status !== EpisodeCollectionStatus.Done && (
              <>
                <button
                  type='button'
                  disabled={submitting}
                  onClick={() => onUpdate({ type: EpisodeCollectionStatus.Done })}
                >
                  看过
                </button>
                {episode.type === EpisodeType.Normal && (
                  <button
                    type='button'
                    disabled={submitting}
                    onClick={() => onUpdate({ batch: true })}
                  >
                    看到
                  </button>
                )}
              </>
            )}
            {status !== EpisodeCollectionStatus.Wish && (
              <button
                type='button'
                disabled={submitting}
                onClick={() => onUpdate({ type: EpisodeCollectionStatus.Wish })}
              >
                想看
              </button>
            )}
            {status !== EpisodeCollectionStatus.Dropped && (
              <button
                type='button'
                disabled={submitting}
                onClick={() => onUpdate({ type: EpisodeCollectionStatus.Dropped })}
              >
                抛弃
              </button>
            )}
            {episode.collection && (
              <button
                type='button'
                disabled={submitting}
                onClick={() => onUpdate({ type: EpisodeCollectionStatus.None })}
              >
                撤消
              </button>
            )}
            {status !== undefined && (
              <span className={currentStatus} title={updatedAtText}>
                {EPISODE_STATUS_TEXT[status]}
              </span>
            )}
          </div>
        )}
        {episode.nameCN && (
          <p>
            <span>中文标题:</span> {episode.nameCN}
          </p>
        )}
        {episode.airdate && (
          <p>
            <span>首播:</span> {episode.airdate}
          </p>
        )}
        {episode.duration && (
          <p>
            <span>时长:</span> {episode.duration}
          </p>
        )}
        <hr />
        <div className={footer}>
          <Link to={getEpisodeLink(episode.id)} className={discussionLink}>
            讨论 <small>(+{episode.comment})</small>
          </Link>
          {canManage && updatedAtText && status !== undefined && (
            <span className={updatedAtStyle}>
              {EPISODE_STATUS_TEXT[status]}: {updatedAtText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EpisodeProgressPopover({
  episode,
  canManage = true,
  submitting,
  onUpdate,
  children,
}: EpisodeProgressPopoverProps) {
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const touchInteractionRef = React.useRef(false);
  const [opensLeft, setOpensLeft] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [touchOpen, setTouchOpen] = React.useState(false);

  const alignPopover = () => {
    const wrapper = wrapperRef.current;
    const content = wrapper?.querySelector<HTMLElement>('.bgm-popover__content');
    const trigger = wrapper?.querySelector<HTMLElement>('[data-episode-progress-trigger]');
    if (!content || !trigger) {
      return;
    }

    const triggerBounds = trigger.getBoundingClientRect();
    const contentWidth = content.getBoundingClientRect().width;
    const roomOnRight = window.innerWidth - triggerBounds.right;
    const roomOnLeft = triggerBounds.left;
    setOpensLeft(roomOnRight < contentWidth && roomOnLeft > roomOnRight);
  };

  const triggerProps: EpisodeProgressTriggerProps = {
    'data-episode-progress-trigger': true,
    onPointerDown: (event) => {
      touchInteractionRef.current = event.pointerType !== 'mouse';
      if (touchInteractionRef.current) {
        alignPopover();
      }
    },
    onPointerCancel: () => {
      touchInteractionRef.current = false;
    },
    onClick: (event) => {
      if (touchInteractionRef.current) {
        event.preventDefault();
        setDismissed(false);
        setTouchOpen(true);
        touchInteractionRef.current = false;
      }
    },
  };

  return (
    <span
      ref={wrapperRef}
      className={wrapper}
      onMouseEnter={alignPopover}
      onMouseLeave={() => setDismissed(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setTouchOpen(false);
        }
      }}
    >
      <Popover
        className={cx(
          popover,
          opensLeft && opensLeftStyle,
          touchOpen && open,
          dismissed && dismissedStyle,
        )}
        content={
          <EpisodeProgressContent
            episode={episode}
            canManage={canManage}
            submitting={submitting}
            onUpdate={onUpdate}
            onClose={() => {
              setDismissed(true);
              setTouchOpen(false);
            }}
          />
        }
      >
        {children(triggerProps)}
      </Popover>
    </span>
  );
}
