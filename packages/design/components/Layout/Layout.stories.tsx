import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Layout from '.';

const componentMeta: Meta<typeof Layout> = {
  title: 'Grid/Layout',
  component: Layout,
};

export default componentMeta;

const Template: StoryFn<typeof Layout> = (args) => <Layout {...args} />;

const leftChildren = <div style={{ width: '100%', height: '100vh', background: '#B5E6B5' }} />;
const rightChildren = <div style={{ width: '100%', height: '100vh', background: '#FFF2E2' }} />;

export const Usage = Template.bind({});

Usage.args = {
  type: 'alpha',
  leftChildren,
  rightChildren,
};
