import React from 'react';
import { NavLink } from 'react-router-dom';

import type { SlimIndex, Subject, SubjectHomeResponse } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { Link as LinkIcon } from '@bangumi/icons';
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
import { useUser } from '@bangumi/website/hooks/use-user';

import CollectionPanel from './CollectionPanel';
import styles from './SubjectDetail.module.less';
import { SubjectPrimaryBlocks, SubjectSecondaryBlocks } from './SubjectDetailBlocks';

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
function SubjectHeader({ subject }: { subject: Subject }) {
  const { user } = useUser();
  const showEpTab =
    subject.type === SubjectType.Anime ||
    subject.type === SubjectType.Music ||
    subject.type === SubjectType.Real;
  const epLabel = subject.type === SubjectType.Music ? '曲目' : '章节';

  const tabs: { key: string; label: string; to: string }[] = [
    { key: 'overview', label: '概览', to: getSubjectLink(subject.id) },
    { key: 'ep', label: epLabel, to: getSubjectEpisodesLink(subject.id) },
    {
      key: 'characters',
      label: '角色',
      to: getSubjectCharactersLink(subject.id),
    },
    {
      key: 'persons',
      label: '制作人员',
      to: getSubjectPersonsLink(subject.id),
    },
    {
      key: 'relations',
      label: '关联',
      to: getSubjectRelationsLink(subject.id),
    },
    {
      key: 'comments',
      label: '吐槽',
      to: getSubjectCommentsLink(subject.id),
    },
    {
      key: 'reviews',
      label: '评论',
      to: getSubjectReviewsLink(subject.id),
    },
    {
      key: 'board',
      label: '讨论版',
      to: getSubjectBoardLink(subject.id),
    },
    {
      key: 'stats',
      label: '透视',
      to: getSubjectStatsLink(subject.id),
    },
    {
      key: 'wiki',
      label: 'Wiki',
      to: getSubjectWikiEditLink(subject.id),
    },
  ];

  return (
    <header className={styles.header}>
      <PageContainer gutterOnly className={styles.headerInner}>
        <h1 className={styles.name}>
          <Link to={getSubjectLink(subject.id)} title={subject.nameCN}>
            {subject.name}
          </Link>
          {subject.platform.typeCN != null && subject.platform.typeCN !== '' && (
            <small className={styles.platform}>{subject.platform.typeCN}</small>
          )}
          {subject.series && <small className={styles.platform}>系列</small>}
        </h1>
      </PageContainer>
      <nav className={styles.tabs} aria-label='条目导航'>
        <PageContainer gutterOnly className={styles.tabsInner}>
          <ul className={styles.tabList}>
            {tabs
              .filter(
                (tab) => (tab.key !== 'ep' || showEpTab) && (tab.key !== 'wiki' || user != null),
              )
              .map((tab) => (
                <li key={tab.key}>
                  <NavLink
                    to={tab.to}
                    end={tab.key === 'overview'}
                    className={({ isActive }) =>
                      isActive ? `${styles.tabLink} ${styles.tabLinkActive}` : styles.tabLink
                    }
                  >
                    {tab.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </PageContainer>
      </nav>
    </header>
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

function SubjectShare({ subject }: { subject: Subject }) {
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;
  const shareText = `「${subject.name}」`;

  return (
    <div className={styles.shareTools} aria-label='分享条目'>
      <button
        type='button'
        className={styles.copyButton}
        onClick={() => void navigator.clipboard.writeText(shareUrl)}
      >
        <LinkIcon />
        复制
      </button>
      <span>分享</span>
      <a
        href={`https://service.weibo.com/share/share.php?url=${encodeURIComponent(
          shareUrl,
        )}&title=${encodeURIComponent(shareText)}`}
        className={`${styles.shareIcon} ${styles.shareWeibo}`}
        target='_blank'
        rel='noopener noreferrer'
        title='分享到微博'
      >
        微
      </a>
      <a
        href={`https://www.douban.com/share/service?href=${encodeURIComponent(shareUrl)}`}
        className={`${styles.shareIcon} ${styles.shareDouban}`}
        target='_blank'
        rel='noopener noreferrer'
        title='分享到豆瓣'
      >
        豆
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl,
        )}&text=${encodeURIComponent(shareText)}`}
        className={`${styles.shareIcon} ${styles.shareTwitter}`}
        target='_blank'
        rel='noopener noreferrer'
        title='分享到 X'
      >
        X
      </a>
    </div>
  );
}

const SubjectDetail: React.FC<{ data: SubjectHomeResponse }> = ({ data }) => {
  const { subject } = data;
  return (
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main' className={styles.page}>
        <div className={styles.columns}>
          <div className={styles.columnLeft}>
            <SubjectInfobox subject={subject} />
            <SubjectIndexes indexes={data.indexes} />
            <SubjectCollectStats subject={subject} />
          </div>
          <div className={styles.columnContent}>
            <div className={styles.primaryColumns}>
              <div className={styles.columnMain}>
                <SubjectPrimaryBlocks data={data} />
              </div>
              <aside className={styles.columnRight}>
                <CollectionPanel subject={subject} />
                <SubjectShare subject={subject} />
              </aside>
            </div>
            <SubjectSecondaryBlocks data={data} />
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default SubjectDetail;
