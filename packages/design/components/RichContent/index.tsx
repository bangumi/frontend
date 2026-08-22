import React from 'react';

import closeQuote from '@bangumi/icons/assets/close-quote.svg?url';
import openQuote from '@bangumi/icons/assets/open-quote.svg?url';
import { css, cx } from '@bangumi/styled-system/css';
import type { BBCodePresetName } from '@bangumi/utils/bbcode/presets.ts';
import { BBCodePreset } from '@bangumi/utils/bbcode/presets.ts';
import { render } from '@bangumi/utils/bbcode/react.tsx';

export interface RichContentProps {
  bbcode: string;
  preset: BBCodePresetName;
  classname?: string;
}

const richContent = css({
  lineHeight: '24px',
  fontSize: '16px',
  color: '#1f1c1c',
  '& a': {
    color: '#54b5df',
    textDecoration: 'none',
  },
  // 表情等图片带显式宽高属性，窄屏被 maxWidth 夹取时需要 height:auto 才不会变形
  '& img': { maxWidth: '99%', height: 'auto' },
  '& > .quote': {
    color: '#9f9b9b',
    // 当没有内容时，回复按钮已有上边距，无需额外添加
    '&:not(:last-child)': { marginBottom: '12px' },
    '&::before, &::after': {
      content: '""',
      lineHeight: '0',
      display: 'inline',
      padding: '0 7px',
      backgroundRepeat: 'no-repeat',
    },
    '&::before': {
      backgroundImage: 'var(--quote-before)',
      marginRight: '10px',
    },
    '&::after': {
      backgroundImage: 'var(--quote-after)',
      marginLeft: '10px',
    },
  },
  '& strong': { fontWeight: '600' },
  '& em': { fontStyle: 'italic' },
  // bbcode [mask] 渲染的遮罩文字
  '& .bgm-mask': {
    backgroundColor: '#555',
    color: '#555',
    border: '1px solid #555',
    _hover: { color: '#fff' },
  },
});

// 长文本/长 URL 换行、[code] 块横向截断，避免移动端水平溢出
const content = css({
  overflowWrap: 'anywhere',
  '& pre': {
    overflowX: 'hidden',
  },
});

const RichContent: React.FC<RichContentProps> = ({ bbcode, preset, classname }) => {
  return (
    <div
      className={cx('bgm-rich-content', richContent, content, classname)}
      style={
        {
          '--quote-before': `url(${openQuote})`,
          '--quote-after': `url(${closeQuote})`,
        } as React.CSSProperties
      }
    >
      {render(bbcode, BBCodePreset[preset])}
    </div>
  );
};

export default RichContent;
