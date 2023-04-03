import type { GroupProfile } from 'packages/client/group';
import React, { memo } from 'react';

import type { ButtonProps } from '@bangumi/design';
import { Button } from '@bangumi/design';
import { useUser } from '@bangumi/website/hooks/use-user';

export interface GroupActionsProps {
  groupProfile: GroupProfile;
  className?: string;
  size?: ButtonProps['size'];
}

const GroupActions = memo(({ groupProfile, className, size }: GroupActionsProps) => {
  const { user } = useUser();
  if (!user) {
    return null;
  }

  const { group } = groupProfile;

  return (
    <div className={className}>
      <Button.Link size={size} color='blue' to={`/group/${group.name}/new_topic`}>
        发表新主题
      </Button.Link>
      {/* TODO: 实现加入和退出小组功能 */}
      <Button size={size} color='blue' type='secondary' disabled>
        {groupProfile.inGroup ? '退出' : '加入'}该小组
      </Button>
    </div>
  );
});

export default GroupActions;
