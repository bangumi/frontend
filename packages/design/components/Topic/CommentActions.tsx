import React from 'react';

import { Comment as CommentIcon, More } from '@bangumi/icons';

import Button from '../../components/Button';
import Popover from '../Popover';

export interface CommentActionsProps {
  id: number;
  onReply?: () => void;
  onDelete?: () => void;
  isAuthor?: boolean;
  editable?: boolean;
  showText?: boolean;
}

const CommentActions = ({
  id,
  onReply,
  onDelete,
  isAuthor = false,
  editable = true,
  showText = false,
}: CommentActionsProps) => {
  return (
    <div className='bgm-comment-actions'>
      <Button type='plain' size='small' onClick={onReply} title='回复'>
        <CommentIcon />
        {showText && '回复'}
      </Button>
      {/* TODO: 实现贴贴功能 */}
      <Popover
        content={
          <div className='bgm-comment-actions__popover'>
            {isAuthor && (
              <>
                {editable && (
                  <Button.Link type='text' size='small' to={`/group/reply/${id}/edit`}>
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
