import type { ReactNode } from 'react';
import React from 'react';

import type { SlimUser } from '@bangumi/client/client.ts';
import { Rate, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages.ts';

const { Link } = Typography;

const panel = css({ margin: '0 0 15px' });

const panelTitle = css({
  margin: '0',
  padding: '5px 0',
  borderBottom: '1px solid #e8e3e3',
  color: '#595555',
  fontSize: '15px',
  fontWeight: '300',
});

const list = css({
  margin: '0 5px 5px',
  padding: '0',
  listStyle: 'none',
});

const item = css({
  display: 'flex',
  gap: '10px',
  padding: '5px 5px 5px 0',
  borderTop: '1px solid #fff',
  borderBottom: '1px solid #e0e0e0',
  '&:first-child': { borderTop: '0 none' },
});

/** 32px 圆形头像，对齐旧版 avatarSize32 */
const avatar = css({
  flex: '0 0 32px',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  overflow: 'hidden',
  '& img': { width: '100%', height: '100%', objectFit: 'cover' },
});

const body = css({ flex: '1 1 auto', minWidth: '0' });

const userName = css({
  color: '#1f1c1c',
  fontSize: '13px',
  _hover: { color: '#1f1c1c', textDecoration: 'underline' },
});

const status = css({
  color: '#9f9b9b',
  fontSize: '10px',
});

/** 底部提示行（人数统计/更多链接），对齐旧版 tip_i */
const tips = css({
  margin: '0 5px',
  color: '#ccc',
  fontSize: '12px',
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
    <div className={panel}>
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
                <img src={user.avatar.large} alt={user.nickname} />
              </Link>
              <div className={body}>
                <Link to={getUserProfileLink(user.username)} noStyle className={userName}>
                  {user.nickname}
                </Link>
                {rate != null && rate > 0 && <Rate value={rate} />}
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
              / <Link to={moreLink}>{moreLabel}</Link>
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
