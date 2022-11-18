import type { Story } from '@storybook/react';
import React from 'react';

import type { TextProps } from './Text';
import Text from './Text';

export default {
  title: 'modern/Topology/Text',
  component: Text,
};

export const Demo: Story<TextProps> = () => {
  return (
    <div>
      <Text>text(default)</Text>
      <br />
      <Text type='secondary'>text(secondary)</Text>
    </div>
  );
};
