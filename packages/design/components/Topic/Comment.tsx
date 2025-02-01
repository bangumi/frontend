import classNames from 'classnames';
import type { FC } from 'react';
import React, { memo, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import type { Reply, ReplyBase, SlimUser } from '@bangumi/client/topic';
import { State } from '@bangumi/client/topic';
import { OriginalPoster, TopicClosed, TopicReopen, TopicSilent } from '@bangumi/icons';
import { getUserProfileLink } from '@bangumi/utils/pages';

import Avatar from '../../components/Avatar';
import RichContent from '../../components/RichContent';
import Typography from '../../components/Typography';
import { toast } from '../Toast';
import CommentActions from './CommentActions';
import CommentInfo from './CommentInfo';
import ReplyForm from './ReplyForm';

export type CommentProps = ((ReplyBase & { isReply: true }) | (Reply & { isReply: false })) & {
  topicId: number;
  floor: string | number;
  originalPosterId: number;
  onCommentUpdate: () => Promise<unknown>;
  user?: SlimUser;
};

const Link = Typography.Link;

const RenderContent = memo(({ state, content }: { state: State; content: string }) => {
  switch (state) {
    case State.Normal:
      return <RichContent bbcode={content} classname='bgm-comment__content' />;
    case State.Closed:
      return <div className='bgm-comment__content'>关闭了该主题</div>;
    case State.Reopen:
      return <div className='bgm-comment__content'>重新开启了该主题</div>;
    case State.Silent:
      return <div className='bgm-comment__content'>下沉了该主题</div>;
    case State.DeletedByUser:
      return <div className='bgm-comment__content--deleted'>内容已被用户删除</div>;
    case State.DeletedByAdmin:
      return (
        <div className='bgm-comment__content--deleted'>
          内容因违反「
          <Link to='https://bgm.tv/about/guideline' isExternal>
            社区指导原则
          </Link>
          」已被删除
        </div>
      );
    default:
      return null;
  }
});

const SpecialStateIcon = memo(({ state }: { state: State }) => {
  switch (state) {
    case State.Normal:
      return null;
    case State.Closed:
      return <TopicClosed />;
    case State.Reopen:
      return <TopicReopen />;
    case State.Silent:
      return <TopicSilent />;
  }
  return null;
});

const Comment: FC<CommentProps> = ({
  content,
  creator,
  createdAt,
  floor,
  originalPosterId,
  state,
  user,
  topicId,
  onCommentUpdate,
  ...props
}) => {
  const isReply = props.isReply;
  const isDeleted = [State.DeletedByUser, State.DeletedByAdmin].includes(state);
  // 1 关闭 2 重开 5 下沉
  const isSpecial = [State.Closed, State.Reopen, State.Silent].includes(state);
  const replies = !isReply ? props.replies : null;
  const shouldCollapse = isSpecial || (isReply && (/[+-]\d+$/.test(content) || isDeleted));
  const [collapsed, setCollapsed] = useState(shouldCollapse);

  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const elementId = `post_${props.id}`;
  const location = useLocation();
  const highlightId = location.hash.slice(1);
  const isHighlighted = highlightId === elementId;

  const headerClassName = classNames('bgm-comment__header', {
    'bgm-comment__header--reply': isReply,
    'bgm-comment__header--collapsed': collapsed,
    'bgm-comment__header--highlighted': isHighlighted,
  });

  const url = creator ? getUserProfileLink(creator.username) : '';

  const navigate = useNavigate();

  const startReply = useCallback(() => {
    setShowReplyEditor(true);
    setReplyContent(isReply ? `[quote]${content.slice(0, 30)}[/quote]\n` : '');
  }, [isReply, content]);

  if (collapsed) {
    return (
      <div
        className={headerClassName}
        onClick={
          isSpecial
            ? undefined
            : () => {
                setCollapsed(false);
              }
        }
        id={elementId}
      >
        <span className='bgm-comment__tip'>
          <div className='creator-info'>
            <SpecialStateIcon state={state} />
            <Link to={url} isExternal>
              {creator?.nickname ?? ''}
            </Link>
            <RenderContent state={state} content={content} />
          </div>
          <CommentInfo createdAt={createdAt} floor={floor} isSpecial={isSpecial} />
        </span>
      </div>
    );
  }

  const handleReplySuccess = async (id: number) => {
    // 先隐藏回复框避免scrollIntoView后布局变化
    setShowReplyEditor(false);
    navigate(`#post_${id}`);
    // 刷新回复列表
    await onCommentUpdate();
  };

  const handleDeleteReply = async () => {
    if (confirm('确认删除这条回复？')) {
      const response = await ozaClient.deleteGroupPost(props.id);
      if (response.status === 200) {
        onCommentUpdate();
      } else {
        // TODO: 统一错误处理方式
        console.error(response);
        toast(response.data.message);
      }
    }
  };

  return (
    <div>
      <div className={headerClassName} id={`post_${props.id}`}>
        <Avatar
          src={isReply ? creator?.avatar.medium ?? '' : creator?.avatar.large ?? ''}
          size={isReply ? 'small' : 'medium'}
        />
        <div className='bgm-comment__box'>
          <div className='bgm-comment__main'>
            <span className='bgm-comment__tip'>
              <div className='creator-info'>
                <Link to={url} isExternal>
                  {creator?.nickname ?? ''}
                </Link>
                {originalPosterId === creator?.id ? <OriginalPoster /> : null}
                {!isReply && creator?.sign ? <span>{`(${creator.sign})`}</span> : null}
              </div>
              <div className='comment-info'>
                <CommentInfo createdAt={createdAt} floor={floor} id={props.id} />
                {user && !isDeleted && (
                  <>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <CommentActions
                      id={props.id}
                      onReply={startReply}
                      onDelete={handleDeleteReply}
                      isAuthor={user?.id === creator?.id}
                      editable={!replies?.length}
                    />
                  </>
                )}
              </div>
            </span>
            <RenderContent state={state} content={content} />
          </div>
          {showReplyEditor && (
            <div className='bgm-comment__opinions'>
              <ReplyForm
                autoFocus
                topicId={topicId}
                replyTo={props.id}
                placeholder={`回复 @${creator?.nickname ?? ''}：`}
                content={replyContent}
                onChange={setReplyContent}
                onCancel={() => {
                  setShowReplyEditor(false);
                }}
                onSuccess={handleReplySuccess}
              />
            </div>
          )}
        </div>
      </div>
      {replies?.map((reply, idx) => (
        <Comment
          topicId={topicId}
          key={reply.id}
          isReply
          onCommentUpdate={onCommentUpdate}
          floor={`${floor}-${idx + 1}`}
          originalPosterId={originalPosterId}
          user={user}
          {...reply}
        />
      ))}
    </div>
  );
};

export default memo(Comment);
