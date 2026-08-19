import type { PropsWithChildren } from 'react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

const panel = css({
  margin: '0 0 20px',
  background: '#fff',
});

/* 对齐原站 div.sidePanelHome h2：16px / font-weight 300 / #555 / #EEE 底边框 / 左 padding 10px */
const panelTitle = css({
  fontSize: '16px',
  fontWeight: '300',
  color: '#555',
  margin: '0',
  padding: '0 0 5px 10px',
  borderBottom: '1px solid #eee',
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
