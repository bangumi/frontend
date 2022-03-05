import React, { FC } from 'react'
import classnames from 'classnames'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  isListItem?: boolean
  className?: string
}

const Divider: FC<DividerProps> = (props) => {
  const {
    orientation = 'horizontal',
    isListItem = false,
    className
  } = props

  const classes = classnames(
    'divider',
    {
      'bgm-divider--vertical': orientation === 'vertical'
    },
    className
  )

  return (
    <>
      {isListItem
        ? <li className={classes} role="separator" />
        : <hr className={classes} role="separator" />}
    </>
  )
}

export default Divider
