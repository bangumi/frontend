import React from 'react';

import type { SlimPerson, Subject, SubjectStaff } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getPersonLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  smDown: { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const personGroups = css({ minWidth: '0' });

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

const personList = css({ margin: '0', padding: '0', listStyle: 'none' });

const personItem = css({
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

const personInfo = css({ minWidth: '0' });

const name = css({
  display: 'block',
  marginBottom: '4px',
  color: '#595555',
  fontSize: '14px',
  fontWeight: 'bold',
  overflowWrap: 'anywhere',
});

const info = css({
  margin: '0',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '1.6',
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

type PositionGroup = {
  key: string;
  label: string;
  items: { staff: SlimPerson; summary: string; appearEps: string }[];
};

/** 按职位分组（group=position 视图）：将「人员 -> 职位列表」转置为「职位 -> 人员列表」，职位顺序保持 API 首次出现顺序 */
function groupByPosition(staffs: SubjectStaff[]): PositionGroup[] {
  const groups = new Map<string, PositionGroup>();

  for (const { staff, positions } of staffs) {
    for (const position of positions) {
      const label =
        position.type.cn || position.type.jp || position.type.en || `职位 ${position.type.id}`;
      const key = `position-${position.type.id}`;
      const group = groups.get(key) ?? { key, label, items: [] };
      group.items.push({ staff, summary: position.summary, appearEps: position.appearEps });
      groups.set(key, group);
    }
  }

  return [...groups.values()];
}

function personTitle(staff: SlimPerson): string {
  return staff.nameCN || staff.name;
}

export default function SubjectPersons({
  subject,
  staffs,
}: {
  subject: Subject;
  staffs: SubjectStaff[];
}) {
  const groups = groupByPosition(staffs);

  return (
    <PageContainer as='main'>
      <SubjectHeader subject={subject} />
      <div className={columns}>
        <div className={personGroups}>
          {groups.length === 0 && <p className={empty}>暂无制作人员</p>}
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`${group.key}-heading`}>
              <h2 id={`${group.key}-heading`} className={groupTitle}>
                {group.label}
              </h2>
              <ul className={personList}>
                {group.items.map(({ staff, summary, appearEps }) => (
                  <li key={staff.id} className={personItem}>
                    <Link
                      to={getPersonLink(staff.id)}
                      className={avatarLink}
                      title={personTitle(staff)}
                    >
                      {staff.images?.grid ? (
                        <img src={staff.images.grid} className={avatar} loading='lazy' alt='' />
                      ) : (
                        <span className={avatarFallback}>{personTitle(staff).slice(0, 1)}</span>
                      )}
                    </Link>
                    <div className={personInfo}>
                      <Link
                        to={getPersonLink(staff.id)}
                        className={name}
                        title={personTitle(staff)}
                      >
                        {staff.name}
                      </Link>
                      {(summary !== '' || appearEps !== '') && (
                        <p className={info}>
                          {[summary, appearEps].filter((text) => text !== '').join(' / ')}
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
