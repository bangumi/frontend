import type { FC, ImgHTMLAttributes } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const bgmImage = css({
  display: 'inline-block',
  overflow: 'hidden',
  background: '#e8e3e3',
  objectFit: 'cover',
  objectPosition: 'top left',
  _hover: {
    outline: '2px solid rgba(255, 255, 255, 0.4)',
    outlineOffset: '-2px',
  },
  '&.bgm-image--withBoxShadow': {
    boxShadow: '0 5px 10px 3px rgba(237, 233, 233, 0.8)',
  },
  '&.bgm-image--rect': {
    borderRadius: '6px',
  },
  '&.bgm-image--circle': {
    borderRadius: '50%',
  },
});

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /** 图像的 URL */
  src: string;
  /** 图像的备用文本描述 */
  alt?: string;
  /** 是否增加 box-shadow */
  withBoxShadow?: boolean;
  /** 形状, 矩形或圆形, 默认为矩形 */
  shape?: 'rect' | 'circle';
}

const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  withBoxShadow,
  className,
  shape = 'rect',
  ...rest
}) => {
  const actualClassnames = cx(
    'bgm-image',
    bgmImage,
    className,
    withBoxShadow && 'bgm-image--withBoxShadow',
    shape === 'rect' && 'bgm-image--rect',
    shape === 'circle' && 'bgm-image--circle',
  );
  return <img className={actualClassnames} src={src} data-testid='img-wrapper' {...rest} />;
};

export default Image;
