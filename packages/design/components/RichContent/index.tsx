import './style';

import classNames from 'classnames';
import React from 'react';

import { render } from '@bangumi/utils';

export interface RichContentProps {
  bbcode: string;
  classname?: string;
}

const RichContent: React.FC<RichContentProps> = ({ bbcode, classname }) => {
  return <div className={classNames('bgm-rich-content', classname)}>{render(bbcode)}</div>;
};

export default RichContent;
