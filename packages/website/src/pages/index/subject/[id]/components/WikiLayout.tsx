import type { PropsWithChildren } from 'react';
import React from 'react';

import { Tab } from '@bangumi/design';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';

import type { WikiEditTabs } from '../_shared';
import { WikiEditTabsItems } from '../_shared';
import style from './WikiLayout.module.less';

type Props = PropsWithChildren<{
  id: number;
  activeTab: WikiEditTabs;
  name: string;
}>;

const WikiLayout = ({ children, id, activeTab, name }: Props) => {
  const [, navigate] = useTransitionNavigate();

  return (
    <div>
      <div className={style.title}>
        正在编辑「<span className={style.subjectName}>{name}</span>」
      </div>
      <div className={style.subTitle}>WIKI STAFF ONLY</div>
      <Tab
        items={WikiEditTabsItems}
        activeKey={activeTab}
        type='borderless'
        onChange={(_, value) => navigate(value.to(id))}
      />
      <div className={style.body}>{children}</div>
    </div>
  );
};

export default WikiLayout;
