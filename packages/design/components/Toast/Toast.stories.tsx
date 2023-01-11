import type { ComponentMeta } from '@storybook/react';
import React from 'react';

import { Toast, toast } from '.';

const componentMeta: ComponentMeta<typeof Toast> = {
  title: 'modern/Toast',
  component: Toast,
};

export default componentMeta;

export const Demo = () => {
  return <button onClick={() => toast('提示信息')}>按下提示</button>;
};
