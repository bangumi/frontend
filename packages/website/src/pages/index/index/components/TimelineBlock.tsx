import { ok } from '@oazapfts/runtime';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { CommentBase, SlimSubject, Timeline } from '@bangumi/client/client';
import { SubjectType, TimelineCat } from '@bangumi/client/client';
import { Avatar, toast, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import {
  getBlogLink,
  getEpisodeLink,
  getIndexLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import { makeDescriptiveTime } from '@bangumi/website/components/TimelineDescription';
import Tooltip from '@bangumi/website/components/Tooltip';
import TurnstileCaptcha from '@bangumi/website/components/TurnstileCaptcha';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';
import { useUser } from '@bangumi/website/hooks/use-user';

const block = css({
  background: '#fff',
  border: '1px solid #eee',
  borderRadius: '15px',
  margin: '0 0 15px',
  overflow: 'hidden',
});

const toolbar = css({
  display: 'flex',
  alignItems: 'center',
  minHeight: '42px',
  padding: '0 8px',
  borderBottom: '1px solid #eee',
  '@media (max-width: 640px)': {
    overflowX: 'auto',
  },
});

const filters = css({
  display: 'flex',
  alignItems: 'center',
  minWidth: '0',
  '@media (max-width: 640px)': {
    flex: 'none',
  },
});

/* 对齐原站 ul.categoryTab：13px 胶囊，hover 灰底，激活粉底白字 */
const filterBtn = css({
  padding: '4px 15px',
  border: '0',
  borderRadius: '50px',
  background: 'transparent',
  color: '#555',
  fontSize: '13px',
  transition: 'all .2s ease-in-out',
  _hover: { background: '#eee' },
  '@media (max-width: 640px)': {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
  // 激活态用属性选择器提升特异性，避免与基类原子样式争抢生成顺序
  '&[data-active]': {
    color: '#fff',
    background: '#f09199',
    _hover: { color: '#fff', background: '#f09199' },
  },
});

const crawl = css({
  marginLeft: 'auto',
  color: '#9f9b9b',
  fontSize: '14px',
  '@media (max-width: 640px)': {
    display: 'none',
  },
});

const composer = css({
  padding: '12px 10px 8px',
  background: '#fafafa',
});

const composerInput = css({
  display: 'block',
  width: '100%',
  height: '72px',
  boxSizing: 'border-box',
  padding: '9px',
  resize: 'vertical',
  border: '1px solid #e8e3e3',
  borderRadius: '5px',
  outline: '0',
  background: '#fff',
  color: '#1f1c1c',
  fontSize: '14px',
  lineHeight: '1.5',
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.06)',
  _focus: {
    borderColor: '#f09199',
  },
  '&::placeholder': {
    color: '#9f9b9b',
  },
});

const composerActions = css({
  display: 'flex',
  alignItems: 'center',
  minHeight: '36px',
  paddingTop: '5px',
});

const submitButton = css({
  minWidth: '76px',
  marginLeft: 'auto',
  padding: '5px 16px',
  border: '0',
  borderRadius: '18px',
  background: '#f09199',
  color: '#fff',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all .2s ease-in-out',
  _hover: { background: '#369cf8' },
  _disabled: {
    opacity: '0.55',
    cursor: 'default',
  },
});

const dayGroup = css({ background: '#fff' });

const dayTitle = css({
  margin: '10px 0 5px',
  padding: '0 0 5px 10px',
  borderBottom: '1px solid #e8e8e8',
  color: '#1175a8',
  fontSize: '14px',
  fontWeight: 'normal',
});

const list = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const listItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  margin: '5px 0',
  padding: '5px 0 0',
  '@media (max-width: 640px)': {
    margin: '0',
    padding: '5px 10px 0',
  },
});

const empty = css({
  margin: '0',
  padding: '24px 10px',
  color: '#9f9b9b',
  textAlign: 'center',
});

const avatarLink = css({
  flex: '0 0 50px',
  width: '50px',
  height: '50px',
  margin: '0 5px',
  overflow: 'hidden',
});

const avatar = css({
  border: '0',
  borderRadius: '50%',
  '& img': {
    borderRadius: '50%',
  },
});

const info = css({
  flex: '1 1 auto',
  minWidth: '0',
  minHeight: '35px',
  padding: '0 5px 5px 0',
  borderBottom: '1px dotted #e8e8e8',
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.2',
  '& .bgm-link': {
    color: '#0084b4',
  },
});

const desc = css({
  color: '#555',
  overflowWrap: 'anywhere',
  '& p': {
    margin: '2px 0 0',
  },
});

const statusText = css({
  margin: '5px 10px 0 0',
  color: '#333',
  fontSize: '15px',
  lineHeight: '1.5',
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-wrap',
});

const subjectCards = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

const subjectCard = css({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  width: 'min(600px, 100%)',
  minHeight: '36px',
  maxHeight: '36px',
  boxSizing: 'border-box',
  marginTop: '5px',
  padding: '5px',
  overflow: 'hidden',
  border: '1px solid #eee',
  borderRadius: '10px',
  background: '#fff',
});

const subjectCardDetailed = css({
  alignItems: 'center',
  minHeight: '80px',
  maxHeight: 'none',
  padding: '5px',
});

const subjectCoverLink = css({
  display: 'block',
  flex: 'none',
});

const subjectCover = css({
  display: 'block',
  borderRadius: '5px',
  objectFit: 'cover',
});

const subjectCoverCompact = css({
  width: '25px',
  height: '25px',
});

const subjectCoverDetailed = css({
  width: '60px',
  height: '70px',
});

const subjectInfo = css({ minWidth: '0' });

const subjectTitle = css({
  display: 'block',
  color: '#454545',
  fontSize: '13px',
  lineHeight: '1.2',
  overflowWrap: 'anywhere',
  _hover: {
    textDecoration: 'underline',
  },
});

const subjectMeta = css({
  height: '25px',
  overflow: 'hidden',
  color: '#999',
  fontSize: '13px',
  lineHeight: '25px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const subjectComment = css({
  width: 'min(600px, 100%)',
  boxSizing: 'border-box',
  margin: '5px 0',
  padding: '5px 10px',
  border: '1px solid #e8e8e8',
  borderRadius: '10px',
  color: '#555',
  fontSize: '15px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap',
});

const time = css({
  marginTop: '5px',
  color: '#999',
  fontSize: '10px',
  lineHeight: '1.2',
});

const sourceLink = css({ fontWeight: 'normal' });

/** 回复入口按钮 */
const replyToggle = css({
  marginTop: '4px',
  padding: '0',
  border: '0',
  background: 'none',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '16px',
  cursor: 'pointer',
  transition: 'color .2s ease-in-out',
  _hover: { color: '#54b5df' },
});

/** 回复区内嵌缩进在时间线内容下方 */
const replyArea = css({
  margin: '6px 0 0',
  padding: '8px 10px',
  borderLeft: '2px solid #e8e3e3',
  background: '#fafafa',
  borderRadius: '0 6px 6px 0',
});

const replyList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const replyItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  padding: '6px 0',
  borderTop: '1px dotted #e8e3e3',
  '&:first-child': { borderTop: 'none' },
});

const replyAvatar = css({
  flex: '0 0 28px',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  overflow: 'hidden',
  '& img': { width: '100%', height: '100%', borderRadius: '50%' },
});

const replyBody = css({
  flex: '1 1 auto',
  minWidth: '0',
  fontSize: '13px',
  lineHeight: '18px',
  color: '#595555',
  overflowWrap: 'anywhere',
});

const replyMeta = css({
  marginBottom: '2px',
  fontSize: '12px',
  color: '#9f9b9b',
  '& a': { color: '#123' },
});

const replyForm = css({
  display: 'flex',
  gap: '8px',
  marginTop: '8px',
  alignItems: 'flex-start',
});

const replyInput = css({
  flex: '1 1 auto',
  minWidth: '0',
  boxSizing: 'border-box',
  padding: '6px 8px',
  border: '1px solid #e8e3e3',
  borderRadius: '5px',
  outline: '0',
  background: '#fff',
  color: '#1f1c1c',
  fontSize: '13px',
  lineHeight: '1.4',
  resize: 'vertical',
  _focus: { borderColor: '#f09199' },
  '&::placeholder': { color: '#9f9b9b' },
});

const replySubmit = css({
  padding: '5px 14px',
  border: '0',
  borderRadius: '15px',
  background: '#f09199',
  color: '#fff',
  fontSize: '13px',
  cursor: 'pointer',
  _disabled: { opacity: '0.55', cursor: 'default' },
});

const replyEmpty = css({
  margin: '0',
  color: '#9f9b9b',
  fontSize: '12px',
});

const { Link } = Typography;

const TIMELINE_FILTERS = [
  { key: 'all', label: '动态' },
  { key: 'status', label: '吐槽' },
  { key: 'subject', label: '收藏' },
  { key: 'progress', label: '进度' },
  { key: 'blog', label: '日志' },
  { key: 'more', label: '更多' },
] as const;

type TimelineFilter = (typeof TIMELINE_FILTERS)[number]['key'];

const PRIMARY_TIMELINE_CATEGORIES = new Set<TimelineCat>([
  TimelineCat.Status,
  TimelineCat.Subject,
  TimelineCat.Progress,
  TimelineCat.Blog,
]);

const SUBJECT_ACTIONS: Record<number, string> = {
  1: '想读',
  2: '想看',
  3: '想听',
  4: '想玩',
  5: '读过',
  6: '看过',
  7: '听过',
  8: '玩过',
  9: '在读',
  10: '在看',
  11: '在听',
  12: '在玩',
  13: '搁置了',
  14: '抛弃了',
};

interface TimelineContent {
  summary: React.ReactNode;
  attachment?: React.ReactNode;
}

function SubjectName({ subject, original = false }: { subject: SlimSubject; original?: boolean }) {
  return (
    <Link to={getSubjectLink(subject.id)}>
      {original ? subject.name : subject.nameCN || subject.name}
    </Link>
  );
}

function SubjectCard({ subject, detailed = false }: { subject: SlimSubject; detailed?: boolean }) {
  const name = subject.nameCN || subject.name;
  const image = detailed ? subject.images?.small : subject.images?.grid;

  return (
    <div className={cx(subjectCard, detailed && subjectCardDetailed)}>
      {image && (
        <Link to={getSubjectLink(subject.id)} noStyle className={subjectCoverLink}>
          <img
            className={cx(subjectCover, detailed ? subjectCoverDetailed : subjectCoverCompact)}
            src={image}
            alt={name}
            loading='lazy'
          />
        </Link>
      )}
      <div className={subjectInfo}>
        <Link to={getSubjectLink(subject.id)} noStyle className={subjectTitle}>
          {name}
        </Link>
        {detailed && subject.info && <div className={subjectMeta}>{subject.info}</div>}
      </div>
    </div>
  );
}

function renderStatus(timeline: Timeline): TimelineContent | null {
  const status = timeline.memo.status;
  if (status?.nickname) {
    return {
      summary: (
        <>
          将昵称修改为
          <strong>{status.nickname.after}</strong>
        </>
      ),
    };
  }
  const text = status?.sign ?? status?.tsukkomi;
  if (text) {
    return { summary: <p className={statusText}>{text}</p> };
  }
  return null;
}

function renderSubject(timeline: Timeline): TimelineContent | null {
  const list = timeline.memo.subject ?? [];
  if (list.length === 0) {
    return null;
  }

  return {
    summary: (
      <>
        {SUBJECT_ACTIONS[timeline.type] ?? '收藏了'}{' '}
        {list.map((item, i) => (
          <React.Fragment key={item.subject.id}>
            {i > 0 && '、'}
            <SubjectName subject={item.subject} original />
          </React.Fragment>
        ))}
      </>
    ),
    attachment: (
      <div className={subjectCards}>
        {list.map((item) => (
          <div key={item.subject.id}>
            {item.comment && <p className={subjectComment}>{item.comment}</p>}
            <SubjectCard subject={item.subject} detailed />
          </div>
        ))}
      </div>
    ),
  };
}

function completedVerb(subjectType: SubjectType): string {
  switch (subjectType) {
    case SubjectType.Book:
      return '读过';
    case SubjectType.Music:
      return '听过';
    case SubjectType.Game:
      return '玩过';
    default:
      return '看过';
  }
}

function renderProgress(timeline: Timeline): TimelineContent | null {
  const progress = timeline.memo.progress;
  if (progress?.single) {
    const { subject, episode } = progress.single;
    return {
      summary: (
        <>
          {timeline.type === 1 ? '想看' : timeline.type === 3 ? '抛弃' : '看过'}{' '}
          <Link to={getEpisodeLink(episode.id)}>
            ep.{episode.sort} {episode.name || episode.nameCN}
          </Link>
        </>
      ),
      attachment: <SubjectCard subject={subject} />,
    };
  }
  if (progress?.batch) {
    const { subject, epsUpdate, epsTotal, volsUpdate, volsTotal } = progress.batch;
    return {
      summary: (
        <>
          {subject.type === SubjectType.Book ? completedVerb(subject.type) : '完成了'}{' '}
          <SubjectName subject={subject} original />{' '}
          {subject.type === SubjectType.Book ? (
            <>
              {volsUpdate != null && volsUpdate > 0 && `第${volsUpdate}卷 `}
              {epsUpdate != null && epsUpdate > 0 && `第${epsUpdate}话`}
            </>
          ) : (
            `${epsUpdate ?? '?'} of ${epsTotal} 话`
          )}
        </>
      ),
      attachment: <SubjectCard subject={subject} />,
    };
  }
  return null;
}

function renderWiki(timeline: Timeline): TimelineContent | null {
  const subject = timeline.memo.wiki?.subject;
  if (!subject) {
    return null;
  }
  return {
    summary: (
      <>
        编辑了
        <SubjectName subject={subject} />
        的维基信息
      </>
    ),
  };
}

function renderBlog(timeline: Timeline): TimelineContent | null {
  const blog = timeline.memo.blog;
  if (!blog) {
    return null;
  }
  return {
    summary: (
      <>
        发表了日志
        <Link to={getBlogLink(blog.id)}>{blog.title}</Link>
      </>
    ),
  };
}

function renderIndex(timeline: Timeline): TimelineContent | null {
  const index = timeline.memo.index;
  if (!index) {
    return null;
  }
  return {
    summary: (
      <>
        更新了目录
        <Link to={getIndexLink(index.id)}>{index.title}</Link>
      </>
    ),
  };
}

function renderMono(timeline: Timeline): TimelineContent | null {
  const mono = timeline.memo.mono;
  if (!mono) {
    return null;
  }
  const names = [...mono.characters.map((c) => c.name), ...mono.persons.map((p) => p.name)].join(
    '、',
  );
  return names ? { summary: <>更新了人物/角色：{names}</> } : null;
}

function renderDaily(timeline: Timeline): TimelineContent | null {
  const daily = timeline.memo.daily;
  if (!daily) {
    return null;
  }
  switch (timeline.type) {
    case 2: {
      // 添加好友
      const names = (daily.users ?? []).map((u) => u.nickname).join('、');
      return names ? { summary: <>和 {names} 成为了好友</> } : null;
    }
    case 3: {
      // 加入小组
      const names = (daily.groups ?? []).map((g) => g.title).join('、');
      return names ? { summary: <>加入了小组 {names}</> } : null;
    }
    case 4: {
      // 创建小组
      const names = (daily.groups ?? []).map((g) => g.title).join('、');
      return names ? { summary: <>创建了小组 {names}</> } : null;
    }
    default:
      return null;
  }
}

function renderContent(timeline: Timeline): TimelineContent | null {
  switch (timeline.cat as TimelineCat) {
    case TimelineCat.Status:
      return renderStatus(timeline);
    case TimelineCat.Subject:
      return renderSubject(timeline);
    case TimelineCat.Progress:
      return renderProgress(timeline);
    case TimelineCat.Wiki:
      return renderWiki(timeline);
    case TimelineCat.Blog:
      return renderBlog(timeline);
    case TimelineCat.Index:
      return renderIndex(timeline);
    case TimelineCat.Mono:
      return renderMono(timeline);
    case TimelineCat.Daily:
      return renderDaily(timeline);
    default:
      return null;
  }
}

function TimelineItem({
  timeline,
  mutate,
}: {
  timeline: Timeline;
  mutate: () => Promise<unknown>;
}) {
  const user = timeline.user;
  if (!user) {
    return null;
  }
  const content = renderContent(timeline);
  if (content == null) {
    return null;
  }

  return (
    <li className={listItem}>
      <Link to={getUserProfileLink(user.username)} className={avatarLink} title={user.nickname}>
        <Avatar src={user.avatar.large} size='small' wrapperClass={avatar} />
      </Link>
      <div className={info}>
        <div>
          <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>{' '}
          <span className={desc}>{content.summary}</span>
        </div>
        {content.attachment}
        <div className={time}>
          {/* 对齐原站 titleTip：hover 相对时间显示绝对时间气泡 */}
          <Tooltip content={DateTime.fromSeconds(timeline.createdAt).toFormat('yyyy-MM-dd HH:mm')}>
            <span>{makeDescriptiveTime(timeline.createdAt)}</span>
          </Tooltip>
          {timeline.source.name != null && (
            <>
              <span> · </span>
              {timeline.source.url ? (
                <Link isExternal to={timeline.source.url} className={sourceLink}>
                  {timeline.source.name}
                </Link>
              ) : (
                <span>{timeline.source.name}</span>
              )}
            </>
          )}
        </div>
        <TimelineReplies timelineId={timeline.id} replyCount={timeline.replies} mutate={mutate} />
      </div>
    </li>
  );
}

type TimelineReply = CommentBase & { replies: CommentBase[] };

/** 时间线回复：展开列表 + 登录用户发表回复（内嵌缩进在时间线下） */
const TimelineReplies: React.FC<{
  timelineId: number;
  replyCount: number;
  mutate: () => Promise<unknown>;
}> = ({ timelineId, replyCount, mutate }) => {
  const { user } = useUser();
  const [expanded, setExpanded] = useState(false);
  const [replies, setReplies] = useState<TimelineReply[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!expanded || loaded) {
      return;
    }
    void ok(ozaClient.getTimelineReplies(timelineId))
      .then((data) => {
        setReplies(data);
        setLoaded(true);
      })
      .catch((error: unknown) => {
        toast(error instanceof Error ? error.message : '加载回复失败', { type: 'error' });
      });
  }, [expanded, loaded, timelineId]);

  const handleSubmit = async () => {
    const value = replyContent.trim();
    if (!value || submitting || !user) {
      return;
    }
    setSubmitting(true);
    try {
      const resp = await ok(
        ozaClient.createTimelineReply(timelineId, {
          content: value,
          turnstileToken: turnstileToken ?? '',
        }),
      );
      setReplyContent('');
      // 乐观追加回复，保证发帖者即时反馈
      setReplies((prev) => [
        ...prev,
        {
          id: resp.id,
          mainID: timelineId,
          creatorID: user.id,
          relatedID: 0,
          createdAt: Math.floor(Date.now() / 1000),
          content: value,
          state: 0,
          user: { ...user, isFriend: false },
          replies: [],
        },
      ]);
      setLoaded(true);
      await mutate();
    } catch (error) {
      toast(error instanceof Error ? error.message : '回复失败，请稍后再试', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button type='button' className={replyToggle} onClick={() => setExpanded((v) => !v)}>
        {expanded ? '收起回复' : `回复${replyCount > 0 ? ` (${replyCount})` : ''}`}
      </button>
      {expanded && (
        <div className={replyArea}>
          {loaded && replies.length === 0 && <p className={replyEmpty}>还没有回复</p>}
          {replies.length > 0 && (
            <ul className={replyList}>
              {replies.map((reply) => (
                <li key={reply.id} className={replyItem}>
                  <span className={replyAvatar}>
                    {reply.user && (
                      <Avatar src={reply.user.avatar.small ?? ''} size='small' alt='' />
                    )}
                  </span>
                  <div className={replyBody}>
                    <div className={replyMeta}>
                      {reply.user && (
                        <Link to={getUserProfileLink(reply.user.username)}>
                          {reply.user.nickname}
                        </Link>
                      )}{' '}
                      <Tooltip
                        content={DateTime.fromSeconds(reply.createdAt).toFormat('yyyy-MM-dd HH:mm')}
                      >
                        <span>{makeDescriptiveTime(reply.createdAt)}</span>
                      </Tooltip>
                    </div>
                    <div>{reply.content}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {user && (
            <div className={replyForm}>
              <textarea
                className={replyInput}
                value={replyContent}
                onChange={(event) => setReplyContent(event.target.value)}
                placeholder='回复这条动态...'
                rows={2}
              />
              <div>
                <button
                  type='button'
                  className={replySubmit}
                  disabled={!replyContent.trim() || submitting}
                  onClick={() => void handleSubmit()}
                >
                  回复
                </button>
                <TurnstileCaptcha action='post_timeline_reply' onToken={setTurnstileToken} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

function matchesFilter(timeline: Timeline, filter: TimelineFilter): boolean {
  if (filter === 'all') {
    return true;
  }
  if (filter === 'status') {
    return timeline.cat === TimelineCat.Status;
  }
  if (filter === 'subject') {
    return timeline.cat === TimelineCat.Subject;
  }
  if (filter === 'progress') {
    return timeline.cat === TimelineCat.Progress;
  }
  if (filter === 'blog') {
    return timeline.cat === TimelineCat.Blog;
  }
  return !PRIMARY_TIMELINE_CATEGORIES.has(timeline.cat);
}

function timelineDay(timestamp: number): string {
  const date = DateTime.fromSeconds(timestamp);
  const now = DateTime.now();
  if (date.hasSame(now, 'day')) {
    return '今天';
  }
  if (date.hasSame(now.minus({ days: 1 }), 'day')) {
    return '昨天';
  }
  return date.toFormat('M月d日');
}

const TimelineBlock: React.FC<{ timeline: Timeline[] }> = ({ timeline }) => {
  const { mutate } = useHomePage();
  const { user } = useUser();
  const [filter, setFilter] = useState<TimelineFilter>('all');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // 新发布的吐槽本地立即插入顶部展示；server 的 inbox 缓存由 debezium 异步更新，
  // 直接重新拉取首页可能还看不到，靠乐观数据保证发帖者即时反馈
  const [optimisticTimeline, setOptimisticTimeline] = useState<Timeline[]>([]);

  const allTimeline = [
    ...optimisticTimeline.filter((o) => !timeline.some((t) => t.id === o.id)),
    ...timeline,
  ];
  const filtered = allTimeline.filter((item) => matchesFilter(item, filter));
  const grouped = new Map<string, Timeline[]>();
  for (const item of filtered) {
    const label = timelineDay(item.createdAt);
    grouped.set(label, [...(grouped.get(label) ?? []), item]);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = content.trim();
    if (!value || submitting || !user) {
      return;
    }
    setSubmitting(true);
    try {
      const resp = await ok(
        ozaClient.createTimelineSay({ content: value, turnstileToken: turnstileToken ?? '' }),
      );
      setContent('');
      setOptimisticTimeline((prev) => [
        {
          id: resp.id,
          uid: user.id,
          user: { ...user, isFriend: false },
          cat: TimelineCat.Status,
          type: 0,
          memo: { status: { tsukkomi: value } },
          batch: false,
          source: { name: 'Next' },
          replies: 0,
          createdAt: Math.floor(Date.now() / 1000),
        },
        ...prev,
      ]);
      await mutate();
    } catch (error) {
      toast(error instanceof Error ? error.message : '发布失败，请稍后再试', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={block}>
      <div className={toolbar}>
        <div className={filters}>
          {TIMELINE_FILTERS.map((item) => (
            <button
              key={item.key}
              type='button'
              data-active={filter === item.key || undefined}
              className={filterBtn}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className={crawl}>抓抓</span>
      </div>
      <form className={composer} onSubmit={(event) => void handleSubmit(event)}>
        <textarea
          className={composerInput}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='说点什么...'
          rows={3}
        />
        <div className={composerActions}>
          <button type='submit' className={submitButton} disabled={!content.trim() || submitting}>
            写好了
          </button>
          <TurnstileCaptcha action='post_timeline' onToken={setTurnstileToken} />
        </div>
      </form>
      {grouped.size === 0 ? (
        <p className={empty}>这里暂时没有动态</p>
      ) : (
        [...grouped.entries()].map(([label, items]) => (
          <div key={label} className={dayGroup}>
            <h3 className={dayTitle}>{label}</h3>
            <ul className={list}>
              {items.map((item) => (
                <TimelineItem key={item.id} timeline={item} mutate={mutate} />
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
};

export default TimelineBlock;
