import React from 'react';

import type { Subject } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getSubjectLink } from '@bangumi/utils/pages';

import styles from './SubjectSummaryCard.module.less';

const { Link } = Typography;

/** 条目子页侧栏卡片：封面 + 名称 + 返回条目，供章节/关联等子页复用 */
function SubjectSummaryCard({ subject }: { subject: Subject }) {
  return (
    <aside className={styles.subjectCard}>
      {subject.images?.small && (
        <Link to={getSubjectLink(subject.id)} noStyle className={styles.coverLink}>
          <img src={subject.images.small} alt='' className={styles.cover} />
        </Link>
      )}
      <div className={styles.subjectCardContent}>
        <Link to={getSubjectLink(subject.id)} className={styles.subjectName}>
          {subject.name}
        </Link>
        <Link to={getSubjectLink(subject.id)} className={styles.returnLink}>
          返回条目
        </Link>
      </div>
    </aside>
  );
}

export default SubjectSummaryCard;
