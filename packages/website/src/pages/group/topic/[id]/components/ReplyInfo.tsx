import React from 'react'
import styles from './ReplyInfo.module.less'
import dayjs from 'dayjs'

interface ReplyInfoProps {
  floor: string
  createdAt: Date
}

const ReplyInfo: React.FC<ReplyInfoProps> = ({ floor, createdAt }) => {
  return (
    <span
      className={styles.replyInfo}
    >#{floor}&nbsp;&nbsp;|&nbsp;&nbsp;{dayjs(createdAt).format('YYYY-M-D HH:MM')}&nbsp;&nbsp;|&nbsp;&nbsp;!</span>
  )
}

export default ReplyInfo
