import type { FC } from 'react';
import React from 'react';

import { Bold, Image, Italic, Link, Size, Underscore } from '@bangumi/icons';

interface ToolboxProps {
  handleClickEvent: (type: string, payload?: any) => void;
  style?: React.CSSProperties;
}

const Toolbox: FC<ToolboxProps> = ({ handleClickEvent, style }) => {
  return (
    <div className='bgm-editor__toolbox' style={style}>
      <Bold data-testid='bold' onClick={() => handleClickEvent('bold')} />
      <Italic data-testid='italic' onClick={() => handleClickEvent('italic')} />
      <Underscore data-testid='underscore' onClick={() => handleClickEvent('underscore')} />
      <Image data-testid='image' onClick={() => handleClickEvent('image')} />
      <Link data-testid='link' onClick={() => handleClickEvent('link')} />
      <Size data-testid='size' onClick={() => handleClickEvent('size')} />
    </div>
  );
};

export default Toolbox;
