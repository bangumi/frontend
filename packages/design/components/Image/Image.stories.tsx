import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Image from '.'

const src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEzNiAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMTM2IiBoZWlnaHQ9IjIwMCIgcng9IjYiIGZpbGw9ImFxdWEiLz4NCjwvc3ZnPg0K'

const componentMeta: ComponentMeta<typeof Image> = {
  title: 'modern/Image',
  component: Image
}

export default componentMeta

const Template: ComponentStory<typeof Image> = (args) => {
  return <Image {...args} />
}

export const Loaded = Template.bind({})
Loaded.args = {
  src: src,
  alt: 'vanilla',
  width: 136,
  height: 200,
  wrapperstyle: {
    borderRadius: '6px'
  }
}

export const Loading = Template.bind({})
Loading.args = {
  src: 'http://www.deelay.me/3500/https://lain.bgm.tv/pic/cover/c/c2/4c/253_t3XWb.jpg',
  alt: 'vanilla',
  width: 150,
  height: 205
}
