import dayjs from 'dayjs';
import type { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Layout, Typography } from '@bangumi/design';
import RichContent from '@bangumi/design/components/RichContent';
import { css } from '@bangumi/styled-system/css';
import { getUserBlogsPageLink, getUserProfileLink } from '@bangumi/utils/pages';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import useBlogEntry, {
  useBlogComments,
  useBlogRelatedSubjects,
} from '@bangumi/website/hooks/use-blog';
import { useUser } from '@bangumi/website/hooks/use-user';

import BlogComments from './components/BlogComments';
import RelatedSubjects from './components/RelatedSubjects';

const { Link } = Typography;

const entryContainer = css({
  marginBottom: '20px',
});

const authorRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#9f9b9b',
  '& .bgm-avatar': {
    border: 'none',
  },
  '& .bgm-link': {
    color: '#0084b4',
  },
});

const entryHeader = css({
  margin: '15px 0 10px',
});

const entryTitle = css({
  margin: '0',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '32px',
  color: '#1f1c1c',
});

const entryMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '8px',
  margin: '8px 0 0',
  fontSize: '13px',
  lineHeight: '18px',
  color: '#9f9b9b',
});

const authorActions = css({
  display: 'flex',
  gap: '8px',
  '& .bgm-link': { color: '#0084b4' },
});

const entryTags = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  margin: '8px 0 0',
  fontSize: '13px',
  lineHeight: '18px',
  '& .bgm-link': {
    color: '#0084b4',
  },
});

const entryContent = css({
  padding: '10px 0',
});

/** 对齐 PHP 原版 readTimeCount：按正文去标记后字数估算阅读时间 */
function getReadTime(content: string): string {
  const text = content.replace(/\[[^\]]+\]/g, '');
  const minutes = Math.ceil(text.length / 400);
  return `${minutes} 分钟阅读`;
}

const BlogEntryPage: FC = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: blog entry id is required');
  }
  const entryId = Number(id);

  const { data: entry } = useBlogEntry(entryId);
  const { data: comments, mutate: mutateComments } = useBlogComments(entryId);
  const { data: relatedSubjects } = useBlogRelatedSubjects(entryId);
  const { user } = useUser();
  const isAuthor = user?.id === entry.user.id;

  return (
    <>
      <Helmet title={entry.title} />
      <PageContainer>
        <Layout
          type='alpha'
          leftChildren={
            <article className={entryContainer}>
              <div className={authorRow}>
                <Avatar src={entry.user.avatar.medium} size='small' />
                <Link to={getUserProfileLink(entry.user.username)}>{entry.user.nickname}</Link>
                <span>·</span>
                <Link to={getUserBlogsPageLink(entry.user.username)}>日志</Link>
              </div>
              <header className={entryHeader}>
                <h1 className={entryTitle}>{entry.title}</h1>
                <div className={entryMeta}>
                  <span>{dayjs(entry.createdAt * 1000).format('YYYY-M-D HH:mm')}</span>
                  <span>·</span>
                  <span>{getReadTime(entry.content)}</span>
                  <span>·</span>
                  <span>{entry.views} 次浏览</span>
                  <span>·</span>
                  <span>{entry.replies} 条回复</span>
                  {isAuthor && (
                    <>
                      <span>·</span>
                      <span className={authorActions}>
                        <Link to={`/blog/${entry.id}/edit`}>编辑</Link>
                      </span>
                    </>
                  )}
                </div>
                {entry.tags.length > 0 && (
                  <div className={entryTags}>
                    {entry.tags.map((tag) => (
                      <Link key={tag} to={getUserBlogsPageLink(entry.user.username)}>
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </header>
              <div className={entryContent}>
                <RichContent bbcode={entry.content} />
              </div>
              <BlogComments
                entryId={entry.id}
                comments={comments}
                onCommentUpdate={mutateComments}
              />
            </article>
          }
          rightChildren={
            relatedSubjects.length > 0 ? <RelatedSubjects subjects={relatedSubjects} /> : undefined
          }
        />
      </PageContainer>
    </>
  );
};

export default BlogEntryPage;
