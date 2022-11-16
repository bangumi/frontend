import React from 'react'
import Text, { TextProps } from './Text'
import { Story } from '@storybook/react'

export default {
  title: 'modern/Topology/Text',
  component: Text,
}

export const Demo: Story<TextProps> = () => {
  return (
    <div>
      <Text>text(default)</Text>
      <br />
      <Text type="secondary">text(secondary)</Text>
    </div>
  )
}
