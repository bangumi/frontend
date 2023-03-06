import React from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import type { UseGroupRet } from '@bangumi/website/hooks/use-group';
import { useGroup } from '@bangumi/website/hooks/use-group';

import GroupLayout from '../components/GroupLayout';

interface GroupContext {
  groupRet: UseGroupRet;
}

function GroupPage() {
  const { name } = useParams();
  const groupRet = useGroup(name!);

  return (
    <GroupLayout group={groupRet.group} groupName={name!}>
      <Outlet context={{ groupRet }} />
    </GroupLayout>
  );
}

export const useGroupContext = () => useOutletContext<GroupContext>();

export default withErrorBoundary(GroupPage);
