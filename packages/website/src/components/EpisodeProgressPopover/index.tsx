import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

import type { Episode, UpdateEpisodeProgress } from '@bangumi/client/client';
import { EpisodeCollectionStatus, EpisodeType } from '@bangumi/client/client';
import { Popover, Typography } from '@bangumi/design';
import { getEpisodeLink } from '@bangumi/utils/pages';

import styles from './style.module.less';

const { Link } = Typography;

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
    <div className={styles.content} data-ep-id={episode.id} role='dialog' aria-label={title}>
      <div className={styles.title}>
        <span>{title}</span>
        <button type='button' onClick={onClose} aria-label='关闭章节信息'>
          X
        </button>
      </div>
      <div className={styles.body}>
        {canManage && (
          <div className={styles.actions}>
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
              <span className={styles.currentStatus} title={updatedAtText}>
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
        <div className={styles.footer}>
          <Link to={getEpisodeLink(episode.id)} className={styles.discussionLink}>
            讨论 <small>(+{episode.comment})</small>
          </Link>
          {canManage && updatedAtText && status !== undefined && (
            <span className={styles.updatedAt}>
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
      className={styles.wrapper}
      onMouseEnter={alignPopover}
      onMouseLeave={() => setDismissed(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setTouchOpen(false);
        }
      }}
    >
      <Popover
        className={classNames(
          styles.popover,
          opensLeft && styles.opensLeft,
          touchOpen && styles.open,
          dismissed && styles.dismissed,
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
