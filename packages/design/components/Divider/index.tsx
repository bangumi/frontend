import React, { FC } from 'react'
import classnames from 'classnames'

export interface DividerProps {
  /* 朝向：水平或竖直 */
  orientation?: 'horizontal' | 'vertical'
  /* 是否属于列表子项 , 在 `ul` 中使用 */
  isListItem?: boolean
  /* 自定义类名 */
  className?: string
}

const Divider: FC<DividerProps> = (props) => {
  const { orientation = 'horizontal', isListItem = false, className } = props

  const classes = classnames(
    'bgm-divider',
    {
      'bgm-divider--vertical': orientation === 'vertical',
    },
    className,
  )

  return (
    <>
      {isListItem ? (
        <li className={classes} role="separator" />
      ) : (
        <hr className={classes} role="separator" />
      )}
    </>
  )
}

export default Divider
