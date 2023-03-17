import type { ComponentMeta } from '@storybook/react';
import React from 'react';

import { Toast, toast } from '.';

const componentMeta: ComponentMeta<typeof Toast> = {
  title: 'modern/Toast',
  component: Toast,
};

export default componentMeta;

export const Demo = () => {
  const message = '提示消息';
  const longMessage = `
    哀民生之多艰。余虽好修姱以鞿羁兮，
    謇朝谇而夕替。既替余以蕙纕兮，又申之以揽茝。
    亦余心之所善兮，虽九死其犹未悔。
    怨灵修之浩荡兮，终不察夫民心。
    众女嫉余之蛾眉兮，谣诼谓余以善淫。
    固时俗之工巧兮，偭规矩而改错。
    背绳墨以追曲兮，竞周容以为度。
    忳郁邑余侘傺兮，吾独穷困乎此时也。`;
  return (
    <>
      <button
        onClick={() => {
          toast(message);
        }}
      >
        短提示示例
      </button>
      <button
        onClick={() => {
          toast(longMessage);
        }}
      >
        长提示示例
      </button>
      <button
        onClick={() => {
          toast(message, { type: 'error' });
        }}
      >
        错误提示示例
      </button>
    </>
  );
};
