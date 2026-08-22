import React from 'react';

import { Button, Section } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

const actions = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
});

/** 目录频道侧栏：创建入口 */
const IndexChannelSidebar: React.FC = () => {
  const { user } = useUser();
  return (
    <Section title='目录'>
      <div className={actions}>
        <p style={{ margin: 0 }}>收录动画、书籍、音乐、游戏等条目，也可以收录角色、人物等。</p>
        {user && (
          <Button.Link type='secondary' to='/index/create'>
            创建目录
          </Button.Link>
        )}
      </div>
    </Section>
  );
};

export default IndexChannelSidebar;
