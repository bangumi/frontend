import type { FC } from 'react';
import React, { memo } from 'react';

import Popover from '@bangumi/design/components/Popover/index.tsx';
import StickerPicker from '@bangumi/design/components/StickerPicker/index.tsx';
import { Bold, Image, Italic, Link, Size, Tv, Underscore } from '@bangumi/icons/index.tsx';

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
      {/* 表情与其它按钮不同：点击展开面板，由面板中的表情触发插入 */}
      <Popover
        trigger='click'
        align='start'
        label='选择表情'
        content={
          <StickerPicker
            onSelect={(code) => {
              handleClickEvent('sticker', code);
            }}
          />
        }
      >
        <button type='button' data-testid='sticker' title='表情' className='bgm-editor__sticker'>
          <Tv />
        </button>
      </Popover>
    </div>
  );
};

export default memo(Toolbox);
