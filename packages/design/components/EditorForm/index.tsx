import React, { FC, useRef } from 'react'
import Editor, { EditorProps } from './Editor'
import Button from '../Button'
import Link from '../Typography/Link'
import classnames from 'classnames'

export interface EditorFormProps extends EditorProps {
  className?: string
  style: React.CSSProperties
  confirmText?: string
  onConfirm?: (content: string) => void
  cancelText?: string
  onCancel?: () => void
}

const EditorForm: FC<EditorFormProps> = ({
  className = '',
  style,
  confirmText = '写好了',
  onConfirm,
  cancelText = '取消',
  onCancel,
  ...args
}) => {
  const classNames = classnames('bgm-editor__form', className)
  const ref = useRef<HTMLTextAreaElement>(null)
  return (
    <div className={classNames} style={style}>
      <Editor {...args} ref={ref} />
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
