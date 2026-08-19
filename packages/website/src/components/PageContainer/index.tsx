import type { HTMLAttributes } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const container = css({
  position: 'relative',
  width: '100%',
  maxWidth: 'container.page',
  margin: '0 auto',
  paddingBlock: '6',
  paddingInline: 'layout.gutter.mobile',
  boxSizing: 'border-box',
  md: {
    paddingInline: 'layout.gutter.tablet',
  },
  xl: {
    paddingInline: 'layout.gutter.desktop',
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
}) => <Component className={cx(container, gutterOnly && gutterOnlyStyle, className)} {...props} />;

export default PageContainer;
