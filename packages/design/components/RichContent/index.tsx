import classNames from 'classnames';
import React from 'react';

export interface RichContentProps {
  html: string;
  classname?: string;
  id?: string;
}

const RichContent: React.FC<RichContentProps> = ({ html, classname, id }) => {
  return (
    <div
      className={classNames('bgm-rich-content', classname)}
      dangerouslySetInnerHTML={{ __html: html }}
      id={id}
    />
  );
};

export default RichContent;
