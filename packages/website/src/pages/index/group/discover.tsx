import React from 'react';

import { GroupTopicFilterMode } from '@bangumi/client/client.ts';

import GroupTopicListPage from './components/GroupTopicListPage.tsx';

const GroupDiscover: React.FC = () => (
  <GroupTopicListPage mode={GroupTopicFilterMode.All} title='随便看看' />
);

export default GroupDiscover;
