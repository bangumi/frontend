import { ok } from '@oazapfts/runtime';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import type {
  SlimCharacter,
  SlimPerson,
  SlimSubject,
  SubjectType,
} from '@bangumi/client/client.ts';
import { SubjectType as SubjectTypeEnum } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';
import { Pagination } from '@bangumi/design/index.tsx';
import { EmptyStar, FilledStar, GridView, ListView } from '@bangumi/icons/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';
import { getCharacterLink, getPersonLink, getSubjectLink } from '@bangumi/utils/pages.ts';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import {
  SearchCategoryNav,
  searchEmpty,
  SearchHeader,
  searchPageWithSidebar,
  searchPagination,
  searchPanel,
  searchPanelTitle,
  searchResults,
  searchResultsHeader,
  searchSidebar,
} from '@bangumi/website/components/SearchPage/index.tsx';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';

const viewSelector = css({
  display: 'inline-flex',
  overflow: 'hidden',
  flexShrink: '0',
  border: '1px solid #ded9da',
  borderRadius: '6px',
  background: '#fff',
});

const viewButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '34px',
  height: '30px',
  padding: '0',
  border: '0',
  borderRight: '1px solid #e8e5e6',
  background: '#fff',
  color: '#8c8587',
  cursor: 'pointer',
  _hover: { color: '#1f1c1c' },
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
  background: '#f09199',
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
  width: '96px',
  aspectRatio: '5 / 7',
  borderRadius: '5px',
  objectFit: 'cover',
  boxShadow: '0 3px 10px rgba(48, 44, 45, 0.16)',
});

const coverPlaceholder = css({
  display: 'block',
  width: '96px',
  aspectRatio: '5 / 7',
  borderRadius: '5px',
  objectFit: 'cover',
  boxShadow: '0 3px 10px rgba(48, 44, 45, 0.12)',
  background: '#eee9ea',
});

const resultInfo = css({ minWidth: '0' });

const resultTitle = css({
  display: 'flex',
  alignItems: 'baseline',
  minWidth: '0',
  margin: '0',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '22px',
  '& > a': {
    overflowWrap: 'anywhere',
    color: '#1f1c1c',
    fontWeight: '650',
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
    gap: '20px',
    minHeight: '164px',
    padding: '18px 6px',
    boxSizing: 'border-box',
  },
  '@media (max-width: 640px)': {
    '& > li': {
      gap: '13px',
      minHeight: '134px',
      padding: '14px 0',
    },
  },
});

const resultsListCompact = css({
  '& > li': {
    display: 'flex',
    gap: '14px',
    minHeight: '94px',
    padding: '12px 6px',
    boxSizing: 'border-box',
  },
});

const resultsListGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '24px 14px',
  padding: '20px 0',
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
  },
});

// 视图内元素样式（组合类）
const resultItemFull = css({
  display: 'flex',
  gap: '20px',
  minHeight: '164px',
  padding: '18px 6px',
  boxSizing: 'border-box',
  '@media (max-width: 640px)': {
    gap: '13px',
    minHeight: '134px',
    padding: '14px 0',
  },
});

const resultItemCompact = css({
  display: 'flex',
  gap: '14px',
  minHeight: '94px',
  padding: '12px 6px',
  boxSizing: 'border-box',
});

const resultItemGrid = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '0',
  textAlign: 'center',
});

const coverFull = css({
  '@media (max-width: 640px)': {
    width: '76px',
  },
});

const coverCompact = css({ width: '52px' });

const coverGrid = css({
  width: '120px',
  '@media (max-width: 640px)': {
    width: '96px',
  },
});

const resultInfoList = css({
  flex: '1',
  paddingTop: '1px',
});

const resultInfoGrid = css({
  width: '120px',
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

const exactSearch = css({
  padding: '14px 16px',
  border: '1px solid #e8e5e6',
  borderRadius: '6px',
  background: '#fff8f8',
  fontSize: '13px',
  '& a': {
    color: '#1f1c1c',
    textDecoration: 'none',
    _hover: { color: '#f09199' },
  },
});

const monoGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '14px 8px',
  margin: '0',
  padding: '0',
  listStyle: 'none',
  '& a': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#1f1c1c',
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
    width: '56px',
    height: '56px',
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
  width: '56px',
  height: '56px',
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
    <section className={searchPanel}>
      <h2 className={searchPanelTitle}>相关人物</h2>
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
      <SearchHeader
        inputId='subject-search-input'
        inputLabel='条目搜索'
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
      >
        <SearchCategoryNav
          groups={[
            {
              label: '条目',
              items: SUBJECT_CATEGORIES.map((item) => ({
                label: item.label,
                selected: category === item.value,
                to: `/subject_search/${encodeURIComponent(routeKeyword)}?cat=${item.value}`,
              })),
            },
            {
              label: '人物',
              items: [
                {
                  label: '全部',
                  to: `/mono_search/${encodeURIComponent(routeKeyword)}?cat=all`,
                },
                {
                  label: '虚构角色',
                  to: `/mono_search/${encodeURIComponent(routeKeyword)}?cat=crt`,
                },
                {
                  label: '现实人物',
                  to: `/mono_search/${encodeURIComponent(routeKeyword)}?cat=prsn`,
                },
              ],
            },
          ]}
        />
      </SearchHeader>

      <main className={searchPageWithSidebar}>
        <section className={searchResults} aria-label='搜索结果'>
          <header className={searchResultsHeader}>
            <div>
              <h2>“{routeKeyword}”的条目</h2>
              <p>找到 {total} 个结果</p>
            </div>
            <ViewSelector view={view} onChange={handleViewChange} />
          </header>
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
            <p className={searchEmpty}>没有找到相关条目</p>
          )}
          <Pagination
            key={curPage}
            wrapperClass={searchPagination}
            total={total}
            pageSize={PAGE_SIZE}
            currentPage={curPage}
            onChange={handlePageChange}
          />
        </section>

        <aside className={searchSidebar}>
          <RelatedPanel monos={relatedMonos} />
          <div className={exactSearch}>
            <Link to={`/subject_search/${encodeURIComponent(exactKeyword)}?cat=${category}`}>
              显示精准匹配结果
            </Link>
          </div>
          <section className={searchPanel}>
            <h2 className={searchPanelTitle}>搜索提示</h2>
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
