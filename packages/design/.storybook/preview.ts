import 'reset-css';
import './global.css';

import type { Parameters as StoryParameters } from '@storybook/react';

export const parameters: StoryParameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
