import type { StoryFn } from '@storybook/react';
import React from 'react';

import type { TextProps } from './Text.tsx';
import Text from './Text.tsx';

export default {
  title: 'modern/Typography/Text',
  component: Text,
};

export const Demo: StoryFn<TextProps> = () => {
  return (
    <div>
      <Text>text(default)</Text>
      <br />
      <Text type='secondary'>text(secondary)</Text>
    </div>
  );
};
