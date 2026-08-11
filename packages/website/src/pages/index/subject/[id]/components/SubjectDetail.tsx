import React from 'react';
import { NavLink } from 'react-router-dom';

import type { SlimIndex, Subject, SubjectHomeResponse } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { Tab, Typography } from '@bangumi/design';
import {
  getIndexLink,
  getSubjectBoardLink,
  getSubjectCharactersLink,
  getSubjectCollectionsLink,
  getSubjectCommentsLink,
  getSubjectEpisodesLink,
  getSubjectLink,
  getSubjectPersonsLink,
  getSubjectRelationsLink,
  getSubjectReviewsLink,
  getSubjectStatsLink,
  getSubjectWikiEditLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import CollectionPanel from './CollectionPanel';
import styles from './SubjectDetail.module.less';
import { SubjectBlocks } from './SubjectDetailBlocks';

const { Link } = Typography;

const COLLECT_DESC: Record<CollectionType, string> = {
  [CollectionType.Wish]: '想看',
  [CollectionType.Collect]: '看过',
  [CollectionType.Doing]: '在看',
  [CollectionType.OnHold]: '搁置',
  [CollectionType.Dropped]: '抛弃',
};

/** 收藏动词：看/读/听/玩 */
function collectVerb(subjectType: number): string {
  switch (subjectType) {
    case 1:
      return '读';
    case 3:
      return '听';
    case 4:
      return '玩';
    default:
      return '看';
  }
}

/** 条目标题与导航 tabs，对齐 PHP subject_header */
export function SubjectHeader({ subject }: { subject: Subject }) {
  const showEpTab =
    subject.type === SubjectType.Anime ||
    subject.type === SubjectType.Music ||
    subject.type === SubjectType.Real;
  const epLabel = subject.type === SubjectType.Music ? '曲目' : '章节';

  const tabs: { key: string; label: string; to: string; implemented: boolean }[] = [
    { key: 'overview', label: '概览', to: getSubjectLink(subject.id), implemented: true },
    { key: 'ep', label: epLabel, to: getSubjectEpisodesLink(subject.id), implemented: true },
    {
      key: 'characters',
      label: '角色',
      to: getSubjectCharactersLink(subject.id),
      implemented: false,
    },
    {
      key: 'persons',
      label: '制作人员',
      to: getSubjectPersonsLink(subject.id),
      implemented: false,
    },
    {
      key: 'relations',
      label: '关联',
      to: getSubjectRelationsLink(subject.id),
      implemented: false,
    },
    {
      key: 'comments',
      label: '吐槽',
      to: getSubjectCommentsLink(subject.id),
      implemented: false,
    },
    {
      key: 'reviews',
      label: '评论',
      to: getSubjectReviewsLink(subject.id),
      implemented: false,
    },
    {
      key: 'board',
      label: '讨论版',
      to: getSubjectBoardLink(subject.id),
      implemented: false,
    },
    {
      key: 'stats',
      label: '透视',
      to: getSubjectStatsLink(subject.id),
      implemented: false,
    },
    {
      key: 'wiki',
      label: 'Wiki',
      to: getSubjectWikiEditLink(subject.id),
      implemented: true,
    },
  ];

  return (
    <div className={styles.header}>
      <h1 className={styles.name}>
        <Link to={getSubjectLink(subject.id)} title={subject.nameCN}>
          {subject.name}
        </Link>
        {subject.nameCN != null && subject.nameCN !== '' && (
          <small className={styles.nameCn}>{subject.nameCN}</small>
        )}
        {subject.platform.typeCN != null && subject.platform.typeCN !== '' && (
          <small className={styles.platform}>{subject.platform.typeCN}</small>
        )}
        {subject.series && <small className={styles.platform}>系列</small>}
      </h1>
      <div className={styles.tabs}>
        <Tab.Group type='borderless'>
          {tabs
            .filter((tab) => tab.key !== 'ep' || showEpTab)
            .map((tab) =>
              !tab.implemented ? (
                <Link key={tab.key} to={tab.to}>
                  <Tab.Item isActive={false}>{tab.label}</Tab.Item>
                </Link>
              ) : (
                <NavLink to={tab.to} key={tab.key} end={tab.key === 'overview'}>
                  {({ isActive }) => <Tab.Item isActive={isActive}>{tab.label}</Tab.Item>}
                </NavLink>
              ),
            )}
        </Tab.Group>
      </div>
    </div>
  );
}

/** 左栏：封面与信息框，对齐 PHP subject_infobox */
function SubjectInfobox({ subject }: { subject: Subject }) {
  return (
    <div className={styles.infobox}>
      {subject.images?.large != null && (
        <div className={styles.coverWrapper}>
          <Link
            to={subject.images.large}
            isExternal
            target='_blank'
            rel='noopener noreferrer'
            title={`${subject.name} ${subject.nameCN}`}
          >
            <img src={subject.images.large} className={styles.cover} alt={subject.name} />
          </Link>
        </div>
      )}
      <ul className={styles.infoList}>
        {subject.infobox.map((item) => (
          <li key={item.key}>
            <span className={styles.tip}>{item.key}: </span>
            <span>
              {item.values.map((v, i) => (
                <span key={i}>
                  {v.k != null && v.k !== '' && <span className={styles.tip}>{v.k}</span>}
                  {v.v}
                  {i < item.values.length - 1 && ' / '}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 左栏：推荐本条目的目录，对齐 PHP panel_subject_index */
function SubjectIndexes({ indexes }: { indexes: SlimIndex[] }) {
  if (indexes.length === 0) {
    return null;
  }
  return (
    <div className={styles.sidePanel}>
      <h2 className={styles.sidePanelTitle}>推荐本条目的目录</h2>
      <ul className={styles.indexList}>
        {indexes.slice(0, 5).map((index) => (
          <li key={index.id}>
            <Link to={getIndexLink(index.id)} className={styles.indexTitle} title={index.title}>
              {index.title}
            </Link>
            <small className={styles.indexBy}>
              by{' '}
              <Link to={getUserProfileLink(index.user?.username ?? '')}>
                {index.user?.nickname ?? ''}
              </Link>
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 左栏：各收藏类型人数统计（panel_collect 简化版，聚合 API 未提供收藏者列表） */
function SubjectCollectStats({ subject }: { subject: Subject }) {
  const counts = Object.entries(subject.collection)
    .map(([key, count]) => ({ type: Number(key) as CollectionType, count }))
    .filter((entry) => COLLECT_DESC[entry.type] != null)
    .sort((a, b) => a.type - b.type);

  if (counts.length === 0) {
    return null;
  }

  return (
    <div className={styles.sidePanel}>
      <h2 className={styles.sidePanelTitle}>谁{collectVerb(subject.type)}这部作品?</h2>
      <ul className={styles.collectStats}>
        {counts.map((entry) => (
          <li key={entry.type}>
            <Link to={getSubjectCollectionsLink(subject.id, entry.type)}>
              {entry.count}人{COLLECT_DESC[entry.type]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SubjectDetail: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => {
  const { subject } = data;
  return (
    <PageContainer as='main' className={styles.page}>
      <SubjectHeader subject={subject} />
      <div className={styles.columns}>
        <div className={styles.columnLeft}>
          <SubjectInfobox subject={subject} />
          <SubjectIndexes indexes={data.indexes} />
          <SubjectCollectStats subject={subject} />
        </div>
        <div className={styles.columnMain}>
          <SubjectBlocks data={data} />
        </div>
        <aside className={styles.columnRight}>
          <CollectionPanel subject={subject} />
        </aside>
      </div>
    </PageContainer>
  );
};

export default SubjectDetail;
