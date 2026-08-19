import React from 'react';

import type { SlimIndex } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getIndexLink, getUserProfileLink } from '@bangumi/utils/pages';

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

/** 目录作者头像链接；媒体本体由共享 Avatar 组件维护。 */
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

const indexTitle = css({
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textStyle: 'label',
});

// 对齐旧版 `<a>标题</a><br /><small>by ...</small>`：by 作者始终换行显示
const indexBy = css({
  display: 'block',
  color: 'text.tertiary',
  textStyle: 'meta',
});

/** 底部提示行（更多目录等），对齐旧版 tip_i */
const tips = css({
  marginRight: '1',
  marginLeft: '1',
  color: 'text.tertiary',
  textStyle: 'meta',
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
    <div>
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
                <Avatar src={index.user.avatar.large} size='xsmall' alt={index.user.nickname} />
              </Link>
            )}
            <div className={body}>
              <Link to={getIndexLink(index.id)} className={indexTitle} title={index.title}>
                {index.title}
              </Link>
              {index.user != null && (
                <small className={indexBy}>
                  by{' '}
                  <Link variant='subtle' to={getUserProfileLink(index.user.username)}>
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
        /{' '}
        <Link variant='subtle' to={moreLink}>
          更多目录
        </Link>
        {extraLink != null && (
          <>
            {' '}
            /{' '}
            <Link variant='subtle' to={extraLink.to}>
              {extraLink.label}
            </Link>
          </>
        )}
      </span>
    </div>
  );
};

export default IndexSidePanel;
