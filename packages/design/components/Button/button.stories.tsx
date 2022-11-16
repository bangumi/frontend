import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import Button, { ButtonProps } from '.';

const storyMeta: ComponentMeta<typeof Button> = {
  title: 'modern/Button',
  component: Button,
};

export default storyMeta;

const Template: Story<ButtonProps> = (args) => {
  return <Button {...args}>Click Me!</Button>;
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  type: 'primary',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  type: 'secondary',
};

export const TextButton = Template.bind({});
TextButton.args = {
  type: 'text',
};

export const SquareButton = Template.bind({});
SquareButton.args = {
  shape: 'square',
};

export const RoundedButton = Template.bind({});
RoundedButton.args = {
  shape: 'rounded',
};
