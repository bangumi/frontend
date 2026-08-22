import React, { forwardRef, useState } from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import Button from '../Button';
import RichContent from '../RichContent';
import Link from '../Typography/Link';
import type { EditorProps } from './Editor';
import Editor from './Editor';

const editorForm = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  // 允许在窄容器（如移动端）内收缩，避免内容按 max-content 撑开
  minWidth: '0',
  '& .bgm-editor__submit': {
    fontSize: '14px',
    display: 'flex',
    marginTop: '12px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    // 验证码等额外内容在窄屏放不下时换行，避免横向溢出
    flexWrap: 'wrap',
    '& .bgm-editor__bbcode-tip': {
      color: '#9f9b9b',
      lineHeight: '24px',
      '& .bgm-editor__bbcode-tip__left': {
        '@media (max-width: 640px)': { display: 'none' },
      },
    },
  },
  '& .bgm-editor__button': { padding: '0 15px' },
  '.bgm-form--compact > &': {
    alignItems: 'stretch',
    width: 'auto',
    '& .bgm-editor__container': {
      borderTop: 'none',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
    '& .bgm-editor__layout--preview': {
      borderTop: 'none',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
  },
});

const editorLayout = css({
  width: '100%',
  minWidth: '0',
});

const editorPreviewLayout = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  border: '2px solid #e8e3e3',
  borderRadius: '12px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  '& .bgm-editor__container': {
    border: 'none',
    borderRadius: '0',
  },
  '& .bgm-editor__preview': {
    minWidth: '0',
    minHeight: '162px',
    padding: '8px 6px 6px',
    borderLeft: '2px solid #e8e3e3',
    boxSizing: 'border-box',
    '@media (max-width: 640px)': {
      borderLeft: 'none',
      borderTop: '2px solid #e8e3e3',
    },
  },
  '& .bgm-editor__preview-title': {
    height: '26px',
    padding: '0 8px',
    marginBottom: '10px',
    color: '#9f9b9b',
    fontSize: '14px',
    lineHeight: '26px',
  },
  '& .bgm-editor__preview-content': {
    padding: '0 6px',
  },
  '& .bgm-editor__preview-empty': {
    color: '#9f9b9b',
    fontSize: '16px',
    lineHeight: '26px',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

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
  /** 渲染在确认按钮右侧的额外内容（如验证码） */
  submitExtra?: React.ReactNode;
  /**
   * 是否隐藏取消按钮
   * @default false
   */
  hideCancel?: boolean;
  /**
   * 禁用提交（确认按钮与 Ctrl+Enter / Alt+S 快捷键）
   * @default false
   */
  disabled?: boolean;
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
      submitExtra,
      hideCancel = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [showPreview, setShowPreview] = useState(false);
    const value = props.value ?? '';

    return (
      <div className={cx('bgm-editor__form', editorForm, className)} style={style}>
        <div
          className={cx(
            'bgm-editor__layout',
            editorLayout,
            showPreview && 'bgm-editor__layout--preview',
            showPreview && editorPreviewLayout,
          )}
        >
          <Editor ref={ref} onConfirm={onConfirm} disabled={disabled} {...props} />
          {showPreview && (
            <div className='bgm-editor__preview' aria-label='BBCode 预览'>
              <div className='bgm-editor__preview-title'>预览</div>
              <div className='bgm-editor__preview-content'>
                {value.trim() ? (
                  <RichContent bbcode={value} />
                ) : (
                  <span className='bgm-editor__preview-empty'>输入内容后，这里会显示预览。</span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className='bgm-editor__submit'>
          <Button
            color='blue'
            className='bgm-editor__button bgm-editor__button--confirm'
            disabled={disabled}
            onClick={() => onConfirm?.(value)}
          >
            {confirmText}
          </Button>
          {submitExtra}
          <Button
            type='text'
            className='bgm-editor__button bgm-editor__button--preview'
            aria-pressed={showPreview}
            onClick={() => setShowPreview((open) => !open)}
          >
            {showPreview ? '关闭预览' : '预览'}
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
            <Link to='/help/bbcode'>BBCode指南</Link>
          </span>
        </div>
      </div>
    );
  },
);

export default EditorForm;
