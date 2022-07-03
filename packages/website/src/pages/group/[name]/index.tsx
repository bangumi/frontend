import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'
import { useGroup } from '../../../hooks/use-group'
import { GroupHeader } from './components/GroupHeader'

const GroupHome: React.FC = () => {
  const { name } = useParams()
  const { group } = useGroup(name as string)

  const renderGroupPage = (): ReactElement | null => {
    if (!group) {
      // TODO: 无小组时显示 404\
      return null
    }

    return <GroupHeader group={group} />
  }

  return (
    <GlobalLayout>
      {renderGroupPage()}
    </GlobalLayout>
  )
}

export default GroupHome
