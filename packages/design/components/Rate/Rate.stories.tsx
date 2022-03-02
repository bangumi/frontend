import React from 'react'
import Rate from '.'

export default {
  title: 'modern/Rate',
  component: Rate,
  argTypes: {
    value: {}
  }
}

const Template = (args) => {
  return <Rate value={8}></Rate>
}

export const UsedAsRateIndicate = Template.bind({})
