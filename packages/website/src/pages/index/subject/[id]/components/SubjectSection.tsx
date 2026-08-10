import type { PropsWithChildren } from 'react';
import React from 'react';

import styles from './SubjectSection.module.less';

/**
 * 详情页右栏区块容器，对齐 PHP subject_section
 */
const SubjectSection: React.FC<
  PropsWithChildren<{ title?: React.ReactNode; extra?: React.ReactNode }>
> = ({ title, extra, children }) => {
  return (
    <section className={styles.section}>
      {title != null && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {extra != null && <div className={styles.extra}>{extra}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

export default SubjectSection;
