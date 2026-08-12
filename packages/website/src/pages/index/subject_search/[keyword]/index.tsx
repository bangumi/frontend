import { ok } from '@oazapfts/runtime';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SlimCharacter, SlimPerson, SlimSubject, SubjectType } from '@bangumi/client/client';
import { SubjectType as SubjectTypeEnum } from '@bangumi/client/client';
import { Pagination } from '@bangumi/design';
import { EmptyStar, FilledStar, GridView, ListView, Search } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';
import {
  getCharacterLink,
  getLegacyPageLink,
  getPersonLink,
  getSubjectLink,
} from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

const searchBand = css({
  borderBottom: '1px solid #e8e3e3',
  background: '#fafafa',
});

const searchForm = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  width: '980px',
  margin: '0 auto',
  padding: '10px 0',
  boxSizing: 'border-box',
  '& label': {
    width: '100px',
    marginRight: '9px',
    color: '#595555',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '35px',
    textAlign: 'right',
  },
  '& input': {
    width: '375px',
    height: '34px',
    padding: '6px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#fff',
    color: '#1f1c1c',
    fontSize: '14px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.08)',
    _focus: {
      borderColor: '#f09199',
      boxShadow: '0 0 0 2px rgba(240, 145, 153, 0.18)',
    },
  },
  '& button': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    height: '34px',
    padding: '0 16px',
    border: '0',
    borderRadius: '4px',
    background: '#54b5df',
    color: '#fff',
    cursor: 'pointer',
    _hover: {
      background: '#3aa4d2',
    },
    '& svg': {
      width: '14px',
      height: '14px',
      fill: 'currentcolor',
    },
  },
  '@media (max-width: 1024px)': {
    width: 'calc(100% - 40px)',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    paddingRight: '16px',
    paddingLeft: '16px',
    '& label': {
      width: 'auto',
      marginRight: '4px',
      fontSize: '13px',
      whiteSpace: 'nowrap',
    },
    '& input': {
      minWidth: '0',
      width: 'auto',
      flex: '1',
    },
  },
  '@media (max-width: 640px)': {
    '& button': {
      width: '38px',
      padding: '0',
      '& span': {
        display: 'none',
      },
    },
  },
});

const page = css({
  display: 'grid',
  gridTemplateColumns: '100px minmax(0, 655px) 200px',
  gap: '10px',
  width: '980px',
  margin: '0 auto',
  padding: '20px 0 40px',
  boxSizing: 'border-box',
  '@media (max-width: 1024px)': {
    width: 'calc(100% - 40px)',
    gridTemplateColumns: '100px minmax(0, 1fr) 200px',
  },
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    padding: '10px 8px 24px',
  },
});

const categories = css({
  alignSelf: 'start',
  '& ul': {
    overflow: 'hidden',
    margin: '0',
    padding: '0 2px 5px',
    border: '1px solid #e8e3e3',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 1px 5px rgba(50, 46, 46, 0.08)',
    listStyle: 'none',
  },
  '& li a': {
    display: 'block',
    margin: '5px 0',
    padding: '3px 12px',
    borderRadius: '999px',
    color: '#54b5df',
    fontSize: '13px',
    lineHeight: '18px',
    textDecoration: 'none',
    _hover: {
      background: '#fff6f7',
      color: '#f09199',
    },
  },
  '@media (max-width: 768px)': {
    '& ul': {
      padding: '4px 6px',
      borderRadius: '6px',
    },
    '& li': {
      display: 'inline-block',
    },
    '& li a': {
      margin: '0',
      padding: '3px 6px',
      fontSize: '12px',
    },
  },
});

// &[class] 提升特异性，胜过 .categories li a 的默认样式
const categorySelected = css({
  '&[class]': {
    background: '#f09199',
    color: '#fff',
  },
});

const categoryRoot = css({
  margin: '0 -2px',
  padding: '6px 14px 5px',
  borderBottom: '1px solid #e8e3e3',
  color: '#9f9b9b',
  fontSize: '12px',
  fontWeight: '600',
  '@media (max-width: 768px)': {
    margin: '0',
    padding: '3px 5px',
    border: '0',
  },
});

const results = css({
  minWidth: '0',
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

const resultTools = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '24px',
  padding: '0 4px 5px',
  color: '#9f9b9b',
  fontSize: '12px',
  '@media (max-width: 768px)': {
    paddingRight: '2px',
    paddingLeft: '2px',
  },
  '@media (max-width: 640px)': {
    justifyContent: 'flex-end',
    '& > span': {
      display: 'none',
    },
  },
});

const viewSelector = css({
  display: 'inline-flex',
  overflow: 'hidden',
  border: '1px solid #e8e3e3',
  borderRadius: '4px',
});

const viewButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '22px',
  padding: '0',
  border: '0',
  borderRight: '1px solid #e8e3e3',
  background: '#fff',
  color: '#9f9b9b',
  cursor: 'pointer',
  _hover: { color: '#54b5df' },
  '& svg': {
    width: '14px',
    height: '14px',
    fill: 'currentcolor',
  },
  '&:last-child': {
    borderRight: '0',
  },
});

const viewButtonActive = css({
  background: '#54b5df',
  color: '#fff',
});

const compactIcon = css({ transform: 'scaleY(0.72)' });

const resultsList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const resultItem = css({
  position: 'relative',
  minWidth: '0',
  borderBottom: '1px solid #e8e3e3',
});

const coverLink = css({
  display: 'block',
  flexShrink: '0',
});

const cover = css({
  display: 'block',
  width: '80px',
  aspectRatio: '5 / 7',
  borderRadius: '3px',
  objectFit: 'cover',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.22)',
});

const coverPlaceholder = css({
  display: 'block',
  width: '80px',
  aspectRatio: '5 / 7',
  borderRadius: '3px',
  objectFit: 'cover',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.22)',
  background: '#e8e3e3',
});

const resultInfo = css({ minWidth: '0' });

const resultTitle = css({
  display: 'flex',
  alignItems: 'baseline',
  minWidth: '0',
  margin: '0',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  '& > a': {
    overflowWrap: 'anywhere',
    color: '#54b5df',
    fontWeight: '600',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
  },
  '@media (max-width: 768px)': {
    paddingRight: '0',
    fontSize: '13px',
    lineHeight: '18px',
  },
});

const subjectTypeIcon = css({
  flex: '0 0 auto',
  width: '8px',
  height: '10px',
  marginRight: '5px',
  border: '1px solid #c6d0d4',
  borderRadius: '1px',
  boxSizing: 'border-box',
});

const originalName = css({
  flex: '0 1 auto',
  overflow: 'hidden',
  marginLeft: '5px',
  color: '#9f9b9b',
  fontSize: '10px',
  fontWeight: '400',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const metaTags = css({
  flex: '0 1 auto',
  overflow: 'hidden',
  marginLeft: '5px',
  color: '#bbb',
  fontSize: '10px',
  fontWeight: '400',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const subjectInfo = css({
  overflow: 'hidden',
  margin: '8px 0 0',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '18px',
  overflowWrap: 'anywhere',
  '@media (max-width: 768px)': {
    marginTop: '5px',
    fontSize: '11px',
    lineHeight: '16px',
  },
});

// line-clamp（-webkit-box-orient 不在 Panda 白名单，用 style prop）
const subjectInfoLineClamp = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
} as const;

const rating = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: '9px',
  color: '#9f9b9b',
  fontSize: '11px',
  lineHeight: '14px',
  '@media (max-width: 768px)': {
    marginTop: '5px',
  },
});

const lowRating = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: '9px',
  color: '#9f9b9b',
  fontSize: '11px',
  lineHeight: '14px',
  '@media (max-width: 768px)': {
    marginTop: '5px',
  },
});

const stars = css({
  display: 'inline-flex',
  gap: '1px',
  marginRight: '6px',
  '& svg': {
    width: '10px',
    height: '10px',
    fill: '#f6a623',
  },
});

const scoreText = css({
  marginRight: '4px',
  color: '#f09b2d',
});

const ratingTotal = css({ color: '#9f9b9b' });

const rank = css({
  position: 'absolute',
  top: '8px',
  right: '8px',
  padding: '2px 5px',
  borderRadius: '4px',
  background: '#08a9ef',
  color: '#fff',
  fontSize: '10px',
  lineHeight: '14px',
  '@media (max-width: 768px)': {
    top: '6px',
    right: '3px',
  },
});

// 视图容器类（原 .resultsListFull/.resultsListCompact/.resultsListGrid 嵌套拆分）
const resultsListFull = css({
  '& > li': {
    display: 'flex',
    gap: '18px',
    minHeight: '126px',
    padding: '8px 5px',
    boxSizing: 'border-box',
    _even: {
      background: '#fafafa',
    },
  },
  '@media (max-width: 768px)': {
    '& > li': {
      gap: '12px',
      minHeight: '116px',
      padding: '7px 3px',
    },
  },
});

const resultsListCompact = css({
  '& > li': {
    display: 'flex',
    gap: '14px',
    minHeight: '82px',
    padding: '7px 5px',
    boxSizing: 'border-box',
    _even: {
      background: '#fafafa',
    },
  },
});

const resultsListGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
  gap: '16px 10px',
  padding: '8px 0',
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
  },
});

// 视图内元素样式（组合类）
const resultItemFull = css({
  display: 'flex',
  gap: '18px',
  minHeight: '126px',
  padding: '8px 5px',
  boxSizing: 'border-box',
  _even: { background: '#fafafa' },
  '@media (max-width: 768px)': {
    gap: '12px',
    minHeight: '116px',
    padding: '7px 3px',
  },
});

const resultItemCompact = css({
  display: 'flex',
  gap: '14px',
  minHeight: '82px',
  padding: '7px 5px',
  boxSizing: 'border-box',
  _even: { background: '#fafafa' },
});

const resultItemGrid = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '0',
  textAlign: 'center',
});

const coverFull = css({
  '@media (max-width: 768px)': {
    width: '72px',
  },
});

const coverCompact = css({ width: '48px' });

const coverGrid = css({
  width: '105px',
  '@media (max-width: 640px)': {
    width: '96px',
  },
});

const resultInfoList = css({
  flex: '1',
  paddingTop: '1px',
});

const resultInfoGrid = css({
  width: '105px',
  marginTop: '7px',
  '@media (max-width: 640px)': {
    width: '96px',
  },
});

const resultTitleGrid = css({
  display: 'block',
  fontSize: '12px',
  lineHeight: '17px',
});

const subjectTypeIconGrid = css({ display: 'none' });

const originalNameGrid = css({ display: 'none' });

const rankGrid = css({
  top: '4px',
  right: '50%',
  transform: 'translateX(52px)',
});

const ratingCompact = css({ marginTop: '7px' });

const empty = css({
  minHeight: '240px',
  margin: '0',
  padding: '50px 20px',
  borderTop: '1px solid #e8e3e3',
  color: '#9f9b9b',
  boxSizing: 'border-box',
  textAlign: 'center',
});

const pagination = css({
  flexWrap: 'wrap',
  gap: '6px',
  margin: '20px 0 0',
  '& .bgm-pagination-prev, & .bgm-pagination-next, & .bgm-pagination-pager': {
    width: '26px',
    height: '26px',
    margin: '0',
    borderWidth: '1px',
    borderRadius: '50%',
    fontSize: '11px',
  },
  '& .bgm-pagination-pager + .bgm-pagination-pager': {
    marginLeft: '0',
  },
  '& .bgm-pagination-prev, & .bgm-pagination-next': {
    width: '34px',
    borderRadius: '13px',
  },
  '& .bgm-pagination-icon': {
    width: '14px',
    height: '14px',
  },
  '@media (max-width: 768px)': {
    marginTop: '14px',
  },
});

const sidebar = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  '@media (max-width: 768px)': {
    gap: '10px',
  },
});

const sidePanel = css({
  padding: '10px',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 1px 5px rgba(50, 46, 46, 0.06)',
  '& h2': {
    margin: '0 0 8px',
    paddingBottom: '7px',
    borderBottom: '1px solid #e8e3e3',
    color: '#9f9b9b',
    fontSize: '12px',
    fontWeight: '500',
  },
});

const exactSearch = css({
  padding: '10px',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 1px 5px rgba(50, 46, 46, 0.06)',
  fontSize: '12px',
  '& a': {
    color: '#54b5df',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
  },
});

const monoGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '10px 4px',
  margin: '0',
  padding: '0',
  listStyle: 'none',
  '& a': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#54b5df',
    fontSize: '11px',
    lineHeight: '16px',
    textAlign: 'center',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
    '& > span:last-child': {
      overflow: 'hidden',
      width: '100%',
      marginTop: '4px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  '& img': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(54px, 1fr))',
  },
});

const avatarPlaceholder = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '#e8e3e3',
  color: '#9f9b9b',
  fontSize: '18px',
});

const searchTips = css({
  margin: '0',
  padding: '0',
  color: '#595555',
  fontSize: '12px',
  lineHeight: '18px',
  listStyle: 'none',
  '& li + li': {
    marginTop: '8px',
  },
});

const RESULT_ITEM_VIEW_STYLES: Record<ViewMode, string> = {
  compact: resultItemCompact,
  full: resultItemFull,
  grid: resultItemGrid,
};

const COVER_VIEW_STYLES: Record<ViewMode, string | undefined> = {
  compact: coverCompact,
  full: coverFull,
  grid: coverGrid,
};

const RESULT_INFO_VIEW_STYLES: Record<ViewMode, string | undefined> = {
  compact: resultInfoList,
  full: resultInfoList,
  grid: resultInfoGrid,
};
const PAGE_SIZE = 15;
const VIEW_STORAGE_KEY = 'bangumi-subject-search-view';

type ViewMode = 'compact' | 'full' | 'grid';
type SubjectCategory = 'all' | `${SubjectType}`;
type RelatedMono =
  { kind: 'character'; item: SlimCharacter } | { kind: 'person'; item: SlimPerson };

const SUBJECT_CATEGORIES: { value: SubjectCategory; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: `${SubjectTypeEnum.Anime}`, label: '动画' },
  { value: `${SubjectTypeEnum.Book}`, label: '书籍' },
  { value: `${SubjectTypeEnum.Music}`, label: '音乐' },
  { value: `${SubjectTypeEnum.Game}`, label: '游戏' },
  { value: `${SubjectTypeEnum.Real}`, label: '三次元' },
];

function parseCategory(value: string | null): SubjectCategory {
  return SUBJECT_CATEGORIES.some((category) => category.value === value)
    ? (value as SubjectCategory)
    : 'all';
}

function getInitialView(): ViewMode {
  if (typeof window === 'undefined') {
    return 'full';
  }

  try {
    const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
    return stored === 'compact' || stored === 'grid' ? stored : 'full';
  } catch {
    return 'full';
  }
}

function useSubjectSearch(keyword: string, category: SubjectCategory, offset: number) {
  const subjectType = category === 'all' ? undefined : Number(category as `${SubjectType}`);
  const { data } = useSWR(
    ['subject-search', keyword, category, offset],
    async () =>
      ok(
        ozaClient.searchSubjects(
          {
            keyword,
            sort: ozaClient.SubjectSearchSort.Match,
            filter: subjectType ? { type: [subjectType] } : undefined,
          },
          { limit: PAGE_SIZE, offset },
        ),
      ),
    { keepPreviousData: true, suspense: true },
  );

  return { subjects: data?.data ?? [], total: data?.total ?? 0 };
}

function useRelatedMonos(keyword: string): RelatedMono[] {
  const { data } = useSWR(
    ['subject-search-related', keyword],
    async () => {
      const [characters, persons] = await Promise.allSettled([
        ok(ozaClient.searchCharacters({ keyword }, { limit: 8, offset: 0 })),
        ok(ozaClient.searchPersons({ keyword }, { limit: 4, offset: 0 })),
      ]);

      return [
        ...(characters.status === 'fulfilled' && Array.isArray(characters.value.data)
          ? characters.value.data.map((item): RelatedMono => ({ kind: 'character', item }))
          : []),
        ...(persons.status === 'fulfilled' && Array.isArray(persons.value.data)
          ? persons.value.data.map((item): RelatedMono => ({ kind: 'person', item }))
          : []),
      ];
    },
    { suspense: true },
  );

  return data ?? [];
}

function SubjectRating({ subject, compact = false }: { subject: SlimSubject; compact?: boolean }) {
  if (subject.rating.total < 10) {
    return <span className={cx(lowRating, compact && ratingCompact)}>(少于10人评分)</span>;
  }

  const score = Math.round(subject.rating.score);
  return (
    <span className={cx(rating, compact && ratingCompact)}>
      <span className={stars} aria-label={`评分 ${subject.rating.score.toFixed(1)}`}>
        {Array.from({ length: 10 }, (_, index) =>
          index < score ? <FilledStar key={index} /> : <EmptyStar key={index} />,
        )}
      </span>
      <span className={scoreText}>{subject.rating.score.toFixed(1)}</span>
      <span className={ratingTotal}>({subject.rating.total}人评分)</span>
    </span>
  );
}

function SubjectItem({ subject, view }: { subject: SlimSubject; view: ViewMode }) {
  const displayName = subject.nameCN || subject.name;
  const showDetails = view === 'full';

  const itemViewClass = RESULT_ITEM_VIEW_STYLES[view];
  const coverViewClass = COVER_VIEW_STYLES[view];
  const infoViewClass = RESULT_INFO_VIEW_STYLES[view];
  const isGrid = view === 'grid';

  return (
    <li className={cx(resultItem, itemViewClass)}>
      <Link className={coverLink} to={getSubjectLink(subject.id)}>
        {subject.images?.common ? (
          <img
            className={cx(cover, coverViewClass)}
            src={subject.images.common}
            alt=''
            loading='lazy'
          />
        ) : (
          <span className={cx(coverPlaceholder, coverViewClass)} aria-hidden='true' />
        )}
      </Link>
      <div className={cx(resultInfo, infoViewClass)}>
        <h2 className={cx(resultTitle, isGrid && resultTitleGrid)}>
          <span className={cx(subjectTypeIcon, isGrid && subjectTypeIconGrid)} aria-hidden='true' />
          <Link to={getSubjectLink(subject.id)}>{displayName}</Link>
          {subject.nameCN && subject.nameCN !== subject.name && (
            <small className={cx(originalName, isGrid && originalNameGrid)}>{subject.name}</small>
          )}
          {showDetails && subject.metaTags.length > 0 && (
            <small className={metaTags}>{subject.metaTags.join(' / ')}</small>
          )}
        </h2>
        {showDetails && (
          <p className={subjectInfo} style={subjectInfoLineClamp}>
            {subject.info}
          </p>
        )}
        {view !== 'grid' && <SubjectRating subject={subject} compact={view === 'compact'} />}
      </div>
      {subject.rating.rank > 0 && (
        <span className={cx(rank, isGrid && rankGrid)}>Rank {subject.rating.rank}</span>
      )}
    </li>
  );
}

function ViewSelector({ view, onChange }: { view: ViewMode; onChange: (view: ViewMode) => void }) {
  const options: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
      value: 'compact',
      label: '精简视图',
      icon: <ListView className={compactIcon} />,
    },
    { value: 'full', label: '列表视图', icon: <ListView /> },
    { value: 'grid', label: '网格视图', icon: <GridView /> },
  ];

  return (
    <div className={viewSelector} aria-label='结果显示方式'>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          className={cx(viewButton, view === option.value && viewButtonActive)}
          title={option.label}
          aria-label={option.label}
          aria-pressed={view === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

function RelatedPanel({ monos }: { monos: RelatedMono[] }) {
  if (monos.length === 0) {
    return null;
  }

  return (
    <section className={sidePanel}>
      <h2>相关人物</h2>
      <ul className={monoGrid}>
        {monos.map(({ kind, item }) => {
          const displayName = item.nameCN || item.name;
          return (
            <li key={`${kind}-${item.id}`}>
              <Link to={kind === 'character' ? getCharacterLink(item.id) : getPersonLink(item.id)}>
                {item.images?.grid ? (
                  <img src={item.images.grid} alt='' loading='lazy' />
                ) : (
                  <span className={avatarPlaceholder}>{displayName.slice(0, 1)}</span>
                )}
                <span title={displayName}>{displayName}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SubjectSearchPage() {
  const { keyword: routeKeyword = '' } = useParams<{ keyword: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = parseCategory(searchParams.get('cat'));
  const { curPage, offset } = usePaginationParams(PAGE_SIZE);
  const [searchValue, setSearchValue] = useState(routeKeyword);
  const [view, setView] = useState<ViewMode>(getInitialView);
  const { subjects, total } = useSubjectSearch(routeKeyword, category, offset);
  const relatedMonos = useRelatedMonos(routeKeyword);

  useEffect(() => {
    setSearchValue(routeKeyword);
  }, [routeKeyword]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const nextKeyword = searchValue.trim();
    if (nextKeyword) {
      navigate(`/subject_search/${encodeURIComponent(nextKeyword)}?cat=${category}`);
    }
  };

  const handleViewChange = (nextView: ViewMode): void => {
    setView(nextView);
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, nextView);
    } catch {
      // The selected view still applies for the current session when storage is unavailable.
    }
  };

  const handlePageChange = (page: number): void => {
    navigate(`?cat=${category}&page=${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exactKeyword = `"${routeKeyword}"`;

  return (
    <>
      <Helmet title={`搜索: ${routeKeyword}`} />
      <div className={searchBand}>
        <form className={searchForm} onSubmit={handleSearch}>
          <label htmlFor='subject-search-input'>条目搜索</label>
          <input
            id='subject-search-input'
            name='search_text'
            type='search'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button type='submit'>
            <Search />
            <span>搜索</span>
          </button>
        </form>
      </div>

      <main className={page}>
        <nav className={categories} aria-label='搜索分类'>
          <ul>
            <li className={categoryRoot}>条目</li>
            {SUBJECT_CATEGORIES.map((item) => (
              <li key={item.value}>
                <Link
                  className={category === item.value ? categorySelected : undefined}
                  to={`/subject_search/${encodeURIComponent(routeKeyword)}?cat=${item.value}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={categoryRoot}>人物</li>
            <li>
              <a
                href={getLegacyPageLink(`/mono_search/${encodeURIComponent(routeKeyword)}?cat=all`)}
              >
                全部
              </a>
            </li>
            <li>
              <a
                href={getLegacyPageLink(`/mono_search/${encodeURIComponent(routeKeyword)}?cat=crt`)}
              >
                虚构角色
              </a>
            </li>
            <li>
              <a
                href={getLegacyPageLink(
                  `/mono_search/${encodeURIComponent(routeKeyword)}?cat=prsn`,
                )}
              >
                现实人物
              </a>
            </li>
          </ul>
        </nav>

        <section className={results} aria-label='搜索结果'>
          <div className={resultTools}>
            <span>找到 {total} 个条目</span>
            <ViewSelector view={view} onChange={handleViewChange} />
          </div>
          {subjects.length > 0 ? (
            <ul
              className={cx(
                resultsList,
                view === 'compact' && resultsListCompact,
                view === 'full' && resultsListFull,
                view === 'grid' && resultsListGrid,
              )}
            >
              {subjects.map((subject) => (
                <SubjectItem key={subject.id} subject={subject} view={view} />
              ))}
            </ul>
          ) : (
            <p className={empty}>没有找到相关条目</p>
          )}
          <Pagination
            key={curPage}
            wrapperClass={pagination}
            total={total}
            pageSize={PAGE_SIZE}
            currentPage={curPage}
            onChange={handlePageChange}
          />
        </section>

        <aside className={sidebar}>
          <RelatedPanel monos={relatedMonos} />
          <div className={exactSearch}>
            <Link to={`/subject_search/${encodeURIComponent(exactKeyword)}?cat=${category}`}>
              显示精准匹配结果
            </Link>
          </div>
          <section className={sidePanel}>
            <h2>搜索提示</h2>
            <ul className={searchTips}>
              <li>
                搜索时使用引号 “关键词”，如 <i>“ちょびっツ”</i> 获取精确结果
              </li>
              <li>
                使用减号 -，如 <i>马里奥 -gba</i> 排除关键词
              </li>
            </ul>
          </section>
        </aside>
      </main>
    </>
  );
}

export default withErrorBoundary(SubjectSearchPage);
