import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

const section = css({
  margin: '0 0 5px',
  padding: '10px',
  borderBottom: '1px solid #e8e3e3',
});

const header = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  margin: '0 0 5px',
});

const sectionTitle = css({
  margin: '0',
  padding: '0 5px 0 0',
  color: '#595555',
  fontSize: '18px',
  fontWeight: '300',
  lineHeight: '1.4',
});

const sectionExtra = css({
  flex: 'none',
  fontSize: '12px',
});

/**
 * 详情页右栏区块容器，对齐 PHP subject_section
 */
const SubjectSection: React.FC<
  PropsWithChildren<{ title?: React.ReactNode; extra?: React.ReactNode; className?: string }>
> = ({ title, extra, className, children }) => {
  return (
    <section className={classNames(section, className)}>
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
