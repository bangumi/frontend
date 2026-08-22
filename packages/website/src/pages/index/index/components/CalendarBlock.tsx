import dayjs from 'dayjs';
import React from 'react';

import type { Calendar } from '@bangumi/client/client.ts';
import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getCalendarLink, getSubjectLink } from '@bangumi/utils/pages.ts';

import HomeSidePanel from './HomeSidePanel.tsx';

const { Link } = Typography;

const titleSmall = css({
  fontSize: '12px',
  fontWeight: 'normal',
  color: '#9f9b9b',
});

const list = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  fontSize: '13px',
});

const dayItem = css({
  padding: '8px 10px',
  borderBottom: '1px solid #e8e3e3',
});

const dayTitle = css({
  fontSize: '13px',
  fontWeight: 'bold',
  margin: '0 0 6px',
});

const dayEn = css({
  fontWeight: 'normal',
  color: '#9f9b9b',
  marginLeft: '4px',
});

const coverList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  '& img': {
    display: 'block',
    borderRadius: '2px',
  },
});

const tip = css({
  padding: '8px 10px',
  color: '#9f9b9b',
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

function getWeekdayDesc(weekday: number): { en: string; cn: string } {
  return WEEKDAY_DESC[weekday] ?? { en: '', cn: '' };
}

/** PHP 约定星期 1-7（周日=7），与 dayjs().day()（0-6，周日=0）互转 */
function getTodayWeekday(): number {
  const day = dayjs().day();
  return day === 0 ? 7 : day;
}

/**
 * 每日放送，对齐 PHP home_calendar：显示今天与明天两天
 */
const CalendarBlock: React.FC<{ calendar: Calendar }> = ({ calendar }) => {
  const today = getTodayWeekday();
  const tomorrow = today === 7 ? 1 : today + 1;

  const days = [
    { id: today, label: '今天' },
    { id: tomorrow, label: '明天' },
  ];

  const todayItems = calendar[String(today)] ?? [];
  const todayWatchers = todayItems.reduce((sum, item) => sum + item.watchers, 0);

  return (
    <HomeSidePanel
      title={
        <>
          每日放送{' '}
          <small className={titleSmall}>
            {dayjs().format('YYYY年M月D日')} {getWeekdayDesc(today).cn}{' '}
            <Link to={getCalendarLink()}>...more</Link>
          </small>
        </>
      }
    >
      <ul className={list}>
        {days.map((day) => {
          const items = calendar[String(day.id)] ?? [];
          if (items.length === 0) {
            return null;
          }
          return (
            <li key={day.id} className={dayItem}>
              <h3 className={dayTitle}>
                {day.label}
                <small className={dayEn}>{getWeekdayDesc(day.id).en}</small>
              </h3>
              <div className={coverList}>
                {items.map((item) => (
                  <Link
                    key={item.subject.id}
                    to={getSubjectLink(item.subject.id)}
                    title={`${item.subject.name}\n${item.subject.nameCN}`}
                  >
                    <img src={item.subject.images?.grid} width={48} loading='lazy' alt='' />
                  </Link>
                ))}
              </div>
            </li>
          );
        })}
        <li className={tip}>
          今日上映 <strong>{todayItems.length}</strong> 部。共 {todayWatchers} 人收看今日番组。
        </li>
      </ul>
    </HomeSidePanel>
  );
};

export default CalendarBlock;
