import './style';

import classnames from 'classnames';
import React, { forwardRef } from 'react';

import Button from '../Button';
import Link from '../Typography/Link';
import type { EditorProps } from './Editor';
import Editor from './Editor';

export interface EditorFormProps extends EditorProps {
  /** 最外层 className */
  className?: string;
  /** 最外层 style */
  style?: React.CSSProperties;
  /** 确认按钮的文本 */
  confirmText?: string;
  /** 确认按钮后的回调 */
  onConfirm?: (content: string) => void;
  /** 取消按钮的文本 */
  cancelText?: string;
  /** 取消按钮的回调 */
  onCancel?: () => void;
  /**
   * 是否隐藏取消按钮
   * @default false
   */
  hideCancel?: boolean;
}

const EditorForm = forwardRef<HTMLTextAreaElement, EditorFormProps>(
  (
    {
      className,
      style,
      confirmText = '写好了',
      onConfirm,
      cancelText = '取消',
      onCancel,
      hideCancel = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={classnames('bgm-editor__form', className)} style={style}>
        <Editor ref={ref} onConfirm={onConfirm} {...props} />
        <div className='bgm-editor__submit'>
          <Button
            color='blue'
            className='bgm-editor__button bgm-editor__button--confirm'
            onClick={() => onConfirm?.(props.value ?? '')}
          >
            {confirmText}
          </Button>
          {!hideCancel && (
            <Button type='text' className='bgm-editor__button' onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <span className='bgm-editor__bbcode-tip'>
            <span className='bgm-editor__bbcode-tip__left'>
              使用 Ctrl+Enter 或 Alt+S 快速提交 |{' '}
            </span>
            <Link isExternal to='https://bgm.tv/help/bbcode'>
              BBCode指南
            </Link>
          </span>
        </div>
      </div>
    );
  },
);

export default EditorForm;
