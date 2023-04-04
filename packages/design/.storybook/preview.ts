import 'reset-css';
import './global.css';

import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      theme: themes.light,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
} satisfies Preview;
