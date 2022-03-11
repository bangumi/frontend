import React, { CSSProperties, FC, ImgHTMLAttributes } from 'react'
import classnames from 'classnames'

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /* 图像的 URL */
  src: string
  /* 图像的备用文本描述 */
  alt?: string
  /* 自定义最外层类名 */
  wrapperClass?: string
  /* 自定义最外层样式 */
  wrapperStyle?: CSSProperties
  /* 是否增加 box-shadow */
  withBoxShadow?: boolean
  /* 形状, 矩形或圆形, 默认为矩形 */
  shape?: 'rect' | 'circle'
}

const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  wrapperClass,
  wrapperStyle,
  withBoxShadow,
  shape = 'rect',
  ...rest
}) => {
  return (
    <div
      className={classnames('bgm-image', wrapperClass, {
        'bgm-image--withBoxShadow': withBoxShadow,
        'bgm-image--rect': shape === 'rect',
        'bgm-image--circle': shape === 'circle'
      })}
      style={{
        ...wrapperStyle
      }}
      data-testid="img-wrapper"
    >
      <img src={src} width={width} height={height} {...rest} />
    </div>
  )
}

export default Image
