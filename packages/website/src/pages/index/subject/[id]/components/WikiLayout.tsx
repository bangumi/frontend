import type { PropsWithChildren } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tab, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { WikiEditTabsItems } from '@bangumi/website/shared/wiki.ts';

type Props = PropsWithChildren<{
  id: string;
  name: string;
}>;

const title = css({
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '34px',
  color: '#1f1c1c',
});

const subTitle = css({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '22px',
  color: '#9f9b9b',
  marginBottom: '23px',
});

const body = css({
  marginTop: '21px',
});

const WikiLayout = ({ children, id, name }: Props) => {
  return (
    <>
      <div className={title}>
        正在编辑「<Typography.Link to={`/subject/${id}`}>{name}</Typography.Link>」
      </div>
      <div className={subTitle}>WIKI STAFF ONLY</div>
      <Tab.Group type='borderless'>
        {WikiEditTabsItems.map((item) => (
          <NavLink to={item.to(id)} key={item.key}>
            {({ isActive }) => <Tab.Item isActive={isActive}>{item.label}</Tab.Item>}
          </NavLink>
        ))}
      </Tab.Group>
      <div className={body}>{children}</div>
    </>
  );
};

export default WikiLayout;
