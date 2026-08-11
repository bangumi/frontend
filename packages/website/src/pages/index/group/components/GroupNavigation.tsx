import React from 'react';

import type { Group } from '@bangumi/client/client';
import { Section, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

import GroupActions from './GroupActions';

const Link = Typography.Link;

const wrapper = css({
  display: 'flex',
  gap: '20px',
  marginBottom: '40px',
  flexDirection: 'column',
});

const section = css({
  display: 'flex',
  gap: '20px',
  '& .bgm-button': {
    padding: '0 20px',
  },
});

const links = css({
  fontSize: '14px',
  fontWeight: '600',
  color: '#9f9b9b',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const GroupNavigation = ({ group }: { group: Group }) => {
  return (
    <Section title='小组功能'>
      <div className={wrapper}>
        <GroupActions group={group} className={section} />
        <div className={links}>
          <div>
            话题：<Link to='/group/my_topic'>我发表的</Link> |{' '}
            <Link to='/group/my_reply'>我回复的</Link>
            <br />
          </div>
          <div>
            小组：<Link to='#'>我管理的</Link> | <Link to='/group/mine'>我参加的</Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GroupNavigation;
