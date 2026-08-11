import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

const container = css({
  position: 'relative',
  width: '100%',
  maxWidth: '1260px',
  margin: '0 auto',
  padding: '24px 30px',
  boxSizing: 'border-box',
  '@media (max-width: 640px)': {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
});

const gutterOnlyStyle = css({
  paddingTop: 0,
  paddingBottom: 0,
});

interface PageContainerProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'main' | 'nav' | 'section';
  gutterOnly?: boolean;
}

/** Shared page-width container used by routed page roots and full-width page bands. */
const PageContainer: React.FC<PageContainerProps> = ({
  as: Component = 'div',
  className,
  gutterOnly = false,
  ...props
}) => (
  <Component
    className={classNames(container, gutterOnly && gutterOnlyStyle, className)}
    {...props}
  />
);

export default PageContainer;
