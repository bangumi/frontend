import dayjs from 'dayjs';
import React from 'react';

import type { Calendar } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import { getCalendarLink, getSubjectLink } from '@bangumi/utils/pages';
import Tooltip from '@bangumi/website/components/Tooltip';

import HomeSidePanel from './HomeSidePanel';

const { Link } = Typography;

/* 对齐原站 .sidePanelHome h2 small：继承标题 #555/300，链接 #444 */
const titleSmall = css({
  fontSize: '12px',
  fontWeight: 'normal',
  color: '#555',
  '& a': { color: '#444' },
});

const list = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  fontSize: '13px',
  lineHeight: '0.9',
});

/* 对齐原站 ul.calendarMini：每行左侧星期色带 + 右侧白底封面 */
const dayItem = css({
  display: 'flex',
  alignItems: 'stretch',
  borderBottom: '1px solid #eee',
  color: '#fff',
});

const dayTitle = css({
  flex: 'none',
  width: '25px',
  margin: '0',
  padding: '5px 0 0 5px',
  fontSize: '12px',
  fontWeight: 'normal',
  '& p': { margin: '0' },
});

const dayEn = css({
  fontWeight: 'normal',
  color: '#fff',
  fontSize: '10px',
});

const coverList = css({
  flex: '1',
  minWidth: '0',
  display: 'flex',
  flexWrap: 'wrap',
  background: '#fff',
  '& img': {
    display: 'block',
  },
});

/* 原站星期色带配色（ul.calendarMini li.<Week>） */
const dayBackground: Record<number, string> = {
  1: css({ background: '#ff6600' }),
  2: css({ background: '#ff9e01' }),
  3: css({ background: '#b0de09' }),
  4: css({ background: '#339900' }),
  5: css({ background: '#0085c8' }),
  6: css({ background: '#0455a6' }),
  7: css({ background: '#ff0f00' }),
};

const tip = css({
  padding: '6px 5px',
  color: '#888',
  fontSize: '12px',
  textAlign: 'center',
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
            <li key={day.id} className={cx(dayItem, dayBackground[day.id])}>
              <h3 className={dayTitle}>
                {day.label}
                <p>
                  <small className={dayEn}>{getWeekdayDesc(day.id).en}</small>
                </p>
              </h3>
              <div className={coverList}>
                {items.map((item) => (
                  <Tooltip
                    key={item.subject.id}
                    content={
                      <>
                        {item.subject.name}
                        <br />
                        <small>{item.subject.nameCN}</small>
                      </>
                    }
                  >
                    <Link
                      to={getSubjectLink(item.subject.id)}
                      aria-label={`${item.subject.name} ${item.subject.nameCN}`}
                    >
                      <img src={item.subject.images?.grid} width={48} loading='lazy' alt='' />
                    </Link>
                  </Tooltip>
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
