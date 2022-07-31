/* eslint-disable react/prop-types */
import React, { FC, ChangeEvent, useRef } from 'react'
import Toolbox from './Toolbox'

export interface EditorProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const setInputValue = (el: HTMLTextAreaElement, content: string, shouldUpdateSelection = true): void => {
  const pos = el.value.length + content.lastIndexOf('[')
  el.value += content
  shouldUpdateSelection && el.setSelectionRange(pos, pos)
  el.focus()
}

const Editor: FC<EditorProps> = ({
  onChange
}) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const handleToolboxClick = (type: string, payload?: any): void => {
    const el = ref.current
    if (!el) {
      return
    }
    switch (type) {
      case 'bold': {
        setInputValue(el, '[b][/b]')
        break
      }
      case 'italic': {
        setInputValue(el, '[i][/i]')
        break
      }
      case 'underscore': {
        setInputValue(el, '[u][/u]')
        break
      }
      case 'image': {
        const value = prompt('请输入图片链接')
        if (value === null) break
        setInputValue(el, `[img]${value}[/img]`, false)
        break
      }
      case 'link': {
        const value = prompt('请输入链接地址')
        if (value === null) break
        setInputValue(el, `[url=${value}]连接描述[/url]`)
        break
      }
      case 'size': {
        const value = prompt('请输入字体大小')
        if (value === null) break
        setInputValue(el, `[size=${value}][/size]`)
        break
      }
    }
  }
  return (
    <div className="bgm-editor__container">
      <Toolbox handleClickEvent={handleToolboxClick} />
      <textarea className="bgm-editor__text" placeholder="想聊点什么的呢..." onChange={onChange} ref={ref} />
    </div>
  )
}

export default Editor
