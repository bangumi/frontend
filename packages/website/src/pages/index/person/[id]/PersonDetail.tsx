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
import { Typography } from '@bangumi/design';
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
import styles from './PersonDetail.module.less';

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
    <header className={styles.header}>
      <PageContainer gutterOnly className={styles.headerInner}>
        <h1 className={styles.name}>
          <Link to={basePath}>{person.name}</Link>
          {person.nameCN && <small>{person.nameCN}</small>}
        </h1>
      </PageContainer>
      <nav className={styles.tabs} aria-label='人物导航'>
        <PageContainer gutterOnly className={styles.tabsInner}>
          <ul className={styles.tabList}>
            {tabs.map((tab) => (
              <li key={tab.label}>
                <NavLink
                  to={tab.to}
                  end={tab.end}
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
    <li className={hasNamedValues ? styles.infoGroup : undefined}>
      <span className={styles.tip}>{item.key}: </span>
      {hasNamedValues ? (
        <ul className={styles.infoSublist}>
          {values.map((value) => (
            <li key={`${value.k ?? ''}-${value.v}`}>
              {value.k && <span className={styles.tip}>{value.k} </span>}
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
    <aside className={styles.columnLeft}>
      <div className={styles.infobox}>
        {person.images?.large && (
          <div className={styles.portraitWrapper}>
            <a href={person.images.large} target='_blank' rel='noreferrer'>
              <img className={styles.portrait} src={person.images.large} alt={person.name} />
            </a>
          </div>
        )}
        <ul className={styles.infoList}>
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
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      {more}
    </div>
  );
}

export function CastList({ casts }: { casts: PersonCharacter[] }) {
  return (
    <ul className={styles.castList}>
      {casts.map(({ character, relations }) => (
        <li key={character.id} className={styles.castRow}>
          <div className={styles.characterInfo}>
            <Link to={getCharacterLink(character.id)} className={styles.squareCoverLink}>
              {character.images?.small && (
                <img className={styles.squareCover} src={character.images.small} alt='' />
              )}
            </Link>
            <div>
              <Link to={getCharacterLink(character.id)}>{character.name}</Link>
              {character.nameCN && <small>{character.nameCN}</small>}
            </div>
          </div>
          <ul className={styles.castSubjects}>
            {relations.map(({ subject, type }) => (
              <li key={`${subject.id}-${type}`}>
                <div>
                  <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
                  {subject.nameCN && <small>{subject.nameCN}</small>}
                  <p>
                    <span className={styles.jobBadge}>{CHARACTER_ROLE_LABELS[type] ?? '出演'}</span>
                    <span className={styles.jobType}>CV</span>
                  </p>
                </div>
                <Link to={getSubjectLink(subject.id)} className={styles.subjectCoverLink}>
                  {subject.images?.grid && (
                    <img className={styles.subjectCover} src={subject.images.grid} alt='' />
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
    <ul className={styles.workList}>
      {works.map(({ subject, positions }) => (
        <li key={subject.id}>
          <Link to={getSubjectLink(subject.id)} className={styles.workCoverLink}>
            {subject.images?.grid && <img src={subject.images.grid} alt='' />}
          </Link>
          <div className={styles.workInfo}>
            <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
            {subject.nameCN && <small>{subject.nameCN}</small>}
            <p>
              {positions.map((position) => (
                <span key={position.type.id} className={styles.jobBadge}>
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
    <ul className={styles.relationGrid}>
      {relations.map(({ person, relation, ended }) => (
        <li key={`${person.id}-${relation.id}`}>
          <p>
            {ended && <span className={styles.jobType}>已结束</span>}
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
    <ul className={styles.commentList}>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.user?.avatar.small && (
            <img src={comment.user.avatar.small} alt='' className={styles.commentAvatar} />
          )}
          <div>
            <p className={styles.commentMeta}>
              {comment.user ? (
                <Link to={getUserProfileLink(comment.user.username)}>{comment.user.nickname}</Link>
              ) : (
                '匿名用户'
              )}{' '}
              <span>{dayjs.unix(comment.createdAt).format('YYYY-M-D HH:mm')}</span>
            </p>
            <p className={styles.commentContent}>{comment.content}</p>
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
      {career && <h2 className={styles.career}>职业: {career}</h2>}
      {data.person.summary && <p className={styles.summary}>{data.person.summary}</p>}

      <section className={styles.section}>
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

      <section className={styles.section}>
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
        <section className={styles.section}>
          <SectionHeader title='关联人物' />
          <RelationGrid relations={data.relations} />
        </section>
      )}

      <section className={styles.section}>
        <SectionHeader title='吐槽箱' />
        <CommentList comments={data.comments} />
      </section>
    </PersonLayout>
  );
}
