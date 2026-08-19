import '../../styled-system/styles.css';
import './global.css';

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { themes } from 'storybook/theming';

export default {
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: 'var(--colors-bg-canvas)' },
        { name: 'subtle', value: 'var(--colors-bg-subtle)' },
      ],
    },
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
