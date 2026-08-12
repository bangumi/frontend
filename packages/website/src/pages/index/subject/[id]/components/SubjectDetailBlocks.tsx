import { ok } from '@oazapfts/runtime';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

import { ozaClient } from '@bangumi/client';
import type {
  Episode,
  Subject,
  SubjectHomeResponse,
  SubjectInterestComment,
  SubjectRec,
  SubjectRelation,
  SubjectReview,
  Topic,
  UpdateEpisodeProgress,
} from '@bangumi/client/client';
import { CollectionType, EpisodeType, SubjectType } from '@bangumi/client/client';
import { Avatar, Rate, toast, Typography } from '@bangumi/design';
import {
  getBlogLink,
  getCharacterLink,
  getPersonLink,
  getSubjectBoardLink,
  getSubjectCharactersLink,
  getSubjectCommentsLink,
  getSubjectEpisodesLink,
  getSubjectLink,
  getSubjectRelationsLink,
  getSubjectReviewsLink,
  getSubjectTagLink,
  getSubjectTopicLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import EpisodeButton from '@bangumi/website/components/EpisodeButton';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';
import { useUser } from '@bangumi/website/hooks/use-user';

import { CAST_TYPE_DESC, COLLECT_DESC } from './subject-common';
import styles from './SubjectDetailBlocks.module.less';
import SubjectSection from './SubjectSection';

const { Link } = Typography;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '操作失败，请稍后再试';
}

/** 章节/曲目列表，对齐 PHP subject_box_prg */
function EpListSection({ subject, episodes }: { subject: Subject; episodes: Episode[] }) {
  const { user } = useUser();
  const { mutate } = useSubjectHome(subject.id);
  const [submittingEpisodeID, setSubmittingEpisodeID] = React.useState<number>();
  const isAnimeLike = subject.type === SubjectType.Anime || subject.type === SubjectType.Real;
  const isMusic = subject.type === SubjectType.Music;
  const canManage = Boolean(user) && subject.interest?.type === CollectionType.Doing;

  const updateEpisode = async (episode: Episode, body: UpdateEpisodeProgress) => {
    setSubmittingEpisodeID(episode.id);
    try {
      await ok(ozaClient.updateEpisodeProgress(episode.id, body));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmittingEpisodeID(undefined);
    }
  };

  if ((!isAnimeLike && !isMusic) || episodes.length === 0) {
    return null;
  }

  if (isMusic) {
    return (
      <SubjectSection title='曲目列表' className={styles.primarySection}>
        <ul className={styles.musicList}>
          {episodes.map((ep) => (
            <li key={ep.id}>
              <span className={styles.musicSort}>{ep.sort}.</span>
              <span className={styles.musicName} title={ep.name}>
                {ep.name || ep.nameCN}
              </span>
              <small className={styles.musicDuration}>{ep.duration}</small>
            </li>
          ))}
        </ul>
      </SubjectSection>
    );
  }

  const normals = episodes.filter((ep) => ep.type === EpisodeType.Normal);
  const specials = episodes.filter((ep) => ep.type === EpisodeType.Special);

  const renderEpGrid = (list: Episode[]) => (
    <ul className={styles.epGrid}>
      {list.map((ep) => (
        <li key={ep.id}>
          <EpisodeButton
            episode={ep}
            canManage={canManage}
            submitting={submittingEpisodeID === ep.id}
            onUpdate={(body) => void updateEpisode(ep, body)}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <SubjectSection
      title={user ? '观看进度管理' : '章节列表'}
      extra={
        <Link to={getSubjectEpisodesLink(subject.id)} className={styles.epAllLink}>
          [全部]
        </Link>
      }
      className={styles.primarySection}
    >
      {renderEpGrid(normals)}
      {specials.length > 0 && (
        <>
          <div className={styles.epSubtitle}>SP</div>
          {renderEpGrid(specials)}
        </>
      )}
    </SubjectSection>
  );
}

/** 简介，对齐 PHP subject_summary */
function SummarySection({ summary }: { summary: string }) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsible, setCollapsible] = React.useState(false);

  React.useLayoutEffect(() => {
    setCollapsible((contentRef.current?.scrollHeight ?? 0) > 250);
  }, [summary]);

  return (
    <SubjectSection className={styles.summarySection}>
      <div
        ref={contentRef}
        className={`${styles.summary} ${collapsible && collapsed ? styles.summaryCollapsed : ''}`}
      >
        {summary}
      </div>
      {collapsible && (
        <button
          type='button'
          className={styles.summaryToggle}
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? 'more...' : '收起'}
        </button>
      )}
    </SubjectSection>
  );
}

/** 标签，对齐 PHP subject_box_tag */
function TagsSection({ subject }: { subject: Subject }) {
  if (subject.tags.length === 0) {
    return null;
  }
  return (
    <SubjectSection title={`大家将 ${subject.name} 标注为`} className={styles.tagSection}>
      <ul className={styles.tagList}>
        {subject.tags.map((tag) => (
          <li key={tag.name}>
            <Link to={getSubjectTagLink(tag.name)}>
              {tag.name} <small className={styles.tagCount}>{tag.count}</small>
            </Link>
          </li>
        ))}
      </ul>
    </SubjectSection>
  );
}

/** 角色介绍，对齐 PHP subject_box_character */
function CharactersSection({
  subjectId,
  characters,
}: {
  subjectId: number;
  characters: SubjectHomeResponse['characters'];
}) {
  if (characters.length === 0) {
    return null;
  }
  return (
    <SubjectSection
      title='角色介绍'
      extra={<Link to={getSubjectCharactersLink(subjectId)}>更多角色 »</Link>}
    >
      <ul className={classNames(styles.coverGrid, styles.characterGrid)}>
        {characters.map(({ character, casts }) => (
          <li key={character.id} className={styles.coverItem}>
            <Link
              to={getCharacterLink(character.id)}
              className={styles.coverLink}
              title={character.nameCN || character.name}
            >
              <img
                src={character.images?.grid}
                className={classNames(styles.cover, styles.characterCover)}
                loading='lazy'
                alt=''
              />
            </Link>
            <p className={styles.coverTitle}>
              <Link to={getCharacterLink(character.id)}>{character.nameCN || character.name}</Link>
            </p>
            {casts.map((cast) => (
              <p key={cast.person.id} className={styles.coverInfo}>
                <span>{CAST_TYPE_DESC[cast.relation] ?? '出演'}</span>{' '}
                <Link to={getPersonLink(cast.person.id)}>{cast.person.name}</Link>
              </p>
            ))}
          </li>
        ))}
      </ul>
    </SubjectSection>
  );
}

/** 关联条目，对齐 PHP block_relation */
function RelationsSection({
  subjectId,
  relations,
}: {
  subjectId: number;
  relations: SubjectRelation[];
}) {
  if (relations.length === 0) {
    return null;
  }
  let lastRelationId: number | null = null;

  return (
    <SubjectSection
      title='关联条目'
      extra={<Link to={getSubjectRelationsLink(subjectId)}>更多关联 »</Link>}
    >
      <ul className={classNames(styles.coverGrid, styles.relationGrid)}>
        {relations.map(({ subject, relation }) => {
          const showSep = relation.id !== lastRelationId;
          lastRelationId = relation.id;
          return (
            <li key={subject.id} className={styles.coverItem}>
              {showSep && <span className={styles.relationSep}>{relation.cn}</span>}
              <Link
                to={getSubjectLink(subject.id)}
                className={styles.coverLink}
                title={subject.nameCN || subject.name}
              >
                <img
                  src={subject.images?.grid}
                  className={classNames(styles.cover, styles.subjectCover)}
                  loading='lazy'
                  alt=''
                />
              </Link>
              <p className={styles.coverTitle}>
                <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
              </p>
            </li>
          );
        })}
      </ul>
    </SubjectSection>
  );
}

/** 相关条目推荐，对齐 PHP block_rec */
function RecsSection({ recs }: { recs: SubjectRec[] }) {
  if (recs.length === 0) {
    return null;
  }
  return (
    <SubjectSection title='喜欢这部作品的会员大概会喜欢'>
      <ul className={classNames(styles.coverGrid, styles.recommendationGrid)}>
        {recs.map(({ subject }) => (
          <li key={subject.id} className={styles.coverItem}>
            <Link
              to={getSubjectLink(subject.id)}
              className={styles.coverLink}
              title={subject.nameCN || subject.name}
            >
              <img
                src={subject.images?.grid}
                className={classNames(styles.cover, styles.subjectCover)}
                loading='lazy'
                alt=''
              />
            </Link>
            <p className={styles.coverTitle}>
              <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
            </p>
          </li>
        ))}
      </ul>
    </SubjectSection>
  );
}

/** 评论（日志），对齐 PHP subject_box_blog */
function ReviewsSection({ subjectId, reviews }: { subjectId: number; reviews: SubjectReview[] }) {
  if (reviews.length === 0) {
    return null;
  }
  return (
    <SubjectSection
      title='评论'
      extra={<Link to={getSubjectReviewsLink(subjectId)}>更多评论 »</Link>}
    >
      <ul className={styles.textList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link
              to={getBlogLink(review.entry.id)}
              className={styles.textTitle}
              title={review.entry.title}
            >
              {review.entry.title}
            </Link>
            <p className={styles.textInfo}>
              <Link to={getUserProfileLink(review.user.username)}>{review.user.nickname}</Link>
              <span>{dayjs.unix(review.entry.updatedAt).format('YYYY-M-D')}</span>
            </p>
          </li>
        ))}
      </ul>
    </SubjectSection>
  );
}

/** 讨论版，对齐 PHP subject_box_board */
function TopicsSection({ subjectId, topics }: { subjectId: number; topics: Topic[] }) {
  if (topics.length === 0) {
    return null;
  }
  return (
    <SubjectSection title='讨论版'>
      <table className={styles.topicTable}>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td className={styles.topicSubject}>
                <Link to={getSubjectTopicLink(topic.id)} title={topic.title}>
                  {topic.title}
                </Link>
              </td>
              <td className={styles.topicInfo}>
                <Link to={getUserProfileLink(topic.creator?.username ?? '')}>
                  {topic.creator?.nickname ?? ''}
                </Link>
              </td>
              <td className={styles.topicInfo}>{topic.replyCount} replies</td>
              <td className={styles.topicInfo}>{dayjs.unix(topic.updatedAt).format('YYYY-M-D')}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className={styles.topicMore}>
              <Link to={getSubjectBoardLink(subjectId)}>更多讨论 »</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </SubjectSection>
  );
}

/** 吐槽箱，对齐 PHP subject_box_comment */
function CommentsSection({
  subjectId,
  comments,
}: {
  subjectId: number;
  comments: SubjectInterestComment[];
}) {
  if (comments.length === 0) {
    return null;
  }
  return (
    <SubjectSection
      title='吐槽箱'
      extra={<Link to={getSubjectCommentsLink(subjectId)}>更多吐槽 »</Link>}
    >
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Link to={getUserProfileLink(comment.user.username)}>
              <Avatar src={comment.user.avatar.medium} size='small' alt='' />
            </Link>
            <div className={styles.commentInfo}>
              <div className={styles.commentHeader}>
                <Link to={getUserProfileLink(comment.user.username)} fontWeight='bold'>
                  {comment.user.nickname}
                </Link>
                {comment.rate > 0 && <Rate value={comment.rate} />}
                <span className={styles.commentMeta}>{COLLECT_DESC[comment.type]}</span>
                <span className={styles.commentMeta}>
                  {dayjs.unix(comment.updatedAt).format('YYYY-M-D HH:mm')}
                </span>
              </div>
              {comment.comment != null && comment.comment !== '' && (
                <p className={styles.commentText}>{comment.comment}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SubjectSection>
  );
}

/** 主内容区块的组合，按 PHP 布局顺序渲染 */
export const SubjectPrimaryBlocks: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => {
  const { subject } = data;
  return (
    <>
      <EpListSection subject={subject} episodes={data.episodes} />
      {subject.summary != null && subject.summary !== '' && (
        <SummarySection summary={subject.summary} />
      )}
      <TagsSection subject={subject} />
    </>
  );
};

export const SubjectSecondaryBlocks: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => {
  const { subject } = data;
  return (
    <>
      <CharactersSection subjectId={subject.id} characters={data.characters} />
      <RelationsSection subjectId={subject.id} relations={data.relations} />
      <RecsSection recs={data.recs} />
      <ReviewsSection subjectId={subject.id} reviews={data.reviews} />
      <TopicsSection subjectId={subject.id} topics={data.topics} />
      <CommentsSection subjectId={subject.id} comments={data.comments} />
    </>
  );
};

export const SubjectBlocks: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => (
  <>
    <SubjectPrimaryBlocks data={data} />
    <SubjectSecondaryBlocks data={data} />
  </>
);
