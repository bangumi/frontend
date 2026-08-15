import type { FC } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

export interface AvatarProps {
  /** 头像大小 */
  size?: 'xsmall' | 'small' | 'post' | 'medium' | 'large';
  /** 头像的 URL */
  src: string;
  /** 替代文本 */
  alt?: string;
  /** 自定义最外层类名 */
  wrapperClass?: string;
  /** 自定义最外层样式 */
  wrapperStyle?: React.CSSProperties;
}

const avatar = css({
  display: 'inline-block',
  boxSizing: 'border-box',
  /* 对齐原站 avatarNeue：圆形 + inset 阴影 + hover 蓝色光晕 + 0.2s 过渡 */
  borderRadius: '50%',
  boxShadow: 'inset #bbb 0 0 2px 0',
  transition: 'box-shadow linear 0.2s, border linear 0.2s',
  _hover: {
    boxShadow: 'inset #0187c5 0 0 4px 0',
  },
  '& img': {
    objectFit: 'cover',
    verticalAlign: 'middle',
    borderRadius: '50%',
  },
});

const avatarSizes = {
  xsmall: css({ '& img': { height: '32px', width: '32px' } }),
  small: css({ '& img': { height: '40px', width: '40px' } }),
  post: css({ '& img': { height: '48px', width: '48px' } }),
  medium: css({ '& img': { height: '60px', width: '60px' } }),
  large: css({ '& img': { height: '75px', width: '75px' } }),
} satisfies Record<NonNullable<AvatarProps['size']>, string>;

const Avatar: FC<AvatarProps> = ({ size = 'small', src, alt, wrapperClass, wrapperStyle }) => {
  return (
    <div
      className={cx('bgm-avatar', `bgm-avatar--${size}`, avatar, avatarSizes[size], wrapperClass)}
      style={wrapperStyle}
    >
      <img src={src} alt={alt} />
    </div>
  );
};
export default Avatar;
