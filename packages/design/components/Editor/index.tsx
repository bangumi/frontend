import React, { FC } from 'react'
import { Bold, Italic, Underscore, Image, Link, Size } from '@bangumi/icons'

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
