import './style';

import classNames from 'classnames';
import React from 'react';

import { css } from '@bangumi/styled-system/css';
import { render } from '@bangumi/utils/bbcode/react';

export interface RichContentProps {
  bbcode: string;
  classname?: string;
}

// 长文本/长 URL 换行、[code] 块横向截断，避免移动端水平溢出
const content = css({
  overflowWrap: 'anywhere',
  '& pre': {
    overflowX: 'hidden',
  },
});

const RichContent: React.FC<RichContentProps> = ({ bbcode, classname }) => {
  return <div className={classNames('bgm-rich-content', content, classname)}>{render(bbcode)}</div>;
};

export default RichContent;
