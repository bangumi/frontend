import React from 'react';

import type { User } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getBlogLink, getUserBlogsPageLink } from '@bangumi/utils/pages';
import { useUserBlogs } from '@bangumi/website/hooks/use-user-blogs';

import styles from './SimpleListBlock.module.less';

const { Link } = Typography;

/** 用户主页的日志块 */
const BlogBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: blogs } = useUserBlogs(user.username, 5);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        <Link to={getUserBlogsPageLink(user.username)}>{user.nickname}的日志</Link>
      </h2>
      <ul className={styles.list}>
        {blogs.map((blog) => (
          <li key={blog.id} className={styles.textItem}>
            <Link to={getBlogLink(blog.id)}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogBlock;
