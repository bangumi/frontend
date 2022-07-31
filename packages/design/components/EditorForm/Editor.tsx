/* eslint-disable react/prop-types */
import React, { forwardRef, useRef, useImperativeHandle, HTMLAttributes } from 'react'
import Toolbox from './Toolbox'

export interface EditorProps extends HTMLAttributes<HTMLTextAreaElement> {
  /* placeholder */
  placeholder?: string
  /* 是否显示工具栏 */
  showToolbox?: boolean
}

const setInputValue = (
  el: HTMLTextAreaElement,
  prefix: string,
  suffix: string,
  content = ''
): void => {
  const preStart = el.selectionStart
  const preEnd = el.selectionEnd
  const preValue = el.value
  el.value = `${preValue.slice(0, preStart)}${prefix}${content}${suffix}${preValue.slice(preEnd)}`
  if (preStart === preEnd) {
    el.selectionStart = el.selectionEnd = preStart + prefix.length + content.length
  }
  el.focus()
}

const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({
  placeholder,
  showToolbox = true,
  ...props
}, ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => innerRef.current!, [innerRef])
  const handleToolboxClick = (type: string, payload?: any): void => {
    const el = innerRef.current
    if (!el) {
      return
    }
    const preStart = el.selectionStart
    const preEnd = el.selectionEnd
    const selected = el.value.slice(preStart, preEnd)
    switch (type) {
      case 'bold': {
        setInputValue(el, '[b]', '[/b]', selected)
        break
      }
      case 'italic': {
        setInputValue(el, '[i]', '[/i]', selected)
        break
      }
      case 'underscore': {
        setInputValue(el, '[u]', '[/u]', selected)
        break
      }
      case 'image': {
        const value = prompt('请输入图片链接')
        if (value === null) break
        setInputValue(el, '[img]', '[/img]', value)
        el.selectionStart = el.selectionEnd = el.value.length
        break
      }
      case 'link': {
        const value = prompt('请输入链接地址')
        if (value === null) break
        const prefix = `[url=${value}]`
        const suffix = '[/url]'
        setInputValue(el, prefix, suffix, selected || '链接描述')
        if (!selected) {
          el.selectionStart = el.selectionEnd - 4
        }
        break
      }
      case 'size': {
        const value = prompt('请输入字体大小')
        if (value === null) break
        setInputValue(el, `[size=${value}]`, '[/size]', selected)
        break
      }
    }
  }
  return (
    <div className="bgm-editor__container">
      <Toolbox handleClickEvent={handleToolboxClick} style={{ display: showToolbox ? '' : 'none' }} />
      <textarea className="bgm-editor__text" placeholder={placeholder} ref={innerRef} {...props} />
    </div>
  )
})

export default Editor
