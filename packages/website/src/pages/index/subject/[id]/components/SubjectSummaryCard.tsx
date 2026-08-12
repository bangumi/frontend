import React from 'react';

import type { SlimSubject } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages';

const { Link } = Typography;

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
  whiteSpace: 'nowrap',
});

const returnLink = css({
  fontSize: '12px',
});

/** 条目子页侧栏卡片：封面 + 名称 + 返回条目，供章节/关联等子页复用 */
function SubjectSummaryCard({ subject }: { subject: SlimSubject }) {
  return (
    <aside className={subjectCard}>
      {subject.images?.small && (
        <Link to={getSubjectLink(subject.id)} noStyle className={coverLink}>
          <img src={subject.images.small} alt='' className={cover} />
        </Link>
      )}
      <div className={subjectCardContent}>
        <Link to={getSubjectLink(subject.id)} className={subjectName}>
          {subject.name}
        </Link>
        <Link to={getSubjectLink(subject.id)} className={returnLink}>
          返回条目
        </Link>
      </div>
    </aside>
  );
}

export default SubjectSummaryCard;
