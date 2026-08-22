import type { FC } from 'react';
import React, { memo } from 'react';

import type { SlimSubject } from '@bangumi/client/client.ts';
import { Avatar, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getSubjectBoardLink, getSubjectLink } from '@bangumi/utils/pages.ts';

interface Header {
  title: string;
  subject: SlimSubject;
}

const Link = Typography.Link;

const subjectTopicHeader = css({
  marginBottom: '0',
});

const navBar = css({
  fontSize: '16px',
  lineHeight: '22px',
  display: 'flex',
  alignItems: 'center',
  color: '#9f9b9b',
  '& a': {
    paddingLeft: '10px',
  },
  '& .bgm-avatar': {
    paddingRight: '10px',
    border: 'none',
  },
});

const topicTitle = css({
  marginTop: '4px',
  marginBottom: '5px',
  fontSize: '24px',
  lineHeight: '34px',
  fontWeight: '600',
  color: '#1f1c1c',
});

const SubjectTopicHeader: FC<Header> = ({ title, subject }) => {
  return (
    <div className={subjectTopicHeader}>
      <div className={navBar}>
        <Avatar src={subject.images?.small ?? ''} size='xsmall' />
        <Link to={getSubjectLink(subject.id)}>{subject.nameCN || subject.name}</Link>
        <span>»</span>
        <Link to={getSubjectBoardLink(subject.id)}>讨论区</Link>
      </div>
      <h1 className={topicTitle}>{title}</h1>
    </div>
  );
};

export default memo(SubjectTopicHeader);
