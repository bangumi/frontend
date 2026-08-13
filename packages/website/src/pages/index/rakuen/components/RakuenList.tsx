import React from 'react';

import type { RaKuenTopic } from '@bangumi/client/client';
import { EpisodeType } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import {
  getCharacterLink,
  getEpisodeLink,
  getGroupLink,
  getGroupTopicLink,
  getPersonLink,
  getSubjectLink,
  getSubjectTopicLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import { makeDescriptiveTime } from '@bangumi/website/components/TimelineDescription';

import { topicListLink } from '../../group/components/topicListLink';

const listItem = css({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  minHeight: '58px',
  padding: '9px 6px',
  boxSizing: 'border-box',
  borderBottom: '1px dotted #e8e3e3',
});

const inner = css({
  minWidth: '0',
  flex: '1',
});

const title = css({
  display: 'block',
  overflow: 'hidden',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.4',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflowWrap: 'anywhere',
});

const replies = css({
  marginLeft: '6px',
  color: '#9f9b9b',
  fontSize: '11px',
  fontWeight: 'normal',
});

const row = css({
  display: 'block',
  marginTop: '4px',
  fontSize: '12px',
  lineHeight: '1.4',
  color: '#595555',
});

const parentLink = css({
  color: '#0084b4',
  textDecoration: 'none',
  _hover: { color: '#02a3fb', textDecoration: 'underline' },
});

const time = css({
  marginLeft: '8px',
  color: '#595555',
  fontSize: '11px',
});

const cover = css({
  flex: '0 0 48px',
  width: '48px',
  height: '48px',
  overflow: 'hidden',
  borderRadius: '6px',
  background: '#e8e3e3',
});

const coverImage = css({
  display: 'block',
  width: '48px',
  height: '48px',
  objectFit: 'cover',
});

const EPISODE_TYPE_PREFIXES: Record<EpisodeType, string> = {
  [EpisodeType.Normal]: 'EP',
  [EpisodeType.Special]: 'SP',
  [EpisodeType.Op]: 'OP',
  [EpisodeType.Ed]: 'ED',
  [EpisodeType.Pre]: 'Movie',
  [EpisodeType.Mad]: 'MAD',
  [EpisodeType.Other]: 'Other',
};

/** 章节显示名，如「EP.1 第一话」 */
function episodeDisplayName(item: Extract<RaKuenTopic, { type: 'episode' }>): string {
  const { episode } = item;
  const prefix = EPISODE_TYPE_PREFIXES[episode.type as EpisodeType] ?? 'EP';
  const name = episode.nameCN || episode.name;
  return `${prefix}.${episode.sort} ${name}`.trim();
}

const GroupItem: React.FC<{ item: Extract<RaKuenTopic, { type: 'group' }> }> = ({ item }) => (
  <li className={listItem}>
    <Typography.Link to={getUserProfileLink(item.creator.username)} noStyle>
      <Avatar src={item.creator.avatar.medium} alt={item.creator.nickname} />
    </Typography.Link>
    <div className={inner}>
      <Typography.Link to={getGroupTopicLink(item.id)} noStyle className={cx(topicListLink, title)}>
        {item.title}
        <span className={replies}>(+{item.replyCount})</span>
      </Typography.Link>
      <span className={row}>
        <Typography.Link to={getGroupLink(item.group.name)} noStyle className={parentLink}>
          {item.group.title}
        </Typography.Link>
        <small className={time}>{makeDescriptiveTime(item.updatedAt)}</small>
      </span>
    </div>
  </li>
);

const SubjectItem: React.FC<{ item: Extract<RaKuenTopic, { type: 'subject' }> }> = ({ item }) => (
  <li className={listItem}>
    <Typography.Link to={getUserProfileLink(item.creator.username)} noStyle>
      <Avatar src={item.creator.avatar.medium} alt={item.creator.nickname} />
    </Typography.Link>
    <div className={inner}>
      <Typography.Link
        to={getSubjectTopicLink(item.id)}
        noStyle
        className={cx(topicListLink, title)}
      >
        {item.title}
        <span className={replies}>(+{item.replyCount})</span>
      </Typography.Link>
      <span className={row}>
        <Typography.Link to={getSubjectLink(item.subject.id)} noStyle className={parentLink}>
          {item.subject.nameCN || item.subject.name}
        </Typography.Link>
        <small className={time}>{makeDescriptiveTime(item.updatedAt)}</small>
      </span>
    </div>
  </li>
);

const EpisodeItem: React.FC<{ item: Extract<RaKuenTopic, { type: 'episode' }> }> = ({ item }) => (
  <li className={listItem}>
    <LinkWithCover to={getEpisodeLink(item.id)} image={item.subject.images?.common} alt='' />
    <div className={inner}>
      <Typography.Link to={getEpisodeLink(item.id)} noStyle className={cx(topicListLink, title)}>
        {episodeDisplayName(item)}
        <span className={replies}>(+{item.episode.comment})</span>
      </Typography.Link>
      <span className={row}>
        <Typography.Link to={getSubjectLink(item.subject.id)} noStyle className={parentLink}>
          {item.subject.nameCN || item.subject.name}
        </Typography.Link>
        <small className={time}>{makeDescriptiveTime(item.updatedAt)}</small>
      </span>
    </div>
  </li>
);

const CharacterItem: React.FC<{ item: Extract<RaKuenTopic, { type: 'character' }> }> = ({
  item,
}) => (
  <li className={listItem}>
    <LinkWithCover to={getCharacterLink(item.id)} image={item.images?.medium} alt='' />
    <div className={inner}>
      <Typography.Link to={getCharacterLink(item.id)} noStyle className={cx(topicListLink, title)}>
        {item.nameCN || item.name}
        <span className={replies}>(+{item.comment})</span>
      </Typography.Link>
      <span className={row}>
        <small className={time}>{makeDescriptiveTime(item.updatedAt)}</small>
      </span>
    </div>
  </li>
);

const PersonItem: React.FC<{ item: Extract<RaKuenTopic, { type: 'person' }> }> = ({ item }) => (
  <li className={listItem}>
    <LinkWithCover to={getPersonLink(item.id)} image={item.images?.medium} alt='' />
    <div className={inner}>
      <Typography.Link to={getPersonLink(item.id)} noStyle className={cx(topicListLink, title)}>
        {item.nameCN || item.name}
        <span className={replies}>(+{item.comment})</span>
      </Typography.Link>
      <span className={row}>
        <small className={time}>{makeDescriptiveTime(item.updatedAt)}</small>
      </span>
    </div>
  </li>
);

const LinkWithCover: React.FC<{ to: string; image?: string; alt: string }> = ({
  to,
  image,
  alt,
}) => (
  <Typography.Link to={to} noStyle className={cover}>
    {image ? <img src={image} alt={alt} className={coverImage} /> : null}
  </Typography.Link>
);

const list = css({
  padding: '0',
  margin: '0',
  listStyle: 'none',
});

const empty = css({
  padding: '24px 0',
  color: '#9f9b9b',
  fontSize: '13px',
  textAlign: 'center',
});

const RakuenList: React.FC<{ topics: RaKuenTopic[] }> = ({ topics }) => {
  if (topics.length === 0) {
    return <div className={empty}>暂无内容</div>;
  }

  return (
    <ul className={list} data-testid='rakuen-list'>
      {topics.map((topic) => {
        // 5 类话题的 ID 来自独立数据表，all 模式下可能重复，key 需带 type 前缀
        const key = `${topic.type}:${topic.id}`;
        switch (topic.type) {
          case 'group':
            return <GroupItem key={key} item={topic} />;
          case 'subject':
            return <SubjectItem key={key} item={topic} />;
          case 'episode':
            return <EpisodeItem key={key} item={topic} />;
          case 'character':
            return <CharacterItem key={key} item={topic} />;
          case 'person':
            return <PersonItem key={key} item={topic} />;
        }
      })}
    </ul>
  );
};

export default RakuenList;
