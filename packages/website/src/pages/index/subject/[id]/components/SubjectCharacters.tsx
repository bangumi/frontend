import React from 'react';

import type { Subject, SubjectCharacter } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getCharacterLink, getPersonLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { CAST_TYPE_DESC } from './subject-common';
import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

const characterGroups = css({ minWidth: '0' });

const groupTitle = css({
  margin: '0',
  padding: '5px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px solid #e8e3e3',
  color: '#595555',
  fontSize: '13px',
  fontWeight: 'normal',
  lineHeight: '18px',
});

const characterList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const characterItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px',
  borderBottom: '1px dotted #e8e3e3',
});

const avatarLink = css({ flexShrink: '0' });

const avatar = css({
  display: 'block',
  width: '60px',
  height: '60px',
  borderRadius: '4px',
  aspectRatio: '1',
  objectFit: 'cover',
});

const avatarFallback = css({
  display: 'flex',
  width: '60px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  background: '#e8e3e3',
  color: '#9f9b9b',
  fontSize: '20px',
});

const characterInfo = css({ minWidth: '0' });

const name = css({
  display: 'block',
  marginBottom: '4px',
  color: '#595555',
  fontSize: '14px',
  fontWeight: 'bold',
  overflowWrap: 'anywhere',
});

const info = css({
  overflow: 'hidden',
  margin: '0 0 4px',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '1.6',
  overflowWrap: 'anywhere',
});

const castsText = css({
  margin: '0',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '1.6',
  overflowWrap: 'anywhere',
});

const castLabel = css({ color: '#9f9b9b' });

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

/** 角色出场类型分组标题，对齐旧站 subject_character 分组 */
const CHARACTER_TYPE_DESC: Record<number, string> = {
  1: '角色',
  2: '配角',
  3: '客串',
};

type CharacterGroup = {
  type: number;
  label: string;
  items: SubjectCharacter[];
};

/** 按出场类型分组，组内按 order 排序；分组顺序固定为主角、配角、客串 */
function groupCharacters(characters: SubjectCharacter[]): CharacterGroup[] {
  const grouped = new Map<number, SubjectCharacter[]>();

  for (const item of characters) {
    const list = grouped.get(item.type) ?? [];
    list.push(item);
    grouped.set(item.type, list);
  }

  return [1, 2, 3]
    .filter((type) => grouped.has(type))
    .map((type) => ({
      type,
      label: CHARACTER_TYPE_DESC[type] ?? `类型 ${type}`,
      items: [...(grouped.get(type) ?? [])].sort((a, b) => a.order - b.order),
    }));
}

function characterTitle(character: SubjectCharacter['character']): string {
  return character.nameCN || character.name;
}

export default function SubjectCharacters({
  subject,
  characters,
}: {
  subject: Subject;
  characters: SubjectCharacter[];
}) {
  const groups = groupCharacters(characters);

  return (
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={characterGroups}>
            {groups.length === 0 && <p className={empty}>暂无角色</p>}
            {groups.map((group) => (
              <section key={group.type} aria-labelledby={`character-group-${group.type}-heading`}>
                <h2 id={`character-group-${group.type}-heading`} className={groupTitle}>
                  {group.label}
                </h2>
                <ul className={characterList}>
                  {group.items.map(({ character, casts }) => (
                    <li key={character.id} className={characterItem}>
                      <Link
                        to={getCharacterLink(character.id)}
                        className={avatarLink}
                        title={characterTitle(character)}
                      >
                        {character.images?.grid ? (
                          <img
                            src={character.images.grid}
                            className={avatar}
                            loading='lazy'
                            alt=''
                          />
                        ) : (
                          <span className={avatarFallback}>
                            {characterTitle(character).slice(0, 1)}
                          </span>
                        )}
                      </Link>
                      <div className={characterInfo}>
                        <Link
                          to={getCharacterLink(character.id)}
                          className={name}
                          title={characterTitle(character)}
                        >
                          {characterTitle(character)}
                        </Link>
                        {character.info !== '' && (
                          <p
                            className={info}
                            style={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                            }}
                          >
                            {character.info}
                          </p>
                        )}
                        {casts.length > 0 && (
                          <p className={castsText}>
                            {casts.map((cast, index) => (
                              <React.Fragment key={cast.person.id}>
                                {index > 0 && ' / '}
                                <span className={castLabel}>
                                  {CAST_TYPE_DESC[cast.relation] ?? '出演'}:
                                </span>{' '}
                                <Link to={getPersonLink(cast.person.id)}>{cast.person.name}</Link>
                              </React.Fragment>
                            ))}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <SubjectSummaryCard subject={subject} />
        </div>
      </PageContainer>
    </>
  );
}
