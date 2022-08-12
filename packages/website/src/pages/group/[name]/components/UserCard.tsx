import React from 'react'
import styles from './UserCard.module.less'
import { Image, Typography } from '@bangumi/design'
// import { getUserProfileLink } from '../../../../utils/pages'

const { Link } = Typography

export interface UserCardProps {
  user: {
    nickname: string
    avatar: string
    username: string
  }
  mode?: 'vertical' | 'horizontal'
}

export const UserCard: React.FC<UserCardProps> = ({ user, mode = 'vertical' }) => {
  const getUserProfileLink = (name: string): string => {
    // TODO: 复用 /utils/pages
    return ''
  }
  return (
    <Link
      className={
        [
          styles.userCard,
          styles[mode]
        ].join(' ')
      } to={getUserProfileLink(user.username)} fontWeight="bold" isExternal
    >
      <Image className={styles.avatar} src={user.avatar} alt={`${user.nickname} 头像`} />
      {user.nickname}
    </Link>
  )
}
