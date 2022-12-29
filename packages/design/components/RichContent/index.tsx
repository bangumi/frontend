import classNames from 'classnames';
import React from 'react';
import './style';

export interface RichContentProps {
  element: React.ReactNode;
  classname?: string;
}

const RichContent: React.FC<RichContentProps> = ({ element, classname }) => {
  return <div className={classNames('bgm-rich-content', classname)}>{element}</div>;
};

export default RichContent;
