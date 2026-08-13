import { DateTime } from 'luxon';
import React, { useMemo, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Episode } from '@bangumi/client/client';
import { EpisodeType } from '@bangumi/client/client';
import { Avatar, Button, EditorForm, RichContent, toast, Typography } from '@bangumi/design';
import Reactions from '@bangumi/design/components/Topic/Reactions';
import ReplyForm from '@bangumi/design/components/Topic/ReplyForm';
import { ArrowDown } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';
import {
  getEpisodeLink,
  getSubjectBoardLink,
  getSubjectCharactersLink,
  getSubjectCommentsLink,
  getSubjectEpisodesLink,
  getSubjectLink,
  getSubjectPersonsLink,
  getSubjectRelationsLink,
  getSubjectReviewsLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import type { EpisodePageData } from '@bangumi/website/hooks/use-episode-page';
import { useUser } from '@bangumi/website/hooks/use-user';

import { epCommentApi } from './ep-comment-api';

const page = css({
  padding: '10px 15px 24px',
});

const headerInner = css({
  paddingRight: '15px',
  paddingLeft: '15px',
});

const subjectTitle = css({
  margin: '15px 0',
  color: '#1f1c1c',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  '& a': {
    color: 'inherit',
    fontWeight: 'inherit',
    _hover: { color: '#54b5df' },
  },
  '& small': {
    marginLeft: '8px',
    color: '#9f9b9b',
    fontSize: '12px',
    fontWeight: 'normal',
  },
  '@media (max-width: 640px)': {
    margin: '12px 0',
    fontSize: '18px',
    '& small': {
      display: 'block',
      margin: '2px 0 0',
    },
  },
});

const tabsBar = css({
  borderTop: '1px solid #fefefe',
  borderBottom: '1px solid #e8e3e3',
  background: '#fbfbfb',
});

const tabsInner = css({
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@media (max-width: 640px)': {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
});

const tabList = css({
  display: 'flex',
  width: 'max-content',
  minWidth: '100%',
  margin: '0',
  padding: '0',
  gap: '5px',
  listStyle: 'none',
});

const tabLink = css({
  display: 'block',
  padding: '10px 10px 9px',
  borderBottom: '2px solid transparent',
  color: '#9f9b9b',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  _hover: {
    borderBottomColor: '#54b5df',
    color: '#54b5df',
    textDecoration: 'none',
  },
});

const tabLinkActive = css({
  borderBottomColor: '#f09199',
  color: '#f09199',
  _hover: {
    borderBottomColor: '#54b5df',
    color: '#54b5df',
    textDecoration: 'none',
  },
});

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 280px',
  alignItems: 'start',
  gap: '28px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: '18px',
  },
});

const mainColumn = css({ minWidth: '0' });

const sidebar = css({
  minWidth: '0',
  '@media (max-width: 768px)': {
    borderTop: '1px solid #e8e3e3',
  },
});

const episodeInfo = css({
  padding: '6px 5px 18px',
  borderBottom: '1px solid #e8e3e3',
  '@media (max-width: 640px)': {
    paddingRight: '2px',
    paddingLeft: '2px',
  },
});

const episodeTitle = css({
  margin: '0',
  color: '#595555',
  fontSize: '22px',
  fontWeight: '400',
  lineHeight: '1.4',
  overflowWrap: 'anywhere',
  '@media (max-width: 640px)': {
    fontSize: '19px',
  },
});

const episodeLabelStyle = css({
  color: '#f09199',
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

const episodeNameCN = css({
  margin: '2px 0 0',
  color: '#9f9b9b',
  fontSize: '14px',
});

const editLinks = css({
  marginLeft: '8px',
  fontSize: '13px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
});

const episodeMeta = css({
  margin: '10px 0 0',
  color: '#9f9b9b',
  fontSize: '12px',
});

const description = css({
  margin: '8px 0 0',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.75',
  whiteSpace: 'pre-line',
});

const emptyDescription = css({
  margin: '8px 0 0',
  color: '#9f9b9b',
  fontSize: '14px',
  lineHeight: '1.75',
  whiteSpace: 'pre-line',
});

const commentsSection = css({ marginTop: '18px' });

const sectionHeader = css({
  display: 'flex',
  minHeight: '34px',
  alignItems: 'center',
  borderBottom: '1px solid #e8e3e3',
  '& h2': {
    margin: '0',
    color: '#595555',
    fontSize: '18px',
    fontWeight: '300',
  },
});

const commentCount = css({
  marginLeft: '7px',
  color: '#9f9b9b',
  fontSize: '12px',
});

const sortButton = css({
  display: 'grid',
  width: '28px',
  height: '28px',
  placeItems: 'center',
  marginLeft: 'auto',
  padding: '0',
  border: '0',
  background: 'transparent',
  color: '#9f9b9b',
  cursor: 'pointer',
  _hover: { color: '#54b5df' },
  '& svg': {
    width: '15px',
    height: '15px',
    transition: 'transform 0.15s ease',
  },
});

const sortButtonDescending = css({
  display: 'grid',
  width: '28px',
  height: '28px',
  placeItems: 'center',
  marginLeft: 'auto',
  padding: '0',
  border: '0',
  background: 'transparent',
  color: '#9f9b9b',
  cursor: 'pointer',
  _hover: { color: '#54b5df' },
  '& svg': {
    width: '15px',
    height: '15px',
    transition: 'transform 0.15s ease',
    transform: 'rotate(180deg)',
  },
});

const commentList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const replyList = css({
  listStyle: 'none',
  margin: '0 0 0 72px',
  padding: '0',
  '@media (max-width: 640px)': {
    marginLeft: '28px',
  },
});

const commentItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '16px 4px 13px',
  borderBottom: '1px dashed #e8e3e3',
  '@media (max-width: 640px)': {
    gap: '8px',
  },
});

const replyItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px 4px 13px',
  borderBottom: '1px dashed #e8e3e3',
  '@media (max-width: 640px)': {
    gap: '8px',
  },
});

const avatarLink = css({ flex: '0 0 auto' });

const commentBody = css({
  minWidth: '0',
  flex: '1',
});

const commentHeader = css({
  display: 'flex',
  minHeight: '20px',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
  '@media (max-width: 640px)': {
    display: 'block',
  },
});

const commentAuthor = css({
  minWidth: '0',
  color: '#9f9b9b',
  fontSize: '13px',
  '& > span': {
    display: 'inline',
    marginLeft: '8px',
    color: '#9f9b9b',
    fontSize: '11px',
  },
  '@media (max-width: 640px)': {
    '& > span': {
      display: 'none',
    },
  },
});

const commentTime = css({
  flex: '0 0 auto',
  color: '#9f9b9b',
  fontSize: '10px',
  textDecoration: 'none',
  _hover: { color: '#54b5df' },
  '@media (max-width: 640px)': {
    display: 'block',
    marginTop: '2px',
  },
});

const commentContent = css({
  marginTop: '7px',
  color: '#1f1c1c',
  fontSize: '14px',
  lineHeight: '1.65',
  overflowWrap: 'anywhere',
  '& .quote': {
    fontSize: '13px',
  },
});

const deletedComment = css({
  margin: '8px 0 0',
  color: '#9f9b9b',
  fontSize: '13px',
  fontStyle: 'italic',
});

const commentActions = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginTop: '6px',
});

const replyFormBox = css({
  marginTop: '10px',
});

const topForm = css({
  marginBottom: '10px',
});

const emptyComments = css({
  margin: '0',
  padding: '24px 4px',
  color: '#9f9b9b',
  fontSize: '13px',
});

const { Link } = Typography;
const subjectCard = css({
  display: 'flex',
  minWidth: '0',
  gap: '10px',
  padding: '8px 0 14px',
  borderBottom: '1px solid #e8e3e3',
  '& > div': {
    display: 'flex',
    minWidth: '0',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  '& small': {
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    color: '#9f9b9b',
    fontSize: '11px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const coverLink = css({
  flex: '0 0 56px',
  width: '56px',
  height: '56px',
  overflow: 'hidden',
  borderRadius: '4px',
  background: '#e8e3e3',
});

const cover = css({
  display: 'block',
  width: '56px',
  height: '56px',
  objectFit: 'cover',
});

const subjectName = css({
  display: 'block',
  maxWidth: '100%',
  overflow: 'hidden',
  color: '#595555',
  fontSize: '13px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const returnLink = css({
  marginTop: 'auto',
  fontSize: '12px',
});

const episodePanel = css({ marginTop: '16px' });

const sideHeading = css({
  display: 'flex',
  minHeight: '30px',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #e8e3e3',
  '& h2': {
    margin: '0',
    color: '#595555',
    fontSize: '16px',
    fontWeight: '300',
  },
  '& a': {
    fontSize: '12px',
  },
});

const episodeList = css({
  listStyle: 'none',
  maxHeight: '520px',
  overflowY: 'auto',
  margin: '0',
  padding: '0',
  '& li': {
    borderBottom: '1px dotted #e8e3e3',
    '& a': {
      display: 'grid',
      gridTemplateColumns: '45px minmax(0, 1fr)',
      gap: '6px',
      padding: '6px 5px',
      color: '#595555',
      fontSize: '12px',
      textDecoration: 'none',
      _hover: {
        background: '#fafafa',
        color: '#54b5df',
      },
      '& span:last-child': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
  '@media (max-width: 768px)': {
    maxHeight: 'none',
  },
});

const currentEpisode = css({
  '& a': {
    background: '#fff6f7',
    color: '#f09199 !important',
    fontWeight: '600',
  },
});

const EPISODE_TYPE_PREFIXES: Record<EpisodeType, string> = {
  [EpisodeType.Normal]: 'EP',
  [EpisodeType.Special]: 'SP',
  [EpisodeType.Op]: 'OP',
  [EpisodeType.Ed]: 'ED',
  [EpisodeType.Pre]: 'Movie',
  [EpisodeType.Mad]: 'MAD',
  [EpisodeType.Other]: 'Other',
};

type EpisodeComment = EpisodePageData['comments'][number];
type EpisodeReply = EpisodeComment['replies'][number];

function episodeLabel(episode: Episode): string {
  return `${EPISODE_TYPE_PREFIXES[episode.type]}.${episode.sort}`;
}

function EpisodeHeader({ episode }: { episode: Episode }) {
  const subject = episode.subject;
  const subjectPath = getSubjectLink(episode.subjectID);
  const tabs = [
    { label: '概览', to: subjectPath },
    { label: '章节', to: getSubjectEpisodesLink(episode.subjectID) },
    { label: '角色', to: getSubjectCharactersLink(episode.subjectID) },
    { label: '制作人员', to: getSubjectPersonsLink(episode.subjectID) },
    { label: '关联', to: getSubjectRelationsLink(episode.subjectID) },
    { label: '吐槽', to: getSubjectCommentsLink(episode.subjectID) },
    { label: '评论', to: getSubjectReviewsLink(episode.subjectID) },
    { label: '讨论版', to: getSubjectBoardLink(episode.subjectID) },
  ];

  return (
    <header>
      <PageContainer gutterOnly className={headerInner}>
        <h1 className={subjectTitle}>
          <Link to={subjectPath}>{subject?.name ?? `条目 #${episode.subjectID}`}</Link>
          {subject?.nameCN && <small>{subject.nameCN}</small>}
        </h1>
      </PageContainer>
      <nav className={tabsBar} aria-label='条目导航'>
        <PageContainer gutterOnly className={tabsInner}>
          <ul className={tabList}>
            {tabs.map((tab) => (
              <li key={tab.label}>
                <Link className={cx(tabLink, tab.label === '章节' && tabLinkActive)} to={tab.to}>
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </PageContainer>
      </nav>
    </header>
  );
}

function CommentContent({ content, state }: { content: string; state: number }) {
  if (state === 6) {
    return <p className={deletedComment}>内容已被用户删除</p>;
  }
  if (state === 7) {
    return <p className={deletedComment}>内容因违反社区指导原则已被删除</p>;
  }
  return <RichContent bbcode={content} classname={commentContent} />;
}

function CommentItem({
  comment,
  floor,
  isReply = false,
  episodeID,
  mutate,
}: {
  comment: EpisodeComment | EpisodeReply;
  floor: string;
  isReply?: boolean;
  episodeID: number;
  mutate: () => Promise<unknown>;
}) {
  const { user } = useUser();
  const isAuthor = user?.id === comment.creatorID;
  const isDeleted = comment.state === 6 || comment.state === 7;
  const [showReply, setShowReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const author = comment.user;

  const handleDelete = async () => {
    if (confirm('确认删除这条吐槽？')) {
      const res = await ozaClient.deleteEpisodeComment(comment.id);
      if (res.status === 200) {
        await mutate();
      } else {
        toast(res.data.message);
      }
    }
  };

  const handleEdit = async () => {
    const res = await ozaClient.updateEpisodeComment(comment.id, { content: editContent });
    if (res.status === 200) {
      setEditing(false);
      await mutate();
    } else {
      toast(res.data.message);
    }
  };

  return (
    <article className={isReply ? replyItem : commentItem} id={`post_${comment.id}`}>
      <Link to={author ? getUserProfileLink(author.username) : ''} noStyle className={avatarLink}>
        <Avatar src={author?.avatar.medium ?? ''} size={isReply ? 'small' : 'medium'} alt='' />
      </Link>
      <div className={commentBody}>
        <header className={commentHeader}>
          <div className={commentAuthor}>
            {author ? (
              <Link to={getUserProfileLink(author.username)}>{author.nickname}</Link>
            ) : (
              '匿名用户'
            )}
            {!isReply && author?.sign && <span>{author.sign}</span>}
          </div>
          <a className={commentTime} href={`#post_${comment.id}`}>
            #{floor} · {DateTime.fromSeconds(comment.createdAt).toFormat('yyyy-M-d HH:mm')}
          </a>
        </header>
        {isDeleted || !editing ? (
          <CommentContent content={comment.content} state={comment.state} />
        ) : (
          <EditorForm
            hideCancel={false}
            value={editContent}
            onChange={setEditContent}
            onConfirm={handleEdit}
            onCancel={() => setEditing(false)}
          />
        )}
        {user && !isDeleted && !editing && (
          <div className={commentActions}>
            <Button type='plain' size='small' onClick={() => setShowReply((value) => !value)}>
              回复
            </Button>
            {isAuthor && (
              <Button
                type='plain'
                size='small'
                onClick={() => {
                  setEditContent(comment.content);
                  setEditing(true);
                }}
              >
                编辑
              </Button>
            )}
            {isAuthor && (
              <Button type='plain' size='small' onClick={handleDelete}>
                删除
              </Button>
            )}
          </div>
        )}
        <Reactions
          reactions={comment.reactions}
          postId={comment.id}
          user={user}
          onReacted={mutate}
          api={epCommentApi}
        />
        {showReply && (
          <div className={replyFormBox}>
            <ReplyForm
              autoFocus
              topicId={episodeID}
              replyTo={comment.id}
              api={epCommentApi}
              placeholder={`回复 @${author?.nickname ?? ''}：`}
              onSuccess={async () => {
                setShowReply(false);
                await mutate();
              }}
              onCancel={() => setShowReply(false)}
            />
          </div>
        )}
      </div>
    </article>
  );
}

function CommentThread({
  comment,
  floor,
  episodeID,
  mutate,
}: {
  comment: EpisodeComment;
  floor: number;
  episodeID: number;
  mutate: () => Promise<unknown>;
}) {
  return (
    <li>
      <CommentItem comment={comment} floor={String(floor)} episodeID={episodeID} mutate={mutate} />
      {comment.replies.length > 0 && (
        <ol className={replyList}>
          {comment.replies.map((reply, index) => (
            <li key={reply.id}>
              <CommentItem
                comment={reply}
                floor={`${floor}-${index + 1}`}
                isReply
                episodeID={episodeID}
                mutate={mutate}
              />
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

function Comments({
  comments,
  total,
  episodeID,
  mutate,
}: {
  comments: EpisodePageData['comments'];
  total: number;
  episodeID: number;
  mutate: () => Promise<unknown>;
}) {
  const [ascending, setAscending] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const { user } = useUser();
  const sortedComments = useMemo(
    () => (ascending ? comments : [...comments].reverse()),
    [ascending, comments],
  );

  return (
    <section className={commentsSection} aria-labelledby='comments-heading'>
      <div className={sectionHeader}>
        <h2 id='comments-heading'>吐槽箱</h2>
        <span className={commentCount}>{total}</span>
        <button
          type='button'
          className={ascending ? sortButton : sortButtonDescending}
          onClick={() => setAscending((value) => !value)}
          aria-label={ascending ? '较新吐槽优先' : '较早吐槽优先'}
          title={ascending ? '切换为较新优先' : '切换为较早优先'}
        >
          <ArrowDown />
        </button>
      </div>
      {user && (
        <div className={topForm}>
          <ReplyForm
            topicId={episodeID}
            api={epCommentApi}
            placeholder='用 [mask] 标签隐藏剧透内容'
            content={replyContent}
            onChange={setReplyContent}
            onSuccess={async () => {
              setReplyContent('');
              await mutate();
            }}
          />
        </div>
      )}
      {sortedComments.length > 0 ? (
        <ol className={commentList}>
          {sortedComments.map((comment, index) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              floor={ascending ? index + 1 : comments.length - index}
              episodeID={episodeID}
              mutate={mutate}
            />
          ))}
        </ol>
      ) : (
        <p className={emptyComments}>还没有吐槽</p>
      )}
    </section>
  );
}

function EpisodeSidebar({ episode, episodes }: { episode: Episode; episodes: Episode[] }) {
  const sortedEpisodes = [...episodes].sort((left, right) => left.sort - right.sort);
  const subjectImage = episode.subject?.images?.small;

  return (
    <aside className={sidebar}>
      <section className={subjectCard}>
        {subjectImage && (
          <Link to={getSubjectLink(episode.subjectID)} noStyle className={coverLink}>
            <img src={subjectImage} alt='' className={cover} />
          </Link>
        )}
        <div>
          <Link to={getSubjectLink(episode.subjectID)} className={subjectName}>
            {episode.subject?.nameCN || episode.subject?.name || `条目 #${episode.subjectID}`}
          </Link>
          {episode.subject?.nameCN && <small>{episode.subject.name}</small>}
          <Link to={getSubjectLink(episode.subjectID)} className={returnLink}>
            返回条目
          </Link>
        </div>
      </section>
      <section className={episodePanel} aria-labelledby='episode-list-heading'>
        <div className={sideHeading}>
          <h2 id='episode-list-heading'>章节</h2>
          <Link to={getSubjectEpisodesLink(episode.subjectID)}>全部</Link>
        </div>
        <ol className={episodeList}>
          {sortedEpisodes.map((item) => (
            <li key={item.id} className={item.id === episode.id ? currentEpisode : undefined}>
              <Link to={getEpisodeLink(item.id)} title={item.nameCN || item.name}>
                <span>{episodeLabel(item)}</span>
                <span>{item.nameCN || item.name || '未定'}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}

export default function EpisodeDetail({
  data,
  mutate,
}: {
  data: EpisodePageData;
  mutate: () => Promise<unknown>;
}) {
  const { episode } = data;
  const { user } = useUser();
  const title = `${episodeLabel(episode)} ${episode.nameCN || episode.name}`;

  return (
    <>
      <Helmet title={`${title} - ${episode.subject?.nameCN || episode.subject?.name || '章节'}`} />
      <EpisodeHeader episode={episode} />
      <PageContainer as='main' className={page}>
        <div className={columns}>
          <div className={mainColumn}>
            <section className={episodeInfo}>
              <h1 className={episodeTitle}>
                <span className={episodeLabelStyle}>{episodeLabel(episode)}</span> {episode.name}
                <small className={editLinks}>
                  {user?.permissions?.subjectWikiEdit && (
                    <Link to={`/ep/${episode.id}/edit`}>[修改]</Link>
                  )}
                  <Link
                    to={`https://patch.bgm38.tv/edit/episode/${episode.id}`}
                    isExternal
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    [提供修改建议]
                  </Link>
                </small>
              </h1>
              {episode.nameCN && <p className={episodeNameCN}>{episode.nameCN}</p>}
              <p className={episodeMeta}>
                {episode.duration && <>时长:{episode.duration}</>}
                {episode.duration && episode.airdate && ' / '}
                {episode.airdate && <>首播:{episode.airdate}</>}
              </p>
              {episode.desc ? (
                <p className={description}>{episode.desc}</p>
              ) : (
                <p className={emptyDescription}>暂无章节简介</p>
              )}
            </section>
            <Comments
              comments={data.comments}
              total={episode.comment}
              episodeID={episode.id}
              mutate={mutate}
            />
          </div>
          <EpisodeSidebar episode={episode} episodes={data.episodes} />
        </div>
      </PageContainer>
    </>
  );
}
