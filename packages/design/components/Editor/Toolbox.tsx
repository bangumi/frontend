import React, { FC } from 'react'
import { Bold, Image, Italic, Link, Size, Underscore } from '@bangumi/icons'

interface ToolboxProps {
  handleClickEvent: (type: string, payload?: any) => void
  style?: React.CSSProperties
}

const Toolbox: FC<ToolboxProps> = ({ handleClickEvent, style }) => {
  return (
    <div className="bgm-editor__header" style={style}>
      <Bold onClick={() => handleClickEvent('bold')} />
      <Italic onClick={() => handleClickEvent('italic')} />
      <Underscore onClick={() => handleClickEvent('underscore')} />
      <Image onClick={() => handleClickEvent('image')} />
      <Link onClick={() => handleClickEvent('link')} />
      <Size onClick={() => handleClickEvent('size')} />
    </div>
  )
}

export default Toolbox
