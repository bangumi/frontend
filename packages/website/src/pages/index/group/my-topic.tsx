import React from 'react';

import { GroupTopicFilterMode } from '@bangumi/client/client';

import GroupTopicListPage from './components/GroupTopicListPage';

const GroupMyTopic: React.FC = () => (
  <GroupTopicListPage mode={GroupTopicFilterMode.Created} title='我发表的话题' />
);

export default GroupMyTopic;
