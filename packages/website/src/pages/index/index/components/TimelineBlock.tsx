import { ok } from '@oazapfts/runtime';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { SlimSubject, Timeline } from '@bangumi/client/client';
import { SubjectType, TimelineCat } from '@bangumi/client/client';
import { Avatar, toast, Typography } from '@bangumi/design';
import {
  getBlogLink,
  getEpisodeLink,
  getIndexLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import TurnstileCaptcha from '@bangumi/website/components/TurnstileCaptcha';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';

import styles from './TimelineBlock.module.less';

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

/** 相对时间，对齐 PHP GlobalCore::make_descriptive_time */
function makeDescriptiveTime(timestamp: number): string {
  const now = DateTime.now();
  const time = DateTime.fromSeconds(timestamp);
  const diffMin = Math.floor(now.diff(time, 'minutes').minutes);
  if (diffMin < 1) {
    return '刚刚';
  }
  if (diffMin < 60) {
    return `${diffMin} 分钟前`;
  }
  const diffHour = Math.floor(now.diff(time, 'hours').hours);
  if (diffHour < 24) {
    return `${diffHour} 小时前`;
  }
  if (now.startOf('day').diff(time.startOf('day'), 'days').days === 1) {
    return '昨天';
  }
  return time.toFormat('MM-dd');
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
    <div className={`${styles.subjectCard} ${detailed ? styles.subjectCardDetailed : ''}`}>
      {image && (
        <Link to={getSubjectLink(subject.id)} noStyle className={styles.subjectCoverLink}>
          <img className={styles.subjectCover} src={image} alt={name} loading='lazy' />
        </Link>
      )}
      <div className={styles.subjectInfo}>
        <Link to={getSubjectLink(subject.id)} noStyle className={styles.subjectTitle}>
          {name}
        </Link>
        {detailed && subject.info && <div className={styles.subjectMeta}>{subject.info}</div>}
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
    return { summary: <p className={styles.statusText}>{text}</p> };
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
      <div className={styles.subjectCards}>
        {list.map((item) => (
          <div key={item.subject.id}>
            {item.comment && <p className={styles.subjectComment}>{item.comment}</p>}
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

function TimelineItem({ timeline }: { timeline: Timeline }) {
  const user = timeline.user;
  if (!user) {
    return null;
  }
  const content = renderContent(timeline);
  if (content == null) {
    return null;
  }

  return (
    <li className={styles.item}>
      <Link
        to={getUserProfileLink(user.username)}
        className={styles.avatarLink}
        title={user.nickname}
      >
        <Avatar src={user.avatar.large} size='small' wrapperClass={styles.avatar} />
      </Link>
      <div className={styles.info}>
        <div className={styles.summary}>
          <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>{' '}
          <span className={styles.desc}>{content.summary}</span>
        </div>
        {content.attachment}
        <div className={styles.time}>
          <span title={DateTime.fromSeconds(timeline.createdAt).toFormat('yyyy-MM-dd HH:mm')}>
            {makeDescriptiveTime(timeline.createdAt)}
          </span>
          {timeline.source.name != null && (
            <>
              <span> · </span>
              {timeline.source.url ? (
                <Link isExternal to={timeline.source.url} className={styles.sourceLink}>
                  {timeline.source.name}
                </Link>
              ) : (
                <span>{timeline.source.name}</span>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

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
  const [filter, setFilter] = useState<TimelineFilter>('all');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const filtered = timeline.filter((item) => matchesFilter(item, filter));
  const grouped = new Map<string, Timeline[]>();
  for (const item of filtered) {
    const label = timelineDay(item.createdAt);
    grouped.set(label, [...(grouped.get(label) ?? []), item]);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = content.trim();
    if (!value || submitting) {
      return;
    }
    setSubmitting(true);
    try {
      await ok(
        ozaClient.createTimelineSay({ content: value, turnstileToken: turnstileToken ?? '' }),
      );
      setContent('');
      await mutate();
    } catch (error) {
      toast(error instanceof Error ? error.message : '发布失败，请稍后再试', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.block}>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {TIMELINE_FILTERS.map((item) => (
            <button
              key={item.key}
              type='button'
              className={`${styles.filter} ${filter === item.key ? styles.filterActive : ''}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className={styles.crawl}>抓抓</span>
      </div>
      <form className={styles.composer} onSubmit={(event) => void handleSubmit(event)}>
        <textarea
          className={styles.composerInput}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='说点什么...'
          rows={3}
        />
        <div className={styles.composerActions}>
          <button
            type='submit'
            className={styles.submitButton}
            disabled={!content.trim() || submitting}
          >
            写好了
          </button>
          <TurnstileCaptcha action='post_timeline' onToken={setTurnstileToken} />
        </div>
      </form>
      {grouped.size === 0 ? (
        <p className={styles.empty}>这里暂时没有动态</p>
      ) : (
        [...grouped.entries()].map(([label, items]) => (
          <div key={label} className={styles.dayGroup}>
            <h3 className={styles.dayTitle}>{label}</h3>
            <ul className={styles.list}>
              {items.map((item) => (
                <TimelineItem key={item.id} timeline={item} />
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
};

export default TimelineBlock;
