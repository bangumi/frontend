import React from 'react';

import { Section, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

const { Link } = Typography;

const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const navLinks = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#9f9b9b',
});

/** 小组频道侧栏：导航 */
const GroupChannelSidebar: React.FC = () => {
  return (
    <Section title='小组频道'>
      <div className={wrapper}>
        <div className={navLinks}>
          <Link to='/group'>小组频道</Link>
          <Link to='/group/all'>所有小组</Link>
          <Link to='/group/discover'>随便看看</Link>
          <Link to='/group/my_topic'>我发表的话题</Link>
          <Link to='/group/my_reply'>我回复的话题</Link>
          <Link to='/group/mine'>我参加的小组</Link>
        </div>
      </div>
    </Section>
  );
};

export default GroupChannelSidebar;
