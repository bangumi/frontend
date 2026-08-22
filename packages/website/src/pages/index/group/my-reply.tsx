import React from 'react';

import { GroupTopicFilterMode } from '@bangumi/client/client.ts';

import GroupTopicListPage from './components/GroupTopicListPage.tsx';

const GroupMyReply: React.FC = () => (
  <GroupTopicListPage mode={GroupTopicFilterMode.Replied} title='我回复的话题' />
);

export default GroupMyReply;
