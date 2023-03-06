import React from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';

import ErrorBoundary from '@bangumi/website/components/ErrorBoundary';
import type { UseGroupRet } from '@bangumi/website/hooks/use-group';
import { useGroup } from '@bangumi/website/hooks/use-group';

import GroupLayout from '../components/GroupLayout';

interface GroupContext {
  groupRet: UseGroupRet;
}

const InternalGroupPage = () => {
  const { name } = useParams();
  const groupRet = useGroup(name!);

  return (
    <GroupLayout group={groupRet.group} groupName={name!}>
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
