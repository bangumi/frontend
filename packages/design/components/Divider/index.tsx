import type { FC } from 'react';
import React from 'react';

export interface DividerProps {
  /** 朝向：水平或竖直 */
  orientation?: 'horizontal' | 'vertical';
  /** 是否属于列表子项 , 在 `ul` 中使用 */
  isListItem?: boolean;
  /** 自定义类名，分隔线样式由调用方通过该类提供 */
  className?: string;
}

/**
 * 分隔线。组件本身不携带任何样式，外观完全由 `className` 提供，
 * 避免与调用方的 Panda CSS 样式发生层叠覆盖。
 */
const Divider: FC<DividerProps> = (props) => {
  const { orientation = 'horizontal', isListItem = false, className } = props;

  return (
    <>
      {isListItem ? (
        <li className={className} role='separator' aria-orientation={orientation} />
      ) : (
        <hr className={className} role='separator' aria-orientation={orientation} />
      )}
    </>
  );
};

export default Divider;
