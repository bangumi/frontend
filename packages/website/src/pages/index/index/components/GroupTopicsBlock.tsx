import React from 'react';

import type { GroupTopic, SlimGroup } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { getGroupTopicLink } from '@bangumi/utils/pages';

import styles from './GroupTopicsBlock.module.less';
import HomeSidePanel from './HomeSidePanel';
import SideTopicList from './SideTopicList';

const { Link } = Typography;

/**
 * 小组话题；未加入任何小组时展示热门小组，对齐 PHP home_grp_tpc
 */
const GroupTopicsBlock: React.FC<{
  groupTopics: GroupTopic[];
  famousGroups: SlimGroup[];
}> = ({ groupTopics, famousGroups }) => {
  return (
    <HomeSidePanel title='小组话题'>
      {groupTopics.length === 0 ? (
        <div className={styles.inner}>
          <p className={styles.tip}>你当前还没有加入任何小组，看看下面有没有你感兴趣的小组吧。</p>
          <ul className={styles.groups}>
            {famousGroups.slice(0, 8).map((group) => (
              <li key={group.id} className={styles.groupItem}>
                <Link
                  to={`https://bgm.tv/group/${group.name}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.groupLink}
                  title={group.title}
                >
                  <Avatar src={group.icon.small} size='small' alt={group.title} />
                  <span className={styles.groupTitle}>{group.title}</span>
                </Link>
                <small className={styles.members}>{group.members} 位成员</small>
              </li>
            ))}
          </ul>
          <div className={styles.more}>
            <Link to='https://bgm.tv/group/all' target='_blank' rel='noopener noreferrer'>
              更多小组 »
            </Link>
          </div>
        </div>
      ) : (
        <SideTopicList
          items={groupTopics.map((topic) => ({
            id: topic.id,
            title: topic.title,
            replyCount: topic.replyCount,
            creatorAvatar: topic.creator?.avatar.small ?? '',
            creatorUsername: topic.creator?.username ?? '',
            topicLink: getGroupTopicLink(topic.id),
            extra: (
              <Link
                to={`https://bgm.tv/group/${topic.group.name}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {topic.group.title}
              </Link>
            ),
          }))}
        />
      )}
    </HomeSidePanel>
  );
};

export default GroupTopicsBlock;
