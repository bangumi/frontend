import React from 'react';

import type { SlimSubject, Subject, SubjectRelation } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  '@media (max-width: 768px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const relationGroups = css({ minWidth: '0' });

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

const relationList = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: '10px',
  margin: '10px 0 0',
  padding: '0',
  listStyle: 'none',
});

const relationItem = css({
  width: '80px',
  minWidth: '0',
  textAlign: 'left',
});

const coverLink = css({ display: 'block' });

const cover = css({
  display: 'block',
  width: '80px',
  height: '80px',
  borderRadius: '4px',
  aspectRatio: '1',
  objectFit: 'cover',
});

const coverFallback = css({
  display: 'flex',
  width: '80px',
  height: '80px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  background: '#e8e3e3',
  color: '#9f9b9b',
  fontSize: '24px',
});

const coverTitle = css({
  maxHeight: '52px',
  margin: '5px 0 0',
  overflow: 'hidden',
  fontSize: '11px',
  lineHeight: '1.4',
  overflowWrap: 'anywhere',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

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
      <div className={columns}>
        <div className={relationGroups}>
          {groups.length === 0 && <p className={empty}>暂无关联条目</p>}
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`${group.key}-heading`}>
              <h2 id={`${group.key}-heading`} className={groupTitle}>
                {group.label}
              </h2>
              <ul className={relationList}>
                {group.items.map(({ subject: related }) => (
                  <li key={related.id} className={relationItem}>
                    <Link
                      to={getSubjectLink(related.id)}
                      className={coverLink}
                      title={relationTitle(related)}
                    >
                      {related.images?.grid ? (
                        <img src={related.images.grid} className={cover} loading='lazy' alt='' />
                      ) : (
                        <span className={coverFallback}>{relationTitle(related).slice(0, 1)}</span>
                      )}
                    </Link>
                    <p className={coverTitle}>
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
