import React from 'react';
import classNames from 'classnames';

export interface RichTextProps {
  html: string;
  classname?: string;
}

const RichContent: React.FC<RichTextProps> = ({ html, classname }) => {
  return (
    <article
      className={classNames('bgm-rich-content', classname)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichContent;
