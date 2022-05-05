import { Image, Typography } from '@bangumi/design'
import React from 'react'
import { RelatedSubject as RelatedSubjectType } from '../../../../../types/common'
import style from './index.module.less'
import { Link } from 'react-router-dom'

const { Text } = Typography

export interface RelatedSubjectProps {
  subject: RelatedSubjectType
}
const RelatedSubject: React.FC<RelatedSubjectProps> = ({ subject }) => {
  return (
    <div className={style.container}>
      <Image className={style.thumbnail} src={subject.image} />
      <div className={style.infoLines}>
        <Link className={style.title} to={`/subject/${subject.id}`}>{subject.name}</Link>
        <div className={style.translationLine}><Text className={style.translation} type="secondary">{subject.nameCn}</Text></div>
        <div><span className={style.tag}>{subject.staff}</span></div>
      </div>
    </div>
  )
}

export default RelatedSubject
