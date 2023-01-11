import './style';

import classnames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

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
    <div className={classnames('bgm-section', wrapperClass)}>
      <h3 className='bgm-section__title'>{title}</h3>
      {children}
      {renderFooter && <div className='bgm-section__footer'>{renderFooter()}</div>}
    </div>
  );
};

export default Section;
