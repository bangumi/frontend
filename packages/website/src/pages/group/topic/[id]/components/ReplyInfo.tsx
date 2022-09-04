import React from 'react'
import styles from './ReplyInfo.module.less'
import dayjs from 'dayjs'

interface ReplyInfoProps {
  floor: string | number
  isSpecial?: boolean
  createdAt: Date
}

const ReplyInfo: React.FC<ReplyInfoProps> = ({ floor, createdAt, isSpecial = false }) => {
  const date = dayjs(createdAt).format('YYYY-M-D HH:MM')
  return !isSpecial
    ? (
      <span
        className={styles.replyInfo}
      >#{floor}&nbsp;&nbsp;|&nbsp;&nbsp;{date}&nbsp;&nbsp;|&nbsp;&nbsp;!</span>
      )
    : (
      <span className={styles.replyInfo}>{date}</span>
      )
}

export default ReplyInfo
