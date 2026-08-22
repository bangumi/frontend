import React from 'react';

import type { SlimIndex } from '@bangumi/client/client.ts';
import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getIndexLink, getUserProfileLink } from '@bangumi/utils/pages.ts';

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

const indexTitle = css({
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// 对齐旧版 `<a>标题</a><br /><small>by ...</small>`：by 作者始终换行显示
const indexBy = css({
  display: 'block',
  color: '#9f9b9b',
  fontSize: '10px',
  '& a': { color: '#9f9b9b' },
});

/** 底部提示行（更多目录等），对齐旧版 tip_i */
const tips = css({
  margin: '0 5px',
  color: '#ccc',
  fontSize: '12px',
});

export interface IndexSidePanelProps {
  indexes: SlimIndex[];
  moreLink: string;
  /** 额外的底部链接，如「收集至我的目录」 */
  extraLink?: { to: string; label: string };
}

/** 左栏「推荐本条目的目录」面板，条目与人物页面共用 */
const IndexSidePanel: React.FC<IndexSidePanelProps> = ({ indexes, moreLink, extraLink }) => {
  if (indexes.length === 0) {
    return null;
  }
  return (
    <div className={panel}>
      <h2 className={panelTitle}>推荐本条目的目录</h2>
      <ul className={list} aria-label='推荐本条目的目录列表'>
        {indexes.slice(0, 5).map((index) => (
          <li key={index.id} className={item}>
            {index.user != null && (
              <Link
                to={getUserProfileLink(index.user.username)}
                noStyle
                className={avatar}
                title={index.user.nickname}
              >
                <img src={index.user.avatar.large} alt={index.user.nickname} />
              </Link>
            )}
            <div className={body}>
              <Link to={getIndexLink(index.id)} className={indexTitle} title={index.title}>
                {index.title}
              </Link>
              {index.user != null && (
                <small className={indexBy}>
                  by{' '}
                  <Link to={getUserProfileLink(index.user.username)} noStyle>
                    {index.user.nickname}
                  </Link>
                </small>
              )}
            </div>
          </li>
        ))}
      </ul>
      <span className={tips}>
        {' '}
        / <Link to={moreLink}>更多目录</Link>
        {extraLink != null && (
          <>
            {' '}
            / <Link to={extraLink.to}>{extraLink.label}</Link>
          </>
        )}
      </span>
    </div>
  );
};

export default IndexSidePanel;
