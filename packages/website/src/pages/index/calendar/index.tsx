import dayjs from 'dayjs';
import React from 'react';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages.ts';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useCalendar } from '@bangumi/website/hooks/use-calendar.ts';

const { Link } = Typography;

const page = css({
  padding: '15px 15px 32px',
});

const pageHeader = css({
  padding: '0 0 12px',
  borderBottom: '1px solid #e8e3e3',
  '& h1': {
    display: 'inline',
    margin: '0',
    color: '#595555',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
  },
});

const headerSmall = css({
  marginLeft: '8px',
  color: '#9f9b9b',
  fontSize: '13px',
  fontWeight: '400',
});

const stats = css({
  margin: '8px 0 0',
  color: '#9f9b9b',
  fontSize: '13px',
  lineHeight: '20px',
});

const dayBlock = css({
  marginTop: '18px',
});

const dayTitle = css({
  margin: '0 0 10px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '22px',
  color: '#595555',
  '& small': {
    marginLeft: '6px',
    color: '#9f9b9b',
    fontSize: '12px',
    fontWeight: '400',
  },
});

const coverGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(118px, 1fr))',
  gap: '12px',
});

const coverCard = css({
  display: 'block',
  overflow: 'hidden',
  borderRadius: '4px',
  background: '#e8e3e3',
});

const coverImage = css({
  display: 'block',
  width: '100%',
  aspectRatio: '3 / 4',
  objectFit: 'cover',
});

/** 条目名（常驻显示在封面下方） */
const coverName = css({
  marginTop: '6px',
  '& p': {
    margin: '0',
    overflow: 'hidden',
    color: '#595555',
    fontSize: '13px',
    lineHeight: '18px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& small': {
    display: 'block',
    overflow: 'hidden',
    color: '#9f9b9b',
    fontSize: '11px',
    lineHeight: '16px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const watchers = css({
  marginTop: '2px',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '16px',
});

const empty = css({
  color: '#9f9b9b',
  fontSize: '13px',
});

const WEEKDAY_DESC: Record<number, { en: string; cn: string }> = {
  1: { en: 'Mon', cn: '星期一' },
  2: { en: 'Tue', cn: '星期二' },
  3: { en: 'Wed', cn: '星期三' },
  4: { en: 'Thu', cn: '星期四' },
  5: { en: 'Fri', cn: '星期五' },
  6: { en: 'Sat', cn: '星期六' },
  7: { en: 'Sun', cn: '星期日' },
};

/** PHP 约定星期 1-7（周日=7），与 dayjs().day()（0-6，周日=0）互转 */
function getTodayWeekday(): number {
  const day = dayjs().day();
  return day === 0 ? 7 : day;
}
/** 每日放送独立页：周一~周日分组封面网格 + 在看人数（对齐旧站 /calendar） */
const CalendarPage: React.FC = () => {
  const { calendar } = useCalendar();
  const data = calendar ?? {};
  const today = getTodayWeekday();
  const weekdays = Array.from({ length: 7 }, (_, i) => i + 1);
  const todayItems = data[String(today)] ?? [];
  const todayWatchers = todayItems.reduce((sum, item) => sum + item.watchers, 0);

  return (
    <>
      <Helmet title='每日放送' />
      <PageContainer as='main' className={page}>
        <div className={pageHeader}>
          <h1>
            每日放送
            <small className={headerSmall}>
              {dayjs().format('YYYY年M月D日')} {WEEKDAY_DESC[today]?.cn}
            </small>
          </h1>
          <p className={stats}>
            今日上映 <strong>{todayItems.length}</strong> 部，共 {todayWatchers} 人收看今日番组。
          </p>
        </div>
        {weekdays.map((weekday) => {
          const items = data[String(weekday)] ?? [];
          const desc = WEEKDAY_DESC[weekday];
          return (
            <section key={weekday} className={dayBlock}>
              <h2 className={dayTitle}>
                {desc?.cn}
                <small>{desc?.en}</small>
              </h2>
              {items.length === 0 ? (
                <p className={empty}>暂无放送</p>
              ) : (
                <div className={coverGrid}>
                  {items.map((item) => (
                    <div key={item.subject.id}>
                      <Link
                        to={getSubjectLink(item.subject.id)}
                        className={coverCard}
                        title={item.subject.nameCN || item.subject.name}
                      >
                        {item.subject.images && (
                          <img
                            src={item.subject.images.common}
                            className={coverImage}
                            loading='lazy'
                            alt=''
                          />
                        )}
                      </Link>
                      <div className={coverName}>
                        <p>{item.subject.nameCN || item.subject.name}</p>
                        <small>{item.subject.name}</small>
                      </div>
                      <span className={watchers}>{item.watchers} 人在看</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </PageContainer>
    </>
  );
};

export default CalendarPage;
