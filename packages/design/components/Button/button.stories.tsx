import type { Meta, StoryFn } from '@storybook/react';
import type { FC } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ArrowRightCircle } from '@bangumi/icons';

import type { ButtonLinkProps, ButtonProps } from '.';
import Button from '.';

const storyMeta: Meta<typeof Button> = {
  title: 'modern/Button',
  component: Button,
  subcomponents: { 'Button.Link': Button.Link as FC<unknown> },
  argTypes: {
    disabled: { control: 'boolean' },
    color: { control: 'select', options: ['default', 'blue', 'gray'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          '主类型按钮，全圆角，有颜色填充，为默认类型。默认为粉色，另有蓝色和灰色两种颜色可选。',
      },
    },
  },
};

export default storyMeta;

const Template: StoryFn<ButtonProps> = (args) => {
  return <Button {...args}>{args.children ?? 'Click Me!'}</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: '登录',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: '小组概览',
  size: 'medium',
};
Secondary.parameters = {
  docs: {
    description: {
      story:
        '次级按钮，全圆角，有边框，无颜色填充。默认为灰色，另有蓝色变种可选，此处为 `medium` 大小。',
    },
  },
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  children: '编辑',
  size: 'small',
};
Text.parameters = {
  docs: {
    description: {
      story: '纯文字按钮，无边框，无颜色填充。默认为灰色，无其他颜色变种，此处为 `small` 大小。',
    },
  },
};

export const Blue = Template.bind({});
Blue.args = {
  type: 'primary',
  children: '发表新主题',
  color: 'blue',
};
Blue.parameters = {
  docs: {
    description: {
      story: '主类型按钮的蓝色变种，为默认的 `large` 大小。',
    },
  },
};

export const Small = Template.bind({});
Small.args = {
  type: 'secondary',
  children: '评论',
  size: 'small',
};
Small.parameters = {
  docs: {
    description: {
      story: '所有类型的按钮均提供 `large`、`medium`、`small` 三种尺寸。默认为 `large`。',
    },
  },
};

export const Square = Template.bind({});
Square.args = {
  shape: 'square',
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'primary',
  disabled: true,
  children: 'Disabled',
};

const ButtonLinkTemplate: StoryFn<ButtonLinkProps> = (args) => {
  return (
    <MemoryRouter>
      <Button.Link {...args}>{args.children}</Button.Link>
    </MemoryRouter>
  );
};

export const Link = ButtonLinkTemplate.bind({});
Link.args = {
  to: 'https://bgm.tv',
  isExternal: true,
  target: '_blank',
  children: 'Bangumi 番组计划',
};
Link.parameters = {
  docs: {
    description: {
      story: '按钮的链接版本，使用方法与 `Typography.Link` 相同。',
    },
  },
};

export const Plain = ButtonLinkTemplate.bind({});
Plain.args = {
  to: 'https://bgm.tv',
  isExternal: true,
  target: '_blank',
  type: 'plain',
  children: (
    <>
      更多小组成员
      <ArrowRightCircle />
    </>
  ),
};
Plain.parameters = {
  docs: {
    description: {
      story: '无内边距、边框及圆角，最小高度。',
    },
  },
};
