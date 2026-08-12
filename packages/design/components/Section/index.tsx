import type { PropsWithChildren } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const section = css({
  '& > * + *': {
    marginTop: '20px',
  },
});

const sectionTitle = css({
  fontWeight: '400',
  color: '#9f9b9b',
  fontSize: '18px',
  paddingBottom: '15px',
  borderBottom: '1px solid #e8e3e3',
});

const sectionFooter = css({
  display: 'flex',
  justifyContent: 'right',
});

export interface SectionProps {
  title: string;
  renderFooter?: () => React.ReactNode;
  wrapperClass?: string;
}
const Section = ({
  title,
  wrapperClass,
  children,
  renderFooter,
}: PropsWithChildren<SectionProps>) => {
  return (
    <div className={cx('bgm-section', section, wrapperClass)}>
      <h3 className={sectionTitle}>{title}</h3>
      {children}
      {renderFooter && <div className={sectionFooter}>{renderFooter()}</div>}
    </div>
  );
};

export default Section;
