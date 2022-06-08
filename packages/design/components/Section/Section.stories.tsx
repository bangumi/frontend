import { ComponentStory } from '@storybook/react'
import React from 'react'
import Section from '.'

export default {
  title: 'modern/Section',
  component: Section
}

export const Demo: ComponentStory<typeof Section> = () => <Section title="小节标题">内容</Section>
