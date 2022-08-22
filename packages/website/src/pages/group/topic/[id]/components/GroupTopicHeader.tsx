import React, { FC } from 'react'
import styles from './GroupTopicHeader.module.less'
import { Avatar, Typography } from '@bangumi/design'
import { Creator } from '../../../../../types/common'
import dayjs from 'dayjs'

interface Header {
  title: string
  createdAt: Date
  creator: Creator
}

const Link = Typography.Link

const GroupTopicHeader: FC<Header> = (props) => {
  return (
    <div className={styles.groupTopicHeader}>
      <Avatar src={props.creator.avatar.large} size="medium" />
      <div className={styles.headerMain}>
        <span className={styles.navBar}>
          <div>
            <Link to={props.creator.url}>{props.creator.nickname}</Link>
            <span>发表于</span>
            <Link to="">靠谱人生茶话会</Link>
            <span>»</span>
            <Link to="">组内讨论</Link>
          </div>
          <span
            className={styles.info}
          >#1&nbsp;&nbsp;|&nbsp;&nbsp;{dayjs(props.createdAt).format('YYYY-M-D HH:MM')}&nbsp;&nbsp;|&nbsp;&nbsp;!</span>
        </span>
        <h1 className={styles.title}>{props.title}</h1>
      </div>
    </div>
  )
}

export default GroupTopicHeader
