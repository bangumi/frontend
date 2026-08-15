import dayjs from 'dayjs';
import React from 'react';
import { NavLink } from 'react-router-dom';

import type {
  Infobox,
  PersonCharacter,
  PersonRelation,
  PersonWork,
  SlimIndex,
} from '@bangumi/client/client';
import { RichContent, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import {
  getCharacterLink,
  getPersonLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import CollectSidePanel from '@bangumi/website/components/CollectSidePanel';
import IndexSidePanel from '@bangumi/website/components/IndexSidePanel';
import PageContainer from '@bangumi/website/components/PageContainer';
import type { PersonHomeData } from '@bangumi/website/hooks/use-person-home';

import PersonLayout from './components/PersonLayout';

const page = css({
  padding: '10px 15px 24px',
});

const header = css({ margin: '0' });

const headerInner = css({
  paddingRight: '15px',
  paddingLeft: '15px',
});

const name = css({
  margin: '15px 0',
  color: '#1f1c1c',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  '& a': {
    color: 'inherit',
    fontWeight: 'inherit',
    _hover: { color: '#54b5df' },
  },
  '& small': {
    marginLeft: '8px',
    color: '#9f9b9b',
    fontSize: '12px',
    fontWeight: 'normal',
  },
});

const tabsBar = css({
  borderTop: '1px solid #fefefe',
  borderBottom: '1px solid #e8e3e3',
  background: '#fbfbfb',
});

const tabsInner = css({
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@media (max-width: 640px)': {
    paddingRight: '8px',
    paddingLeft: '8px',
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
  _hover: {
    borderBottomColor: '#54b5df',
    color: '#54b5df',
    textDecoration: 'none',
  },
});

const columns = css({
  display: 'grid',
  gridTemplateColumns: '250px minmax(0, 1fr)',
  alignItems: 'start',
  gap: '20px',
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

const columnMain = css({ minWidth: '0' });

const infobox = css({
  marginBottom: '16px',
  overflowWrap: 'break-word',
});

const portraitWrapper = css({
  marginBottom: '8px',
  textAlign: 'center',
});

const portrait = css({
  display: 'block',
  width: '240px',
  maxWidth: '100%',
  height: 'auto',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '2px',
  border: '1px solid #a9a9ab',
  borderTopColor: '#c7c7c9',
  borderBottomColor: '#858486',
  background: '#fff',
  boxShadow: '0 1px 5px #aaa',
  '@media (max-width: 640px)': {
    width: 'min(240px, calc(100vw - 32px))',
  },
});

const infoList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  fontSize: '14px',
  '& > li': {
    padding: '5px',
    borderBottom: '1px solid #e8e3e3',
    lineHeight: '1.4',
  },
});

const tip = css({ color: '#9f9b9b' });

const infoGroup = css({
  paddingBottom: '0 !important',
});

const infoSublist = css({
  listStyle: 'none',
  margin: '4px 0 0 20px',
  padding: '0',
  '& li': {
    padding: '4px 6px',
    borderTop: '1px solid #e8e3e3',
  },
});

const career = css({
  margin: '0 0 10px',
  color: '#595555',
  fontSize: '18px',
  fontWeight: '300',
  lineHeight: '1.4',
  '@media (max-width: 640px)': {
    marginTop: '12px',
  },
});

const summary = css({
  margin: '0',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.65',
  whiteSpace: 'pre-line',
});

const section = css({ marginTop: '20px' });

const sectionHeader = css({
  display: 'flex',
  minHeight: '34px',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #e8e3e3',
  '& h2': {
    margin: '0',
    color: '#595555',
    fontSize: '18px',
    fontWeight: '300',
  },
  '& > a': {
    flex: '0 0 auto',
    fontSize: '12px',
  },
});

const castList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const castRow = css({
  display: 'grid',
  minHeight: '78px',
  gridTemplateColumns: 'minmax(220px, 1fr) minmax(260px, 1.15fr)',
  gap: '16px',
  alignItems: 'center',
  padding: '8px 5px',
  borderBottom: '1px solid #e8e3e3',
  _even: {
    background: '#fafafa',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'minmax(100px, 0.9fr) minmax(0, 1.35fr)',
    gap: '8px',
    paddingRight: '4px',
    paddingLeft: '4px',
  },
});

const characterInfo = css({
  display: 'flex',
  minWidth: '0',
  alignItems: 'flex-start',
  gap: '10px',
  '& > div': {
    minWidth: '0',
  },
  '& small': {
    display: 'block',
    color: '#9f9b9b',
    fontSize: '12px',
  },
  '@media (max-width: 640px)': {
    gap: '8px',
  },
});

const squareCoverLink = css({
  display: 'block',
  width: '48px',
  height: '48px',
  flex: '0 0 48px',
  overflow: 'hidden',
  borderRadius: '6px',
  background: '#e8e3e3',
});

const squareCover = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top',
});

const castSubjects = css({
  listStyle: 'none',
  minWidth: '0',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 36px',
    gap: '8px',
    alignItems: 'start',
    textAlign: 'right',
    '& > div': {
      minWidth: '0',
    },
    '& > div > a, & small': {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& small': {
      color: '#9f9b9b',
      fontSize: '11px',
    },
    '& p': {
      margin: '3px 0 0',
    },
  },
});

const subjectCoverLink = css({
  display: 'block',
  width: '36px',
  height: '36px',
  overflow: 'hidden',
  border: '1px solid #bbb',
  background: '#e8e3e3',
});

const subjectCover = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const jobBadge = css({
  display: 'inline-block',
  marginLeft: '4px',
  padding: '1px 4px',
  borderRadius: '3px',
  background: '#59baf3',
  color: '#fff',
  fontSize: '11px',
  lineHeight: '1.35',
});

const jobType = css({
  display: 'inline-block',
  marginLeft: '4px',
  padding: '1px 4px',
  borderRadius: '3px',
  background: '#eee',
  color: '#9f9b9b',
  fontSize: '11px',
  lineHeight: '1.35',
});

const workList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'flex',
    minHeight: '58px',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '8px 5px',
    borderBottom: '1px solid #e8e3e3',
  },
});

const workCoverLink = css({
  display: 'block',
  width: '48px',
  height: '48px',
  flex: '0 0 48px',
  overflow: 'hidden',
  background: '#e8e3e3',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const workInfo = css({
  minWidth: '0',
  '& small': {
    display: 'block',
    color: '#9f9b9b',
  },
  '& p': {
    margin: '4px 0 0 -4px',
  },
});

const relationGrid = css({
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  gap: '12px',
  paddingTop: '10px',
  margin: '0',
  paddingLeft: '0',
  paddingRight: '0',
  paddingBottom: '0',
  '& li': {
    minWidth: '0',
    '& > p': {
      minHeight: '20px',
      margin: '0 0 3px',
      color: '#9f9b9b',
      fontSize: '11px',
    },
    '& > a': {
      display: 'block',
      '& img': {
        display: 'block',
        width: '75px',
        maxWidth: '100%',
        aspectRatio: '1',
        borderRadius: '5px',
        objectFit: 'cover',
      },
      '& span': {
        display: 'block',
        overflow: 'hidden',
        marginTop: '4px',
        fontSize: '12px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '8px',
  },
});

const commentList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'flex',
    gap: '8px',
    padding: '8px 4px',
    borderBottom: '1px solid #e8e3e3',
    '& > div': {
      minWidth: '0',
    },
  },
});

const commentAvatar = css({
  width: '32px',
  height: '32px',
  flex: '0 0 32px',
  borderRadius: '4px',
  objectFit: 'cover',
});

const commentMeta = css({
  margin: '0',
  color: '#9f9b9b',
  fontSize: '11px',
});

const commentContent = css({
  margin: '3px 0 0',
  whiteSpace: 'pre-wrap',
});

const { Link } = Typography;

const CAREER_LABELS: Record<string, string> = {
  actor: '演员',
  artist: '音乐人',
  illustrator: '绘师',
  mangaka: '漫画家',
  producer: '制作人员',
  seiyu: '声优',
  writer: '作家',
};

const CHARACTER_ROLE_LABELS: Record<number, string> = {
  1: '主角',
  2: '配角',
  3: '客串',
};

export function PersonHeader({ person }: { person: PersonHomeData['person'] }) {
  const basePath = getPersonLink(person.id);
  const tabs = [
    { label: '概览', to: basePath, end: true },
    { label: '角色', to: `${basePath}/works/voice` },
    { label: '作品', to: `${basePath}/works` },
  ];

  return (
    <header className={header}>
      <PageContainer gutterOnly className={headerInner}>
        <h1 className={name}>
          <Link to={basePath}>{person.name}</Link>
          {person.nameCN && <small>{person.nameCN}</small>}
        </h1>
      </PageContainer>
      <nav className={tabsBar} aria-label='人物导航'>
        <PageContainer gutterOnly className={tabsInner}>
          <ul className={tabList}>
            {tabs.map((tab) => (
              <li key={tab.label}>
                <NavLink
                  to={tab.to}
                  end={tab.end}
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

function InfoValue({ value }: { value: string }) {
  if (/^https?:\/\//u.test(value)) {
    return (
      <a href={value} target='_blank' rel='noreferrer'>
        {value.replace(/^https?:\/\/(?:www\.)?/u, '')}
      </a>
    );
  }
  return <>{value}</>;
}

function InfoItem({ item }: { item: Infobox[number] }) {
  const values = item.values.filter((value) => value.v.trim() !== '');
  if (values.length === 0) {
    return null;
  }

  const hasNamedValues = values.some((value) => value.k != null && value.k !== '');
  return (
    <li className={hasNamedValues ? infoGroup : undefined}>
      <span className={tip}>{item.key}: </span>
      {hasNamedValues ? (
        <ul className={infoSublist}>
          {values.map((value) => (
            <li key={`${value.k ?? ''}-${value.v}`}>
              {value.k && <span className={tip}>{value.k} </span>}
              <InfoValue value={value.v} />
            </li>
          ))}
        </ul>
      ) : (
        values.map((value, index) => (
          <React.Fragment key={`${value.k ?? ''}-${value.v}`}>
            {index > 0 && ' / '}
            <InfoValue value={value.v} />
          </React.Fragment>
        ))
      )}
    </li>
  );
}

export function PersonInfobox({ data }: { data: PersonHomeData }) {
  const { person } = data;
  return (
    <aside className={columnLeft}>
      <div className={infobox}>
        {person.images?.large && (
          <div className={portraitWrapper}>
            <a href={person.images.large} target='_blank' rel='noreferrer'>
              <img className={portrait} src={person.images.large} alt={person.name} />
            </a>
          </div>
        )}
        <ul className={infoList}>
          {person.infobox.map((item) => (
            <InfoItem key={item.key} item={item} />
          ))}
        </ul>
      </div>
      <IndexPanel personID={person.id} indexes={data.indexes} />
      <CollectPanel data={data} />
    </aside>
  );
}

function IndexPanel({ personID, indexes }: { personID: number; indexes: SlimIndex[] }) {
  return <IndexSidePanel indexes={indexes} moreLink={`/person/${personID}/indices`} />;
}

function CollectPanel({ data }: { data: PersonHomeData }) {
  return (
    <CollectSidePanel
      title={`谁收藏了${data.person.name}?`}
      listLabel='收藏用户列表'
      items={data.collects.map((collect) => ({
        user: collect.user,
        status: dayjs.unix(collect.createdAt).format('YYYY-M-D'),
      }))}
      moreLink={`/person/${data.person.id}/collections`}
      moreLabel='全部收藏会员'
      stats={`${data.collectsTotal}人收藏`}
    />
  );
}

function SectionHeader({ title, more }: { title: string; more?: React.ReactNode }) {
  return (
    <div className={sectionHeader}>
      <h2>{title}</h2>
      {more}
    </div>
  );
}

export function CastList({ casts }: { casts: PersonCharacter[] }) {
  return (
    <ul className={castList}>
      {casts.map(({ character, relations }) => (
        <li key={character.id} className={castRow}>
          <div className={characterInfo}>
            <Link to={getCharacterLink(character.id)} className={squareCoverLink}>
              {character.images?.small && (
                <img className={squareCover} src={character.images.small} alt='' />
              )}
            </Link>
            <div>
              <Link to={getCharacterLink(character.id)}>{character.name}</Link>
              {character.nameCN && <small>{character.nameCN}</small>}
            </div>
          </div>
          <ul className={castSubjects}>
            {relations.map(({ subject, type }) => (
              <li key={`${subject.id}-${type}`}>
                <div>
                  <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
                  {subject.nameCN && <small>{subject.nameCN}</small>}
                  <p>
                    <span className={jobBadge}>{CHARACTER_ROLE_LABELS[type] ?? '出演'}</span>
                    <span className={jobType}>CV</span>
                  </p>
                </div>
                <Link to={getSubjectLink(subject.id)} className={subjectCoverLink}>
                  {subject.images?.grid && (
                    <img className={subjectCover} src={subject.images.grid} alt='' />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function WorkList({ works }: { works: PersonWork[] }) {
  return (
    <ul className={workList}>
      {works.map(({ subject, positions }) => (
        <li key={subject.id}>
          <Link to={getSubjectLink(subject.id)} className={workCoverLink}>
            {subject.images?.grid && <img src={subject.images.grid} alt='' />}
          </Link>
          <div className={workInfo}>
            <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
            {subject.nameCN && <small>{subject.nameCN}</small>}
            <p>
              {positions.map((position) => (
                <span key={position.type.id} className={jobBadge}>
                  {position.type.cn || position.type.jp || position.type.en}
                </span>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function RelationGrid({ relations }: { relations: PersonRelation[] }) {
  return (
    <ul className={relationGrid}>
      {relations.map(({ person, relation, ended }) => (
        <li key={`${person.id}-${relation.id}`}>
          <p>
            {ended && <span className={jobType}>已结束</span>}
            {relation.cn}
          </p>
          <Link to={getPersonLink(person.id)}>
            {person.images?.medium && <img src={person.images.medium} alt='' />}
            <span>{person.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CommentList({ comments }: { comments: PersonHomeData['comments'] }) {
  if (comments.length === 0) {
    return null;
  }
  return (
    <ul className={commentList}>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.user?.avatar.small && (
            <img src={comment.user.avatar.small} alt='' className={commentAvatar} />
          )}
          <div>
            <p className={commentMeta}>
              {comment.user ? (
                <Link to={getUserProfileLink(comment.user.username)}>{comment.user.nickname}</Link>
              ) : (
                '匿名用户'
              )}{' '}
              <span>{dayjs.unix(comment.createdAt).format('YYYY-M-D HH:mm')}</span>
            </p>
            <RichContent
              bbcode={comment.content}
              preset='personComment'
              classname={commentContent}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PersonDetail({ data }: { data: PersonHomeData }) {
  const career = data.person.career.map((item) => CAREER_LABELS[item] ?? item).join(' ');
  const basePath = getPersonLink(data.person.id);

  return (
    <PersonLayout data={data} title={`${data.person.nameCN} ${data.person.name}`}>
      {career && <h2 className={career}>职业: {career}</h2>}
      {data.person.summary && <p className={summary}>{data.person.summary}</p>}

      <section className={section}>
        <SectionHeader
          title='最近演出角色'
          more={
            data.castsTotal > data.casts.length ? (
              <Link to={`${basePath}/works/voice`}>更多角色 »</Link>
            ) : undefined
          }
        />
        <CastList casts={data.casts} />
      </section>

      <section className={section}>
        <SectionHeader
          title='最近参与'
          more={
            data.worksTotal > data.works.length ? (
              <Link to={`${basePath}/works`}>更多作品 »</Link>
            ) : undefined
          }
        />
        <WorkList works={data.works} />
      </section>

      {data.relations.length > 0 && (
        <section className={section}>
          <SectionHeader title='关联人物' />
          <RelationGrid relations={data.relations} />
        </section>
      )}

      <section className={section}>
        <SectionHeader title='吐槽箱' />
        <CommentList comments={data.comments} />
      </section>
    </PersonLayout>
  );
}

export { page, columns, columnMain, sectionHeader };
