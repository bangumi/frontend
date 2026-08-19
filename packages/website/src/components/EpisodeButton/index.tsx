import dayjs from 'dayjs';
import React from 'react';

import type { Episode, UpdateEpisodeProgress } from '@bangumi/client/client';
import { EpisodeCollectionStatus } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import { getEpisodeLink } from '@bangumi/utils/pages';

import EpisodeProgressPopover from '../EpisodeProgressPopover';

const { Link } = Typography;

const epBtn = css({
  display: 'inline-block',
  minWidth: '24px',
  height: '24px',
  boxSizing: 'border-box',
  padding: '0 4px',
  textAlign: 'center',
  border: '1px solid #e8e3e3',
  borderRadius: '3px',
  fontSize: '12px',
  lineHeight: '22px',
  color: '#1f1c1c',
  textDecoration: 'none',
  /* 与原站 ul.prg_list a 一致的过渡节奏 */
  transition: 'background-color .1s linear, border-color .1s linear, box-shadow .1s linear',
  _hover: { textDecoration: 'none' },
  _focusVisible: { textDecoration: 'none' },
  '@media (max-width: 640px)': {
    minWidth: '22px',
    padding: '1px 3px',
    fontSize: '11px',
  },
});

// noStyle：章节按钮不依赖 .bgm-link 的全局链接色（如首页容器统一 #0084b4），
// 也避免非分层 less 覆盖 Panda layer 的优先级问题

/** 已放送且未收藏：浅蓝底蓝字，对齐 PHP epBtnAir（hover 顶部 2px 内阴影） */
const epAired = css({
  borderColor: '#00a8ff',
  background: '#daeaff',
  color: '#0066cc',
  _hover: { color: '#333', boxShadow: 'inset 0 2px 0 #00a8ff' },
});

/** 看过：深蓝实心白字，对齐 PHP epBtnWatched */
const epDone = css({
  background: '#4897ff',
  borderColor: '#4897ff',
  color: '#fff',
  _hover: { color: '#efefef', boxShadow: 'inset 0 2px 0 #1175a8' },
});

/** 想看：粉色底粉字，对齐 PHP epBtnQueue */
const epQueue = css({
  borderColor: '#ff2293',
  background: '#ffadd1',
  color: '#ff2293',
  _hover: { color: '#333', boxShadow: 'inset 0 2px 0 #ff2293' },
});

/** 抛弃：灰底白字 + 删除线，对齐 PHP epBtnDrop */
const epDrop = css({
  background: '#ccc',
  borderColor: '#666',
  color: '#fff',
  textDecoration: 'line-through',
  _hover: { color: '#666', boxShadow: 'inset 0 2px 0 #999' },
});

/** 未放送：浅灰底灰字，对齐 PHP epBtnNA */
const epUpcoming = css({
  borderColor: '#b6b6b6',
  background: '#e0e0e0',
  color: '#909090',
  _hover: { color: '#666', boxShadow: 'inset 0 2px 0 #999' },
});

const EPISODE_STATUS_KEYS: Record<EpisodeCollectionStatus, string> = {
  [EpisodeCollectionStatus.None]: 'none',
  [EpisodeCollectionStatus.Wish]: 'wish',
  [EpisodeCollectionStatus.Done]: 'done',
  [EpisodeCollectionStatus.Dropped]: 'dropped',
};

export interface EpisodeButtonProps {
  episode: Episode;
  canManage?: boolean;
  submitting: boolean;
  onUpdate: (body: UpdateEpisodeProgress) => void;
}

/**
 * 章节按钮：条目页与首页进度管理器共用。
 * 收藏状态优先于放送时间决定样式（对齐 PHP subject_box_prg / home_prg_item_eps），
 * 点击跳转章节页，浮层内可修改进度。
 */
const EpisodeButton: React.FC<EpisodeButtonProps> = ({
  episode,
  canManage = true,
  submitting,
  onUpdate,
}) => {
  const status = episode.collection?.status;
  const upcoming =
    episode.airdate !== '' &&
    dayjs(episode.airdate).isValid() &&
    dayjs(episode.airdate).isAfter(dayjs(), 'day');
  const statusClass =
    status === EpisodeCollectionStatus.Done
      ? epDone
      : status === EpisodeCollectionStatus.Dropped
        ? epDrop
        : status === EpisodeCollectionStatus.Wish
          ? epQueue
          : upcoming
            ? epUpcoming
            : epAired;

  return (
    <EpisodeProgressPopover
      episode={episode}
      canManage={canManage}
      submitting={submitting}
      onUpdate={onUpdate}
    >
      {(triggerProps) => (
        <Link
          {...triggerProps}
          to={getEpisodeLink(episode.id)}
          noStyle
          className={cx(epBtn, statusClass)}
          title={`ep.${episode.sort} ${episode.name || episode.nameCN}`}
          data-episode-status={status === undefined ? 'none' : EPISODE_STATUS_KEYS[status]}
        >
          {String(episode.sort).padStart(2, '0')}
        </Link>
      )}
    </EpisodeProgressPopover>
  );
};

export default EpisodeButton;
