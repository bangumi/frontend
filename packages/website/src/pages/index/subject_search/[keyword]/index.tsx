import { ok } from '@oazapfts/runtime';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SlimCharacter, SlimPerson, SlimSubject, SubjectType } from '@bangumi/client/client';
import { SubjectType as SubjectTypeEnum } from '@bangumi/client/client';
import { Pagination } from '@bangumi/design';
import { EmptyStar, FilledStar, GridView, ListView, Search } from '@bangumi/icons';
import {
  getCharacterLink,
  getLegacyPageLink,
  getPersonLink,
  getSubjectLink,
} from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

import styles from './style.module.less';

const PAGE_SIZE = 15;
const VIEW_STORAGE_KEY = 'bangumi-subject-search-view';

type ViewMode = 'compact' | 'full' | 'grid';
type SubjectCategory = 'all' | `${SubjectType}`;
type RelatedMono =
  | { kind: 'character'; item: SlimCharacter }
  | { kind: 'person'; item: SlimPerson };

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

function SubjectRating({ subject }: { subject: SlimSubject }) {
  if (subject.rating.total < 10) {
    return <span className={styles.lowRating}>(少于10人评分)</span>;
  }

  const score = Math.round(subject.rating.score);
  return (
    <span className={styles.rating}>
      <span className={styles.stars} aria-label={`评分 ${subject.rating.score.toFixed(1)}`}>
        {Array.from({ length: 10 }, (_, index) =>
          index < score ? <FilledStar key={index} /> : <EmptyStar key={index} />,
        )}
      </span>
      <span className={styles.score}>{subject.rating.score.toFixed(1)}</span>
      <span className={styles.ratingTotal}>({subject.rating.total}人评分)</span>
    </span>
  );
}

function SubjectItem({ subject, view }: { subject: SlimSubject; view: ViewMode }) {
  const displayName = subject.nameCN || subject.name;
  const showDetails = view === 'full';

  return (
    <li className={styles.resultItem}>
      <Link className={styles.coverLink} to={getSubjectLink(subject.id)}>
        {subject.images?.common ? (
          <img className={styles.cover} src={subject.images.common} alt='' loading='lazy' />
        ) : (
          <span className={styles.coverPlaceholder} aria-hidden='true' />
        )}
      </Link>
      <div className={styles.resultInfo}>
        <h2 className={styles.resultTitle}>
          <span className={styles.subjectTypeIcon} aria-hidden='true' />
          <Link to={getSubjectLink(subject.id)}>{displayName}</Link>
          {subject.nameCN && subject.nameCN !== subject.name && (
            <small className={styles.originalName}>{subject.name}</small>
          )}
          {showDetails && subject.metaTags.length > 0 && (
            <small className={styles.metaTags}>{subject.metaTags.join(' / ')}</small>
          )}
        </h2>
        {showDetails && <p className={styles.subjectInfo}>{subject.info}</p>}
        {view !== 'grid' && <SubjectRating subject={subject} />}
      </div>
      {subject.rating.rank > 0 && <span className={styles.rank}>Rank {subject.rating.rank}</span>}
    </li>
  );
}

function ViewSelector({ view, onChange }: { view: ViewMode; onChange: (view: ViewMode) => void }) {
  const options: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
      value: 'compact',
      label: '精简视图',
      icon: <ListView className={styles.compactIcon} />,
    },
    { value: 'full', label: '列表视图', icon: <ListView /> },
    { value: 'grid', label: '网格视图', icon: <GridView /> },
  ];

  return (
    <div className={styles.viewSelector} aria-label='结果显示方式'>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          className={classNames(
            styles.viewButton,
            view === option.value && styles.viewButtonActive,
          )}
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
    <section className={styles.sidePanel}>
      <h2>相关人物</h2>
      <ul className={styles.monoGrid}>
        {monos.map(({ kind, item }) => {
          const displayName = item.nameCN || item.name;
          return (
            <li key={`${kind}-${item.id}`}>
              <Link to={kind === 'character' ? getCharacterLink(item.id) : getPersonLink(item.id)}>
                {item.images?.grid ? (
                  <img src={item.images.grid} alt='' loading='lazy' />
                ) : (
                  <span className={styles.avatarPlaceholder}>{displayName.slice(0, 1)}</span>
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
      <div className={styles.searchBand}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
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

      <main className={styles.page}>
        <nav className={styles.categories} aria-label='搜索分类'>
          <ul>
            <li className={styles.categoryRoot}>条目</li>
            {SUBJECT_CATEGORIES.map((item) => (
              <li key={item.value}>
                <Link
                  className={category === item.value ? styles.categorySelected : undefined}
                  to={`/subject_search/${encodeURIComponent(routeKeyword)}?cat=${item.value}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.categoryRoot}>人物</li>
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

        <section className={styles.results} aria-label='搜索结果'>
          <div className={styles.resultTools}>
            <span>找到 {total} 个条目</span>
            <ViewSelector view={view} onChange={handleViewChange} />
          </div>
          {subjects.length > 0 ? (
            <ul
              className={classNames(styles.resultsList, {
                [styles.resultsListCompact!]: view === 'compact',
                [styles.resultsListFull!]: view === 'full',
                [styles.resultsListGrid!]: view === 'grid',
              })}
            >
              {subjects.map((subject) => (
                <SubjectItem key={subject.id} subject={subject} view={view} />
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>没有找到相关条目</p>
          )}
          <Pagination
            key={curPage}
            wrapperClass={styles.pagination}
            total={total}
            pageSize={PAGE_SIZE}
            currentPage={curPage}
            onChange={handlePageChange}
          />
        </section>

        <aside className={styles.sidebar}>
          <RelatedPanel monos={relatedMonos} />
          <div className={styles.exactSearch}>
            <Link to={`/subject_search/${encodeURIComponent(exactKeyword)}?cat=${category}`}>
              显示精准匹配结果
            </Link>
          </div>
          <section className={styles.sidePanel}>
            <h2>搜索提示</h2>
            <ul className={styles.searchTips}>
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
