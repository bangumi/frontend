import { Tab } from '@bangumi/design'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'
import { useGroup } from '../../../hooks/use-group'
import { GroupHeader } from './components/GroupHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'

const GroupHome: React.FC = () => {
  const { name } = useParams()
  const { group } = useGroup(name as string)

  const renderGroupPage = (): ReactElement | null => {
    if (!group) {
      // TODO: 无小组时显示 404\
      return null
    }

    const tabs = [{
      key: 'index',
      label: '小组概览'
    }]

    // TODO: XSS defense
    const parsedDescription = renderBBCode(group.description)

    return (
      <div className={styles.pageContainer}>
        <GroupHeader group={group} />
        <Tab type="borderless" items={tabs} activeKey="index" />
        <div className={styles.columnContainer}>
          <div className={styles.leftCol}>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: parsedDescription }} />
          </div>
          <div className={styles.rightCol} />
        </div>
      </div>
    )
  }

  return (
    <GlobalLayout>
      {renderGroupPage()}
    </GlobalLayout>
  )
}

export default GroupHome
