import { useGroup, UseGroupRet } from 'website/hooks/use-group'
import React from 'react'
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom'
import GroupLayout, { GroupTabs } from './group/components/GroupLayout'

interface ContextType {
  groupRet: UseGroupRet
}

const GroupPage: React.FC = () => {
  const { name } = useParams()
  const { pathname } = useLocation()
  const groupRet = useGroup(name as string)

  const matchTab = pathname.endsWith(GroupTabs.Forum)
    ? GroupTabs.Forum
    : pathname.endsWith(GroupTabs.Members)
      ? GroupTabs.Members
      : GroupTabs.Index

  if (!groupRet.group) {
    return null
  }
  return name
    ? <GroupLayout group={groupRet.group} curTab={matchTab}>
      <Outlet context={{ groupRet }} />
    </GroupLayout>
    : <Outlet />
}

export const useGroupContext = (): ContextType => useOutletContext<ContextType>()

export default GroupPage
