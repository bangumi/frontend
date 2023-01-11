import './style';

import classnames from 'classnames';
import type { FC, ImgHTMLAttributes } from 'react';
import React from 'react';

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
  const actualClassnames = classnames('bgm-image', className, {
    'bgm-image--withBoxShadow': withBoxShadow,
    'bgm-image--rect': shape === 'rect',
    'bgm-image--circle': shape === 'circle',
  });
  return <img className={actualClassnames} src={src} data-testid='img-wrapper' {...rest} />;
};

export default Image;
