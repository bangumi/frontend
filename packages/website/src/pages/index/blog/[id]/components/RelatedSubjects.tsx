import type { FC } from 'react';
import React from 'react';

import type { SlimSubject } from '@bangumi/client/client';
import { Rate, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages';

const { Link } = Typography;

const section = css({
  marginBottom: '20px',
});

const subtitle = css({
  margin: '0 0 8px',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '22px',
  color: '#595555',
});

const cardList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const subjectCard = css({
  display: 'flex',
  minWidth: '0',
  padding: '10px',
  border: '1px solid #e8e3e3',
  borderRadius: '6px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
  boxSizing: 'border-box',
});

const coverLink = css({
  flex: '0 0 48px',
  height: '48px',
  marginRight: '10px',
});

const cover = css({
  width: '48px',
  height: '48px',
  borderRadius: '4px',
  objectFit: 'cover',
});

const subjectCardContent = css({
  display: 'flex',
  minWidth: '0',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const subjectName = css({
  maxWidth: '100%',
  overflow: 'hidden',
  color: '#595555',
  fontSize: '13px',
  textOverflow: 'ellipsis',
});

const subjectNameCN = css({
  maxWidth: '100%',
  overflow: 'hidden',
  color: '#9f9b9b',
  fontSize: '12px',
  textOverflow: 'ellipsis',
});

/** 日志页右侧栏：关联条目列表 */
const RelatedSubjects: FC<{ subjects: SlimSubject[] }> = ({ subjects }) => {
  return (
    <section className={section}>
      <h2 className={subtitle}>关联条目</h2>
      <div className={cardList}>
        {subjects.map((subject) => (
          <div key={subject.id} className={subjectCard}>
            {subject.images?.small && (
              <Link to={getSubjectLink(subject.id)} noStyle className={coverLink}>
                <img src={subject.images.small} alt='' className={cover} />
              </Link>
            )}
            <div className={subjectCardContent}>
              <Link to={getSubjectLink(subject.id)} className={subjectName}>
                {subject.name}
              </Link>
              {subject.nameCN && subject.nameCN !== subject.name && (
                <Link to={getSubjectLink(subject.id)} className={subjectNameCN}>
                  {subject.nameCN}
                </Link>
              )}
              {subject.rating?.score > 0 && <Rate value={subject.rating.score} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedSubjects;
