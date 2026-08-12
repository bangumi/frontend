import classNames from 'classnames';
import React from 'react';

import { ArrowDownCircle, ArrowUpCircle } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';

import Button from '../Button';

const collapsibleContent = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  lineHeight: '24px',
});

export interface CollapsibleContentProps {
  /** 高度阈值，折叠超过此高度的内容，内容高度小于阈值时禁用折叠 */
  threshold?: number;
  content: React.ReactNode;
  collapsed?: boolean;
  containerClassName?: string;
  onChange?: (collapsed: boolean) => void;
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  content,
  threshold = 200,
  collapsed = true,
  onChange,
  containerClassName,
}) => {
  const [enableCollapse, setEnableCollapse] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!contentRef.current) {
      return;
    }
    setEnableCollapse(contentRef.current.scrollHeight > threshold);
  }, [threshold]);

  const collapsedStyle: React.CSSProperties = {
    maxHeight: threshold,
    overflow: 'hidden',
  };

  const handleUncollapse = (): void => {
    onChange?.(false);
  };

  const handleCollapse = (): void => {
    onChange?.(true);
  };

  const renderControl = (): React.ReactElement | null => {
    if (!enableCollapse) {
      return null;
    }

    if (collapsed) {
      return (
        <div>
          ……
          <Button type='plain' onClick={handleUncollapse}>
            展开
            <ArrowDownCircle />
          </Button>
        </div>
      );
    }
    return (
      <Button type='plain' onClick={handleCollapse}>
        收起
        <ArrowUpCircle />
      </Button>
    );
  };

  return (
    <div className={classNames('bgm-collapsible-content', collapsibleContent, containerClassName)}>
      <div ref={contentRef} style={enableCollapse && collapsed ? collapsedStyle : undefined}>
        {content}
      </div>
      {renderControl()}
    </div>
  );
};

export default CollapsibleContent;
