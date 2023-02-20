import { size } from 'lodash';
import type { FocusEventHandler } from 'react';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import Toolbox from './Toolbox';

export interface EditorProps {
  placeholder?: string;
  /** 是否显示工具栏 */
  showToolbox?: boolean;
  /** 是否显示字数统计 */
  showWordCount?: boolean;
  /** textarea 通过键盘按下提交触发事件 */
  onConfirm?: (value: string) => void;
  /**
   * @default empty string
   */
  value?: string;
  /** 内容改变时的回调函数 */
  onChange?: (value: string) => void;
  /** 在被渲染时是否自动获取焦点 */
  autoFocus?: boolean;
  /** 文本域初始行数 */
  rows?: number;
  name?: string;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

const keyToEvent: Record<string, string> = {
  b: 'bold',
  i: 'italic',
  u: 'underscore',
  l: 'link',
  s: 'size',
  p: 'image',
} as const;

const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  (
    {
      placeholder,
      showToolbox = true,
      showWordCount = true,
      onConfirm,
      value = '',
      onChange,
      autoFocus,
      rows,
      name,
      onBlur,
    },
    ref,
  ) => {
    const [selection, setSelection] = useState<[number, number]>();
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
      ref,
      () => innerRef.current,
    );

    useEffect(() => {
      // 用来确保输入光标在自动插入的quote内容之后。
      const el = innerRef.current;
      el?.setSelectionRange(el.value.length, el.value.length);
    }, []);

    // content改变时应重新设置选择范围
    useEffect(() => {
      if (!selection) return;
      const [start, end] = selection;
      const el = innerRef.current;
      el?.setSelectionRange(start, end);
      el?.focus();
    }, [selection]);

    const updateContent = useCallback(
      (newContent: string): void => {
        setSelection(undefined);
        onChange?.(newContent);
      },
      [setSelection, onChange],
    );

    const insertTag = useCallback(
      (el: HTMLTextAreaElement, prefix: string, suffix: string, selected = ''): void => {
        const preStart = el.selectionStart;
        const preEnd = el.selectionEnd;
        const preValue = el.value;
        updateContent(
          `${preValue.slice(0, preStart)}${prefix}${selected}${suffix}${preValue.slice(preEnd)}`,
        );
        // 未选择内容，插入BBCode标签后应将光标置于标签中间
        if (selected.length === 0) {
          const cursorPos = preStart + prefix.length + selected.length;
          setSelection([cursorPos, cursorPos]);
        }
        el.focus();
      },
      [updateContent, setSelection],
    );

    // 使用useCallback避免在内容改变时触发Toolbox的渲染
    const handleToolboxEvent = useCallback(
      (type: string, payload?: unknown): void => {
        const el = innerRef.current;
        if (!el) {
          return;
        }
        const preStart = el.selectionStart;
        const preEnd = el.selectionEnd;
        const selected = el.value.slice(preStart, preEnd);
        switch (type) {
          case 'bold': {
            insertTag(el, '[b]', '[/b]', selected);
            break;
          }
          case 'italic': {
            insertTag(el, '[i]', '[/i]', selected);
            break;
          }
          case 'underscore': {
            insertTag(el, '[u]', '[/u]', selected);
            break;
          }
          case 'image': {
            const value = prompt('请输入图片链接');
            if (value === null) break;
            insertTag(el, '[img]', '[/img]', value);
            break;
          }
          case 'link': {
            const value = prompt('请输入链接地址');
            if (value === null) break;
            const prefix = `[url=${value}]`;
            const suffix = '[/url]';
            insertTag(el, prefix, suffix, selected || '链接描述');
            if (!selected) {
              // 选中“链接描述”
              const start = preEnd + prefix.length;
              const end = start + 4;
              setSelection([start, end]);
            }
            break;
          }
          case 'size': {
            const value = prompt('请输入字体大小');
            if (value === null) break;
            insertTag(el, `[size=${value}]`, '[/size]', selected);
            break;
          }
        }
      },
      [innerRef, insertTag, setSelection],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Ctrl + Enter & Alt + S 触发提交
        if (
          ((e.ctrlKey || e.metaKey) && e.key === 'Enter') ||
          (e.altKey && e.key.toLowerCase() === 's')
        ) {
          onConfirm?.(innerRef.current!.value);
          e.preventDefault();
          return;
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
      },
      [onConfirm, handleToolboxEvent],
    );

    return (
      <div className='bgm-editor__container'>
        <div className='bgm-editor__toolbar'>
          {showToolbox && <Toolbox handleClickEvent={handleToolboxEvent} />}
          {showWordCount && value && (
            <div className='bgm-editor__wordcount'>已输入 {size(value)} 字</div>
          )}
        </div>
        <textarea
          className='bgm-editor__text'
          placeholder={placeholder}
          ref={innerRef}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => {
            updateContent(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          rows={rows}
          name={name}
          onBlur={onBlur}
        />
      </div>
    );
  },
);

export default Editor;
