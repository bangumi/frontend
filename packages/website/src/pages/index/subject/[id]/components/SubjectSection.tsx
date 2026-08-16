import type { PropsWithChildren } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const section = css({
  marginBottom: '1',
  padding: '3',
  borderBottomWidth: '1px',
  borderBottomColor: 'border.subtle',
});

const header = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2',
  marginBottom: '1',
});

const sectionTitle = css({
  margin: '0',
  paddingRight: '1',
  color: 'text.primary',
  textStyle: 'titleSm',
});

const sectionExtra = css({
  flex: 'none',
  textStyle: 'meta',
});

/**
 * 详情页右栏区块容器，对齐 PHP subject_section
 */
const SubjectSection: React.FC<
  PropsWithChildren<{ title?: React.ReactNode; extra?: React.ReactNode; className?: string }>
> = ({ title, extra, className, children }) => {
  return (
    <section className={cx(section, className)}>
      {title != null && (
        <div className={header}>
          <h2 className={sectionTitle}>{title}</h2>
          {extra != null && <div className={sectionExtra}>{extra}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

export default SubjectSection;
