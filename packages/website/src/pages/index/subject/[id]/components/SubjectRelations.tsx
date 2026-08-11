import React from 'react';

import type { SlimSubject, Subject, SubjectRelation } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getSubjectLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { SubjectHeader } from './SubjectDetail';
import styles from './SubjectRelations.module.less';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

type RelationGroup = {
  key: string;
  label: string;
  items: SubjectRelation[];
};

/** 按关系类型分组，组内按 order 排序，保持 API 返回的分组顺序 */
function groupRelations(relations: SubjectRelation[]): RelationGroup[] {
  const grouped = new Map<number, SubjectRelation[]>();

  for (const relation of relations) {
    const list = grouped.get(relation.relation.id) ?? [];
    list.push(relation);
    grouped.set(relation.relation.id, list);
  }

  return [...grouped.entries()].map(([relationId, list]) => {
    // grouped 构造时每组至少 push 了一条，list 不会为空
    const first = list[0]!;
    return {
      key: `relation-${relationId}`,
      label: first.relation.cn || first.relation.en || first.relation.jp,
      items: [...list].sort((a, b) => a.order - b.order),
    };
  });
}

function relationTitle(subject: SlimSubject): string {
  return subject.nameCN || subject.name;
}

export default function SubjectRelations({
  subject,
  relations,
}: {
  subject: Subject;
  relations: SubjectRelation[];
}) {
  const groups = groupRelations(relations);

  return (
    <PageContainer as='main'>
      <SubjectHeader subject={subject} />
      <div className={styles.columns}>
        <div className={styles.relationGroups}>
          {groups.length === 0 && <p className={styles.empty}>暂无关联条目</p>}
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`${group.key}-heading`}>
              <h2 id={`${group.key}-heading`} className={styles.groupTitle}>
                {group.label}
              </h2>
              <ul className={styles.relationList}>
                {group.items.map(({ subject: related }) => (
                  <li key={related.id} className={styles.relationItem}>
                    <Link
                      to={getSubjectLink(related.id)}
                      className={styles.coverLink}
                      title={relationTitle(related)}
                    >
                      {related.images?.grid ? (
                        <img
                          src={related.images.grid}
                          className={styles.cover}
                          loading='lazy'
                          alt=''
                        />
                      ) : (
                        <span className={styles.coverFallback}>
                          {relationTitle(related).slice(0, 1)}
                        </span>
                      )}
                    </Link>
                    <p className={styles.coverTitle}>
                      <Link to={getSubjectLink(related.id)} title={relationTitle(related)}>
                        {relationTitle(related)}
                      </Link>
                    </p>
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
