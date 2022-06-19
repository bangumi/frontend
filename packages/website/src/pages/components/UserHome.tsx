import { Typography } from '@bangumi/design'
import React from 'react'
import GlobalLayout from '../../components/GlobalLayout'
import { useUser } from '../../hooks/use-user'
import styles from './UserHome.module.less'

const { Link } = Typography

const UserHome: React.FC = () => {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <GlobalLayout>
      <main className={styles.pageContainer}>
        <div className={styles.greets}>Hi! <Link className={styles.link} href={user.url}>{user.nickname}</Link></div>
      </main>
    </GlobalLayout>
  )
}

export default UserHome
