import type { FC } from 'react';
import React, { memo } from 'react';

import { Bold, Image, Italic, Link, Size, Underscore } from '@bangumi/icons';

interface ToolboxProps {
  handleClickEvent: (type: string, payload?: unknown) => void;
  style?: React.CSSProperties;
}

const Toolbox: FC<ToolboxProps> = ({ handleClickEvent, style }) => {
  return (
    <div className='bgm-editor__toolbox' style={style}>
      <Bold
        data-testid='bold'
        onClick={() => {
          handleClickEvent('bold');
        }}
        title='粗体 [Ctrl+B]'
      />
      <Italic
        data-testid='italic'
        onClick={() => {
          handleClickEvent('italic');
        }}
        title='斜体 [Ctrl+I]'
      />
      <Underscore
        data-testid='underscore'
        onClick={() => {
          handleClickEvent('underscore');
        }}
        title='下划线 [Ctrl+U]'
      />
      <Image
        data-testid='image'
        onClick={() => {
          handleClickEvent('image');
        }}
        title='图片 [Ctrl+P]'
      />
      <Link
        data-testid='link'
        onClick={() => {
          handleClickEvent('link');
        }}
        title='链接 [Ctrl+L]'
      />
      <Size
        data-testid='size'
        onClick={() => {
          handleClickEvent('size');
        }}
        title='文字尺寸 [Ctrl+S]'
      />
    </div>
  );
};

export default memo(Toolbox);
