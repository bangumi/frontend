import dayjs from 'dayjs';
import React from 'react';

import type { Calendar } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getSubjectLink } from '@bangumi/utils/pages';

import styles from './CalendarBlock.module.less';
import HomeSidePanel from './HomeSidePanel';

const { Link } = Typography;

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
          <small className={styles.titleSmall}>
            {dayjs().format('YYYY年M月D日')} {getWeekdayDesc(today).cn}{' '}
            <Link to='https://bgm.tv/calendar' target='_blank' rel='noopener noreferrer'>
              ...more
            </Link>
          </small>
        </>
      }
    >
      <ul className={styles.list}>
        {days.map((day) => {
          const items = calendar[String(day.id)] ?? [];
          if (items.length === 0) {
            return null;
          }
          return (
            <li key={day.id} className={styles.dayItem}>
              <h3 className={styles.dayTitle}>
                {day.label}
                <small className={styles.dayEn}>{getWeekdayDesc(day.id).en}</small>
              </h3>
              <div className={styles.coverList}>
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
        <li className={styles.tip}>
          今日上映 <strong>{todayItems.length}</strong> 部。共 {todayWatchers} 人收看今日番组。
        </li>
      </ul>
    </HomeSidePanel>
  );
};

export default CalendarBlock;
