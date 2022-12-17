import './style';

import classnames from 'classnames';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import Button from '../Button';
import Link from '../Typography/Link';
import type { EditorProps, IReset } from './Editor';
import Editor from './Editor';

export interface EditorFormProps extends EditorProps {
  /* 最外层 className */
  className?: string;
  /* 最外层 style */
  style?: React.CSSProperties;
  /* 确认按钮的文本 */
  confirmText?: string;
  /* 确认按钮后的回调 */
  onConfirm?: (content: string) => void;
  /* 取消按钮的文本 */
  cancelText?: string;
  /* 取消按钮的回调 */
  onCancel?: () => void;
  /**
   * 初始内容
   */
  initContent?: string;
}

const EditorForm = forwardRef<IReset, EditorFormProps>(
  (
    {
      className,
      style,
      initContent = '',
      confirmText = '写好了',
      onConfirm,
      cancelText = '取消',
      onCancel,
      ...props
    },
    ref,
  ) => {
    const classNames = classnames('bgm-editor__form', className);
    const editorRef = useRef<HTMLTextAreaElement & { reset: () => void }>(null);

    useImperativeHandle(ref, () => ({
      reset: () => editorRef.current?.reset(),
    }));

    return (
      <div className={classNames} style={style}>
        <Editor ref={editorRef} initContent={initContent} onConfirm={onConfirm} {...props} />
        <div className='bgm-editor__submit'>
          <Button
            shape='rounded'
            className='bgm-editor__button bgm-editor__button--confirm'
            onClick={() => onConfirm?.(editorRef.current!.value)}
          >
            {confirmText}
          </Button>
          <Button type='text' className='bgm-editor__button' onClick={onCancel}>
            {cancelText}
          </Button>
          <span className='bgm-editor__bbcode-tip'>
            使用 Ctrl+Enter 或 Alt+S 快速提交 |{' '}
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
