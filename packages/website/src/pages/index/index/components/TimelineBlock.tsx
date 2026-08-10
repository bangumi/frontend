import { ok } from '@oazapfts/runtime';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { SlimSubject, Timeline } from '@bangumi/client/client';
import { TimelineCat } from '@bangumi/client/client';
import { Avatar, toast, Typography } from '@bangumi/design';
import {
  getBlogLink,
  getIndexLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
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

function SubjectName({ subject }: { subject: SlimSubject }) {
  return <Link to={getSubjectLink(subject.id)}>{subject.nameCN || subject.name}</Link>;
}

function renderStatus(timeline: Timeline): React.ReactNode {
  const status = timeline.memo.status;
  if (status?.nickname) {
    return (
      <>
        将昵称修改为
        <strong>{status.nickname.after}</strong>
      </>
    );
  }
  const text = status?.sign ?? status?.tsukkomi;
  if (text) {
    return <p className={styles.statusText}>{text}</p>;
  }
  return null;
}

function renderSubject(timeline: Timeline): React.ReactNode {
  const list = timeline.memo.subject ?? [];
  return (
    <>
      {list.map((item, i) => (
        <span key={i}>
          {i > 0 && '、'}
          <SubjectName subject={item.subject} />
        </span>
      ))}
      已收藏
      {list[0]?.comment && <p className={styles.statusText}>{list[0].comment}</p>}
    </>
  );
}

function renderProgress(timeline: Timeline): React.ReactNode {
  const progress = timeline.memo.progress;
  if (progress?.single) {
    const { subject, episode } = progress.single;
    return (
      <>
        看过
        <SubjectName subject={subject} />第 {episode.sort} 话
      </>
    );
  }
  if (progress?.batch) {
    const { subject, epsUpdate, epsTotal, volsUpdate, volsTotal } = progress.batch;
    return (
      <>
        更新了
        <SubjectName subject={subject} />
        的进度到 {epsUpdate ?? '?'}/{epsTotal}
        {volsTotal ? ` (${volsUpdate ?? '?'}/${volsTotal} 卷)` : ''}
      </>
    );
  }
  return null;
}

function renderWiki(timeline: Timeline): React.ReactNode {
  const subject = timeline.memo.wiki?.subject;
  if (!subject) {
    return null;
  }
  return (
    <>
      编辑了
      <SubjectName subject={subject} />
      的维基信息
    </>
  );
}

function renderBlog(timeline: Timeline): React.ReactNode {
  const blog = timeline.memo.blog;
  if (!blog) {
    return null;
  }
  return (
    <>
      发表了日志
      <Link to={getBlogLink(blog.id)}>{blog.title}</Link>
    </>
  );
}

function renderIndex(timeline: Timeline): React.ReactNode {
  const index = timeline.memo.index;
  if (!index) {
    return null;
  }
  return (
    <>
      更新了目录
      <Link to={getIndexLink(index.id)}>{index.title}</Link>
    </>
  );
}

function renderMono(timeline: Timeline): React.ReactNode {
  const mono = timeline.memo.mono;
  if (!mono) {
    return null;
  }
  const names = [...mono.characters.map((c) => c.name), ...mono.persons.map((p) => p.name)].join(
    '、',
  );
  return names ? <>更新了人物/角色：{names}</> : null;
}

function renderDaily(timeline: Timeline): React.ReactNode {
  const daily = timeline.memo.daily;
  if (!daily) {
    return null;
  }
  const names = [
    ...(daily.groups ?? []).map((g) => g.title),
    ...(daily.users ?? []).map((u) => u.nickname),
  ].join('、');
  return names ? <>更新了每日推荐：{names}</> : null;
}

function renderDesc(timeline: Timeline): React.ReactNode {
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
  const desc = renderDesc(timeline);
  if (desc == null) {
    return null;
  }

  return (
    <li className={styles.item}>
      <Link
        to={getUserProfileLink(user.username)}
        className={styles.avatarLink}
        title={user.nickname}
      >
        <Avatar src={user.avatar.large} size='medium' />
      </Link>
      <div className={styles.info}>
        <div>
          <Link to={getUserProfileLink(user.username)} fontWeight='bold'>
            {user.nickname}
          </Link>{' '}
          <span className={styles.desc}>{desc}</span>
        </div>
        <div className={styles.time}>
          <span title={DateTime.fromSeconds(timeline.createdAt).toFormat('yyyy-MM-dd HH:mm')}>
            {makeDescriptiveTime(timeline.createdAt)}
          </span>
          {timeline.source.name != null && <span> · {timeline.source.name}</span>}
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
      await ok(ozaClient.createTimelineSay({ content: value, turnstileToken: '' }));
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
