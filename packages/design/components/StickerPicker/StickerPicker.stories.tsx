import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import type { StickerPickerProps } from '.';
import StickerPicker from '.';

const storyMeta: Meta<typeof StickerPicker> = {
  title: 'modern/StickerPicker',
  component: StickerPicker,
};

export default storyMeta;

const Template: StoryFn<StickerPickerProps> = (args) => <StickerPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSelect: () => undefined,
};
