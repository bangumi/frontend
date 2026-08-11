import React from 'react';

import type { Subject, SubjectCharacter } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getCharacterLink, getPersonLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { CAST_TYPE_DESC } from './subject-common';
import styles from './SubjectCharacters.module.less';
import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

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
    <PageContainer as='main'>
      <SubjectHeader subject={subject} />
      <div className={styles.columns}>
        <div className={styles.characterGroups}>
          {groups.length === 0 && <p className={styles.empty}>暂无角色</p>}
          {groups.map((group) => (
            <section key={group.type} aria-labelledby={`character-group-${group.type}-heading`}>
              <h2 id={`character-group-${group.type}-heading`} className={styles.groupTitle}>
                {group.label}
              </h2>
              <ul className={styles.characterList}>
                {group.items.map(({ character, casts }) => (
                  <li key={character.id} className={styles.characterItem}>
                    <Link
                      to={getCharacterLink(character.id)}
                      className={styles.avatarLink}
                      title={characterTitle(character)}
                    >
                      {character.images?.grid ? (
                        <img
                          src={character.images.grid}
                          className={styles.avatar}
                          loading='lazy'
                          alt=''
                        />
                      ) : (
                        <span className={styles.avatarFallback}>
                          {characterTitle(character).slice(0, 1)}
                        </span>
                      )}
                    </Link>
                    <div className={styles.characterInfo}>
                      <Link
                        to={getCharacterLink(character.id)}
                        className={styles.name}
                        title={characterTitle(character)}
                      >
                        {characterTitle(character)}
                      </Link>
                      {character.info !== '' && <p className={styles.info}>{character.info}</p>}
                      {casts.length > 0 && (
                        <p className={styles.casts}>
                          {casts.map((cast, index) => (
                            <React.Fragment key={cast.person.id}>
                              {index > 0 && ' / '}
                              <span className={styles.castLabel}>
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
  );
}
