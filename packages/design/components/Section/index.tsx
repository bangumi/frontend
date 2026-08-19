import type { PropsWithChildren } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const section = css({
  '& > * + *': {
    marginTop: '5',
  },
});

const sectionTitle = css({
  color: 'text.primary',
  textStyle: 'titleSm',
  paddingBottom: '3',
  borderBottomWidth: '1px',
  borderBottomColor: 'border.subtle',
});

const sectionFooter = css({
  display: 'flex',
  justifyContent: 'flex-end',
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
