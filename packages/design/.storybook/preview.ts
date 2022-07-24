import type { Parameters as StoryParameters } from '@storybook/react'

import 'normalize.css'
import 'reset-css'
import './global.css'

export const parameters: StoryParameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
