import type { PropsWithChildren } from 'react';
import React from 'react';

import { Tab } from '@bangumi/design';
import { NavLink } from '@bangumi/website/components/Link';
import { WikiEditTabsItems } from '@bangumi/website/shared';

import style from './WikiLayout.module.less';

type Props = PropsWithChildren<{
  id: number;
  name: string;
}>;

const WikiLayout = ({ children, id, name }: Props) => {
  return (
    <>
      <div className={style.title}>
        正在编辑「<span className={style.subjectName}>{name}</span>」
      </div>
      <div className={style.subTitle}>WIKI STAFF ONLY</div>
      <Tab.Group type='borderless'>
        {WikiEditTabsItems.map((item) => (
          <NavLink to={item.to(id)} key={item.key}>
            {({ isActive }) => <Tab.Item isActive={isActive}>{item.label}</Tab.Item>}
          </NavLink>
        ))}
      </Tab.Group>
      <div className={style.body}>{children}</div>
    </>
  );
};

export default WikiLayout;
