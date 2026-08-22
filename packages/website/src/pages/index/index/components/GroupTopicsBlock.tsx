import React from 'react';

import type { GroupTopic, SlimGroup } from '@bangumi/client/client.ts';
import { Avatar, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getGroupLink, getGroupListLink, getGroupTopicLink } from '@bangumi/utils/pages.ts';

import HomeSidePanel from './HomeSidePanel.tsx';
import SideTopicList from './SideTopicList.tsx';

const { Link } = Typography;

const inner = css({
  margin: '5px 10px',
  fontSize: '13px',
});

const tip = css({
  color: '#9f9b9b',
  margin: '0 0 8px',
});

const groups = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const groupItem = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  padding: '4px 0',
  overflow: 'hidden',
});

const groupLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: 0,
});

const groupTitle = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const members = css({
  color: '#9f9b9b',
  flex: 'none',
});

const more = css({
  marginTop: '8px',
  textAlign: 'right',
});

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
        <div className={inner}>
          <p className={tip}>你当前还没有加入任何小组，看看下面有没有你感兴趣的小组吧。</p>
          <ul className={groups}>
            {famousGroups.slice(0, 8).map((group) => (
              <li key={group.id} className={groupItem}>
                <Link to={getGroupLink(group.name)} className={groupLink} title={group.title}>
                  <Avatar src={group.icon.small} size='small' alt={group.title} />
                  <span className={groupTitle}>{group.title}</span>
                </Link>
                <small className={members}>{group.members} 位成员</small>
              </li>
            ))}
          </ul>
          <div className={more}>
            <Link to={getGroupListLink()}>更多小组 »</Link>
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
            extra: <Link to={getGroupLink(topic.group.name)}>{topic.group.title}</Link>,
          }))}
        />
      )}
    </HomeSidePanel>
  );
};

export default GroupTopicsBlock;
