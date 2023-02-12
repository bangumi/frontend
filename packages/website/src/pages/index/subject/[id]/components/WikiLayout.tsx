import type { PropsWithChildren } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tab, Typography } from '@bangumi/design';
import { WikiEditTabsItems } from '@bangumi/website/shared/wiki';

import style from './WikiLayout.module.less';

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const WikiLayout = ({ children, id, name }: Props) => {
  return (
    <>
      <div className={style.title}>
        正在编辑「<Typography.Link to={`/subject/${id}`}>{name}</Typography.Link>」
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
