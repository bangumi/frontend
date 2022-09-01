import React, { FC } from 'react'
import styles from './GroupTopicHeader.module.less'
import { Avatar, Typography } from '@bangumi/design'
import ReplyInfo from './ReplyInfo'
import { Creator, GroupTopicGroupInfo } from '../../../../../types/common'
import { getGroupForumPage } from '../../../../../utils/pages'

interface Header {
  title: string
  createdAt: Date
  creator: Creator
  group: GroupTopicGroupInfo
}

const Link = Typography.Link

const GroupTopicHeader: FC<Header> = ({
  title,
  createdAt,
  creator,
  group
}) => {
  return (
    <div className={styles.groupTopicHeader}>
      <Avatar src={creator.avatar.large} size="medium" />
      <div className={styles.headerMain}>
        <span className={styles.navBar}>
          <div>
            <Link to={creator.url} isExternal>{creator.nickname}</Link>
            <span>发表于</span>
            <Link to={`/group/${group.name}`}>{group.title}</Link>
            <span>»</span>
            <Link to={getGroupForumPage(group.name)} isExternal>组内讨论</Link>
          </div>
          <ReplyInfo createdAt={createdAt} floor="1" />
        </span>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  )
}

export default GroupTopicHeader
