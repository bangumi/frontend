import React from 'react';

import type { User } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getIndexLink, getUserIndexesPageLink } from '@bangumi/utils/pages';
import { useUserIndexes } from '@bangumi/website/hooks/use-user-indexes';

const { Link } = Typography;

const block = css({
  background: '#fff',
  border: '1px solid #e8e3e3',
  borderRadius: '3px',
  padding: '12px',
  marginBottom: '16px',
});

const title = css({
  margin: '0 0 8px',
  fontSize: '16px',
  color: '#1f1c1c',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

const list = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const textItem = css({
  padding: '5px 0',
  fontSize: '13px',
  '& a': {
    color: '#595555',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

/** 用户主页的目录块 */
const IndexBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: indexes } = useUserIndexes(user.username, 5);

  if (!indexes || indexes.length === 0) {
    return null;
  }

  return (
    <section className={block}>
      <h2 className={title}>
        <Link to={getUserIndexesPageLink(user.username)}>{user.nickname}的目录</Link>
      </h2>
      <ul className={list}>
        {indexes.map((index) => (
          <li key={index.id} className={textItem}>
            <Link to={getIndexLink(index.id)}>{index.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IndexBlock;
