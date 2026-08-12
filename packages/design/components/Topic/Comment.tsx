import type { FC } from 'react';
import React, { memo, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { Reply, ReplyBase, SlimUser } from '@bangumi/client/topic';
import { State } from '@bangumi/client/topic';
import { OriginalPoster, TopicClosed, TopicReopen, TopicSilent } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

import Avatar from '../../components/Avatar';
import RichContent from '../../components/RichContent';
import Typography from '../../components/Typography';
import { toast } from '../Toast';
import CommentActions from './CommentActions';
import CommentInfo from './CommentInfo';
import Reactions from './Reactions';
import ReplyForm from './ReplyForm';
import type { TopicApi } from './topic-api';
import { groupTopicApi } from './topic-api';

// 昵称/签名/内容可能包含长文本或 URL，允许换行避免移动端水平溢出；
// tip 是 flex 容器，内部 flex 项默认 min-width: auto 不收缩，需显式允许收缩；
// comment-info 里的操作按钮行在窄屏换行
const commentTip = css({
  overflowWrap: 'anywhere',
  '& .creator-info, & .comment-info': {
    minWidth: '0',
  },
  '& .comment-info': {
    flexWrap: 'wrap',
  },
});

// overflow-wrap 需要在块级容器上生效，这里覆盖评论主体；
// main 是 flex column + align-items flex-start，子项宽度按内容撑开，
// 需要限制 max-width 才会在窄屏换行
const commentBody = css({
  overflowWrap: 'anywhere',
  minWidth: '0',
  '& > *': {
    maxWidth: '100%',
  },
});

// bgm-comment__* 字符串类样式，从原 Comment.less 迁移，通过 header 后代选择器承载
const commentHeader = css({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '15px 15px 10px',
  borderBottom: '1px dotted #e8e3e3',
  '&.bgm-comment__header--main-post': {
    padding: '10px 5px',
    borderBottom: 'none',
    '& .bgm-comment__box': { marginLeft: '12px' },
  },
  '&.bgm-comment__header--reply': {
    marginLeft: '70px',
    '& .bgm-comment__box': { marginLeft: '13px' },
  },
  '&.bgm-comment__header--collapsed': {
    paddingTop: '12px',
    minHeight: '22px',
    '& .bgm-comment__content': { marginTop: '0' },
  },
  '&.bgm-comment__header--highlighted': {
    border: '2px solid #369cf8',
    borderRadius: '5px',
  },
  '@media (max-width: 640px)': {
    padding: '10px 5px',
    '& .bgm-comment__box': { marginLeft: '10px' },
    '&.bgm-comment__header--main-post': {
      '& .bgm-comment__box': { marginLeft: '12px' },
    },
    '&.bgm-comment__header--reply': {
      marginLeft: '55px',
      '& .bgm-comment__box': { marginLeft: '13px' },
    },
  },
  '& .bgm-comment__box': {
    marginLeft: '15px',
    flex: '1',
    // this trick is same to EditorForm
    minWidth: '0',
  },
  '& .bgm-comment__main': {
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  '& .bgm-comment__tip': {
    fontSize: '16px',
    lineHeight: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#9f9b9b',
    width: '100%',
    '& .creator-info': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& .bgm-link, & svg': { paddingRight: '12px' },
    },
    '& .comment-info': {
      display: 'flex',
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  '& .bgm-comment__post-actions': {
    marginTop: '8px',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#9f9b9b',
  },
  '& .bgm-comment__opinions': {
    marginTop: '12px',
  },
  '& .bgm-comment__content': {
    color: '#1f1c1c',
    lineHeight: '26px',
    marginTop: '12px',
  },
  '& .bgm-comment__content--deleted': {
    color: '#595555',
  },
});

export type CommentProps = ((ReplyBase & { isReply: true }) | (Reply & { isReply: false })) & {
  topicId: number;
  floor: string | number;
  originalPosterId: number;
  onCommentUpdate: () => Promise<unknown>;
  user?: Pick<SlimUser, 'id'>;
  /** 是否为主题帖（第一楼） */
  isMainPost?: boolean;
  /** 主题帖的回复总数，用于在主题帖底部展示回复数 */
  replyCount?: number;
  /** 话题操作实现，默认小组话题 */
  api?: TopicApi;
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
          <Link to='/about/guideline'>社区指导原则</Link>
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
  isMainPost = false,
  replyCount,
  api = groupTopicApi,
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

  const headerClassName = cx(
    'bgm-comment__header',
    commentHeader,
    isReply && 'bgm-comment__header--reply',
    isMainPost && 'bgm-comment__header--main-post',
    collapsed && 'bgm-comment__header--collapsed',
    isHighlighted && 'bgm-comment__header--highlighted',
  );

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
        <span className={cx('bgm-comment__tip', commentTip)}>
          <div className='creator-info'>
            <SpecialStateIcon state={state} />
            <Link to={url}>{creator?.nickname ?? ''}</Link>
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
      const response = await api.deletePost(props.id);
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
          src={isReply ? (creator?.avatar.medium ?? '') : (creator?.avatar.large ?? '')}
          size={isReply ? 'xsmall' : isMainPost ? 'post' : 'small'}
        />
        <div className={cx('bgm-comment__box', commentBody)}>
          <div className={cx('bgm-comment__main', commentBody)}>
            <span className={cx('bgm-comment__tip', commentTip)}>
              <div className='creator-info'>
                <Link to={url}>{creator?.nickname ?? ''}</Link>
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
                      reactions={props.reactions}
                      user={user}
                      onReacted={onCommentUpdate}
                      api={api}
                    />
                  </>
                )}
              </div>
            </span>
            <RenderContent state={state} content={content} />
            {!isDeleted && (
              <Reactions
                reactions={props.reactions}
                postId={props.id}
                user={user}
                onReacted={onCommentUpdate}
                api={api}
              />
            )}
            {isMainPost && replyCount != null && (
              <div className='bgm-comment__post-actions'>
                <span className='bgm-comment__post-reply-count'>{`${replyCount} 回复`}</span>
              </div>
            )}
          </div>
          {showReplyEditor && (
            <div className='bgm-comment__opinions'>
              <ReplyForm
                autoFocus
                topicId={topicId}
                replyTo={props.id}
                api={api}
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
