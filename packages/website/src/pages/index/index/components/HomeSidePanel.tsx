import type { PropsWithChildren } from 'react';
import React from 'react';

import styles from './HomeSidePanel.module.less';

/**
 * 首页右侧栏卡片容器，对齐 PHP 的 sidePanelHome
 */
const HomeSidePanel: React.FC<PropsWithChildren<{ title: React.ReactNode }>> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default HomeSidePanel;
