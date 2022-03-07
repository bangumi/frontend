import React from 'react'

import Link from './Link'
import { Story } from '@storybook/react'

export default {
  title: 'classic/Topology/Link',
  component: Link
}

const Template: Story = () => {
  return <Link>这是一个链接</Link>
}

export const Usage = Template.bind({})
