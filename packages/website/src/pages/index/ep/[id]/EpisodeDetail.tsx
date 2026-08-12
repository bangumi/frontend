import { DateTime } from 'luxon';
import React, { useMemo, useState } from 'react';

import type { Episode, Reaction } from '@bangumi/client/client';
import { EpisodeType } from '@bangumi/client/client';
import { Avatar, RichContent, Typography } from '@bangumi/design';
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

const page = css({
  maxWidth: '1040px',
  padding: '10px 30px 32px',
  '@media (max-width: 640px)': {
    padding: '8px 10px 24px',
  },
});

const headerInner = css({
  paddingRight: '30px',
  paddingLeft: '30px',
  '@media (max-width: 640px)': {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
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
  padding: '6px 5px 22px',
  borderBottom: '1px solid #e8e3e3',
  '& h1': {
    margin: '0',
    color: '#1f1c1c',
    fontSize: '22px',
    fontWeight: '400',
    lineHeight: '1.4',
    overflowWrap: 'anywhere',
    '& > span': {
      color: '#f09199',
      fontSize: '16px',
      fontWeight: '600',
    },
  },
  '@media (max-width: 640px)': {
    paddingRight: '2px',
    paddingLeft: '2px',
    '& h1': {
      fontSize: '19px',
    },
  },
});

const episodeNameCN = css({
  margin: '3px 0 0',
  color: '#9f9b9b',
  fontSize: '14px',
});

const editLink = css({
  display: 'inline-block',
  marginTop: '8px',
  fontSize: '13px',
});

const episodeMeta = css({
  display: 'flex',
  margin: '14px 0 0',
  color: '#9f9b9b',
  fontSize: '12px',
  gap: '18px',
});

const description = css({
  margin: '12px 0 0',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.75',
  whiteSpace: 'pre-line',
});

const emptyDescription = css({
  margin: '12px 0 0',
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

const reactionsBar = css({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '7px',
  gap: '5px',
  '& > span': {
    color: '#9f9b9b',
    fontSize: '11px',
  },
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

function ReactionSummary({ reactions }: { reactions?: Reaction[] }) {
  if (!reactions?.length) {
    return null;
  }

  return (
    <span className={reactionsBar}>
      {reactions.map((reaction) => (
        <span key={reaction.value} title={reaction.users.map((user) => user.nickname).join('、')}>
          {reaction.value} · {reaction.users.length}
        </span>
      ))}
    </span>
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
}: {
  comment: EpisodeComment | EpisodeReply;
  floor: string;
  isReply?: boolean;
}) {
  const user = comment.user;
  return (
    <article className={isReply ? replyItem : commentItem} id={`post_${comment.id}`}>
      <Link to={user ? getUserProfileLink(user.username) : ''} noStyle className={avatarLink}>
        <Avatar src={user?.avatar.medium ?? ''} size={isReply ? 'small' : 'medium'} alt='' />
      </Link>
      <div className={commentBody}>
        <header className={commentHeader}>
          <div className={commentAuthor}>
            {user ? (
              <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
            ) : (
              '匿名用户'
            )}
            {!isReply && user?.sign && <span>{user.sign}</span>}
          </div>
          <a className={commentTime} href={`#post_${comment.id}`}>
            #{floor} · {DateTime.fromSeconds(comment.createdAt).toFormat('yyyy-M-d HH:mm')}
          </a>
        </header>
        <CommentContent content={comment.content} state={comment.state} />
        <ReactionSummary reactions={comment.reactions} />
      </div>
    </article>
  );
}

function CommentThread({ comment, floor }: { comment: EpisodeComment; floor: number }) {
  return (
    <li>
      <CommentItem comment={comment} floor={String(floor)} />
      {comment.replies.length > 0 && (
        <ol className={replyList}>
          {comment.replies.map((reply, index) => (
            <li key={reply.id}>
              <CommentItem comment={reply} floor={`${floor}-${index + 1}`} isReply />
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

function Comments({ comments, total }: { comments: EpisodePageData['comments']; total: number }) {
  const [ascending, setAscending] = useState(true);
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
      {sortedComments.length > 0 ? (
        <ol className={commentList}>
          {sortedComments.map((comment, index) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              floor={ascending ? index + 1 : comments.length - index}
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

export default function EpisodeDetail({ data }: { data: EpisodePageData }) {
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
              <h1>
                <span>{episodeLabel(episode)}</span> {episode.name}
              </h1>
              {user?.permissions?.subjectWikiEdit && (
                <Link to={`/ep/${episode.id}/edit`} className={editLink}>
                  编辑章节
                </Link>
              )}
              {episode.nameCN && <p className={episodeNameCN}>{episode.nameCN}</p>}
              <p className={episodeMeta}>
                {episode.duration && <span>时长 {episode.duration}</span>}
                {episode.airdate && <span>首播 {episode.airdate}</span>}
              </p>
              {episode.desc ? (
                <p className={description}>{episode.desc}</p>
              ) : (
                <p className={emptyDescription}>暂无章节简介</p>
              )}
            </section>
            <Comments comments={data.comments} total={episode.comment} />
          </div>
          <EpisodeSidebar episode={episode} episodes={data.episodes} />
        </div>
      </PageContainer>
    </>
  );
}
