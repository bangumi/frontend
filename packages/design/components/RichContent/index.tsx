import React from 'react'
import classNames from 'classnames'

export interface RichContentProps {
  html: string
  classname?: string
}

const RichContent: React.FC<RichContentProps> = ({ html, classname }) => {
  return (
    <article
      className={classNames('bgm-rich-content', classname)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default RichContent
