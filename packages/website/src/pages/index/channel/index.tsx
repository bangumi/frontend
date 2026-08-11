import React from 'react';
import { Link } from 'react-router-dom';

import type {
  ChannelSubjectTopic,
  CollectionType,
  FriendSubjectCollectionActivity,
  SlimBlogEntry,
  SubjectTag,
  TrendingSubject,
} from '@bangumi/client/client';
import { CollectionType as CollectionTypeEnum } from '@bangumi/client/client';
import {
  getBlogLink,
  getSubjectLink,
  getSubjectTopicLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useChannel } from '@bangumi/website/hooks/use-channel';

import type { ChannelConfig, ChannelKey } from './config';
import { CHANNEL_CONFIGS } from './config';
import styles from './style.module.less';

function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp * 1000));
}

function getCollectionLabel(type: CollectionType, verb: ChannelConfig['verb']): string {
  switch (type) {
    case CollectionTypeEnum.Wish:
      return `想${verb}`;
    case CollectionTypeEnum.Collect:
      return `${verb}过`;
    case CollectionTypeEnum.Doing:
      return `在${verb}`;
    case CollectionTypeEnum.OnHold:
      return '搁置';
    case CollectionTypeEnum.Dropped:
      return '抛弃';
  }
}

function getTagLevel(count: number, tags: SubjectTag[]): number {
  const counts = tags.map((tag) => tag.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  if (min === max) {
    return 3;
  }

  return Math.min(5, Math.floor(((count - min) / (max - min)) * 5) + 1);
}

function TrendingSubjects({
  subjects,
  config,
}: {
  subjects: TrendingSubject[];
  config: ChannelConfig;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Link to={`/${config.key}/browser?sort=trends`}>注目{config.title}</Link>
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

function FriendActivityList({
  activities,
  config,
}: {
  activities: FriendSubjectCollectionActivity[];
  config: ChannelConfig;
}) {
  if (activities.length === 0) {
    return <p className={styles.emptyText}>最近还没有好友收藏动态</p>;
  }

  return (
    <ul className={styles.friendList}>
      {activities.map((activity) => {
        const subjectName = activity.subject.nameCN || activity.subject.name;

        return (
          <li
            key={`${activity.user.id}-${activity.subject.id}-${activity.updatedAt}`}
            className={styles.friendItem}
          >
            <Link to={getUserProfileLink(activity.user.username)} className={styles.avatarLink}>
              <img src={activity.user.avatar.small} alt='' loading='lazy' />
            </Link>
            <div className={styles.friendContent}>
              <div>
                <Link to={getUserProfileLink(activity.user.username)}>
                  {activity.user.nickname}
                </Link>
                <span>{getCollectionLabel(activity.collectionType, config.verb)}</span>
                <Link to={getSubjectLink(activity.subject.id)} title={subjectName}>
                  {subjectName}
                </Link>
              </div>
              <time dateTime={new Date(activity.updatedAt * 1000).toISOString()}>
                {formatTime(activity.updatedAt)}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TopicList({ topics, config }: { topics: ChannelSubjectTopic[]; config: ChannelConfig }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>所有{config.title}的最新讨论</h2>
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
                  {formatTime(topic.updatedAt)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ChannelBlogs({ blogs, config }: { blogs: SlimBlogEntry[]; config: ChannelConfig }) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className={styles.sidePanel}>
      <h2>
        {config.title}日志
        <small>
          <Link to={`/${config.key}/blog`}>more</Link>
        </small>
      </h2>
      <ul className={styles.blogList}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={getBlogLink(blog.id)} className={styles.blogTitle} title={blog.title}>
              {blog.title}
            </Link>
            <div className={styles.blogMeta}>
              {blog.user ? (
                <Link to={getUserProfileLink(blog.user.username)}>{blog.user.nickname}</Link>
              ) : (
                <span>Chobits</span>
              )}
              <time dateTime={new Date(blog.createdAt * 1000).toISOString()}>
                {formatTime(blog.createdAt)}
              </time>
              {blog.replies > 0 && <span>{blog.replies} 回复</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ChannelSidebar({
  tags,
  blogs,
  config,
}: {
  tags: SubjectTag[];
  blogs: SlimBlogEntry[];
  config: ChannelConfig;
}) {
  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidePanel}>
        <h2>分类浏览</h2>
        <nav aria-label={`${config.title}分类`}>
          <ul className={styles.groupedLinks}>
            {config.categories.map((category) => (
              <li key={category.path}>
                <Link to={category.path}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <h2>频道导航</h2>
        <nav aria-label={`${config.title}频道导航`}>
          <ul className={styles.groupedLinks}>
            {config.links.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <ChannelBlogs blogs={blogs} config={config} />

      {tags.length > 0 && (
        <section className={styles.sidePanel}>
          <h2>
            标签汇总
            <small>
              <Link to={`/${config.key}/tag`}>more</Link>
            </small>
          </h2>
          <div className={styles.tagCloud}>
            {tags.map((tag) => (
              <Link
                key={tag.name}
                to={`/${config.key}/tag/${encodeURIComponent(tag.name)}`}
                className={styles[`tagLevel${getTagLevel(tag.count, tags)}`]}
                title={`${tag.count.toLocaleString()} 个条目`}
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

export interface ChannelPageData {
  subjects: TrendingSubject[];
  topics: ChannelSubjectTopic[];
  blogs: SlimBlogEntry[];
  tags: SubjectTag[];
  friendActivities: FriendSubjectCollectionActivity[];
  showFriendActivities: boolean;
}

export function ChannelPageContent({
  config,
  data,
}: {
  config: ChannelConfig;
  data: ChannelPageData;
}) {
  return (
    <PageContainer as='main' className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>
          <span>{config.title}</span>频道
        </h1>
      </header>
      <div className={styles.columns}>
        <div className={styles.mainColumn}>
          <TrendingSubjects subjects={data.subjects} config={config} />
          {data.showFriendActivities && (
            <>
              <div className={styles.divider} />
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>好友动态</h2>
                <FriendActivityList activities={data.friendActivities} config={config} />
              </section>
            </>
          )}
          <div className={styles.divider} />
          <TopicList topics={data.topics} config={config} />
        </div>
        <ChannelSidebar tags={data.tags} blogs={data.blogs} config={config} />
      </div>
    </PageContainer>
  );
}

function ChannelIndex({ channel }: { channel: ChannelKey }) {
  const config = CHANNEL_CONFIGS[channel];
  const data = useChannel(config);

  return (
    <>
      <Helmet title={config.title} />
      <ChannelPageContent config={config} data={data} />
    </>
  );
}

export default withErrorBoundary(ChannelIndex);
