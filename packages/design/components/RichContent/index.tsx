import classNames from 'classnames';
import React from 'react';
import './style';

export interface RichContentProps {
  html: string;
  classname?: string;
}

const RichContent: React.FC<RichContentProps> = ({ html, classname }) => {
  return (
    <div
      className={classNames('bgm-rich-content', classname)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichContent;
