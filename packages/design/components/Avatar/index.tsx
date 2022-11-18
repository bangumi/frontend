import React, { FC } from 'react';
import classNames from 'classnames';

export interface AvatarProps {
  /* 头像大小 */
  size?: 'small' | 'medium' | 'large';
  /* 头像的 URL */
  src: string;
  /* 替代文本 */
  alt?: string;
  /* 自定义最外层类名 */
  wrapperClass?: string;
  /* 自定义最外层样式 */
  wrapperStyle?: React.CSSProperties;
}

const Avatar: FC<AvatarProps> = ({ size = 'small', src, alt, wrapperClass, wrapperStyle }) => {
  return (
    <div
      className={classNames('bgm-avatar', `bgm-avatar--${size}`, wrapperClass)}
      style={wrapperStyle}
    >
      <img src={src} alt={alt} />
    </div>
  );
};
export default Avatar;
