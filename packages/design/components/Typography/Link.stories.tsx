import { ComponentMeta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Link, { LinkProps } from './Link'

const componentMeta: ComponentMeta<typeof Link> = {
  title: 'modern/Topology/Link',
  component: Link
}

export default componentMeta

const Template: Story<LinkProps> = (props) => {
  return <MemoryRouter><Link {...props}>这是一个链接</Link></MemoryRouter>
}

export const InternalLink = Template.bind({})
InternalLink.args = {
  to: '/group/boring'
}

export const ExternalLink = Template.bind({})
ExternalLink.args = {
  isExternal: true,
  to: 'https://bgm.tv'
}

export const BoldLink = Template.bind({})
BoldLink.args = {
  to: '/group/boring',
  fontWeight: 'bold'
}
