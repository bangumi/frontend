import classNames from 'classnames';
import React from 'react';

import { ReactComponent as DownArrow } from '@bangumi/website/assets/down-arrow.svg';
import { ReactComponent as UpArrow } from '@bangumi/website/assets/up-arrow.svg';

import styles from './ClampableContent.module.less';

export interface ClampableContentProps {
  threshold: number;
  content: string;
  isClamped: boolean;
  containerClassName?: string;
  onChange?: (isClamped: boolean) => void;
}

export const ClampableContent: React.FC<ClampableContentProps> = ({
  content,
  threshold,
  isClamped,
  onChange,
  containerClassName,
}) => {
  const [isClampEnabled, setIsClampedEnable] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) {
      return;
    }
    setIsClampedEnable(contentRef.current.scrollHeight > threshold);
  }, [threshold]);

  const clampedStyle: React.CSSProperties = {
    maxHeight: threshold,
    overflow: 'hidden',
  };

  const handleUnclamp = (): void => {
    onChange?.(false);
  };

  const handleClamp = (): void => {
    onChange?.(true);
  };

  const renderControl = (): React.ReactElement | null => {
    if (!isClampEnabled) {
      return null;
    }

    if (isClamped) {
      return (
        <>
          <div>...</div>
          {onChange ? (
            <div className={styles.textButton} onClick={handleUnclamp}>
              <span>展开</span>
              <DownArrow />
            </div>
          ) : null}
        </>
      );
    } else {
      return (
        <div className={styles.textButton} onClick={handleClamp}>
          <span>收起</span>
          <UpArrow />
        </div>
      );
    }
  };

  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div
        ref={contentRef}
        style={isClampEnabled && isClamped ? clampedStyle : undefined}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {renderControl()}
    </div>
  );
};
