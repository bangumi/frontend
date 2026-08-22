import { ok } from '@oazapfts/runtime';
import React from 'react';
import useSWR from 'swr';

import type { Index, SlimIndex } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';
import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getIndexLink, getUserProfileLink } from '@bangumi/utils/pages.ts';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

const { Link } = Typography;

const sideCard = css({
  background: '#fff',
  borderRadius: '15px',
  border: '1px solid #e8e3e3',
  padding: '12px 15px',
  marginBottom: '10px',
});

const sideCardTitle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 0 8px',
  fontSize: '13px',
  fontWeight: '400',
  lineHeight: '18px',
  color: '#595555',
});

const more = css({
  fontSize: '12px',
});

const commentList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const commentItem = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '6px',
  padding: '4px 0',
  fontSize: '13px',
  lineHeight: '18px',
  borderTop: '1px dotted #e8e3e3',
  '&:first-child': { borderTop: 'none' },
  '& a': { color: '#123' },
});

const commentContent = css({
  flex: '1 1 auto',
  minWidth: '0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: '#595555',
});

const otherList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const otherItem = css({
  padding: '5px 0',
  borderTop: '1px dotted #e8e3e3',
  '&:first-child': { borderTop: 'none' },
  '& a': { color: '#123', fontSize: '13px', lineHeight: '18px' },
});

const menuInner = css({
  padding: '12px 15px',
  fontSize: '13px',
  lineHeight: '22px',
  '& a': { color: '#123' },
});

const sidebar = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minWidth: '0',
});

/** 目录详情侧栏：最新留言/其他目录/频道链接（对齐旧站 index_view 右栏） */
const IndexSidebar: React.FC<{
  index: Index;
  indexId: number;
  /** 主内容区已是完整评论列表时隐藏留言区块（评论页） */
  hideComments?: boolean;
}> = ({ index, indexId, hideComments = false }) => {
  const { user } = useUser();
  const username = index.user?.username;

  const { data: commentsData } = useSWR(`/index/${indexId}/comments`, async () =>
    ok(ozaClient.getIndexComments(indexId)),
  );
  const { data: otherIndexesData } = useSWR(
    username ? `index-other-indexes ${username}` : null,
    async () => ok(ozaClient.getUserIndexes(username!, { limit: 10 })),
  );

  const mainComments = commentsData ?? [];
  const otherIndexes: SlimIndex[] = (otherIndexesData?.data ?? []).filter(
    (item) => item.id !== index.id,
  );

  return (
    <div className={sidebar}>
      {!hideComments &&
        (mainComments.length > 0 ? (
          <div className={sideCard}>
            <h2 className={sideCardTitle}>
              <span>最新留言</span>
              <Link to={`/index/${indexId}/comments`} className={more}>
                ...more
              </Link>
            </h2>
            <ul className={commentList}>
              {mainComments.slice(0, 3).map((comment) => (
                <li key={comment.id} className={commentItem}>
                  {comment.user && (
                    <Link to={getUserProfileLink(comment.user.username)}>
                      {comment.user.nickname}:
                    </Link>
                  )}
                  <span className={commentContent}>{comment.content}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          user && (
            <div className={menuInner}>
              <Link to={`/index/${indexId}/comments`}>/ 给这个目录留言</Link>
            </div>
          )
        ))}

      {otherIndexes.length > 0 && (
        <div className={sideCard}>
          <h2 className={sideCardTitle}>{index.user?.nickname}编纂的其他目录</h2>
          <ul className={otherList}>
            {otherIndexes.map((item) => (
              <li key={item.id} className={otherItem}>
                <Link to={getIndexLink(item.id)}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={menuInner}>
        <Link to='/index'>/ 返回目录频道</Link>
        <br />
        {user && <Link to='/index/create'>/ 创建一个新目录</Link>}
      </div>
    </div>
  );
};

export default IndexSidebar;
