import { ok } from '@oazapfts/runtime';
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
import { css, cx } from '@bangumi/styled-system/css';
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
import SubjectSection from './SubjectSection';

const { Link } = Typography;

// &[class] 提升优先级，覆盖 design Section 的默认间距
const primarySection = css({
  '&[class]': {
    margin: '0',
    paddingBottom: '0',
    '& > [data-subject-section-header]': {
      justifyContent: 'flex-start',
      gap: '1',
    },
    '& h2': {
      textStyle: 'label',
    },
  },
});

const summarySection = css({
  '&[class]': {
    margin: '0',
    paddingBottom: '0',
    borderBottom: '0',
  },
});

const tagSection = css({
  '&[class]': {
    margin: '0',
    padding: '3',
    border: '0',
    borderRadius: 'sm',
    background: 'bg.subtle',
    '& h2': {
      textStyle: 'label',
    },
  },
});

/* 章节/曲目 */
const musicList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& li': {
    display: 'flex',
    gap: '2',
    paddingTop: '1',
    paddingBottom: '1',
    textStyle: 'bodySm',
    borderBottomWidth: '1px',
    borderBottomColor: 'border.subtle',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

const musicSort = css({
  color: 'text.tertiary',
  flex: 'none',
});

const musicName = css({
  flex: '1',
  minWidth: '0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const musicDuration = css({
  color: 'text.tertiary',
  flex: 'none',
});

const epSubtitle = css({
  textStyle: 'meta',
  color: 'text.tertiary',
  marginTop: '2',
  marginBottom: '1',
});

const epGrid = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1',
});

const epAllLink = css({
  '&[class]': {
    textDecoration: 'none',
    '&:hover, &:focus-visible': {
      textDecoration: 'none',
    },
  },
});

/* 简介 */
const summaryContent = css({
  color: 'text.primary',
  textStyle: 'body',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
});

const summaryCollapsed = css({
  position: 'relative',
  maxHeight: '250px',
  overflow: 'hidden',
  '&::after': {
    position: 'absolute',
    right: '0',
    bottom: '0',
    left: '0',
    height: '42px',
    background: 'linear-gradient(to bottom, transparent, var(--colors-bg-canvas))',
    content: '""',
    pointerEvents: 'none',
  },
});

const summaryToggle = css({
  display: 'block',
  margin: '-2px 0 0 auto',
  padding: '0',
  border: '0',
  background: 'transparent',
  color: 'link',
  cursor: 'pointer',
  textStyle: 'meta',
});

/* 标签 */
const tagList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1',
  '& li': {
    paddingTop: '1',
    paddingRight: '2',
    paddingBottom: '1',
    paddingLeft: '2',
    borderWidth: '1px',
    borderColor: 'border.subtle',
    borderRadius: 'pill',
    background: 'bg.raised',
    textStyle: 'meta',
  },
});

const tagCount = css({
  marginLeft: '1',
  color: 'text.tertiary',
  textStyle: 'meta',
});

/* 封面网格（角色/关联/推荐） */
const coverGrid = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: '3',
  '@media (max-width: 640px)': {
    marginRight: '0',
  },
});

const coverItem = css({
  position: 'relative',
  minWidth: '0',
  textAlign: 'left',
});

const coverLink = css({ display: 'block' });

const cover = css({
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center top',
  borderWidth: '1px',
  borderColor: 'border.subtle',
  borderRadius: 'sm',
  background: 'bg.muted',
});

const characterGrid = css({
  flexWrap: 'nowrap',
  gap: '4',
  padding: '1',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

const characterCoverItem = css({
  flex: '0 0 85px',
  width: '85px',
  '@media (max-width: 640px)': {
    flexBasis: '20vw',
  },
});

const characterCover = css({
  width: '85px',
  height: 'auto',
  minHeight: '100px',
  aspectRatio: '3 / 4',
});

const characterCoverTitle = css({ textStyle: 'label' });

const relationGrid = css({
  columnGap: '3',
  rowGap: '1',
});

const relationCoverItem = css({ width: '80px' });

const recommendationGrid = css({
  flexWrap: 'nowrap',
  gap: '2',
  overflowX: 'auto',
});

const recommendationCoverItem = css({
  flex: '0 0 80px',
  width: '80px',
});

const subjectCover = css({
  width: '75px',
  height: '75px',
  aspectRatio: '1',
});

const coverTitle = css({
  maxHeight: '52px',
  marginTop: '1',
  textStyle: 'bodySm',
  overflow: 'hidden',
  overflowWrap: 'break-word',
});

const coverInfo = css({
  margin: '0',
  textStyle: 'meta',
  color: 'text.tertiary',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const relationSep = css({
  display: 'block',
  width: '100%',
  height: '18px',
  textStyle: 'meta',
  color: 'text.tertiary',
});

/* 文本列表（评论/日志） */
const textList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& li': {
    paddingBlock: 'component.list.rowBlock',
  },
  '& li:first-child': {
    paddingTop: '0',
  },
  '& li:not(:last-child)': {
    borderBottom: 'component.list.divider',
  },
});

const textTitle = css({
  textStyle: 'titleSm',
  wordBreak: 'break-all',
});

const textInfo = css({
  marginTop: '1',
  textStyle: 'meta',
  color: 'text.tertiary',
  '& span': {
    marginLeft: '2',
  },
});

/* 讨论版 */
const topicTable = css({
  width: '100%',
  borderCollapse: 'collapse',
  textStyle: 'bodySm',
  '& tr:not(:last-child)': {
    borderBottom: 'component.list.divider',
  },
  '& tr > :first-child': {
    paddingLeft: '0',
  },
  '& tr > :last-child': {
    paddingRight: '0',
  },
  '& tr:first-child > td': {
    paddingTop: '0',
  },
});

const topicSubject = css({
  paddingBlock: 'component.list.rowBlock',
  paddingRight: 'layout.inline',
  paddingLeft: 'layout.inline',
  textAlign: 'left',
  textStyle: 'label',
  maxWidth: '0',
  '& a': {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const topicInfo = css({
  paddingBlock: 'component.list.rowBlock',
  paddingRight: 'layout.inline',
  paddingLeft: 'layout.inline',
  width: '16%',
  textAlign: 'right',
  color: 'text.tertiary',
  textStyle: 'meta',
  whiteSpace: 'nowrap',
});

const topicMore = css({
  paddingBlock: 'component.list.rowBlock',
  paddingRight: 'layout.inline',
  paddingLeft: 'layout.inline',
  textAlign: 'right',
});

/* 吐槽 */
const commentList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'flex',
    gap: '2',
    paddingBlock: 'component.list.rowBlock',
  },
  '& > li:first-child': {
    paddingTop: '0',
  },
  '& > li:not(:last-child)': {
    borderBottom: 'component.list.divider',
  },
});

const commentInfo = css({
  minWidth: '0',
  flex: '1',
});

const commentHeader = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  flexWrap: 'wrap',
  textStyle: 'bodySm',
});

const commentMeta = css({
  color: 'text.tertiary',
  textStyle: 'meta',
});

const commentText = css({
  margin: '4px 0 0',
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#1f1c1c',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
});

const primaryBlocks = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'layout.group',
});

const secondaryBlocks = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'layout.section',
});

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
      <SubjectSection title='曲目列表' className={primarySection}>
        <ul className={musicList}>
          {episodes.map((ep) => (
            <li key={ep.id}>
              <span className={musicSort}>{ep.sort}.</span>
              <span className={musicName} title={ep.name}>
                {ep.name || ep.nameCN}
              </span>
              <small className={musicDuration}>{ep.duration}</small>
            </li>
          ))}
        </ul>
      </SubjectSection>
    );
  }

  const normals = episodes.filter((ep) => ep.type === EpisodeType.Normal);
  const specials = episodes.filter((ep) => ep.type === EpisodeType.Special);

  const renderEpGrid = (list: Episode[]) => (
    <ul className={epGrid}>
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
        <Link to={getSubjectEpisodesLink(subject.id)} className={epAllLink}>
          [全部]
        </Link>
      }
      className={primarySection}
    >
      {renderEpGrid(normals)}
      {specials.length > 0 && (
        <>
          <div className={epSubtitle}>SP</div>
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
    <SubjectSection className={summarySection}>
      <div
        ref={contentRef}
        className={cx(summaryContent, collapsible && collapsed && summaryCollapsed)}
      >
        {summary}
      </div>
      {collapsible && (
        <button
          type='button'
          className={summaryToggle}
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
    <SubjectSection title={`大家将 ${subject.name} 标注为`} className={tagSection}>
      <ul className={tagList}>
        {subject.tags.map((tag) => (
          <li key={tag.name}>
            <Link to={getSubjectTagLink(tag.name)}>
              {tag.name} <small className={tagCount}>{tag.count}</small>
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
        <Link variant='subtle' to={getSubjectCharactersLink(subjectId)}>
          更多角色 »
        </Link>
      }
    >
      <ul className={cx(coverGrid, characterGrid)}>
        {characters.map(({ character, casts }) => (
          <li key={character.id} className={cx(coverItem, characterCoverItem)}>
            <Link
              to={getCharacterLink(character.id)}
              className={coverLink}
              title={character.nameCN || character.name}
            >
              <img
                src={character.images?.grid}
                className={cx(cover, characterCover)}
                loading='lazy'
                alt=''
              />
            </Link>
            <p className={cx(coverTitle, characterCoverTitle)}>
              <Link to={getCharacterLink(character.id)}>{character.nameCN || character.name}</Link>
            </p>
            {casts.map((cast) => (
              <p key={cast.person.id} className={coverInfo}>
                <span>{CAST_TYPE_DESC[cast.relation] ?? '出演'}</span>{' '}
                <Link variant='subtle' to={getPersonLink(cast.person.id)}>
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
        <Link variant='subtle' to={getSubjectRelationsLink(subjectId)}>
          更多关联 »
        </Link>
      }
    >
      <ul className={cx(coverGrid, relationGrid)}>
        {relations.map(({ subject, relation }) => {
          const showSep = relation.id !== lastRelationId;
          lastRelationId = relation.id;
          return (
            <li key={subject.id} className={cx(coverItem, relationCoverItem)}>
              {showSep && <span className={relationSep}>{relation.cn}</span>}
              <Link
                to={getSubjectLink(subject.id)}
                className={coverLink}
                title={subject.nameCN || subject.name}
              >
                <img
                  src={subject.images?.grid}
                  className={cx(cover, subjectCover)}
                  loading='lazy'
                  alt=''
                />
              </Link>
              <p className={coverTitle}>
                <Link variant='subtle' to={getSubjectLink(subject.id)}>
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
      <ul className={cx(coverGrid, recommendationGrid)}>
        {recs.map(({ subject }) => (
          <li key={subject.id} className={cx(coverItem, recommendationCoverItem)}>
            <Link
              to={getSubjectLink(subject.id)}
              className={coverLink}
              title={subject.nameCN || subject.name}
            >
              <img
                src={subject.images?.grid}
                className={cx(cover, subjectCover)}
                loading='lazy'
                alt=''
              />
            </Link>
            <p className={coverTitle}>
              <Link variant='subtle' to={getSubjectLink(subject.id)}>
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
        <Link variant='subtle' to={getSubjectReviewsLink(subjectId)}>
          更多评论 »
        </Link>
      }
    >
      <ul className={textList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link
              to={getBlogLink(review.entry.id)}
              className={textTitle}
              title={review.entry.title}
            >
              {review.entry.title}
            </Link>
            <p className={textInfo}>
              <Link variant='subtle' to={getUserProfileLink(review.user.username)}>
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
      <table className={topicTable}>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td className={topicSubject}>
                <Link to={getSubjectTopicLink(topic.id)} title={topic.title}>
                  {topic.title}
                </Link>
              </td>
              <td className={topicInfo}>
                <Link variant='subtle' to={getUserProfileLink(topic.creator?.username ?? '')}>
                  {topic.creator?.nickname ?? ''}
                </Link>
              </td>
              <td className={topicInfo}>{topic.replyCount} replies</td>
              <td className={topicInfo}>{dayjs.unix(topic.updatedAt).format('YYYY-M-D')}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className={topicMore}>
              <Link variant='subtle' to={getSubjectBoardLink(subjectId)}>
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
        <Link variant='subtle' to={getSubjectCommentsLink(subjectId)}>
          更多吐槽 »
        </Link>
      }
    >
      <ul className={commentList}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Link to={getUserProfileLink(comment.user.username)}>
              <Avatar src={comment.user.avatar.medium} size='small' alt='' />
            </Link>
            <div className={commentInfo}>
              <div className={commentHeader}>
                <Link variant='subtle' to={getUserProfileLink(comment.user.username)}>
                  {comment.user.nickname}
                </Link>
                {comment.rate > 0 && <Rate value={comment.rate} />}
                <span className={commentMeta}>{COLLECT_DESC[comment.type]}</span>
                <span className={commentMeta}>
                  {dayjs.unix(comment.updatedAt).format('YYYY-M-D HH:mm')}
                </span>
              </div>
              {comment.comment != null && comment.comment !== '' && (
                <p className={commentText}>{comment.comment}</p>
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
    <div className={primaryBlocks}>
      <EpListSection subject={subject} episodes={data.episodes} />
      {subject.summary != null && subject.summary !== '' && (
        <SummarySection summary={subject.summary} />
      )}
      <TagsSection subject={subject} />
    </div>
  );
};

export const SubjectSecondaryBlocks: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => {
  const { subject } = data;
  return (
    <div className={secondaryBlocks}>
      <CharactersSection subjectId={subject.id} characters={data.characters} />
      <RelationsSection subjectId={subject.id} relations={data.relations} />
      <RecsSection recs={data.recs} />
      <ReviewsSection subjectId={subject.id} reviews={data.reviews} />
      <TopicsSection subjectId={subject.id} topics={data.topics} />
      <CommentsSection subjectId={subject.id} comments={data.comments} />
    </div>
  );
};

export const SubjectBlocks: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => (
  <>
    <SubjectPrimaryBlocks data={data} />
    <SubjectSecondaryBlocks data={data} />
  </>
);
