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
  /* 自定义最外层圆角 , 默认为 6px */
  borderRadius?: CSSProperties['borderRadius']
}

const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  wrapperClass,
  wrapperStyle,
  withBoxShadow,
  borderRadius = '6px',
  ...rest
}) => {
  return (
    <div
      className={classnames('bgm-image', wrapperClass, {
        'bgm-image--withBoxShadow': withBoxShadow
      })}
      style={{
        borderRadius,
        ...wrapperStyle
      }}
      data-testid="img-wrapper"
    >
      <img src={src} width={width} height={height} {...rest} />
    </div>
  )
}

export default Image
