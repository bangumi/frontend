import React from 'react'
import styles from './UserCard.module.less'
import { Image, Typography } from '@bangumi/design'
import { getUserProfileLink } from '../../../../utils/pages'

// TODO: 重写 Link
const { Link } = Typography

export interface UserCardProps {
  user: {
    nickname: string
    avatar: string
    username: string
  }
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link className={styles.userCard} href={getUserProfileLink(user.username)}>
      <Image className={styles.avatar} src={user.avatar} alt={`${user.nickname} 头像`} />
      <span className={styles.nickname}>{user.nickname}</span>
    </Link>
  )
}
