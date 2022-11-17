import React from 'react'
import { Image, Typography } from '@bangumi/design'
import dayjs from 'dayjs'
import { GroupProfile } from '@bangumi/types/group'
import styles from './GroupHeader.module.less'

const { Text } = Typography
export const GroupHeader: React.FC<{ group: GroupProfile }> = ({ group }) => {
  return (
    <div className={styles.groupHeader}>
      <div className={styles.thumbnail}>
        {
          group.icon && <Image className={styles.thumbnail} src={group.icon} alt={`${group.title} 头像`} />
        }
      </div>
      <div className={styles.infoCol}>
        <div className={styles.title}>{group.title}</div>
        <div><Text type="secondary"> 创建于 {dayjs(group.created_at).format('YYYY-M-D HH:mm')} | 现有 {group.total_members} 名成员 </Text></div>
      </div>
    </div>
  )
}
