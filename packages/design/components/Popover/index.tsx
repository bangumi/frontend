import type { ReactElement } from 'react';
import React, { useCallback, useId, useRef, useState } from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import { usePopoverDismiss } from './usePopoverDismiss.ts';

/** 弹出层的触发方式 */
export type PopoverTrigger = 'hover' | 'click';

/** 弹出层相对触发元素的水平对齐方式 */
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /**
   * 触发方式。默认 `hover`，为纯 CSS 实现，内容常驻 DOM 仅靠样式隐藏。
   * `click` 会在收起时卸载内容，适合表情面板这类体量较大的弹出层。
   */
  trigger?: PopoverTrigger;
  /** 仅 `trigger='click'` 生效 */
  align?: PopoverAlign;
  /** 弹出层的无障碍名称，仅 `trigger='click'` 生效 */
  label?: string;
}

// 未 hover 时隐藏弹出内容，避免 absolute 菜单在移动端撑出水平滚动
const popover = css({
  display: 'inline-block',
  '& .bgm-popover__container': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .bgm-popover__content': {
    border: '1px solid #e8e3e3',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    borderRadius: '17px',
    position: 'absolute',
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s, opacity 0.15s linear',
    zIndex: '99',
    display: 'none',
  },
  _hover: {
    '& .bgm-popover__content': {
      visibility: 'visible',
      opacity: '1',
      display: 'block',
    },
  },
});

const clickPopover = css({
  display: 'inline-block',
  position: 'relative',
  '& .bgm-popover__trigger': {
    display: 'inline-flex',
    alignItems: 'center',
  },
  '& .bgm-popover__container': {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    zIndex: '100',
  },
  '& .bgm-popover__content': {
    border: '1px solid #e8e3e3',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    borderRadius: '17px',
    // 宽度由内容决定，这里只保证不越出视口
    maxWidth: 'calc(100vw - 24px)',
  },
});

const alignStart = css({ '& .bgm-popover__container': { left: '0' } });
const alignCenter = css({
  '& .bgm-popover__container': { left: '50%', transform: 'translateX(-50%)' },
});
const alignEnd = css({ '& .bgm-popover__container': { right: '0' } });

const ALIGN_CLASS: Record<PopoverAlign, string> = {
  start: alignStart,
  center: alignCenter,
  end: alignEnd,
};

const FOCUSABLE_SELECTOR = 'button, [href], [tabindex]:not([tabindex="-1"])';

type ClickPopoverProps = Omit<PopoverProps, 'trigger'>;

const ClickPopover = ({
  children,
  content,
  className,
  align = 'center',
  label,
}: ClickPopoverProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  /**
   * 把焦点交还触发元素。
   *
   * 这里用 `querySelector` 而不是给 children 传 ref：`Button` 会把多余的 props 透传到
   * `<button>`，但它并非 `forwardRef`，传 ref 会静默失效且没有类型报错。
   */
  const focusTrigger = useCallback((): void => {
    triggerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
  }, []);

  const handleDismiss = useCallback(
    (reason: 'escape' | 'outside'): void => {
      setIsOpen(false);
      // 点击外部时焦点应留在用户点击处，只有 Escape 才交还触发元素
      if (reason === 'escape') {
        focusTrigger();
      }
    },
    [focusTrigger],
  );

  usePopoverDismiss({ open: isOpen, rootRef, onDismiss: handleDismiss });

  const trigger = React.isValidElement(children)
    ? React.cloneElement(children as ReactElement<Record<string, unknown>>, {
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        'aria-controls': isOpen ? panelId : undefined,
      })
    : children;

  return (
    <span ref={rootRef} className={cx('bgm-popover', clickPopover, ALIGN_CLASS[align], className)}>
      <span
        ref={triggerRef}
        className='bgm-popover__trigger'
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        {trigger}
      </span>
      {/* 收起时不渲染内容：表情面板动辄上百个格子，不能为每个触发点预先挂载 */}
      {isOpen && (
        <span className='bgm-popover__container'>
          <div id={panelId} role='dialog' aria-label={label} className='bgm-popover__content'>
            {content}
          </div>
        </span>
      )}
    </span>
  );
};

/**
 * 弹出层。
 *
 * 默认的 `hover` 模式保持与旧版完全一致的 DOM 结构与类名，
 * `EpisodeProgressPopover` 等消费方依赖 `.bgm-popover__content` 做定位与样式覆写。
 *
 * 弹出层始终渲染在组件自身的 DOM 位置（absolute），不使用 portal —— 编辑器到页面根之间
 * 没有裁剪祖先。若将来确需脱离裁剪容器，应使用 `createPortal`，而不是 `Toast` 那种
 * 手动 `createRoot`：后者是为无 React 父级的命令式 API 准备的，会丢失 context 与事件冒泡。
 */
const Popover = ({ trigger = 'hover', ...props }: PopoverProps) => {
  if (trigger === 'click') {
    return <ClickPopover {...props} />;
  }
  const { children, content, className } = props;
  return (
    <div className={cx(popover, className)}>
      {children}
      {/* 添加一个wrapper使绝对定位元素能够水平居中 */}
      <div className='bgm-popover__container'>
        <div className='bgm-popover__content'>{content}</div>
      </div>
    </div>
  );
};

export default Popover;
