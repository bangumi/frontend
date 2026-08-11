import { DateTime } from 'luxon';
import React, { useMemo, useState } from 'react';

import type { Episode, Reaction } from '@bangumi/client/client';
import { EpisodeType } from '@bangumi/client/client';
import { Avatar, RichContent, Typography } from '@bangumi/design';
import { ArrowDown } from '@bangumi/icons';
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

import styles from './style.module.less';

const { Link } = Typography;

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
    <header className={styles.header}>
      <PageContainer gutterOnly className={styles.headerInner}>
        <h1 className={styles.subjectTitle}>
          <Link to={subjectPath}>{subject?.name ?? `条目 #${episode.subjectID}`}</Link>
          {subject?.nameCN && <small>{subject.nameCN}</small>}
        </h1>
      </PageContainer>
      <nav className={styles.tabs} aria-label='条目导航'>
        <PageContainer gutterOnly className={styles.tabsInner}>
          <ul className={styles.tabList}>
            {tabs.map((tab) => (
              <li key={tab.label}>
                <Link
                  className={tab.label === '章节' ? styles.tabLinkActive : styles.tabLink}
                  to={tab.to}
                >
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
    <span className={styles.reactions}>
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
    return <p className={styles.deletedComment}>内容已被用户删除</p>;
  }
  if (state === 7) {
    return <p className={styles.deletedComment}>内容因违反社区指导原则已被删除</p>;
  }
  return <RichContent bbcode={content} classname={styles.commentContent} />;
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
    <article className={isReply ? styles.reply : styles.comment} id={`post_${comment.id}`}>
      <Link
        to={user ? getUserProfileLink(user.username) : ''}
        noStyle
        className={styles.avatarLink}
      >
        <Avatar src={user?.avatar.medium ?? ''} size={isReply ? 'small' : 'medium'} alt='' />
      </Link>
      <div className={styles.commentBody}>
        <header className={styles.commentHeader}>
          <div className={styles.commentAuthor}>
            {user ? (
              <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
            ) : (
              '匿名用户'
            )}
            {!isReply && user?.sign && <span>{user.sign}</span>}
          </div>
          <a className={styles.commentTime} href={`#post_${comment.id}`}>
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
        <ol className={styles.replyList}>
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
    <section className={styles.comments} aria-labelledby='comments-heading'>
      <div className={styles.sectionHeader}>
        <h2 id='comments-heading'>吐槽箱</h2>
        <span className={styles.commentCount}>{total}</span>
        <button
          type='button'
          className={ascending ? styles.sortButton : styles.sortButtonDescending}
          onClick={() => setAscending((value) => !value)}
          aria-label={ascending ? '较新吐槽优先' : '较早吐槽优先'}
          title={ascending ? '切换为较新优先' : '切换为较早优先'}
        >
          <ArrowDown />
        </button>
      </div>
      {sortedComments.length > 0 ? (
        <ol className={styles.commentList}>
          {sortedComments.map((comment, index) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              floor={ascending ? index + 1 : comments.length - index}
            />
          ))}
        </ol>
      ) : (
        <p className={styles.emptyComments}>还没有吐槽</p>
      )}
    </section>
  );
}

function EpisodeSidebar({ episode, episodes }: { episode: Episode; episodes: Episode[] }) {
  const sortedEpisodes = [...episodes].sort((left, right) => left.sort - right.sort);
  const subjectImage = episode.subject?.images?.small;

  return (
    <aside className={styles.sidebar}>
      <section className={styles.subjectCard}>
        {subjectImage && (
          <Link to={getSubjectLink(episode.subjectID)} noStyle className={styles.coverLink}>
            <img src={subjectImage} alt='' className={styles.cover} />
          </Link>
        )}
        <div>
          <Link to={getSubjectLink(episode.subjectID)} className={styles.subjectName}>
            {episode.subject?.nameCN || episode.subject?.name || `条目 #${episode.subjectID}`}
          </Link>
          {episode.subject?.nameCN && <small>{episode.subject.name}</small>}
          <Link to={getSubjectLink(episode.subjectID)} className={styles.returnLink}>
            返回条目
          </Link>
        </div>
      </section>
      <section className={styles.episodePanel} aria-labelledby='episode-list-heading'>
        <div className={styles.sideHeading}>
          <h2 id='episode-list-heading'>章节</h2>
          <Link to={getSubjectEpisodesLink(episode.subjectID)}>全部</Link>
        </div>
        <ol className={styles.episodeList}>
          {sortedEpisodes.map((item) => (
            <li
              key={item.id}
              className={item.id === episode.id ? styles.currentEpisode : undefined}
            >
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
  const title = `${episodeLabel(episode)} ${episode.nameCN || episode.name}`;

  return (
    <>
      <Helmet title={`${title} - ${episode.subject?.nameCN || episode.subject?.name || '章节'}`} />
      <EpisodeHeader episode={episode} />
      <PageContainer as='main' className={styles.page}>
        <div className={styles.columns}>
          <div className={styles.mainColumn}>
            <section className={styles.episodeInfo}>
              <h1>
                <span>{episodeLabel(episode)}</span> {episode.name}
              </h1>
              {episode.nameCN && <p className={styles.episodeNameCN}>{episode.nameCN}</p>}
              <p className={styles.episodeMeta}>
                {episode.duration && <span>时长 {episode.duration}</span>}
                {episode.airdate && <span>首播 {episode.airdate}</span>}
              </p>
              {episode.desc ? (
                <p className={styles.description}>{episode.desc}</p>
              ) : (
                <p className={styles.emptyDescription}>暂无章节简介</p>
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
