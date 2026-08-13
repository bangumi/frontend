import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import type { SlimCharacter, SlimPerson } from '@bangumi/client/client';
import { Pagination } from '@bangumi/design';
import { Search } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';
import { getCharacterLink, getLegacyPageLink, getPersonLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useCharacterSearch, usePersonSearch } from '@bangumi/website/hooks/use-mono-search';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

const PAGE_SIZE = 15;

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
    _hover: { background: '#3aa4d2' },
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

const monoTabs = css({
  display: 'flex',
  gap: '16px',
  padding: '10px 0 8px',
  '& a': {
    color: '#9f9b9b',
    fontSize: '13px',
    textDecoration: 'none',
    '&[class]': {
      color: '#f09199',
      fontWeight: '600',
    },
    _hover: { color: '#f09199' },
  },
});

const careerFilter = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '10px',
  padding: '0 4px 8px',
  color: '#9f9b9b',
  fontSize: '12px',
  '& select': {
    height: '26px',
    padding: '0 6px',
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
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '18px 12px',
  margin: '0',
  padding: '8px 0',
  listStyle: 'none',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '14px 10px',
  },
});

const cardLink = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#54b5df',
  fontSize: '13px',
  lineHeight: '18px',
  textAlign: 'center',
  textDecoration: 'none',
  _hover: { color: '#f09199' },
});

const cardCover = css({
  display: 'block',
  width: '100%',
  aspectRatio: '1 / 1.2',
  borderRadius: '4px',
  objectFit: 'cover',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.22)',
});

const cardCoverPlaceholder = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1 / 1.2',
  borderRadius: '4px',
  background: '#e8e3e3',
  color: '#9f9b9b',
  fontSize: '20px',
});

const cardName = css({
  overflow: 'hidden',
  maxWidth: '100%',
  marginTop: '6px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const cardSub = css({
  overflow: 'hidden',
  maxWidth: '100%',
  color: '#9f9b9b',
  fontSize: '11px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const cardInfo = css({
  overflow: 'hidden',
  margin: '4px 0 0',
  color: '#9f9b9b',
  fontSize: '11px',
  lineHeight: '16px',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

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
      <div className={searchBand}>
        <form className={searchForm} onSubmit={handleSearch}>
          <label htmlFor='mono-search-input'>人物搜索</label>
          <input
            id='mono-search-input'
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
            <li>
              <Link to={`/subject_search/${keywordParam}?cat=all`}>全部</Link>
            </li>
            <li>
              <Link to={`/subject_search/${keywordParam}?cat=2`}>动画</Link>
            </li>
            <li>
              <Link to={`/subject_search/${keywordParam}?cat=1`}>书籍</Link>
            </li>
            <li>
              <Link to={`/subject_search/${keywordParam}?cat=4`}>游戏</Link>
            </li>
            <li className={categoryRoot}>人物</li>
            <li>
              <Link
                className={category === 'crt' ? categorySelected : undefined}
                to={`/mono_search/${keywordParam}?cat=crt`}
              >
                虚构角色
              </Link>
            </li>
            <li>
              <Link
                className={category === 'prsn' ? categorySelected : undefined}
                to={`/mono_search/${keywordParam}?cat=prsn`}
              >
                现实人物
              </Link>
            </li>
            <li>
              <Link
                className={category === 'all' ? categorySelected : undefined}
                to={`/mono_search/${keywordParam}?cat=all`}
              >
                全部
              </Link>
            </li>
          </ul>
        </nav>

        <section className={results} aria-label='搜索结果'>
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
              <div className={resultTools}>
                <span>找到 {characterTotal} 个角色</span>
              </div>
              {characters.length > 0 ? (
                <ul className={resultsGrid}>
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </ul>
              ) : (
                <p className={empty}>没有找到相关角色</p>
              )}
            </>
          )}
          {showPersons && (
            <>
              <div className={resultTools}>
                <span>找到 {personTotal} 个现实人物</span>
              </div>
              {persons.length > 0 ? (
                <ul className={resultsGrid}>
                  {persons.map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </ul>
              ) : (
                <p className={empty}>没有找到相关现实人物</p>
              )}
            </>
          )}
          <Pagination
            key={curPage}
            wrapperClass={pagination}
            total={category === 'prsn' ? personTotal : characterTotal}
            pageSize={PAGE_SIZE}
            currentPage={curPage}
            onChange={handlePageChange}
          />
        </section>

        <aside className={css({ '@media (max-width: 768px)': { display: 'none' } })}>
          <a
            href={getLegacyPageLink(
              `/mono_search/${keywordParam}?cat=${category === 'prsn' ? 'prsn' : 'crt'}`,
            )}
            style={{ color: '#54b5df', fontSize: '12px', textDecoration: 'none' }}
          >
            前往旧版页面
          </a>
        </aside>
      </main>
    </>
  );
}

export default withErrorBoundary(MonoSearchPage);
