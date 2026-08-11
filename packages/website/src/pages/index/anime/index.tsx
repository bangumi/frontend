import React from 'react';
import { Link } from 'react-router-dom';

import type { SubjectTopic, TrendingSubject } from '@bangumi/client/client';
import { getSubjectLink, getSubjectTopicLink, getUserProfileLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useAnimeChannel } from '@bangumi/website/hooks/use-anime-channel';

import styles from './style.module.less';

const ANIME_CATEGORIES = [
  { label: '全部', path: '/anime/browser' },
  { label: 'TV', path: '/anime/browser/platform/tv' },
  { label: 'WEB', path: '/anime/browser/platform/web' },
  { label: 'OVA', path: '/anime/browser/platform/ova' },
  { label: '剧场版', path: '/anime/browser/platform/movie' },
] as const;

const CHANNEL_LINKS = [
  { label: '排行榜', path: '/anime/chart' },
  { label: '每日放送', path: '/calendar' },
  { label: '动画日志', path: '/anime/blog' },
] as const;

function formatTopicTime(timestamp: number): string {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp * 1000));
}

function getPopularTags(subjects: TrendingSubject[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const { subject } of subjects) {
    for (const tag of subject.metaTags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
    .slice(0, 24);
}

function TrendingSubjects({ subjects }: { subjects: TrendingSubject[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Link to='/anime/browser?sort=trends'>注目动画</Link>
        <small>根据最近 30 日标记</small>
      </h2>
      <div className={styles.subjectScroller}>
        {subjects.map(({ subject, count }) => {
          const displayName = subject.nameCN || subject.name;

          return (
            <article key={subject.id} className={styles.subjectCard}>
              <Link
                to={getSubjectLink(subject.id)}
                className={styles.coverLink}
                title={displayName}
              >
                {subject.images ? (
                  <img src={subject.images.grid} alt='' className={styles.cover} loading='eager' />
                ) : (
                  <span className={styles.coverFallback}>{displayName.slice(0, 1)}</span>
                )}
              </Link>
              <Link
                to={getSubjectLink(subject.id)}
                className={styles.subjectTitle}
                title={displayName}
              >
                {displayName}
              </Link>
              <small className={styles.subjectCount}>{count.toLocaleString()} 人关注</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TopicList({ topics }: { topics: SubjectTopic[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>所有动画的最新讨论</h2>
      <ul className={styles.topicList}>
        {topics.map((topic) => {
          const subjectName = topic.subject.nameCN || topic.subject.name;

          return (
            <li key={topic.id} className={styles.topicItem}>
              <div className={styles.topicContent}>
                <Link
                  to={getSubjectTopicLink(topic.id)}
                  className={styles.topicTitle}
                  title={topic.title}
                >
                  {topic.title}
                </Link>
                <small className={styles.topicReplies}>(+{topic.replyCount})</small>
                <Link to={getSubjectLink(topic.subject.id)} className={styles.topicSubject}>
                  “{subjectName}”
                </Link>
              </div>
              <div className={styles.topicMeta}>
                {topic.creator ? (
                  <Link to={getUserProfileLink(topic.creator.username)}>
                    {topic.creator.nickname}
                  </Link>
                ) : (
                  <span>Chobits</span>
                )}
                <time dateTime={new Date(topic.updatedAt * 1000).toISOString()}>
                  {formatTopicTime(topic.updatedAt)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ChannelSidebar({ subjects }: { subjects: TrendingSubject[] }) {
  const tags = getPopularTags(subjects);

  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidePanel}>
        <h2>分类浏览</h2>
        <nav aria-label='动画分类'>
          <ul className={styles.groupedLinks}>
            {ANIME_CATEGORIES.map((category) => (
              <li key={category.path}>
                <Link to={category.path}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <h2>频道导航</h2>
        <nav aria-label='动画频道导航'>
          <ul className={styles.groupedLinks}>
            {CHANNEL_LINKS.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {tags.length > 0 && (
        <section className={styles.sidePanel}>
          <h2>
            标签汇总
            <small>
              <Link to='/anime/tag'>more</Link>
            </small>
          </h2>
          <div className={styles.tagCloud}>
            {tags.map((tag) => (
              <Link
                key={tag.name}
                to={`/anime/tag/${encodeURIComponent(tag.name)}`}
                className={styles['tagLevel' + Math.min(tag.count, 5)]}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}

export function AnimeChannel({
  subjects,
  topics,
}: {
  subjects: TrendingSubject[];
  topics: SubjectTopic[];
}) {
  return (
    <PageContainer as='main' className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>
          <span>动画</span>频道
        </h1>
      </header>
      <div className={styles.columns}>
        <div className={styles.mainColumn}>
          <TrendingSubjects subjects={subjects} />
          <div className={styles.divider} />
          <TopicList topics={topics} />
        </div>
        <ChannelSidebar subjects={subjects} />
      </div>
    </PageContainer>
  );
}

function AnimeIndex() {
  const data = useAnimeChannel();

  return (
    <>
      <Helmet title='动画' />
      <AnimeChannel subjects={data.subjects} topics={data.topics} />
    </>
  );
}

export default withErrorBoundary(AnimeIndex);
