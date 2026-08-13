import React from 'react';

import type { IndexRelated } from '@bangumi/client/client';
import { IndexRelatedCategory, SubjectType } from '@bangumi/client/client';
import { Image, Pagination, Tab, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import {
  getBlogLink,
  getCharacterLink,
  getEpisodeLink,
  getGroupTopicLink,
  getPersonLink,
  getSubjectLink,
  getSubjectTopicLink,
} from '@bangumi/utils/pages';

const { Link: TextLink } = Typography;

export interface RelatedFilter {
  cat: IndexRelatedCategory | undefined;
  subjectType: SubjectType | undefined;
}

/** Tab 列表：cat/type 组合过滤 */
export const RELATED_TABS: { key: string; label: string; filter: RelatedFilter }[] = [
  { key: 'all', label: '全部', filter: { cat: undefined, subjectType: undefined } },
  {
    key: 'anime',
    label: '动画',
    filter: { cat: IndexRelatedCategory.Subject, subjectType: SubjectType.Anime },
  },
  {
    key: 'book',
    label: '书籍',
    filter: { cat: IndexRelatedCategory.Subject, subjectType: SubjectType.Book },
  },
  {
    key: 'music',
    label: '音乐',
    filter: { cat: IndexRelatedCategory.Subject, subjectType: SubjectType.Music },
  },
  {
    key: 'game',
    label: '游戏',
    filter: { cat: IndexRelatedCategory.Subject, subjectType: SubjectType.Game },
  },
  {
    key: 'real',
    label: '三次元',
    filter: { cat: IndexRelatedCategory.Subject, subjectType: SubjectType.Real },
  },
  {
    key: 'character',
    label: '角色',
    filter: { cat: IndexRelatedCategory.Character, subjectType: undefined },
  },
  {
    key: 'person',
    label: '人物',
    filter: { cat: IndexRelatedCategory.Person, subjectType: undefined },
  },
  {
    key: 'episode',
    label: '章节',
    filter: { cat: IndexRelatedCategory.Episode, subjectType: undefined },
  },
  {
    key: 'blog',
    label: '日志',
    filter: { cat: IndexRelatedCategory.Blog, subjectType: undefined },
  },
  {
    key: 'groupTopic',
    label: '小组话题',
    filter: { cat: IndexRelatedCategory.GroupTopic, subjectType: undefined },
  },
  {
    key: 'subjectTopic',
    label: '条目讨论',
    filter: { cat: IndexRelatedCategory.SubjectTopic, subjectType: undefined },
  },
];

const tabs = css({
  marginBottom: '10px',
});

const list = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 0',
  borderTop: '1px dotted #e0e0e0',
  '&:first-child': { borderTop: 'none' },
});

const cover = css({
  flex: '0 0 40px',
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  overflow: 'hidden',
  '& .bgm-image': { display: 'block' },
});

const text = css({
  flex: '1 1 auto',
  minWidth: '0',
  '& a': { color: '#123', fontWeight: '400', fontSize: '14px', lineHeight: '18px' },
});

const sub = css({
  marginTop: '2px',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '16px',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const pagination = css({ margin: '10px 0' });

const SUBJECT_TYPE_LABEL: Record<number, string> = {
  [SubjectType.Book]: '书籍',
  [SubjectType.Anime]: '动画',
  [SubjectType.Music]: '音乐',
  [SubjectType.Game]: '游戏',
  [SubjectType.Real]: '三次元',
};

function RelatedText({ related }: { related: IndexRelated }) {
  switch (related.cat) {
    case IndexRelatedCategory.Subject: {
      const subject = related.subject;
      if (!subject) {
        return null;
      }
      return (
        <>
          <TextLink to={getSubjectLink(subject.id)}>{subject.nameCN || subject.name}</TextLink>
          <div className={sub}>
            {SUBJECT_TYPE_LABEL[subject.type]} · 评分 {subject.rating.score}
          </div>
        </>
      );
    }
    case IndexRelatedCategory.Character: {
      const character = related.character;
      if (!character) {
        return null;
      }
      return (
        <>
          <TextLink to={getCharacterLink(character.id)}>
            {character.nameCN || character.name}
          </TextLink>
          <div className={sub}>{character.info || '角色'}</div>
        </>
      );
    }
    case IndexRelatedCategory.Person: {
      const person = related.person;
      if (!person) {
        return null;
      }
      return (
        <>
          <TextLink to={getPersonLink(person.id)}>{person.nameCN || person.name}</TextLink>
          <div className={sub}>{person.career.join(' / ') || '人物'}</div>
        </>
      );
    }
    case IndexRelatedCategory.Episode: {
      const episode = related.episode;
      if (!episode) {
        return null;
      }
      const label = episode.nameCN || episode.name;
      return (
        <>
          <TextLink to={getEpisodeLink(episode.id)}>{label}</TextLink>
          {episode.subject && (
            <div className={sub}>{episode.subject.nameCN || episode.subject.name}</div>
          )}
        </>
      );
    }
    case IndexRelatedCategory.Blog: {
      const blog = related.blog;
      if (!blog) {
        return null;
      }
      return (
        <>
          <TextLink to={getBlogLink(blog.id)}>{blog.title}</TextLink>
          <div className={sub}>日志</div>
        </>
      );
    }
    case IndexRelatedCategory.GroupTopic: {
      const topic = related.groupTopic;
      if (!topic) {
        return null;
      }
      return (
        <>
          <TextLink to={getGroupTopicLink(topic.id)}>{topic.title}</TextLink>
          <div className={sub}>小组话题</div>
        </>
      );
    }
    case IndexRelatedCategory.SubjectTopic: {
      const topic = related.subjectTopic;
      if (!topic) {
        return null;
      }
      return (
        <>
          <TextLink to={getSubjectTopicLink(topic.id)}>{topic.title}</TextLink>
          <div className={sub}>条目讨论</div>
        </>
      );
    }
    default:
      return null;
  }
}

function RelatedCover({ related }: { related: IndexRelated }) {
  switch (related.cat) {
    case IndexRelatedCategory.Subject: {
      const src = related.subject?.images?.small;
      return src ? <Image src={src} className={cover} alt='' /> : <span className={cover} />;
    }
    case IndexRelatedCategory.Character: {
      const src = related.character?.images?.small;
      return src ? <Image src={src} className={cover} alt='' /> : <span className={cover} />;
    }
    case IndexRelatedCategory.Person: {
      const src = related.person?.images?.small;
      return src ? <Image src={src} className={cover} alt='' /> : <span className={cover} />;
    }
    default:
      return <span className={cover} />;
  }
}

/** 目录关联内容列表：Tab 分类 + 分页 */
const IndexRelatedList: React.FC<{
  related: IndexRelated[];
  total: number;
  currentPage: number;
  pageSize: number;
  activeFilter: RelatedFilter;
  onTabChange: (filter: RelatedFilter) => void;
  onPageChange: (page: number) => void;
}> = ({ related, total, currentPage, pageSize, activeFilter, onTabChange, onPageChange }) => {
  return (
    <>
      <Tab.Group type='borderless'>
        {RELATED_TABS.map((tab) => (
          <Tab.Item
            key={tab.key}
            isActive={
              activeFilter.cat === tab.filter.cat &&
              activeFilter.subjectType === tab.filter.subjectType
            }
            onClick={() => onTabChange(tab.filter)}
          >
            {tab.label}
          </Tab.Item>
        ))}
      </Tab.Group>
      <div className={tabs} />
      {related.length === 0 && <p className={empty}>暂无关联内容</p>}
      <ul className={list}>
        {related.map((entry) => (
          <li key={entry.id} className={item}>
            <RelatedCover related={entry} />
            <div className={text}>
              <RelatedText related={entry} />
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
        wrapperClass={pagination}
      />
    </>
  );
};

export default IndexRelatedList;
