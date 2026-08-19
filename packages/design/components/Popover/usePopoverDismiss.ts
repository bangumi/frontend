import type { RefObject } from 'react';
import { useEffect } from 'react';

/** 关闭弹出层的原因 */
export type PopoverDismissReason = 'escape' | 'outside';

interface PopoverDismissOptions {
  open: boolean;
  /** 触发元素与弹出层的共同容器，用于判断点击是否发生在外部 */
  rootRef: RefObject<HTMLElement | null>;
  onDismiss: (reason: PopoverDismissReason) => void;
}

/**
 * 弹出层展开时监听外部点击与 Escape。
 *
 * 监听 `pointerdown` 而非 `click`：后者与触发元素自身的 click 在同一次交互中先后触发，
 * 会出现「先关闭再立刻重新展开」的抖动。
 */
export function usePopoverDismiss({ open, rootRef, onDismiss }: PopoverDismissOptions): void {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handlePointerDown = (event: PointerEvent): void => {
      const root = rootRef.current;
      if (root && !root.contains(event.target as Node)) {
        onDismiss('outside');
      }
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onDismiss('escape');
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, rootRef, onDismiss]);
}
