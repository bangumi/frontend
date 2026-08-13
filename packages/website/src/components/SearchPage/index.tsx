import type { FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Search } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';

const searchArea = css({
  borderBottom: '1px solid #e8e5e6',
  background: '#f7f8fa',
});

const searchAreaInner = css({
  width: '1120px',
  margin: '0 auto',
  padding: '18px 0 12px',
  boxSizing: 'border-box',
  '@media (max-width: 1180px)': {
    width: 'calc(100% - 48px)',
  },
  '@media (max-width: 640px)': {
    width: 'calc(100% - 32px)',
    padding: '14px 0 10px',
  },
});

const searchTop = css({
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  '@media (max-width: 768px)': {
    alignItems: 'stretch',
    flexDirection: 'column',
    gap: '0',
  },
});

const searchHeading = css({
  flex: '0 0 180px',
  margin: '0',
  color: '#1f1c1c',
  fontSize: '18px',
  fontWeight: '650',
  lineHeight: '26px',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const searchForm = css({
  display: 'flex',
  flex: '1',
  gap: '8px',
  maxWidth: '760px',
  '& label': {
    position: 'absolute',
    overflow: 'hidden',
    width: '1px',
    height: '1px',
    padding: '0',
    border: '0',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
  },
  '& input': {
    minWidth: '0',
    height: '44px',
    flex: '1',
    padding: '0 14px',
    border: '1px solid #d8d3d5',
    borderRadius: '6px',
    background: '#fff',
    color: '#302c2d',
    fontSize: '15px',
    outline: 'none',
    boxShadow: '0 1px 2px rgba(48, 44, 45, 0.04)',
    _focus: {
      borderColor: '#f09199',
      boxShadow: '0 0 0 3px rgba(240, 145, 153, 0.16)',
    },
  },
  '& button': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    height: '44px',
    padding: '0 20px',
    border: '0',
    borderRadius: '6px',
    background: '#f09199',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    _hover: { background: '#e77f89' },
    _focusVisible: { outline: '2px solid #3aa6d0', outlineOffset: '2px' },
    '& svg': {
      width: '17px',
      height: '17px',
      fill: 'currentcolor',
    },
  },
  '@media (max-width: 640px)': {
    '& button': {
      width: '44px',
      flex: '0 0 44px',
      padding: '0',
      '& span': { display: 'none' },
    },
  },
});

const categoryNav = css({
  overflowX: 'auto',
  marginTop: '20px',
  paddingTop: '14px',
  borderTop: '1px solid #e5e1e2',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    width: 'max-content',
  },
  '@media (max-width: 640px)': {
    marginTop: '14px',
    paddingTop: '11px',
    '& > div': { gap: '18px' },
  },
});

const categoryGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  '& > span': {
    marginRight: '2px',
    color: '#8c8587',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  '& a': {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '30px',
    padding: '0 10px',
    borderRadius: '5px',
    color: '#5f595b',
    fontSize: '13px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    _hover: {
      background: '#fff',
      color: '#d96f79',
    },
    "&[aria-current='page']": {
      background: '#f09199',
      color: '#fff',
      fontWeight: '600',
    },
  },
});

export const searchPage = css({
  width: '1120px',
  margin: '0 auto',
  padding: '28px 0 64px',
  boxSizing: 'border-box',
  '@media (max-width: 1180px)': {
    width: 'calc(100% - 48px)',
  },
  '@media (max-width: 640px)': {
    width: '100%',
    padding: '20px 16px 42px',
  },
});

export const searchPageWithSidebar = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 260px',
  gap: '36px',
  width: '1120px',
  margin: '0 auto',
  padding: '28px 0 64px',
  boxSizing: 'border-box',
  '@media (max-width: 1180px)': {
    width: 'calc(100% - 48px)',
    gridTemplateColumns: 'minmax(0, 1fr) 240px',
    gap: '28px',
  },
  '@media (max-width: 860px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  '@media (max-width: 640px)': {
    width: '100%',
    gap: '28px',
    padding: '20px 16px 42px',
  },
});

export const searchResults = css({ minWidth: '0' });

export const searchResultsHeader = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  minHeight: '42px',
  paddingBottom: '12px',
  borderBottom: '1px solid #e8e5e6',
  '& h2': {
    margin: '0',
    color: '#302c2d',
    fontSize: '19px',
    fontWeight: '650',
    lineHeight: '26px',
  },
  '& p': {
    margin: '2px 0 0',
    color: '#8c8587',
    fontSize: '12px',
    lineHeight: '18px',
  },
  '@media (max-width: 640px)': {
    alignItems: 'flex-end',
    '& h2': { fontSize: '17px', lineHeight: '23px' },
  },
});

export const searchEmpty = css({
  minHeight: '260px',
  margin: '0',
  padding: '80px 20px',
  color: '#8c8587',
  boxSizing: 'border-box',
  textAlign: 'center',
});

export const searchPagination = css({
  flexWrap: 'wrap',
  gap: '6px',
  margin: '28px 0 0',
  '& .bgm-pagination-prev, & .bgm-pagination-next, & .bgm-pagination-pager': {
    width: '32px',
    height: '32px',
    margin: '0',
    borderWidth: '1px',
    borderRadius: '6px',
    fontSize: '12px',
  },
  '& .bgm-pagination-pager + .bgm-pagination-pager': { marginLeft: '0' },
  '& .bgm-pagination-prev, & .bgm-pagination-next': { width: '38px' },
  '& .bgm-pagination-icon': { width: '15px', height: '15px' },
});

export const searchSidebar = css({
  display: 'flex',
  alignSelf: 'start',
  flexDirection: 'column',
  gap: '14px',
});

export const searchPanel = css({
  padding: '16px',
  border: '1px solid #e8e5e6',
  borderRadius: '6px',
  background: '#fff',
  boxShadow: '0 2px 10px rgba(48, 44, 45, 0.04)',
});

export const searchPanelTitle = css({
  margin: '0 0 14px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee9ea',
  color: '#302c2d',
  fontSize: '14px',
  fontWeight: '650',
  lineHeight: '20px',
});

interface SearchHeaderProps {
  inputId: string;
  inputLabel: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export function SearchHeader({
  inputId,
  inputLabel,
  value,
  onChange,
  onSubmit,
  children,
}: SearchHeaderProps) {
  return (
    <div className={searchArea}>
      <div className={searchAreaInner}>
        <div className={searchTop}>
          <h1 className={searchHeading}>站内搜索</h1>
          <form className={searchForm} onSubmit={onSubmit}>
            <label htmlFor={inputId}>{inputLabel}</label>
            <input
              id={inputId}
              name='search_text'
              type='search'
              value={value}
              onChange={(event) => onChange(event.target.value)}
            />
            <button type='submit'>
              <Search />
              <span>搜索</span>
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  );
}

interface SearchCategoryItem {
  label: string;
  selected?: boolean;
  to: string;
}

interface SearchCategoryGroup {
  label: string;
  items: SearchCategoryItem[];
}

export function SearchCategoryNav({ groups }: { groups: SearchCategoryGroup[] }) {
  return (
    <nav className={categoryNav} aria-label='搜索分类'>
      <div>
        {groups.map((group) => (
          <div className={categoryGroup} key={group.label}>
            <span>{group.label}</span>
            {group.items.map((item) => (
              <Link
                key={`${group.label}-${item.label}`}
                to={item.to}
                aria-current={item.selected ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
