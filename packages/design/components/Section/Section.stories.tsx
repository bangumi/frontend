import { ComponentStory } from '@storybook/react';
import React from 'react';
import Section from '.';

export default {
  title: 'modern/Section',
  component: Section,
};

export const Demo: ComponentStory<typeof Section> = () => (
  <Section title='小节标题'>
    <div>内容</div>
  </Section>
);

export const WithFooter: ComponentStory<typeof Section> = () => (
  <Section
    title='带footer的小节'
    renderFooter={() => {
      return <div>link</div>;
    }}
  >
    <div>内容</div>
  </Section>
);
