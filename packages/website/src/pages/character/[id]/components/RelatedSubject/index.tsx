import { Image } from '@bangumi/design'
import React from 'react'
import { RelatedSubject as RelatedSubjectType } from '../../../../../types/common'
import style from './index.module.less'

export interface RelatedSubjectProps {
  subject: RelatedSubjectType
}
const RelatedSubject: React.FC<RelatedSubjectProps> = ({ subject }) => {
  return (
    <div>
      <Image className={style.thumbnail} src={subject.image} />
    </div>
  )
}

export default RelatedSubject
