import type { FC } from 'react';
import React, { useCallback, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Reaction, SlimUser } from '@bangumi/client/topic';
import { css, cx } from '@bangumi/styled-system/css';
import { ALLOWED_REACTIONS, getReactionEmojiUrl } from '@bangumi/utils';

export interface ReactionsProps {
  reactions?: Reaction[];
  postId: number;
  user?: Pick<SlimUser, 'id'>;
  /** 点赞/取消点赞成功后的回调，用于刷新数据 */
  onReacted: () => Promise<unknown>;
}

const container = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '5px',
  marginTop: '8px',
});

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 8px 2px 5px',
  border: '1px solid #e8e3e3',
  borderRadius: '10px',
  background: '#fff',
  cursor: 'pointer',
  _hover: {
    borderColor: '#369cf8',
    backgroundColor: '#369cf8',
  },
  _disabled: {
    cursor: 'default',
  },
});

const itemSelected = css({
  borderColor: '#369cf8',
});

const emoji = css({
  width: '18px',
  height: '18px',
});

const count = css({
  fontSize: '12px',
  color: '#9f9b9b',
});

const menu = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  padding: '8px',
  width: '190px',
});

const menuItem = css({
  padding: '2px',
  border: 'none',
  borderRadius: '4px',
  background: 'transparent',
  cursor: 'pointer',
  _hover: {
    backgroundColor: '#e8e3e3',
  },
});

const menuItemSelected = css({
  backgroundColor: '#facdd0',
});

const menuEmoji = css({
  width: '24px',
  height: '24px',
});

function useReactionToggle(
  postId: number,
  user: ReactionsProps['user'],
  onReacted: ReactionsProps['onReacted'],
) {
  const [pending, setPending] = useState<number | null>(null);

  const isSelected = useCallback(
    (reactions: Reaction[], value: number) =>
      user != null &&
      reactions.some(
        (reaction) => reaction.value === value && reaction.users.some((u) => u.id === user.id),
      ),
    [user],
  );

  const toggle = useCallback(
    async (reactions: Reaction[], value: number) => {
      if (!user || pending !== null) {
        return;
      }
      setPending(value);
      try {
        const response = isSelected(reactions, value)
          ? await ozaClient.unlikeGroupPost(postId)
          : await ozaClient.likeGroupPost(postId, { value });
        if (response.status === 200) {
          await onReacted();
        }
      } finally {
        setPending(null);
      }
    },
    [user, pending, postId, isSelected, onReacted],
  );

  return { pending, isSelected, toggle };
}

/** 评论内容下方的 reactions 列表，点击切换点赞状态 */
const Reactions: FC<ReactionsProps> = ({ reactions = [], postId, user, onReacted }) => {
  const { pending, isSelected, toggle } = useReactionToggle(postId, user, onReacted);

  if (reactions.length === 0) {
    return null;
  }

  return (
    <div className={container}>
      {reactions.map((reaction) => {
        const countValue = reaction.users.length;
        const selected = isSelected(reactions, reaction.value);
        return (
          <button
            key={reaction.value}
            type='button'
            data-reaction-value={reaction.value}
            data-reaction-selected={selected || undefined}
            className={cx(item, selected && itemSelected)}
            title={reaction.users.map((item) => item.nickname).join('、')}
            disabled={!user || pending !== null}
            onClick={() => {
              void toggle(reactions, reaction.value);
            }}
          >
            <img src={getReactionEmojiUrl(reaction.value)} alt='' className={emoji} />
            <span className={count}>{countValue}</span>
          </button>
        );
      })}
    </div>
  );
};

/** 反应选择菜单，供操作区"贴贴"按钮使用 */
export const ReactionMenu: FC<ReactionsProps> = ({ reactions = [], postId, user, onReacted }) => {
  const { pending, isSelected, toggle } = useReactionToggle(postId, user, onReacted);

  return (
    <div className={menu}>
      {ALLOWED_REACTIONS.map((value) => (
        <button
          key={value}
          type='button'
          className={cx(menuItem, isSelected(reactions, value) && menuItemSelected)}
          disabled={pending !== null}
          onClick={() => {
            void toggle(reactions, value);
          }}
        >
          <img src={getReactionEmojiUrl(value)} alt='' className={menuEmoji} />
        </button>
      ))}
    </div>
  );
};

export default Reactions;
