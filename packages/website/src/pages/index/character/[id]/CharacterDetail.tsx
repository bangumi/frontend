import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import type {
  Character,
  CharacterRelation,
  CharacterSubject,
  Infobox,
  MonoPhoto,
  PersonCollect,
  SlimIndex,
} from '@bangumi/client/client';
import { Avatar, RichContent, toast, Typography } from '@bangumi/design';
import {
  getCharacterLink,
  getIndexLink,
  getPersonLink,
  getSubjectLink,
  getUserProfileLink,
} from '@bangumi/utils/pages';
import { makeDescriptiveTime } from '@bangumi/website/components/TimelineDescription';
import type {
  CharacterComment,
  CharacterHomeResponse,
} from '@bangumi/website/hooks/use-character-home';
import { useCharacterHome } from '@bangumi/website/hooks/use-character-home';
import { useUser } from '@bangumi/website/hooks/use-user';

import styles from './CharacterDetail.module.less';

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
  const tabs = [
    { label: '概览', to: baseLink, end: true },
    { label: '相册', to: `${baseLink}/album`, end: false },
    { label: '收藏', to: `${baseLink}/collections`, end: false },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h1 className={styles.name}>
          <Link to={baseLink} title={character.nameCN}>
            {character.name}
          </Link>
          {character.nameCN !== '' && <small>{character.nameCN}</small>}
        </h1>
      </div>
      <nav className={styles.tabs} aria-label='角色导航'>
        <div className={styles.tabsInner}>
          <ul className={styles.tabList}>
            {tabs.map((tab) => (
              <li key={tab.to}>
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
            {user && (
              <li className={styles.collectAction}>
                <button type='button' disabled={sending} onClick={() => void toggleCollection()}>
                  {collected ? '取消收藏' : '加入收藏'}
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function CharacterInfobox({ character }: { character: Character }) {
  const visibleInfo = character.infobox
    .map((item) => ({ ...item, values: item.values.filter((value) => value.v !== '') }))
    .filter((item) => item.values.length > 0);

  return (
    <section className={styles.infobox}>
      {character.images && (
        <div className={styles.portraitWrapper}>
          <a
            href={character.images.large}
            target='_blank'
            rel='noopener noreferrer'
            title={character.name}
          >
            <img className={styles.portrait} src={character.images.large} alt={character.name} />
          </a>
        </div>
      )}
      <InfoboxList infobox={visibleInfo} />
    </section>
  );
}

function InfoboxList({ infobox }: { infobox: Infobox }) {
  return (
    <ul className={styles.infoList}>
      {infobox.map((item) => (
        <li key={item.key}>
          <span className={styles.infoKey}>{item.key}: </span>
          {item.values.map((value, index) => (
            <span key={`${value.k ?? ''}-${value.v}`}>
              {value.k && <span className={styles.infoSubKey}>{value.k}: </span>}
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
    <section className={styles.sidePanel}>
      <h2>推荐本角色的目录</h2>
      <ul className={styles.indexList}>
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
      {total > indexes.length && <span className={styles.sideMeta}>共 {total} 个目录</span>}
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
    <section className={`${styles.sidePanel} ${styles.collectorsPanel}`}>
      <h2>谁收藏了{character.name}?</h2>
      <ul className={styles.collectorList}>
        {collects.map(({ user, createdAt }) => (
          <li key={user.id}>
            <Link to={getUserProfileLink(user.username)} noStyle className={styles.avatarLink}>
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
    <h2 className={styles.sectionTitle}>
      {children}
      {count != null && <small> · {count}</small>}
    </h2>
  );
}

function PhotosSection({ photos, total }: { photos: MonoPhoto[]; total: number }) {
  if (photos.length === 0) return null;

  return (
    <section className={styles.contentSection}>
      <SectionTitle count={total}>相册</SectionTitle>
      <ul className={styles.photoList}>
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
    <section className={styles.contentSection}>
      <SectionTitle>出演</SectionTitle>
      <ul className={styles.castList}>
        {casts.map(({ subject, casts: people }) => (
          <li key={subject.id}>
            <div className={styles.castSubject}>
              {subject.images && (
                <Link to={getSubjectLink(subject.id)} noStyle className={styles.castCoverLink}>
                  <img src={subject.images.grid} alt='' loading='lazy' />
                </Link>
              )}
              <div className={styles.castSubjectInfo}>
                <Link to={getSubjectLink(subject.id)}>{subject.name}</Link>
                {subject.nameCN && <small>{subject.nameCN}</small>}
                <span className={styles.badge}>主角</span>
              </div>
            </div>
            <ul className={styles.castPeople}>
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
    <section className={styles.contentSection}>
      <SectionTitle>关联角色</SectionTitle>
      <ul className={styles.relationList}>
        {relations.map(({ character, relation, ended }) => (
          <li key={character.id}>
            <small>
              {ended && <span className={styles.badge}>已结束</span>}
              {relation.cn}
            </small>
            <Link to={getCharacterLink(character.id)} noStyle>
              {character.images ? (
                <img src={character.images.grid} alt='' loading='lazy' />
              ) : (
                <span className={styles.imagePlaceholder} />
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
    <section className={styles.commentsSection}>
      <SectionTitle>吐槽箱</SectionTitle>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} id={`post_${comment.id}`}>
            {comment.user && (
              <Link
                to={getUserProfileLink(comment.user.username)}
                noStyle
                className={styles.commentAvatar}
              >
                <Avatar src={comment.user.avatar.small} size='small' alt='' />
              </Link>
            )}
            <div className={styles.commentBody}>
              <div className={styles.commentHeader}>
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
              <RichContent bbcode={comment.content} classname={styles.commentContent} />
              {comment.replies.length > 0 && (
                <ul className={styles.replyList}>
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>
                      <strong>{reply.user?.nickname ?? '已注销用户'}</strong>
                      <RichContent bbcode={reply.content} classname={styles.replyContent} />
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
      <main className={styles.page}>
        <aside className={styles.sidebar}>
          <CharacterInfobox character={character} />
          <IndexPanel indexes={data.indexes} total={data.indexTotal} />
          <CollectorsPanel
            character={character}
            collects={data.collects}
            total={data.collectTotal}
          />
        </aside>
        <div className={styles.content}>
          {character.summary && <div className={styles.summary}>{character.summary}</div>}
          <PhotosSection photos={data.photos} total={data.photoTotal} />
          <CastsSection casts={data.casts} />
          <RelationsSection relations={data.relations} />
          <CommentsSection comments={data.comments} />
        </div>
      </main>
    </>
  );
}
