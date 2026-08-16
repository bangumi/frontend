import type { ReactNode } from 'react';
import React from 'react';

import type { SlimUser } from '@bangumi/client/client';
import { Avatar, Rate, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

const { Link } = Typography;

const panelTitle = css({
  margin: '0',
  paddingTop: '1',
  paddingBottom: '1',
  borderBottomWidth: '1px',
  borderBottomColor: 'border.subtle',
  color: 'text.primary',
  textStyle: 'titleSm',
  fontWeight: 'normal',
});

const list = css({
  marginRight: '1',
  marginBottom: '1',
  marginLeft: '1',
  padding: '0',
  listStyle: 'none',
  '& > li:not(:last-child)': {
    borderBottom: 'component.list.divider',
  },
});

const item = css({
  display: 'flex',
  gap: '3',
  paddingTop: '1',
  paddingRight: '1',
  paddingBottom: '1',
});

/** 收藏用户头像链接；媒体本体由共享 Avatar 组件维护。 */
const avatar = css({
  flex: '0 0 32px',
  display: 'block',
  borderRadius: 'sm',
  '& .bgm-avatar': {
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: 'fast',
    transitionTimingFunction: 'standard',
  },
  _hover: {
    '& .bgm-avatar': {
      borderColor: 'media.frame.borderHover',
      boxShadow: 'media.frame.hover',
    },
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
  _active: {
    '& .bgm-avatar': {
      boxShadow: 'none',
    },
  },
});

const body = css({ flex: '1 1 auto', minWidth: '0' });

const userSummary = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'layout.inline',
  maxWidth: '100%',
});

const userName = css({
  textStyle: 'bodySm',
});

const status = css({
  color: 'text.tertiary',
  textStyle: 'meta',
});

/** 底部提示行（人数统计/更多链接），对齐旧版 tip_i */
const tips = css({
  marginRight: '1',
  marginLeft: '1',
  color: 'text.tertiary',
  textStyle: 'meta',
});

export interface CollectSidePanelItem {
  user: SlimUser;
  /** 评分 0-10，>0 时显示星星 */
  rate?: number;
  /** 收藏状态，如「1小时前看过」或收藏日期 */
  status?: ReactNode;
}

export interface CollectSidePanelProps {
  title: string;
  items: CollectSidePanelItem[];
  /** 「更多」链接，如全部收藏会员 */
  moreLink?: string;
  moreLabel?: string;
  /** 底部统计内容，如各类型收藏人数 */
  stats?: ReactNode;
  /** 列表 aria-label */
  listLabel?: string;
}

/** 左栏「谁收藏了xxx?」面板，条目与人物页面共用 */
const CollectSidePanel: React.FC<CollectSidePanelProps> = ({
  title,
  items,
  moreLink,
  moreLabel = '全部收藏',
  stats,
  listLabel = '收藏用户列表',
}) => {
  return (
    <div>
      <h2 className={panelTitle}>{title}</h2>
      {items.length > 0 && (
        <ul className={list} aria-label={listLabel}>
          {items.map(({ user, rate, status: itemStatus }) => (
            <li key={user.id} className={item}>
              <Link
                to={getUserProfileLink(user.username)}
                noStyle
                className={avatar}
                title={user.nickname}
              >
                <Avatar src={user.avatar.large} size='xsmall' alt={user.nickname} />
              </Link>
              <div className={body}>
                <div className={userSummary}>
                  <Link
                    variant='subtle'
                    to={getUserProfileLink(user.username)}
                    className={userName}
                  >
                    {user.nickname}
                  </Link>
                  {rate != null && rate > 0 && <Rate value={rate} />}
                </div>
                {itemStatus != null && (
                  <>
                    <br />
                    <small className={status}>{itemStatus}</small>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {(moreLink != null || stats != null) && (
        <span className={tips}>
          {moreLink != null && (
            <>
              {' '}
              /{' '}
              <Link variant='subtle' to={moreLink}>
                {moreLabel}
              </Link>
            </>
          )}
          {stats != null && (
            <>
              {' '}
              / <span>{stats}</span>
            </>
          )}
        </span>
      )}
    </div>
  );
};

export default CollectSidePanel;
