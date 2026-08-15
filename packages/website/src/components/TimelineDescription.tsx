import React from 'react';

import type { SlimSubject, Timeline } from '@bangumi/client/client';
import { TimelineCat } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import {
  getBlogLink,
  getIndexLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';

const { Link } = Typography;

const statusText = css({
  color: '#595555',
  margin: '2px 0 0',
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-wrap',
});

/** 相对时间，对齐 PHP GlobalCore::make_descriptive_time（如「1小时25分钟前」「3天2小时前」） */
export function makeDescriptiveTime(timestamp: number): string {
  const YEAR = 86400 * 365;
  const MONTH = 86400 * 30;
  const DAY = 86400;
  const HOUR = 3600;
  const MINUTE = 60;

  const diff = Math.floor(Date.now() / 1000) - timestamp;

  if (diff > YEAR) {
    const years = Math.floor(diff / YEAR);
    const rest = diff - years * YEAR;
    if (rest > MONTH) {
      return `${years}年${Math.floor(rest / MONTH)}月前`;
    }
    return `${years}年前`;
  }
  if (diff > MONTH) {
    const months = Math.floor(diff / MONTH);
    const rest = diff - months * MONTH;
    if (rest > DAY) {
      return `${months}月${Math.floor(rest / DAY)}天前`;
    }
    return `${months}月前`;
  }
  if (diff > DAY) {
    const days = Math.floor(diff / DAY);
    const rest = diff - days * DAY;
    if (rest > HOUR) {
      return `${days}天${Math.floor(rest / HOUR)}小时前`;
    }
    return `${days}天前`;
  }
  if (diff > HOUR) {
    const hours = Math.floor(diff / HOUR);
    const rest = diff - hours * HOUR;
    if (rest > MINUTE) {
      return `${hours}小时${Math.floor(rest / MINUTE)}分钟前`;
    }
    return `${hours}小时前`;
  }
  if (diff > MINUTE) {
    const minutes = Math.floor(diff / MINUTE);
    const seconds = diff % MINUTE;
    if (seconds > 0) {
      return `${minutes}分${seconds}秒前`;
    }
    return `${minutes}分钟前`;
  }
  return `${diff}秒前`;
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
    return <p className={statusText}>{text}</p>;
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
      {list[0]?.comment && <p className={statusText}>{list[0].comment}</p>}
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

/** 渲染单条时间线的描述文本 */
export function renderTimelineDescription(timeline: Timeline): React.ReactNode {
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

/** 时间线条目内的用户昵称链接 */
export function renderTimelineUserName(user: {
  username: string;
  nickname: string;
}): React.ReactNode {
  return (
    <Link to={getUserProfileLink(user.username)} fontWeight='bold'>
      {user.nickname}
    </Link>
  );
}
