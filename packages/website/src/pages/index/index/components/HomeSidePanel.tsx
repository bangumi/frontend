import type { PropsWithChildren } from 'react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

const panel = css({
  margin: '0 0 24px',
  background: '#fff',
});

const panelTitle = css({
  fontSize: '16px',
  fontWeight: 'normal',
  margin: '0',
  padding: '3px 5px 8px',
  borderBottom: '1px solid #e8e3e3',
});

/**
 * 首页右侧栏卡片容器，对齐 PHP 的 sidePanelHome
 */
const HomeSidePanel: React.FC<PropsWithChildren<{ title: React.ReactNode }>> = ({
  title,
  children,
}) => {
  return (
    <div className={panel}>
      <h2 className={panelTitle}>{title}</h2>
      {children}
    </div>
  );
};

export default HomeSidePanel;
