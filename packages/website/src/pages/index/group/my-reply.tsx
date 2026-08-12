import React from 'react';

import { GroupTopicFilterMode } from '@bangumi/client/client';

import GroupTopicListPage from './components/GroupTopicListPage';

const GroupMyReply: React.FC = () => (
  <GroupTopicListPage mode={GroupTopicFilterMode.Replied} title='我回复的话题' />
);

export default GroupMyReply;
