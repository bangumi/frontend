import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './style.module.less';

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
    className={classNames(styles.container, gutterOnly && styles.gutterOnly, className)}
    {...props}
  />
);

export default PageContainer;
