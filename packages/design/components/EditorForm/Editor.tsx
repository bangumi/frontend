import React, { forwardRef, useRef, useImperativeHandle, useEffect, useCallback } from 'react';

import Toolbox from './Toolbox';

export interface EditorProps {
  placeholder?: string;
  /** 是否显示工具栏 */
  showToolbox?: boolean;
  /** textarea 通过键盘按下提交触发事件 */
  onConfirm?: (content: string) => void;
  /**
   * @default empty string
   */
  content?: string;
  /** 内容改变时的回调函数 */
  onChange?: (content: string) => void;
  /** 在被渲染时是否自动获取焦点 */
  autoFocus?: boolean;
}

const keyToEvent: Record<string, string> = {
  b: 'bold',
  i: 'italic',
  u: 'underscore',
  l: 'link',
  s: 'size',
  p: 'image',
} as const;

const setInputValue = (
  el: HTMLTextAreaElement,
  prefix: string,
  suffix: string,
  content = '',
): void => {
  const preStart = el.selectionStart;
  const preEnd = el.selectionEnd;
  const preValue = el.value;
  el.value = `${preValue.slice(0, preStart)}${prefix}${content}${suffix}${preValue.slice(preEnd)}`;
  if (preStart === preEnd) {
    el.selectionStart = el.selectionEnd = preStart + prefix.length + content.length;
  }
  el.focus();
};

export interface EditorRef {
  textArea: HTMLTextAreaElement;
}

const Editor = forwardRef<EditorRef, EditorProps>(
  ({ placeholder, showToolbox = true, onConfirm, content = '', onChange, autoFocus }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      textArea: innerRef.current!,
    }));

    useEffect(() => {
      // 用来确保输入光标在自动插入的quote内容之后。
      const el = innerRef.current;
      el?.setSelectionRange(el.value.length, el.value.length);
    }, []);

    // 使用useCallback避免在内容改变时触发Toolbox的渲染
    const handleToolboxEvent = useCallback((type: string, payload?: unknown): void => {
      const el = innerRef.current;
      if (!el) {
        return;
      }
      const preStart = el.selectionStart;
      const preEnd = el.selectionEnd;
      const selected = el.value.slice(preStart, preEnd);
      switch (type) {
        case 'bold': {
          setInputValue(el, '[b]', '[/b]', selected);
          break;
        }
        case 'italic': {
          setInputValue(el, '[i]', '[/i]', selected);
          break;
        }
        case 'underscore': {
          setInputValue(el, '[u]', '[/u]', selected);
          break;
        }
        case 'image': {
          const value = prompt('请输入图片链接');
          if (value === null) break;
          setInputValue(el, '[img]', '[/img]', value);
          el.selectionStart = el.selectionEnd = el.value.length;
          break;
        }
        case 'link': {
          const value = prompt('请输入链接地址');
          if (value === null) break;
          const prefix = `[url=${value}]`;
          const suffix = '[/url]';
          setInputValue(el, prefix, suffix, selected || '链接描述');
          if (!selected) {
            el.selectionStart = el.selectionEnd - 4;
          }
          break;
        }
        case 'size': {
          const value = prompt('请输入字体大小');
          if (value === null) break;
          setInputValue(el, `[size=${value}]`, '[/size]', selected);
          break;
        }
      }
    }, []);

    return (
      <div className='bgm-editor__container'>
        {showToolbox && <Toolbox handleClickEvent={handleToolboxEvent} />}
        <textarea
          className='bgm-editor__text'
          placeholder={placeholder}
          ref={innerRef}
          value={content}
          autoFocus={autoFocus}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            // Ctrl + Enter & Alt + S 触发提交
            if (
              ((e.ctrlKey || e.metaKey) && e.key === 'Enter') ||
              (e.altKey && e.key.toLowerCase() === 's')
            ) {
              onConfirm?.(innerRef.current!.value);
              return e.preventDefault();
            }
            // https://bgm.tv/help/bbcode
            if (e.ctrlKey || e.metaKey) {
              const key = e.key.toLowerCase();
              const event = keyToEvent[key];
              if (event) {
                handleToolboxEvent(event);
                e.preventDefault();
              }
            }
          }}
        />
      </div>
    );
  },
);

export default Editor;
