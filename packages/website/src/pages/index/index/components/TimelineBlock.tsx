import dayjs from 'dayjs';
import React from 'react';

import type { SlimSubject, Timeline } from '@bangumi/client/client';
import { TimelineCat } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { getSubjectLink, getUserProfileLink } from '@bangumi/utils/pages';

import styles from './TimelineBlock.module.less';

const { Link } = Typography;

/** 相对时间，对齐 PHP GlobalCore::make_descriptive_time */
function makeDescriptiveTime(timestamp: number): string {
  const now = dayjs();
  const time = dayjs.unix(timestamp);
  const diffMin = now.diff(time, 'minute');
  if (diffMin < 1) {
    return '刚刚';
  }
  if (diffMin < 60) {
    return `${diffMin} 分钟前`;
  }
  const diffHour = now.diff(time, 'hour');
  if (diffHour < 24) {
    return `${diffHour} 小时前`;
  }
  if (now.startOf('day').diff(time.startOf('day'), 'day') === 1) {
    return '昨天';
  }
  return time.format('MM-DD');
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
      <Link to={`https://bgm.tv/blog/${blog.id}`} target='_blank' rel='noopener noreferrer'>
        {blog.title}
      </Link>
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
      <Link to={`https://bgm.tv/index/${index.id}`} target='_blank' rel='noopener noreferrer'>
        {index.title}
      </Link>
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
        isExternal
        className={styles.avatarLink}
        title={user.nickname}
      >
        <Avatar src={user.avatar.large} size='medium' />
      </Link>
      <div className={styles.info}>
        <div>
          <Link to={getUserProfileLink(user.username)} isExternal fontWeight='bold'>
            {user.nickname}
          </Link>{' '}
          <span className={styles.desc}>{desc}</span>
        </div>
        <div className={styles.time}>
          <span title={dayjs.unix(timeline.createdAt).format('YYYY-MM-DD HH:mm')}>
            {makeDescriptiveTime(timeline.createdAt)}
          </span>
          {timeline.source.name != null && <span> · {timeline.source.name}</span>}
        </div>
      </div>
    </li>
  );
}

const TimelineBlock: React.FC<{ timeline: Timeline[] }> = ({ timeline }) => {
  if (timeline.length === 0) {
    return null;
  }
  return (
    <section className={styles.block}>
      <h2 className={styles.title}>抓抓</h2>
      <ul className={styles.list}>
        {timeline.map((item) => (
          <TimelineItem key={item.id} timeline={item} />
        ))}
      </ul>
    </section>
  );
};

export default TimelineBlock;
