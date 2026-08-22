import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

import type {
  ChannelSubjectTopic,
  CollectionType,
  FriendSubjectCollectionActivity,
  SlimBlogEntry,
  SubjectTag,
  TrendingSubject,
} from '@bangumi/client/client.ts';
import { CollectionType as CollectionTypeEnum } from '@bangumi/client/client.ts';
import { css } from '@bangumi/styled-system/css';
import {
  getBlogLink,
  getSubjectLink,
  getSubjectTopicLink,
  getUserProfileLink,
} from '@bangumi/utils/pages.ts';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import {
  useChannelBlogs,
  useChannelSubjectTopics,
  useChannelTags,
  useFriendActivities,
  useTrendingSubjects,
} from '@bangumi/website/hooks/use-channel.ts';

import type { ChannelConfig, ChannelKey } from './config.ts';
import { CHANNEL_CONFIGS } from './config.ts';

const page = css({
  padding: '15px 15px 32px',
  '@media (max-width: 640px)': {
    padding: '14px 15px 24px',
  },
});

const pageHeader = css({
  padding: '0 0 10px',
  '& h1': {
    display: 'inline',
    margin: '0',
    color: '#595555',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  '& span': {
    color: '#f09199',
  },
  '@media (max-width: 640px)': {
    paddingBottom: '8px',
  },
});

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 280px',
  gap: '15px',
  alignItems: 'start',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'minmax(0, 1fr) 240px',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

const mainColumn = css({
  minWidth: '0',
  paddingTop: '5px',
});

const section = css({ minWidth: '0' });

const sectionTitle = css({
  margin: '0 0 5px',
  color: '#595555',
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '1.4',
  letterSpacing: '0',
  '& a': {
    color: '#54b5df',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
  },
  '& small': {
    marginLeft: '7px',
    color: '#9f9b9b',
    fontSize: '11px',
  },
});

const subjectScroller = css({
  display: 'flex',
  gap: '5px',
  overflowX: 'auto',
  padding: '0 0 7px',
  scrollbarColor: '#e8e3e3 transparent',
  scrollbarWidth: 'thin',
});

const subjectCard = css({
  flex: '0 0 100px',
  minWidth: '0',
});

const coverLink = css({
  display: 'block',
  width: '100px',
  height: '100px',
  overflow: 'hidden',
  background: '#e8e3e3',
  borderRadius: '8px',
  boxShadow: 'inset 0 0 2px #9f9b9b',
});

const cover = css({
  display: 'block',
  width: '100px',
  height: '100px',
  objectFit: 'cover',
});

const coverFallback = css({
  display: 'grid',
  width: '100px',
  height: '100px',
  placeItems: 'center',
  color: '#fff',
  background: '#595555',
  fontSize: '28px',
});

const subjectTitle = css({
  minHeight: '33px',
  marginTop: '5px',
  overflow: 'hidden',
  color: '#54b5df',
  fontSize: '12px',
  lineHeight: '1.35',
  textDecoration: 'none',
  overflowWrap: 'anywhere',
  _hover: { color: '#f09199' },
});

// line-clamp（-webkit-box-orient 不在 Panda 属性白名单，用 style prop）
const subjectTitleLineClamp = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
} as const;

const subjectCount = css({
  display: 'block',
  marginTop: '2px',
  color: '#9f9b9b',
  fontSize: '10px',
  lineHeight: '1.2',
});

const divider = css({
  height: '10px',
  margin: '10px 0 5px',
  borderTop: '1px solid #e8e3e3',
});

const friendList = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '2px 16px',
  padding: '0',
  margin: '0',
  listStyle: 'none',
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

const friendItem = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  minWidth: '0',
  minHeight: '48px',
  padding: '5px 6px',
  boxSizing: 'border-box',
  borderBottom: '1px solid #e8e3e3',
});

const avatarLink = css({
  flex: '0 0 32px',
  '& img': {
    display: 'block',
    width: '32px',
    height: '32px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
});

const friendContent = css({
  minWidth: '0',
  color: '#9f9b9b',
  fontSize: '11px',
  lineHeight: '1.45',
  '& div': {
    display: 'flex',
    minWidth: '0',
    gap: '4px',
  },
  '& a': {
    overflow: 'hidden',
    color: '#54b5df',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
    '&:first-child': {
      flex: '0 1 auto',
    },
    '&:last-child': {
      flex: '1 1 auto',
    },
  },
  '& span': {
    flex: '0 0 auto',
  },
  '& time': {
    display: 'block',
    marginTop: '1px',
    color: '#9f9b9b',
  },
});

const emptyText = css({
  margin: '8px 6px 14px',
  color: '#9f9b9b',
  fontSize: '12px',
});

const topicList = css({
  padding: '0',
  margin: '0 0 23px',
  listStyle: 'none',
});

const topicItem = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 150px',
  gap: '12px',
  alignItems: 'center',
  minHeight: '48px',
  padding: '7px 6px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  _even: {
    background: '#fff6f7',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: '2px',
    padding: '8px 6px',
  },
});

const topicContent = css({
  minWidth: '0',
  lineHeight: '1.35',
});

const topicTitle = css({
  color: '#54b5df',
  fontSize: '13px',
  textDecoration: 'none',
  overflowWrap: 'anywhere',
  _hover: { color: '#f09199' },
});

const topicReplies = css({
  marginLeft: '4px',
  color: '#9f9b9b',
  fontSize: '10px',
});

const topicSubject = css({
  display: 'block',
  maxWidth: '100%',
  marginTop: '2px',
  overflow: 'hidden',
  color: '#9f9b9b',
  fontSize: '11px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  _hover: { color: '#54b5df' },
});

const topicMeta = css({
  minWidth: '0',
  color: '#9f9b9b',
  fontSize: '11px',
  lineHeight: '1.4',
  textAlign: 'right',
  '& a': {
    display: 'block',
    overflow: 'hidden',
    color: '#595555',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    _hover: { color: '#54b5df' },
  },
  '& time': {
    display: 'block',
  },
  '@media (max-width: 640px)': {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    '& a, & time': {
      display: 'inline',
    },
  },
});

const sidebar = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minWidth: '0',
  paddingTop: '5px',
  '@media (max-width: 768px)': {
    paddingTop: '0',
  },
});

const sidePanel = css({
  overflow: 'hidden',
  padding: '5px 0 7px',
  background: '#fff6f7',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
  '& h2': {
    margin: '0 5px 2px',
    padding: '5px 10px',
    color: '#595555',
    background: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.35',
    letterSpacing: '0',
    '& small': {
      marginLeft: '5px',
      fontSize: '11px',
    },
    '& a': {
      color: '#54b5df',
      textDecoration: 'none',
    },
  },
});

const groupedLinks = css({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0',
  padding: '5px 5px 5px 10px',
  listStyle: 'none',
  '& a': {
    display: 'block',
    minWidth: '30px',
    padding: '8px',
    boxSizing: 'border-box',
    color: '#54b5df',
    borderRadius: '999px',
    fontSize: '13px',
    textAlign: 'center',
    textDecoration: 'none',
    _hover: {
      color: '#fff',
      background: '#f09199',
    },
  },
});

const blogList = css({
  padding: '2px 14px 5px',
  margin: '0',
  listStyle: 'none',
  '& li': {
    padding: '8px 0',
    borderBottom: '1px solid #e8e3e3',
    '&:last-child': {
      borderBottom: '0',
    },
  },
});

const blogTitle = css({
  overflow: 'hidden',
  color: '#54b5df',
  fontSize: '12px',
  lineHeight: '1.45',
  textDecoration: 'none',
  overflowWrap: 'anywhere',
  _hover: { color: '#f09199' },
});

const blogTitleLineClamp = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
} as const;

const blogMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3px 7px',
  marginTop: '3px',
  color: '#9f9b9b',
  fontSize: '10px',
  lineHeight: '1.35',
  '& a': {
    overflow: 'hidden',
    maxWidth: '100px',
    color: '#595555',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    _hover: { color: '#54b5df' },
  },
});

const tagCloud = css({
  padding: '7px 14px 9px',
  lineHeight: '1.9',
  '& a': {
    display: 'inline-block',
    marginRight: '9px',
    color: '#54b5df',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
  },
});

const tagLevel1 = css({
  fontSize: '11px',
  opacity: '0.7',
});

const tagLevel2 = css({
  fontSize: '12px',
  opacity: '0.8',
});

const tagLevel3 = css({ fontSize: '13px' });

const tagLevel4 = css({ fontSize: '14px' });

const tagLevel5 = css({ fontSize: '14px' });

const TAG_LEVEL_STYLES: Record<number, string> = {
  1: tagLevel1,
  2: tagLevel2,
  3: tagLevel3,
  4: tagLevel4,
  5: tagLevel5,
};

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
    <section className={section}>
      <h2 className={sectionTitle}>
        <Link to={`/${config.key}/browser?sort=trends`}>注目{config.title}</Link>
        <small>根据最近 30 日标记</small>
      </h2>
      <div className={subjectScroller}>
        {subjects.map(({ subject, count }) => {
          const displayName = subject.nameCN || subject.name;

          return (
            <article key={subject.id} className={subjectCard}>
              <Link to={getSubjectLink(subject.id)} className={coverLink} title={displayName}>
                {subject.images ? (
                  <img src={subject.images.grid} alt='' className={cover} loading='eager' />
                ) : (
                  <span className={coverFallback}>{displayName.slice(0, 1)}</span>
                )}
              </Link>
              <Link
                to={getSubjectLink(subject.id)}
                className={subjectTitle}
                style={subjectTitleLineClamp}
                title={displayName}
              >
                {displayName}
              </Link>
              <small className={subjectCount}>{count.toLocaleString()} 人关注</small>
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
    return <p className={emptyText}>最近还没有好友收藏动态</p>;
  }

  return (
    <ul className={friendList}>
      {activities.map((activity) => {
        const subjectName = activity.subject.nameCN || activity.subject.name;

        return (
          <li
            key={`${activity.user.id}-${activity.subject.id}-${activity.updatedAt}`}
            className={friendItem}
          >
            <Link to={getUserProfileLink(activity.user.username)} className={avatarLink}>
              <img src={activity.user.avatar.small} alt='' loading='lazy' />
            </Link>
            <div className={friendContent}>
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
    <section className={section}>
      <h2 className={sectionTitle}>所有{config.title}的最新讨论</h2>
      <ul className={topicList}>
        {topics.map((topic) => {
          const subjectName = topic.subject.nameCN || topic.subject.name;

          return (
            <li key={topic.id} className={topicItem}>
              <div className={topicContent}>
                <Link to={getSubjectTopicLink(topic.id)} className={topicTitle} title={topic.title}>
                  {topic.title}
                </Link>
                <small className={topicReplies}>(+{topic.replyCount})</small>
                <Link to={getSubjectLink(topic.subject.id)} className={topicSubject}>
                  “{subjectName}”
                </Link>
              </div>
              <div className={topicMeta}>
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
    <section className={sidePanel}>
      <h2>
        {config.title}日志
        <small>
          <Link to={`/${config.key}/blog`}>more</Link>
        </small>
      </h2>
      <ul className={blogList}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              to={getBlogLink(blog.id)}
              className={blogTitle}
              style={blogTitleLineClamp}
              title={blog.title}
            >
              {blog.title}
            </Link>
            <div className={blogMeta}>
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
  config,
  blogSection,
  tagSection,
}: {
  config: ChannelConfig;
  blogSection: React.ReactNode;
  tagSection: React.ReactNode;
}) {
  return (
    <aside className={sidebar}>
      <section className={sidePanel}>
        <h2>分类浏览</h2>
        <nav aria-label={`${config.title}分类`}>
          <ul className={groupedLinks}>
            {config.categories.map((category) => (
              <li key={category.path}>
                <Link to={category.path}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <h2>频道导航</h2>
        <nav aria-label={`${config.title}频道导航`}>
          <ul className={groupedLinks}>
            {config.links.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {blogSection}

      {tagSection}
    </aside>
  );
}

function ChannelTags({ tags, config }: { tags: SubjectTag[]; config: ChannelConfig }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <section className={sidePanel}>
      <h2>
        标签汇总
        <small>
          <Link to={`/${config.key}/tag`}>more</Link>
        </small>
      </h2>
      <div className={tagCloud}>
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/${config.key}/tag/${encodeURIComponent(tag.name)}`}
            className={TAG_LEVEL_STYLES[getTagLevel(tag.count, tags)]}
            title={`${tag.count.toLocaleString()} 个条目`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

/** 频道页整体框架：页头 + 主列 + 侧栏 */
function ChannelFrame({
  config,
  main,
  sidebar,
}: {
  config: ChannelConfig;
  main: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <PageContainer as='main' className={page}>
      <header className={pageHeader}>
        <h1>
          <span>{config.title}</span>频道
        </h1>
      </header>
      <div className={columns}>
        <div className={mainColumn}>{main}</div>
        {sidebar}
      </div>
    </PageContainer>
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
    <ChannelFrame
      config={config}
      main={
        <>
          <TrendingSubjects subjects={data.subjects} config={config} />
          {data.showFriendActivities && (
            <>
              <div className={divider} />
              <section className={section}>
                <h2 className={sectionTitle}>好友动态</h2>
                <FriendActivityList activities={data.friendActivities} config={config} />
              </section>
            </>
          )}
          <div className={divider} />
          <TopicList topics={data.topics} config={config} />
        </>
      }
      sidebar={
        <ChannelSidebar
          config={config}
          blogSection={<ChannelBlogs blogs={data.blogs} config={config} />}
          tagSection={<ChannelTags tags={data.tags} config={config} />}
        />
      }
    />
  );
}

/** 各区块独立数据加载：某个接口慢只阻塞自身，不影响其他区块 */
function TrendingSubjectsSection({ config }: { config: ChannelConfig }) {
  const subjects = useTrendingSubjects(config.type);
  return <TrendingSubjects subjects={subjects} config={config} />;
}

function TopicListSection({ config }: { config: ChannelConfig }) {
  const topics = useChannelSubjectTopics(config.type);
  return <TopicList topics={topics} config={config} />;
}

function FriendActivitySection({ config }: { config: ChannelConfig }) {
  const { friendActivities, showFriendActivities } = useFriendActivities(config.type);
  if (!showFriendActivities) {
    return null;
  }

  return (
    <>
      <div className={divider} />
      <section className={section}>
        <h2 className={sectionTitle}>好友动态</h2>
        <FriendActivityList activities={friendActivities} config={config} />
      </section>
    </>
  );
}

function BlogSection({ config }: { config: ChannelConfig }) {
  const blogs = useChannelBlogs(config.type);
  return <ChannelBlogs blogs={blogs} config={config} />;
}

function TagSection({ config }: { config: ChannelConfig }) {
  const tags = useChannelTags(config.type);
  return <ChannelTags tags={tags} config={config} />;
}

function ChannelIndex({ channel }: { channel: ChannelKey }) {
  const config = CHANNEL_CONFIGS[channel];

  return (
    <>
      <Helmet title={config.title} />
      <ChannelFrame
        config={config}
        main={
          <>
            <Suspense fallback={null}>
              <TrendingSubjectsSection config={config} />
            </Suspense>
            <Suspense fallback={null}>
              <FriendActivitySection config={config} />
            </Suspense>
            <Suspense fallback={null}>
              <TopicListSection config={config} />
            </Suspense>
          </>
        }
        sidebar={
          <ChannelSidebar
            config={config}
            blogSection={
              <Suspense fallback={null}>
                <BlogSection config={config} />
              </Suspense>
            }
            tagSection={
              <Suspense fallback={null}>
                <TagSection config={config} />
              </Suspense>
            }
          />
        }
      />
    </>
  );
}

export default withErrorBoundary(ChannelIndex);
