import React from 'react';
import { NavLink } from 'react-router-dom';

import type { CollectionType, Subject, SubjectHomeResponse } from '@bangumi/client/client';
import { SubjectType } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { Link as LinkIcon } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';
import { formatSubjectInfobox } from '@bangumi/utils';
import {
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
  getSubjectWikiEditLink,
} from '@bangumi/utils/pages';
import CollectSidePanel from '@bangumi/website/components/CollectSidePanel';
import IndexSidePanel from '@bangumi/website/components/IndexSidePanel';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useSubjectCollects } from '@bangumi/website/hooks/use-subject-collects';
import { useUser } from '@bangumi/website/hooks/use-user';

import CollectionPanel from './CollectionPanel';
import { COLLECT_DESC, collectVerb, makeDescriptiveTime } from './subject-common';
import { SubjectPrimaryBlocks, SubjectSecondaryBlocks } from './SubjectDetailBlocks';

const { Link } = Typography;

const page = css({
  padding: '10px 15px 24px',
});

const header = css({ margin: '0' });

const name = css({
  margin: '15px 0',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  '& a': {
    color: '#1f1c1c',
    fontWeight: 'bold',
    _hover: { color: '#54b5df' },
  },
});

const headerInner = css({
  paddingRight: '15px',
  paddingLeft: '15px',
});

const tabsInner = headerInner;

const platform = css({
  marginLeft: '8px',
  color: '#9f9b9b',
  fontSize: '12px',
  fontWeight: 'normal',
});

const tabsStyle = css({
  borderTop: '1px solid #fefefe',
  borderBottom: '1px solid #e8e3e3',
  background: '#fbfbfb',
});

const tabsScroll = css({
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const tabList = css({
  display: 'flex',
  width: 'max-content',
  minWidth: '100%',
  margin: '0',
  padding: '0',
  gap: '5px',
  listStyle: 'none',
});

const tabLink = css({
  display: 'block',
  padding: '10px 10px 9px',
  borderBottom: '2px solid transparent',
  color: '#9f9b9b',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  _hover: {
    borderBottomColor: '#54b5df',
    color: '#54b5df',
    textDecoration: 'none',
  },
});

const tabLinkActive = css({
  borderBottomColor: '#f09199',
  color: '#f09199',
});

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(200px, 2.5fr) minmax(0, 7.5fr)',
  alignItems: 'flex-start',
  gap: '10px',
  '@media (max-width: 640px)': {
    display: 'block',
  },
});

const columnLeft = css({
  minWidth: '0',
  '@media (max-width: 640px)': {
    marginBottom: '10px',
  },
});

const columnContent = css({ minWidth: '0' });

const columnMain = css({ minWidth: '0' });

const columnRight = css({
  minWidth: '0',
  '@media (max-width: 640px)': {
    marginTop: '10px',
  },
});

const primaryColumns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 6.5fr) minmax(0, 3.5fr)',
  gap: '20px',
  padding: '0 18px 0 10px',
  '@media (max-width: 640px)': {
    display: 'block',
    padding: '0',
  },
});

const infoboxStyle = css({
  margin: '0 0 15px',
  padding: '0 0 10px',
  wordBreak: 'break-all',
});

const coverWrapper = css({
  margin: '0 0 12px',
  textAlign: 'center',
});

const cover = css({
  width: '255px',
  maxWidth: '100%',
  height: 'auto',
  aspectRatio: '5 / 7',
  boxSizing: 'border-box',
  marginBottom: '5px',
  padding: '2px',
  border: '1px solid #a9a9ab',
  borderTopColor: '#c7c7c9',
  borderBottomColor: '#858486',
  background: '#fff',
  boxShadow: '0 1px 5px #aaa',
  objectFit: 'cover',
});

const infoList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
  fontSize: '14px',
  wordBreak: 'break-all',
  '& li': {
    padding: '5px',
    borderBottom: '1px solid #e8e3e3',
    lineHeight: '1.4',
  },
});

const tip = css({
  color: '#9f9b9b',
  fontSize: '14px',
});

const shareTools = css({
  alignItems: 'center',
  gap: '7px',
  padding: '2px 3px',
  color: '#9f9b9b',
  fontSize: '12px',
});

const copyButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  padding: '0',
  border: '0',
  background: 'transparent',
  color: '#9f9b9b',
  cursor: 'pointer',
  font: 'inherit',
  '& svg': {
    width: '15px',
    height: '15px',
  },
});

const shareIcon = css({
  display: 'inline-flex',
  width: '16px',
  height: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  color: '#fff',
  fontSize: '10px',
  fontWeight: 'bold',
  lineHeight: '16px',
  _hover: {
    color: '#fff',
    textDecoration: 'none',
  },
});

const shareWeibo = css({ background: '#e34b4b' });

const shareDouban = css({ background: '#3b8f55' });

const shareTwitter = css({ background: '#45bde0' });

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
      key: 'wiki',
      label: 'Wiki',
      to: getSubjectWikiEditLink(subject.id),
    },
  ];

  return (
    <header className={header}>
      <PageContainer gutterOnly className={headerInner}>
        <h1 className={name}>
          <Link to={getSubjectLink(subject.id)} title={subject.nameCN}>
            {subject.name}
          </Link>
          {subject.platform.typeCN != null && subject.platform.typeCN !== '' && (
            <small className={platform}>{subject.platform.typeCN}</small>
          )}
          {subject.series && <small className={platform}>系列</small>}
        </h1>
      </PageContainer>
      <nav className={tabsStyle} aria-label='条目导航'>
        <PageContainer gutterOnly className={cx(tabsInner, tabsScroll)}>
          <ul className={tabList}>
            {tabs
              .filter(
                (tab) => (tab.key !== 'ep' || showEpTab) && (tab.key !== 'wiki' || user != null),
              )
              .map((tab) => (
                <li key={tab.key}>
                  <NavLink
                    to={tab.to}
                    end={tab.key === 'overview'}
                    className={({ isActive }) => cx(tabLink, isActive && tabLinkActive)}
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
    <div className={infoboxStyle}>
      {subject.images?.large != null && (
        <div className={coverWrapper}>
          <Link
            to={subject.images.large}
            isExternal
            target='_blank'
            rel='noopener noreferrer'
            title={`${subject.name} ${subject.nameCN}`}
          >
            <img src={subject.images.large} className={cover} alt={subject.name} />
          </Link>
        </div>
      )}
      <ul className={infoList}>
        {infobox.map((item) => (
          <li key={item.key}>
            <span className={tip}>{item.key}: </span>
            <span>
              {item.values.map((v, i) => (
                <span key={i}>
                  {v.k != null && v.k !== '' && <span className={tip}>{v.k}</span>}
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
    <CollectSidePanel
      title={collectPanelTitle(subject)}
      listLabel='最近收藏用户列表'
      items={
        collects?.map((collect) => ({
          user: collect.user,
          rate: collect.interest.rate,
          status: (
            <>
              {makeDescriptiveTime(collect.interest.updatedAt)}
              {COLLECT_DESC[collect.interest.type]}
            </>
          ),
        })) ?? []
      }
      stats={counts.map((entry) => (
        <React.Fragment key={entry.type}>
          {' '}
          /{' '}
          <Link to={getSubjectCollectionsLink(subject.id, entry.type)}>
            {entry.count}人{COLLECT_DESC[entry.type]}
          </Link>
        </React.Fragment>
      ))}
    />
  );
}

function SubjectShare({ subject }: { subject: Subject }) {
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;
  const shareText = `「${subject.name}」`;

  return (
    <div className={shareTools} aria-label='分享条目'>
      <button
        type='button'
        className={copyButton}
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
        className={cx(shareIcon, shareWeibo)}
        target='_blank'
        rel='noopener noreferrer'
        title='分享到微博'
      >
        微
      </a>
      <a
        href={`https://www.douban.com/share/service?href=${encodeURIComponent(shareUrl)}`}
        className={cx(shareIcon, shareDouban)}
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
        className={cx(shareIcon, shareTwitter)}
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
  const { user } = useUser();
  return (
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main' className={page}>
        <div className={columns}>
          <div className={columnLeft}>
            <SubjectInfobox subject={subject} />
            <IndexSidePanel
              indexes={data.indexes}
              moreLink={getLegacyPageLink(`/subject/${subject.id}/index`)}
              extraLink={
                user != null
                  ? {
                      to: getLegacyPageLink(`/user/${user.username}/index`),
                      label: '收集至我的目录',
                    }
                  : undefined
              }
            />
            <SubjectCollectPanel subject={subject} />
          </div>
          <div className={columnContent}>
            <div className={primaryColumns}>
              <div className={columnMain}>
                <SubjectPrimaryBlocks data={data} />
              </div>
              <aside className={columnRight}>
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
