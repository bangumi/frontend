import React, { FC } from 'react'
import { ReactComponent as Bold } from './assets/Bold.svg'
import { ReactComponent as Italic } from './assets/Italic.svg'
import { ReactComponent as Underscore } from './assets/Underscore.svg'
import { ReactComponent as Image } from './assets/Image.svg'
import { ReactComponent as Link } from './assets/Link.svg'
import { ReactComponent as Size } from './assets/Size.svg'

const Editor: FC = () => {
  return (
    <div className="bgm-editor__container">
      <div className="bgm-editor__header">
        <Bold />
        <Italic />
        <Underscore />
        <Image />
        <Link />
        <Size />
      </div>
      <textarea className="bgm-editor__text" placeholder="想聊点什么的呢..." />
    </div>
  )
}

export default Editor
