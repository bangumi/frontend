import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import Divider from '.';

const horizontalStyle = css({
  width: '60%',
  height: '1px',
  margin: '0',
  border: 'none',
  background: '#e8e3e3',
});

const verticalStyle = css({
  width: '1px',
  height: '100%',
  margin: '0',
  border: 'none',
  background: '#e8e3e3',
});

const componentMeta: Meta<typeof Divider> = {
  title: 'Grid/Divider',
  component: Divider,
  decorators: [(story) => <div style={{ width: '15vw', height: '15vh' }}>{story()}</div>],
};

export default componentMeta;

const Template: StoryFn<typeof Divider> = (args) => {
  const isListItem = args.isListItem;
  const orientation = args.orientation;

  if (isListItem) {
    return (
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'row' : 'column',
        }}
      >
        <li>想看</li>
        <Divider {...args} className={horizontalStyle} />
        <li>看过</li>
      </ul>
    );
  }
  return (
    <div style={{ display: orientation === 'vertical' ? 'flex' : undefined }}>
      <span>标题</span>
      <Divider
        {...args}
        className={cx(orientation === 'vertical' ? verticalStyle : horizontalStyle)}
      />
      <span>文本</span>
    </div>
  );
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  orientation: 'horizontal',
  isListItem: false,
};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
  isListItem: false,
};
