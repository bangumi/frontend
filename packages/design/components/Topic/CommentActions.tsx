import React from 'react';

import type { Reaction, SlimUser } from '@bangumi/client/topic';
import { Comment as CommentIcon, More } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';

import Button from '../../components/Button';
import Popover from '../Popover';
import { ReactionMenu } from './Reactions';
import type { TopicApi } from './topic-api';
import { groupTopicApi } from './topic-api';

const commentActions = css({
  display: 'flex',
  gap: '12px',
  '& .bgm-button': {
    height: '20px',
    fontWeight: '400',
    '&.bgm-comment-actions__more:hover': { color: '#595555' },
  },
});

const commentActionsPopover = css({
  borderRadius: '17px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  padding: '10px',
  '& .bgm-button': {
    fontSize: '14px',
    height: '22px',
    borderRadius: '11px',
    width: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#595555',
    cursor: 'pointer',
    _hover: { backgroundColor: '#f5f5f5' },
  },
});

export interface CommentActionsProps {
  id: number;
  onReply?: () => void;
  onDelete?: () => void;
  isAuthor?: boolean;
  editable?: boolean;
  showText?: boolean;
  reactions?: Reaction[];
  user?: Pick<SlimUser, 'id'>;
  onReacted?: () => Promise<unknown>;
  /** 话题操作实现，默认小组话题 */
  api?: TopicApi;
}

const CommentActions = ({
  id,
  onReply,
  onDelete,
  isAuthor = false,
  editable = true,
  showText = false,
  reactions,
  user,
  onReacted,
  api = groupTopicApi,
}: CommentActionsProps) => {
  return (
    <div className={cx('bgm-comment-actions', commentActions)}>
      <Button type='plain' size='small' onClick={onReply} title='回复'>
        <CommentIcon />
        {showText && '回复'}
      </Button>
      {user && onReacted && (
        <Popover
          content={
            <ReactionMenu
              reactions={reactions}
              postId={id}
              user={user}
              onReacted={onReacted}
              api={api}
            />
          }
        >
          <Button type='plain' size='small' title='贴贴'>
            贴贴
          </Button>
        </Popover>
      )}
      <Popover
        content={
          <div className={cx('bgm-comment-actions__popover', commentActionsPopover)}>
            {isAuthor && (
              <>
                {editable && (
                  <Button.Link type='text' size='small' to={api.replyEditPath(id)}>
                    编辑
                  </Button.Link>
                )}
                <Button type='text' size='small' onClick={onDelete}>
                  删除
                </Button>
              </>
            )}
            {/* TODO: 实现绝交和报告疑虑功能 */}
            <Button type='text'>绝交</Button>
            <Button type='text'>报告疑虑</Button>
          </div>
        }
      >
        <Button type='plain' size='small' className='bgm-comment-actions__more' title='其他'>
          <More />
          {showText && '其他'}
        </Button>
      </Popover>
    </div>
  );
};

export default CommentActions;
