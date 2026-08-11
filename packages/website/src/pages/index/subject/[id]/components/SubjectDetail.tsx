import React from 'react';
import { NavLink } from 'react-router-dom';

import type {
  CollectionType,
  SlimIndex,
  Subject,
  SubjectHomeResponse,
} from '@bangumi/client/client';
import { SubjectType } from '@bangumi/client/client';
import { Rate, Typography } from '@bangumi/design';
import { Link as LinkIcon } from '@bangumi/icons';
import { formatSubjectInfobox } from '@bangumi/utils';
import {
  getIndexLink,
  getLegacyPageLink,
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
import { useSubjectCollects } from '@bangumi/website/hooks/use-subject-collects';
import { useUser } from '@bangumi/website/hooks/use-user';

import CollectionPanel from './CollectionPanel';
import { COLLECT_DESC, collectVerb } from './subject-common';
import styles from './SubjectDetail.module.less';
import { SubjectPrimaryBlocks, SubjectSecondaryBlocks } from './SubjectDetailBlocks';

const { Link } = Typography;

/** 相对时间，对齐 PHP GlobalCore::make_descriptive_time（如「1小时25分钟前」） */
function makeDescriptiveTime(timestamp: number): string {
  const YEAR = 86400 * 365;
  const MONTH = 86400 * 30;
  const DAY = 86400;
  const HOUR = 3600;
  const MINUTE = 60;

  const diff = Math.floor(Date.now() / 1000) - timestamp;

  if (diff > YEAR) {
    const years = Math.floor(diff / YEAR);
    const rest = diff - years * YEAR;
    if (rest > MONTH) {
      return `${years}年${Math.floor(rest / MONTH)}月前`;
    }
    return `${years}年前`;
  }
  if (diff > MONTH) {
    const months = Math.floor(diff / MONTH);
    const rest = diff - months * MONTH;
    if (rest > DAY) {
      return `${months}月${Math.floor(rest / DAY)}天前`;
    }
    return `${months}月前`;
  }
  if (diff > DAY) {
    const days = Math.floor(diff / DAY);
    const rest = diff - days * DAY;
    if (rest > HOUR) {
      return `${days}天${Math.floor(rest / HOUR)}小时前`;
    }
    return `${days}天前`;
  }
  if (diff > HOUR) {
    const hours = Math.floor(diff / HOUR);
    const rest = diff - hours * HOUR;
    if (rest > MINUTE) {
      return `${hours}小时${Math.floor(rest / MINUTE)}分钟前`;
    }
    return `${hours}小时前`;
  }
  if (diff > MINUTE) {
    const minutes = Math.floor(diff / MINUTE);
    const rest = diff - minutes * MINUTE;
    if (rest > 0) {
      return `${minutes}分${rest}秒前`;
    }
    return `${minutes}分钟前`;
  }
  return `${diff}秒前`;
}

/** 条目标题与导航 tabs，对齐 PHP subject_header */
export function SubjectHeader({ subject }: { subject: Subject }) {
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
  const infobox = formatSubjectInfobox(subject.infobox);
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
        {infobox.map((item) => (
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
function SubjectIndexes({ subject, indexes }: { subject: Subject; indexes: SlimIndex[] }) {
  const { user } = useUser();
  if (indexes.length === 0) {
    return null;
  }
  return (
    <div className={styles.sidePanel}>
      <h2 className={styles.sidePanelTitle}>推荐本条目的目录</h2>
      <ul className={styles.groupLineList} aria-label='推荐本条目的目录列表'>
        {indexes.slice(0, 5).map((index) => (
          <li key={index.id} className={styles.groupLineItem}>
            {index.user != null && (
              <Link
                to={getUserProfileLink(index.user.username)}
                noStyle
                className={styles.groupLineAvatar}
                title={index.user.nickname}
              >
                <img src={index.user.avatar.large} alt={index.user.nickname} />
              </Link>
            )}
            <div className={styles.groupLineBody}>
              <Link to={getIndexLink(index.id)} className={styles.indexTitle} title={index.title}>
                {index.title}
              </Link>
              {index.user != null && (
                <small className={styles.indexBy}>
                  by{' '}
                  <Link to={getUserProfileLink(index.user.username)} noStyle>
                    {index.user.nickname}
                  </Link>
                </small>
              )}
            </div>
          </li>
        ))}
      </ul>
      <span className={styles.indexTips}>
        {' '}
        / <Link to={getLegacyPageLink(`/subject/${subject.id}/index`)}>更多目录</Link>
        {user != null && (
          <>
            {' '}
            / <Link to={getLegacyPageLink(`/user/${user.username}/index`)}>收集至我的目录</Link>
          </>
        )}
      </span>
    </div>
  );
}

/** 左栏面板标题，对齐 PHP panel_collect 的标题逻辑 */
function collectPanelTitle(subject: Subject): string {
  switch (subject.type) {
    case SubjectType.Book:
      return subject.series ? '谁读这个系列?' : '谁读这本书?';
    case SubjectType.Anime:
      return '谁看这部动画?';
    case SubjectType.Music:
      return '谁听这张唱片?';
    case SubjectType.Game:
      return '谁玩这部游戏?';
    case SubjectType.Real:
      return '谁看这部影视?';
    default:
      return `谁${collectVerb(subject.type)}这部作品?`;
  }
}

/** 左栏：最近收藏用户与人数统计，对齐 PHP panel_collect */
function SubjectCollectPanel({ subject }: { subject: Subject }) {
  const { data: collects } = useSubjectCollects(subject.id, 5);

  const counts = Object.entries(subject.collection)
    .map(([key, count]) => ({ type: Number(key) as CollectionType, count }))
    .filter((entry) => COLLECT_DESC[entry.type] != null)
    .sort((a, b) => a.type - b.type);

  if (counts.length === 0) {
    return null;
  }

  return (
    <div className={styles.sidePanel}>
      <h2 className={styles.sidePanelTitle}>{collectPanelTitle(subject)}</h2>
      {collects != null && collects.length > 0 && (
        <ul className={styles.groupLineList} aria-label='最近收藏用户列表'>
          {collects.map((collect) => (
            <li key={collect.user.id} className={styles.groupLineItem}>
              <Link
                to={getUserProfileLink(collect.user.username)}
                noStyle
                className={styles.groupLineAvatar}
                title={collect.user.nickname}
              >
                <img src={collect.user.avatar.large} alt={collect.user.nickname} />
              </Link>
              <div className={styles.groupLineBody}>
                <Link
                  to={getUserProfileLink(collect.user.username)}
                  noStyle
                  className={styles.collectUserName}
                >
                  {collect.user.nickname}
                </Link>
                {collect.interest.rate > 0 && <Rate value={collect.interest.rate} />}
                <br />
                <small className={styles.collectStatus}>
                  {makeDescriptiveTime(collect.interest.updatedAt)}
                  {COLLECT_DESC[collect.interest.type]}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
      <span className={styles.indexTips}>
        {counts.map((entry) => (
          <React.Fragment key={entry.type}>
            {' '}
            /{' '}
            <Link to={getSubjectCollectionsLink(subject.id, entry.type)}>
              {entry.count}人{COLLECT_DESC[entry.type]}
            </Link>
          </React.Fragment>
        ))}
      </span>
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
            <SubjectIndexes subject={subject} indexes={data.indexes} />
            <SubjectCollectPanel subject={subject} />
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
