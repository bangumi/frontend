import React, { FC } from 'react'
import { Bold, Image, Italic, Link, Size, Underscore } from '@bangumi/icons'

const Toolbox: FC = () => {
  return (
    <div className="bgm-editor__header">
      <Bold />
      <Italic />
      <Underscore />
      <Image />
      <Link />
      <Size />
    </div>
  )
}

export default Toolbox
