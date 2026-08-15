import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import type { SlimCharacter, SlimPerson } from '@bangumi/client/client';
import { Pagination } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getCharacterLink, getLegacyPageLink, getPersonLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import {
  SearchCategoryNav,
  searchEmpty,
  SearchHeader,
  searchPage,
  searchPagination,
  searchResults,
  searchResultsHeader,
} from '@bangumi/website/components/SearchPage';
import { useCharacterSearch, usePersonSearch } from '@bangumi/website/hooks/use-mono-search';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

const PAGE_SIZE = 15;

const categorySelected = css({
  '&[class]': {
    background: '#f09199',
    color: '#fff',
  },
});

const monoTabs = css({
  display: 'flex',
  gap: '6px',
  marginBottom: '18px',
  '& a': {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '34px',
    padding: '0 13px',
    borderRadius: '5px',
    color: '#716b6d',
    fontSize: '13px',
    textDecoration: 'none',
    '&[class]': {
      background: '#fff1f2',
      color: '#d96f79',
      fontWeight: '650',
    },
    _hover: { color: '#d96f79' },
  },
});

const careerFilter = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '16px',
  padding: '12px 14px',
  border: '1px solid #eee9ea',
  borderRadius: '6px',
  background: '#faf9f9',
  color: '#9f9b9b',
  fontSize: '12px',
  '& select': {
    height: '32px',
    padding: '0 9px',
    border: '1px solid #e8e3e3',
    borderRadius: '4px',
    background: '#fff',
    color: '#595555',
    fontSize: '12px',
    outline: 'none',
  },
});

const resultsGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  gap: '30px 20px',
  margin: '0',
  padding: '24px 0 4px',
  listStyle: 'none',
  '@media (max-width: 960px)': {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
  '@media (max-width: 700px)': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '24px 12px',
  },
  '@media (max-width: 420px)': {
    gap: '22px 10px',
  },
});

const cardLink = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#1f1c1c',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center',
  textDecoration: 'none',
  _hover: { color: '#d96f79' },
});

const cardCover = css({
  display: 'block',
  width: '100%',
  aspectRatio: '4 / 5',
  borderRadius: '6px',
  objectFit: 'cover',
  boxShadow: '0 3px 12px rgba(48, 44, 45, 0.14)',
});

const cardCoverPlaceholder = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '4 / 5',
  borderRadius: '6px',
  background: '#eee9ea',
  color: '#8c8587',
  fontSize: '24px',
});

const cardName = css({
  overflow: 'hidden',
  maxWidth: '100%',
  marginTop: '10px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const cardSub = css({
  overflow: 'hidden',
  maxWidth: '100%',
  color: '#8c8587',
  fontSize: '12px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const cardInfo = css({
  overflow: 'hidden',
  margin: '4px 0 0',
  color: '#8c8587',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const legacyLink = css({
  display: 'inline-block',
  marginTop: '28px',
  color: '#8c8587',
  fontSize: '12px',
  textDecoration: 'none',
  _hover: { color: '#d96f79' },
});

/** 人物职业（旧站 PersonCareer） */
const PERSON_CAREERS: { value: string; label: string }[] = [
  { value: '', label: '全部职业' },
  { value: 'producer', label: '制作人' },
  { value: 'mangaka', label: '漫画家' },
  { value: 'seiyu', label: '声优' },
  { value: 'writer', label: '作家' },
  { value: 'illustrator', label: '插画家' },
  { value: 'actor', label: '演员' },
];

type MonoCategory = 'crt' | 'prsn' | 'all';

function parseCategory(value: string | null): MonoCategory {
  return value === 'crt' || value === 'prsn' || value === 'all' ? value : 'crt';
}

function CharacterCard({ character }: { character: SlimCharacter }) {
  const displayName = character.nameCN || character.name;
  const showSub = Boolean(character.nameCN) && character.name !== character.nameCN;

  return (
    <li>
      <Link className={cardLink} to={getCharacterLink(character.id)}>
        {character.images?.grid ? (
          <img className={cardCover} src={character.images.grid} alt='' loading='lazy' />
        ) : (
          <span className={cardCoverPlaceholder} aria-hidden='true'>
            {displayName.slice(0, 1)}
          </span>
        )}
        <span className={cardName} title={displayName}>
          {displayName}
        </span>
        {showSub && (
          <span className={cardSub} title={character.name}>
            {character.name}
          </span>
        )}
      </Link>
      {character.info && (
        <p className={cardInfo} title={character.info}>
          {character.info}
        </p>
      )}
    </li>
  );
}

function PersonCard({ person }: { person: SlimPerson }) {
  const displayName = person.nameCN || person.name;
  const showSub = Boolean(person.nameCN) && person.name !== person.nameCN;

  return (
    <li>
      <Link className={cardLink} to={getPersonLink(person.id)}>
        {person.images?.grid ? (
          <img className={cardCover} src={person.images.grid} alt='' loading='lazy' />
        ) : (
          <span className={cardCoverPlaceholder} aria-hidden='true'>
            {displayName.slice(0, 1)}
          </span>
        )}
        <span className={cardName} title={displayName}>
          {displayName}
        </span>
        {showSub && (
          <span className={cardSub} title={person.name}>
            {person.name}
          </span>
        )}
      </Link>
      {person.info && (
        <p className={cardInfo} title={person.info}>
          {person.info}
        </p>
      )}
    </li>
  );
}

function MonoSearchPage() {
  const { keyword: routeKeyword = '' } = useParams<{ keyword: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = parseCategory(searchParams.get('cat'));
  const career = searchParams.get('career') ?? undefined;
  const { curPage, offset } = usePaginationParams(PAGE_SIZE);
  const [searchValue, setSearchValue] = useState(routeKeyword);

  const showCharacters = category === 'all' || category === 'crt';
  const showPersons = category === 'prsn';

  const { characters, total: characterTotal } = useCharacterSearch(
    showCharacters ? routeKeyword : null,
    offset,
  );
  const { persons, total: personTotal } = usePersonSearch(
    showPersons ? routeKeyword : null,
    career,
    offset,
  );

  useEffect(() => {
    setSearchValue(routeKeyword);
  }, [routeKeyword]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const nextKeyword = searchValue.trim();
    if (nextKeyword) {
      navigate(`/mono_search/${encodeURIComponent(nextKeyword)}?cat=${category}`);
    }
  };

  const handlePageChange = (page: number): void => {
    setSearchParams((params) => {
      params.set('page', String(page));
      return params;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const keywordParam = encodeURIComponent(routeKeyword);

  return (
    <>
      <Helmet title={`搜索: ${routeKeyword}`} />
      <SearchHeader
        inputId='mono-search-input'
        inputLabel='人物搜索'
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
      >
        <SearchCategoryNav
          groups={[
            {
              label: '条目',
              items: [
                { label: '全部', to: `/subject_search/${keywordParam}?cat=all` },
                { label: '动画', to: `/subject_search/${keywordParam}?cat=2` },
                { label: '书籍', to: `/subject_search/${keywordParam}?cat=1` },
                { label: '音乐', to: `/subject_search/${keywordParam}?cat=3` },
                { label: '游戏', to: `/subject_search/${keywordParam}?cat=4` },
                { label: '三次元', to: `/subject_search/${keywordParam}?cat=6` },
              ],
            },
            {
              label: '人物',
              items: [
                {
                  label: '全部',
                  selected: category === 'all',
                  to: `/mono_search/${keywordParam}?cat=all`,
                },
                {
                  label: '虚构角色',
                  selected: category === 'crt',
                  to: `/mono_search/${keywordParam}?cat=crt`,
                },
                {
                  label: '现实人物',
                  selected: category === 'prsn',
                  to: `/mono_search/${keywordParam}?cat=prsn`,
                },
              ],
            },
          ]}
        />
      </SearchHeader>

      <main className={searchPage}>
        <section className={searchResults} aria-label='搜索结果'>
          <div className={monoTabs}>
            <Link
              className={showCharacters ? categorySelected : undefined}
              to={`/mono_search/${keywordParam}?cat=${category === 'prsn' ? 'all' : 'crt'}`}
            >
              角色
            </Link>
            <Link
              className={showPersons ? categorySelected : undefined}
              to={`/mono_search/${keywordParam}?cat=prsn`}
            >
              人物
            </Link>
          </div>
          {category === 'prsn' && (
            <div className={careerFilter}>
              <span>职业筛选：</span>
              <select
                value={career ?? ''}
                onChange={(event) => {
                  const nextCareer = event.target.value;
                  setSearchParams((params) => {
                    if (nextCareer) {
                      params.set('career', nextCareer);
                    } else {
                      params.delete('career');
                    }
                    params.delete('page');
                    return params;
                  });
                }}
              >
                {PERSON_CAREERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showCharacters && (
            <>
              <header className={searchResultsHeader}>
                <div>
                  <h2>“{routeKeyword}”的角色</h2>
                  <p>找到 {characterTotal} 个结果</p>
                </div>
              </header>
              {characters.length > 0 ? (
                <ul className={resultsGrid}>
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </ul>
              ) : (
                <p className={searchEmpty}>没有找到相关角色</p>
              )}
            </>
          )}
          {showPersons && (
            <>
              <header className={searchResultsHeader}>
                <div>
                  <h2>“{routeKeyword}”的现实人物</h2>
                  <p>找到 {personTotal} 个结果</p>
                </div>
              </header>
              {persons.length > 0 ? (
                <ul className={resultsGrid}>
                  {persons.map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </ul>
              ) : (
                <p className={searchEmpty}>没有找到相关现实人物</p>
              )}
            </>
          )}
          <Pagination
            key={curPage}
            wrapperClass={searchPagination}
            total={category === 'prsn' ? personTotal : characterTotal}
            pageSize={PAGE_SIZE}
            currentPage={curPage}
            onChange={handlePageChange}
          />
        </section>

        <a
          className={legacyLink}
          href={getLegacyPageLink(
            `/mono_search/${keywordParam}?cat=${category === 'prsn' ? 'prsn' : 'crt'}`,
          )}
        >
          前往旧版页面
        </a>
      </main>
    </>
  );
}

export default withErrorBoundary(MonoSearchPage);
