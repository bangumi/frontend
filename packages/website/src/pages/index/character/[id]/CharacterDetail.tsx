import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import type {
  Character,
  CharacterRelation,
  CharacterSubject,
  Infobox,
  MonoPhoto,
  PersonCollect,
  SlimIndex,
} from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';
import { Avatar, RichContent, toast, Typography } from '@bangumi/design/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';
import {
  getCharacterLink,
  getIndexLink,
  getPersonLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages.ts';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { makeDescriptiveTime } from '@bangumi/website/components/TimelineDescription.tsx';
import type {
  CharacterComment,
  CharacterHomeResponse,
} from '@bangumi/website/hooks/use-character-home.ts';
import { useCharacterHome } from '@bangumi/website/hooks/use-character-home.ts';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';

const page = css({
  display: 'grid',
  gridTemplateColumns: '250px minmax(0, 1fr)',
  alignItems: 'flex-start',
  gap: '20px',
  padding: '10px 15px 24px',
  '@media (max-width: 640px)': {
    display: 'block',
  },
});

const headerInner = css({
  paddingRight: '15px',
  paddingLeft: '15px',
});

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
  '& small': {
    marginLeft: '8px',
    color: '#9f9b9b',
    fontSize: '12px',
    fontWeight: 'normal',
  },
  '@media (max-width: 640px)': {
    margin: '10px 0',
  },
});

const tabsBar = css({
  borderTop: '1px solid #fefefe',
  borderBottom: '1px solid #e8e3e3',
  background: '#fbfbfb',
});

const tabsInner = css({
  paddingRight: '15px',
  paddingLeft: '15px',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const tabList = css({
  display: 'flex',
  width: '100%',
  minWidth: 'max-content',
  margin: '0',
  padding: '0',
  gap: '5px',
  listStyle: 'none',
});

const tabLink = css({
  display: 'block',
  padding: '10px 10px 9px',
  borderBottom: '2px solid transparent',
  color: '#888',
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

const collectAction = css({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  padding: '0 10px',
  '& button': {
    padding: '3px 8px',
    border: '1px solid #facdd0',
    borderRadius: '3px',
    background: '#fff6f7',
    color: '#f09199',
    fontSize: '12px',
    _disabled: {
      cursor: 'wait',
      opacity: '0.6',
    },
  },
});

const sidebar = css({
  minWidth: '0',
  marginTop: '10px',
});

const content = css({
  minWidth: '0',
  marginTop: '10px',
  '@media (max-width: 640px)': {
    marginTop: '0',
  },
});

const infobox = css({
  margin: '0 0 15px',
  overflowWrap: 'anywhere',
});

const portraitWrapper = css({
  marginBottom: '12px',
  textAlign: 'center',
});

const portrait = css({
  display: 'block',
  width: '240px',
  maxWidth: '100%',
  height: 'auto',
  aspectRatio: 'auto 3 / 4',
  margin: '0 auto',
  boxSizing: 'border-box',
  border: '1px solid #a9a9ab',
  borderTopColor: '#c7c7c9',
  borderBottomColor: '#858486',
  background: '#f4f2f2',
  color: 'transparent',
  boxShadow: '0 1px 5px #aaa',
  objectFit: 'contain',
  '@media (max-width: 640px)': {
    width: 'min(240px, 72vw)',
  },
});

const infoList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  fontSize: '13px',
  lineHeight: '1.55',
  '& li': {
    padding: '5px',
    borderBottom: '1px solid #e8e3e3',
  },
});

const infoKey = css({ color: '#9f9b9b' });

const infoSubKey = css({
  color: '#9f9b9b',
  fontSize: '12px',
});

const sidePanel = css({
  marginBottom: '20px',
  fontSize: '12px',
  '& > h2': {
    margin: '0 0 5px',
    padding: '5px 0',
    borderBottom: '1px solid #e8e3e3',
    color: '#595555',
    fontSize: '14px',
    fontWeight: 'normal',
  },
  '@media (max-width: 640px)': {
    marginBottom: '10px',
  },
});

const indexList = css({
  listStyle: 'none',
  margin: '0 5px 5px',
  padding: '0',
  '& li': {
    padding: '5px 0',
    overflow: 'hidden',
    borderBottom: '1px solid #e8e3e3',
    '& > a': {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  '& small': {
    display: 'block',
    marginTop: '2px',
    color: '#9f9b9b',
  },
});

const sideMeta = css({
  display: 'block',
  margin: '5px',
  color: '#9f9b9b',
});

const collectorsPanel = css({
  '@media (max-width: 640px)': {
    display: 'none',
  },
});

const collectorList = css({
  listStyle: 'none',
  margin: '0 5px 5px',
  padding: '0',
  '& > li': {
    display: 'flex',
    minHeight: '32px',
    gap: '8px',
    padding: '5px 0',
    overflow: 'hidden',
    borderBottom: '1px solid #e8e3e3',
    '& > div': {
      minWidth: '0',
      paddingTop: '1px',
    },
  },
  '& small': {
    display: 'block',
    marginTop: '3px',
    color: '#9f9b9b',
  },
});

const avatarLink = css({ flex: '0 0 32px' });

const summary = css({
  padding: '10px 0 15px',
  borderBottom: '1px solid #e8e3e3',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.8',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  '@media (max-width: 640px)': {
    padding: '0 5px 10px',
  },
});

const contentSection = css({
  padding: '13px 0 15px',
  borderBottom: '1px solid #e8e3e3',
});

const sectionTitle = css({
  margin: '0 0 10px',
  padding: '0 5px 0 0',
  color: '#595555',
  fontSize: '18px',
  fontWeight: '300',
  lineHeight: '1.4',
  '& small': {
    color: '#9f9b9b',
    fontSize: '11px',
    fontWeight: 'normal',
  },
});

const photoList = css({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '9px',
  margin: '0',
  padding: '0',
  '& img': {
    display: 'block',
    width: '80px',
    height: '80px',
    borderRadius: '3px',
    objectFit: 'cover',
  },
});

const castList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 330px) minmax(0, 350px)',
    justifyContent: 'space-between',
    padding: '7px 5px',
    borderBottom: '1px solid #e8e3e3',
    _even: {
      borderTop: '1px solid #fff',
      background: '#f8f8f8',
    },
    '&:last-child': {
      borderBottom: '0',
    },
  },
  '@media (max-width: 640px)': {
    '& > li': {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(120px, 1fr)',
      gap: '8px',
    },
  },
});

const castSubject = css({
  display: 'flex',
  minWidth: '0',
  gap: '12px',
});

const castCoverLink = css({
  flex: '0 0 48px',
  width: '48px',
  height: '48px',
  '& img': {
    display: 'block',
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
});

const castSubjectInfo = css({
  minWidth: '0',
  '& > a': {
    display: 'block',
    marginBottom: '3px',
    overflow: 'hidden',
    fontSize: '13px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& > small': {
    display: 'block',
    marginBottom: '4px',
    overflow: 'hidden',
    color: '#9f9b9b',
    fontSize: '11px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const badge = css({
  display: 'inline-block',
  marginRight: '4px',
  padding: '2px 5px',
  borderRadius: '3px',
  background: '#e8e3e3',
  color: '#595555',
  fontSize: '10px',
  lineHeight: '1',
});

const castPeople = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    padding: '5px 0',
    borderBottom: '1px dotted #ddd',
    textAlign: 'right',
    '&:last-child': {
      borderBottom: '0',
    },
    '& img': {
      display: 'block',
      width: '32px',
      height: '32px',
      borderRadius: '4px',
      objectFit: 'cover',
    },
    '& > div': {
      order: '-1',
      minWidth: '0',
    },
    '& a, & small': {
      display: 'block',
    },
    '& a': {
      overflow: 'hidden',
      fontSize: '12px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& small': {
      marginTop: '3px',
      color: '#9f9b9b',
      fontSize: '10px',
    },
  },
});

const relationList = css({
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 80px)',
  gap: '9px',
  margin: '0',
  padding: '0',
  '& > li': {
    minWidth: '0',
    fontSize: '12px',
    '& > small': {
      display: 'block',
      height: '18px',
      overflow: 'hidden',
      color: '#9f9b9b',
      fontSize: '10px',
      lineHeight: '18px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& > a:last-child': {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  '& img': {
    display: 'block',
    width: '75px',
    height: '75px',
    marginBottom: '5px',
    borderRadius: '8px',
    background: '#e8e3e3',
    objectFit: 'cover',
    objectPosition: 'center top',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
  },
});

const imagePlaceholder = css({
  display: 'block',
  width: '75px',
  height: '75px',
  marginBottom: '5px',
  borderRadius: '8px',
  background: '#e8e3e3',
  objectFit: 'cover',
  objectPosition: 'center top',
});

const commentsSection = css({ paddingTop: '15px' });

const commentList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  '& > li': {
    display: 'flex',
    gap: '10px',
    padding: '10px 5px',
    borderBottom: '1px solid #e8e3e3',
  },
  '@media (max-width: 640px)': {
    '& > li': {
      paddingRight: '0',
      paddingLeft: '0',
    },
  },
});

const commentAvatar = css({ flex: '0 0 32px' });

const commentBody = css({
  minWidth: '0',
  flex: '1',
});

const commentHeader = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '12px',
  fontSize: '12px',
  '& time': {
    flex: 'none',
    color: '#9f9b9b',
    fontSize: '10px',
  },
  '@media (max-width: 640px)': {
    display: 'block',
    '& time': {
      display: 'block',
      marginTop: '2px',
    },
  },
});

const commentContent = css({
  marginTop: '5px',
  color: '#1f1c1c',
  fontSize: '13px',
  lineHeight: '1.6',
  overflowWrap: 'anywhere',
  '& p': {
    margin: '0',
  },
});

const replyList = css({
  listStyle: 'none',
  margin: '8px 0 0',
  padding: '6px 10px',
  borderRadius: '3px',
  background: '#f7f7f7',
  '& li + li': {
    marginTop: '7px',
    paddingTop: '7px',
    borderTop: '1px solid #e8e3e3',
  },
  '& strong': {
    color: '#595555',
    fontSize: '11px',
    fontWeight: 'normal',
  },
});

const replyContent = css({
  display: 'inline',
  marginTop: '5px',
  marginLeft: '6px',
  color: '#1f1c1c',
  fontSize: '12px',
  lineHeight: '1.6',
  overflowWrap: 'anywhere',
  '& p': {
    margin: '0',
  },
});

const { Link } = Typography;
function CharacterHeader({ character }: { character: Character }) {
  const { user } = useUser();
  const { mutate } = useCharacterHome(character.id);
  const [sending, setSending] = useState(false);
  const collected = character.collectedAt != null;

  const toggleCollection = async () => {
    setSending(true);
    try {
      if (collected) {
        await ok(ozaClient.deleteCharacterCollection(character.id));
      } else {
        await ok(ozaClient.addCharacterCollection(character.id));
      }
      await mutate();
    } catch (error) {
      toast(error instanceof Error ? error.message : '操作失败，请稍后再试', { type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const baseLink = getCharacterLink(character.id);
  const tabs = [{ label: '概览', to: baseLink, end: true }];

  return (
    <header>
      <PageContainer gutterOnly className={headerInner}>
        <h1 className={name}>
          <Link to={baseLink} title={character.nameCN}>
            {character.name}
          </Link>
          {character.nameCN !== '' && <small>{character.nameCN}</small>}
        </h1>
      </PageContainer>
      <nav className={tabsBar} aria-label='角色导航'>
        <PageContainer gutterOnly className={tabsInner}>
          <ul className={tabList}>
            {tabs.map((tab) => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  end={tab.end}
                  className={({ isActive }) => cx(tabLink, isActive && tabLinkActive)}
                >
                  {tab.label}
                </NavLink>
              </li>
            ))}
            {user && (
              <li className={collectAction}>
                <button type='button' disabled={sending} onClick={() => void toggleCollection()}>
                  {collected ? '取消收藏' : '加入收藏'}
                </button>
              </li>
            )}
          </ul>
        </PageContainer>
      </nav>
    </header>
  );
}

function CharacterInfobox({ character }: { character: Character }) {
  const visibleInfo = character.infobox
    .map((item) => ({ ...item, values: item.values.filter((value) => value.v !== '') }))
    .filter((item) => item.values.length > 0);

  return (
    <section className={infobox}>
      {character.images && (
        <div className={portraitWrapper}>
          <a
            href={character.images.large}
            target='_blank'
            rel='noopener noreferrer'
            title={character.name}
          >
            <img className={portrait} src={character.images.large} alt={character.name} />
          </a>
        </div>
      )}
      <InfoboxList infobox={visibleInfo} />
    </section>
  );
}

function InfoboxList({ infobox }: { infobox: Infobox }) {
  return (
    <ul className={infoList}>
      {infobox.map((item) => (
        <li key={item.key}>
          <span className={infoKey}>{item.key}: </span>
          {item.values.map((value, index) => (
            <span key={`${value.k ?? ''}-${value.v}`}>
              {value.k && <span className={infoSubKey}>{value.k}: </span>}
              {value.v}
              {index < item.values.length - 1 && <br />}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

function IndexPanel({ indexes, total }: { indexes: SlimIndex[]; total: number }) {
  if (indexes.length === 0) return null;

  return (
    <section className={sidePanel}>
      <h2>推荐本角色的目录</h2>
      <ul className={indexList}>
        {indexes.map((index) => (
          <li key={index.id}>
            <Link to={getIndexLink(index.id)} title={index.title}>
              {index.title}
            </Link>
            {index.user && (
              <small>
                by <Link to={getUserProfileLink(index.user.username)}>{index.user.nickname}</Link>
              </small>
            )}
          </li>
        ))}
      </ul>
      {total > indexes.length && <span className={sideMeta}>共 {total} 个目录</span>}
    </section>
  );
}

function CollectorsPanel({
  character,
  collects,
  total,
}: {
  character: Character;
  collects: PersonCollect[];
  total: number;
}) {
  if (collects.length === 0) return null;

  return (
    <section className={cx(sidePanel, collectorsPanel)}>
      <h2>谁收藏了{character.name}?</h2>
      <ul className={collectorList}>
        {collects.map(({ user, createdAt }) => (
          <li key={user.id}>
            <Link to={getUserProfileLink(user.username)} noStyle className={avatarLink}>
              <Avatar src={user.avatar.small} size='small' alt='' />
            </Link>
            <div>
              <Link to={getUserProfileLink(user.username)}>{user.nickname}</Link>
              <small title={dayjs.unix(createdAt).format('YYYY-MM-DD HH:mm')}>
                {makeDescriptiveTime(createdAt)}
              </small>
            </div>
          </li>
        ))}
      </ul>
      <Link to={`${getCharacterLink(character.id)}/collections`}>全部 {total} 位收藏会员 »</Link>
    </section>
  );
}

function SectionTitle({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <h2 className={sectionTitle}>
      {children}
      {count != null && <small> · {count}</small>}
    </h2>
  );
}

function PhotosSection({ photos, total }: { photos: MonoPhoto[]; total: number }) {
  if (photos.length === 0) return null;

  return (
    <section className={contentSection}>
      <SectionTitle count={total}>相册</SectionTitle>
      <ul className={photoList}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <a href={photo.images.large} target='_blank' rel='noopener noreferrer'>
              <img src={photo.images.grid} alt={photo.title} loading='lazy' />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CastsSection({ casts }: { casts: CharacterSubject[] }) {
  if (casts.length === 0) return null;

  return (
    <section className={contentSection}>
      <SectionTitle>出演</SectionTitle>
      <ul className={castList}>
        {casts.map(({ subject, casts: people }) => (
          <li key={subject.id}>
            <div className={castSubject}>
              {subject.images && (
                <Link to={getSubjectLink(subject.id)} noStyle className={castCoverLink}>
                  <img src={subject.images.grid} alt='' loading='lazy' />
                </Link>
              )}
              <div className={castSubjectInfo}>
                <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
                {subject.nameCN && <small>{subject.nameCN}</small>}
                <span className={badge}>主角</span>
              </div>
            </div>
            <ul className={castPeople}>
              {people.map(({ person, relation }) => (
                <li key={`${person.id}-${relation}`}>
                  {person.images && (
                    <Link to={getPersonLink(person.id)} noStyle>
                      <img src={person.images.grid} alt='' loading='lazy' />
                    </Link>
                  )}
                  <div>
                    <Link to={getPersonLink(person.id)}>{person.name}</Link>
                    <small>{relation === 0 ? 'CV' : '出演'}</small>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelationsSection({ relations }: { relations: CharacterRelation[] }) {
  if (relations.length === 0) return null;

  return (
    <section className={contentSection}>
      <SectionTitle>关联角色</SectionTitle>
      <ul className={relationList}>
        {relations.map(({ character, relation, ended }) => (
          <li key={character.id}>
            <small>
              {ended && <span className={badge}>已结束</span>}
              {relation.cn}
            </small>
            <Link to={getCharacterLink(character.id)} noStyle>
              {character.images ? (
                <img src={character.images.grid} alt='' loading='lazy' />
              ) : (
                <span className={imagePlaceholder} />
              )}
            </Link>
            <Link to={getCharacterLink(character.id)}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentsSection({ comments }: { comments: CharacterComment[] }) {
  if (comments.length === 0) return null;

  return (
    <section className={commentsSection}>
      <SectionTitle>吐槽箱</SectionTitle>
      <ul className={commentList}>
        {comments.map((comment) => (
          <li key={comment.id} id={`post_${comment.id}`}>
            {comment.user && (
              <Link
                to={getUserProfileLink(comment.user.username)}
                noStyle
                className={commentAvatar}
              >
                <Avatar src={comment.user.avatar.small} size='small' alt='' />
              </Link>
            )}
            <div className={commentBody}>
              <div className={commentHeader}>
                {comment.user ? (
                  <Link to={getUserProfileLink(comment.user.username)}>
                    {comment.user.nickname}
                  </Link>
                ) : (
                  <span>已注销用户</span>
                )}
                <time dateTime={dayjs.unix(comment.createdAt).toISOString()}>
                  {dayjs.unix(comment.createdAt).format('YYYY-M-D HH:mm')}
                </time>
              </div>
              <RichContent
                bbcode={comment.content}
                preset='characterComment'
                classname={commentContent}
              />
              {comment.replies.length > 0 && (
                <ul className={replyList}>
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>
                      <strong>{reply.user?.nickname ?? '已注销用户'}</strong>
                      <RichContent
                        bbcode={reply.content}
                        preset='characterComment'
                        classname={replyContent}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CharacterDetail({ data }: { data: CharacterHomeResponse }) {
  const { character } = data;

  return (
    <>
      <CharacterHeader character={character} />
      <PageContainer as='main' className={page}>
        <aside className={sidebar}>
          <CharacterInfobox character={character} />
          <IndexPanel indexes={data.indexes} total={data.indexTotal} />
          <CollectorsPanel
            character={character}
            collects={data.collects}
            total={data.collectTotal}
          />
        </aside>
        <div className={content}>
          {character.summary && <div className={summary}>{character.summary}</div>}
          <PhotosSection photos={data.photos} total={data.photoTotal} />
          <CastsSection casts={data.casts} />
          <RelationsSection relations={data.relations} />
          <CommentsSection comments={data.comments} />
        </div>
      </PageContainer>
    </>
  );
}
