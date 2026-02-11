import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import type { LinkProps } from './Link';
import Link from './Link';

const componentMeta: Meta<typeof Link> = {
  title: 'modern/Typography/Link',
  component: Link,
};

export default componentMeta;

const Template: StoryFn<LinkProps> = (props) => {
  return (
    <MemoryRouter>
      <Link {...props}>这是一个链接</Link>
    </MemoryRouter>
  );
};

export const InternalLink = Template.bind({});
InternalLink.args = {
  to: '/group/boring',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  isExternal: true,
  to: 'https://bgm.tv',
};

export const BoldLink = Template.bind({});
BoldLink.args = {
  to: '/group/boring',
  fontWeight: 'bold',
};
