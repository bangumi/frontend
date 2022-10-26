import { useGroup, UseGroupRet } from '@bangumi/website/hooks/use-group'
import React from 'react'
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom'
import GroupLayout, { GroupTabs } from './components/GroupLayout'

interface GroupContext {
  groupRet: UseGroupRet
}

const GroupPage = () => {
  const { name } = useParams()
  const { pathname } = useLocation()
  const groupRet = useGroup(name as string)

  const matchTab = pathname.endsWith(GroupTabs.Forum)
    ? GroupTabs.Forum
    : pathname.endsWith(GroupTabs.Members)
      ? GroupTabs.Members
      : GroupTabs.Index

  return (
    <GroupLayout group={groupRet.group} curTab={matchTab}>
      <Outlet context={{ groupRet }} />
    </GroupLayout>
  )
}

export const useGroupContext = () => useOutletContext<GroupContext>()

export default GroupPage
