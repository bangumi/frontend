import React, { FC } from 'react'
import Toolbox from './Toolbox'

const Editor: FC = () => {
  return (
    <div className="bgm-editor__container">
      <Toolbox />
      <textarea className="bgm-editor__text" placeholder="想聊点什么的呢..." />
    </div>
  )
}

export default Editor
