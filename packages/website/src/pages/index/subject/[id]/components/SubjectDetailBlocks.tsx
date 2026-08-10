import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

import type {
  Episode,
  Subject,
  SubjectHomeResponse,
  SubjectInterestComment,
  SubjectRec,
  SubjectRelation,
  SubjectReview,
  Topic,
} from '@bangumi/client/client';
import { EpisodeCollectionStatus, EpisodeType, SubjectType } from '@bangumi/client/client';
import { Avatar, Rate, Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';

import CollectionPanel from './CollectionPanel';
import { CAST_TYPE_DESC, COLLECT_DESC } from './subject-common';
import styles from './SubjectDetailBlocks.module.less';
import SubjectSection from './SubjectSection';

const { Link } = Typography;

/** 章节/曲目列表，对齐 PHP subject_box_prg */
function EpListSection({ subject, episodes }: { subject: Subject; episodes: Episode[] }) {
  const isAnimeLike = subject.type === SubjectType.Anime || subject.type === SubjectType.Real;
  const isMusic = subject.type === SubjectType.Music;

  if ((!isAnimeLike && !isMusic) || episodes.length === 0) {
    return null;
  }

  if (isMusic) {
    return (
      <SubjectSection title='曲目列表'>
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
      {list.map((ep) => {
        const done = ep.collection?.status === EpisodeCollectionStatus.Done;
        return (
          <li key={ep.id}>
            <Link
              to={`https://bgm.tv/ep/${ep.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className={classNames(styles.epBtn, done ? styles.epDone : undefined)}
              title={`ep.${ep.sort} ${ep.name || ep.nameCN}`}
            >
              {String(ep.sort).padStart(2, '0')}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <SubjectSection
      title='章节列表'
      extra={
        <Link
          to={`https://bgm.tv/subject/${subject.id}/ep`}
          target='_blank'
          rel='noopener noreferrer'
        >
          [全部]
        </Link>
      }
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
  return (
    <SubjectSection>
      <div className={styles.summary}>{summary}</div>
    </SubjectSection>
  );
}

/** 标签，对齐 PHP subject_box_tag */
function TagsSection({ tags }: { tags: Subject['tags'] }) {
  if (tags.length === 0) {
    return null;
  }
  return (
    <SubjectSection title='标签'>
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link
              to={`https://bgm.tv/subject/tag/${encodeURIComponent(tag.name)}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {tag.name} ({tag.count})
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
      extra={
        <Link
          to={`https://bgm.tv/subject/${subjectId}/characters`}
          target='_blank'
          rel='noopener noreferrer'
        >
          更多角色 »
        </Link>
      }
    >
      <ul className={styles.coverGrid}>
        {characters.map(({ character, casts }) => (
          <li key={character.id} className={styles.coverItem}>
            <Link
              to={`https://bgm.tv/character/${character.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.coverLink}
              title={character.nameCN || character.name}
            >
              <img src={character.images?.grid} className={styles.cover} loading='lazy' alt='' />
            </Link>
            <p className={styles.coverTitle}>
              <Link
                to={`https://bgm.tv/character/${character.id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {character.nameCN || character.name}
              </Link>
            </p>
            {casts.map((cast) => (
              <p key={cast.person.id} className={styles.coverInfo}>
                <span>{CAST_TYPE_DESC[cast.relation] ?? '出演'}</span>{' '}
                <Link
                  to={`https://bgm.tv/person/${cast.person.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {cast.person.name}
                </Link>
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
      extra={
        <Link
          to={`https://bgm.tv/subject/${subjectId}/relations`}
          target='_blank'
          rel='noopener noreferrer'
        >
          更多关联 »
        </Link>
      }
    >
      <ul className={styles.coverGrid}>
        {relations.map(({ subject, relation }) => {
          const showSep = relation.id !== lastRelationId;
          lastRelationId = relation.id;
          return (
            <li key={subject.id} className={styles.coverItem}>
              {showSep && <span className={styles.relationSep}>{relation.cn}</span>}
              <Link
                to={`https://bgm.tv/subject/${subject.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.coverLink}
                title={subject.nameCN || subject.name}
              >
                <img src={subject.images?.grid} className={styles.cover} loading='lazy' alt='' />
              </Link>
              <p className={styles.coverTitle}>
                <Link
                  to={`https://bgm.tv/subject/${subject.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {subject.name}
                </Link>
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
      <ul className={styles.coverGrid}>
        {recs.map(({ subject }) => (
          <li key={subject.id} className={styles.coverItem}>
            <Link
              to={`https://bgm.tv/subject/${subject.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.coverLink}
              title={subject.nameCN || subject.name}
            >
              <img src={subject.images?.grid} className={styles.cover} loading='lazy' alt='' />
            </Link>
            <p className={styles.coverTitle}>
              <Link
                to={`https://bgm.tv/subject/${subject.id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {subject.name}
              </Link>
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
      extra={
        <Link
          to={`https://bgm.tv/subject/${subjectId}/reviews`}
          target='_blank'
          rel='noopener noreferrer'
        >
          更多评论 »
        </Link>
      }
    >
      <ul className={styles.textList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link
              to={`https://bgm.tv/blog/${review.entry.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.textTitle}
              title={review.entry.title}
            >
              {review.entry.title}
            </Link>
            <p className={styles.textInfo}>
              <Link
                to={`https://bgm.tv/user/${review.user.username}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {review.user.nickname}
              </Link>
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
                <Link
                  to={`https://bgm.tv/subject/topic/${topic.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={topic.title}
                >
                  {topic.title}
                </Link>
              </td>
              <td className={styles.topicInfo}>
                <Link
                  to={`https://bgm.tv/user/${topic.creator?.username ?? ''}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {topic.creator?.nickname ?? ''}
                </Link>
              </td>
              <td className={styles.topicInfo}>{topic.replyCount} replies</td>
              <td className={styles.topicInfo}>{dayjs.unix(topic.updatedAt).format('YYYY-M-D')}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className={styles.topicMore}>
              <Link
                to={`https://bgm.tv/subject/${subjectId}/board`}
                target='_blank'
                rel='noopener noreferrer'
              >
                更多讨论 »
              </Link>
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
      extra={
        <Link
          to={`https://bgm.tv/subject/${subjectId}/comments`}
          target='_blank'
          rel='noopener noreferrer'
        >
          更多吐槽 »
        </Link>
      }
    >
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Link to={getUserProfileLink(comment.user.username)} isExternal>
              <Avatar src={comment.user.avatar.medium} size='small' alt='' />
            </Link>
            <div className={styles.commentInfo}>
              <div className={styles.commentHeader}>
                <Link to={getUserProfileLink(comment.user.username)} isExternal fontWeight='bold'>
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

/** 右栏所有区块的组合，按 PHP 布局顺序渲染 */
export const SubjectBlocks: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => {
  const { subject } = data;
  return (
    <>
      <EpListSection subject={subject} episodes={data.episodes} />
      {subject.summary != null && subject.summary !== '' && (
        <SummarySection summary={subject.summary} />
      )}
      <TagsSection tags={subject.tags} />
      <CollectionPanel subject={subject} />
      <CharactersSection subjectId={subject.id} characters={data.characters} />
      <RelationsSection subjectId={subject.id} relations={data.relations} />
      <RecsSection recs={data.recs} />
      <ReviewsSection subjectId={subject.id} reviews={data.reviews} />
      <TopicsSection subjectId={subject.id} topics={data.topics} />
      <CommentsSection subjectId={subject.id} comments={data.comments} />
    </>
  );
};
