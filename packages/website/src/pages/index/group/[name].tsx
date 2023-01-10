import React from 'react';
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom';

import ErrorBoundary from '@bangumi/website/components/ErrorBoundary';
import type { UseGroupRet } from '@bangumi/website/hooks/use-group';
import { useGroup } from '@bangumi/website/hooks/use-group';

import GroupLayout, { GroupTabs } from './components/GroupLayout';

interface GroupContext {
  groupRet: UseGroupRet;
}

const InternalGroupPage = () => {
  const { name } = useParams();
  const { pathname } = useLocation();
  const groupRet = useGroup(name!);

  const matchTab = pathname.endsWith(GroupTabs.Forum)
    ? GroupTabs.Forum
    : pathname.endsWith(GroupTabs.Members)
    ? GroupTabs.Members
    : GroupTabs.Index;

  return (
    <GroupLayout group={groupRet.group} groupName={name!} curTab={matchTab}>
      <Outlet context={{ groupRet }} />
    </GroupLayout>
  );
};
const GroupPage = () => (
  <ErrorBoundary fallback={<>Group Not found</>}>
    <InternalGroupPage />
  </ErrorBoundary>
);

export const useGroupContext = () => useOutletContext<GroupContext>();

export default GroupPage;
