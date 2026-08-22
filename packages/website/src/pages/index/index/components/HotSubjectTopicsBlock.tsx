import React from 'react';

import type { SubjectTopic } from '@bangumi/client/client.ts';
import { Typography } from '@bangumi/design/index.tsx';
import { getSubjectLink, getSubjectTopicLink } from '@bangumi/utils/pages.ts';

import HomeSidePanel from './HomeSidePanel.tsx';
import SideTopicList from './SideTopicList.tsx';

const { Link } = Typography;

/**
 * 热门条目讨论，对齐 PHP home_subject_tpc
 */
const HotSubjectTopicsBlock: React.FC<{ topics: SubjectTopic[] }> = ({ topics }) => {
  if (topics.length === 0) {
    return null;
  }
  return (
    <HomeSidePanel title='热门条目讨论'>
      <SideTopicList
        items={topics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          replyCount: topic.replyCount,
          creatorAvatar: topic.creator?.avatar.small ?? '',
          creatorUsername: topic.creator?.username ?? '',
          topicLink: getSubjectTopicLink(topic.id),
          extra: (
            <Link to={getSubjectLink(topic.subject.id)}>
              {topic.subject.nameCN || topic.subject.name}
            </Link>
          ),
        }))}
      />
    </HomeSidePanel>
  );
};

export default HotSubjectTopicsBlock;
