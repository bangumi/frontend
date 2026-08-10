import React from 'react';

import type { SubjectTopic } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';

import HomeSidePanel from './HomeSidePanel';
import SideTopicList from './SideTopicList';

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
          topicLink: `https://bgm.tv/subject/topic/${topic.id}`,
          extra: (
            <Link
              to={`https://bgm.tv/subject/${topic.subject.id}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {topic.subject.nameCN || topic.subject.name}
            </Link>
          ),
        }))}
      />
    </HomeSidePanel>
  );
};

export default HotSubjectTopicsBlock;
