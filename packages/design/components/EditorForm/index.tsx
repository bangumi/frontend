import React, { FC, useRef } from 'react'
import Editor, { EditorProps } from './Editor'
import Button from '../Button'
import Link from '../Typography/Link'
import classnames from 'classnames'

export interface EditorFormProps extends EditorProps {
  /* 最外层 className */
  className?: string
  /* 最外层 style */
  style?: React.CSSProperties
  /* 确认按钮的文本 */
  confirmText?: string
  /* 确认按钮后的回调 */
  onConfirm?: (content: string) => void
  /* 取消按钮的文本 */
  cancelText?: string
  /* 取消按钮的回调 */
  onCancel?: () => void
}

const EditorForm: FC<EditorFormProps> = ({
  className,
  style,
  confirmText = '写好了',
  onConfirm,
  cancelText = '取消',
  onCancel,
  ...props
}) => {
  const classNames = classnames('bgm-editor__form', className)
  const ref = useRef<HTMLTextAreaElement>(null)
  return (
    <div className={classNames} style={style}>
      <Editor
        ref={ref}
        onKeyDown={e => {
          console.log(e)
          if (
            ((e.ctrlKey || e.metaKey) && e.key === 'Enter') ||
          (e.altKey && e.key === 's')
          ) {
            onConfirm?.(ref.current!.value)
          }
        }}
        {...props}
      />
      <div className="bgm-editor__button-group">
        <Button
          shape="rounded" className="bgm-editor__button bgm-editor__button--confirm"
          onClick={() => onConfirm?.(ref.current!.value)}
        >{confirmText}
        </Button>
        <Button
          type="secondary" className="bgm-editor__button bgm-editor__button--cancel"
          onClick={onCancel}
        >{cancelText}</Button>
        <span className="bgm-editor__button-group__tip">
          使用 Ctrl+Enter 或 Alt+S 快速提交 |
          {' '}
          <Link
            isExternal
            to="https://bgm.tv/help/bbcode"
          >
            BBCode指南
          </Link>
        </span>
      </div>
    </div>
  )
}

export default EditorForm
