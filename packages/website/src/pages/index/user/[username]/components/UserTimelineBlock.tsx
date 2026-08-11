import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';

import type { User } from '@bangumi/client/client';
import { css } from '@bangumi/styled-system/css';
import {
  makeDescriptiveTime,
  renderTimelineDescription,
} from '@bangumi/website/components/TimelineDescription';
import { useUserTimeline } from '@bangumi/website/hooks/use-user-timeline';

const block = css({
  overflow: 'hidden',
  marginBottom: '16px',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 5px 14px rgba(0, 0, 0, 0.1)',
});

const title = css({
  margin: '0',
  padding: '14px 12px',
  background: 'linear-gradient(#fff, #f5f5f5)',
  color: '#1f1c1c',
  fontSize: '16px',
  fontWeight: 'normal',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
});

const empty = css({
  margin: '0',
  padding: '12px 0',
  color: '#9f9b9b',
  fontSize: '13px',
  textAlign: 'center',
});

const list = css({
  position: 'relative',
  listStyle: 'none',
  margin: '8px 14px 10px 20px',
  padding: '0 0 0 16px',
  borderLeft: '2px solid #e8e3e3',
});

const item = css({
  position: 'relative',
  display: 'flex',
  minHeight: '58px',
  padding: '7px 0',
  boxSizing: 'border-box',
});

const dot = css({
  position: 'absolute',
  top: '14px',
  left: '-22px',
  width: '8px',
  height: '8px',
  border: '2px solid #ffd9de',
  borderRadius: '50%',
  background: '#f88f9b',
});

const info = css({
  minWidth: '0',
});

const descBlock = css({
  color: '#1f1c1c',
  fontSize: '15px',
  lineHeight: '1.35',
  overflowWrap: 'anywhere',
  '& p': {
    display: 'inline',
    margin: '0',
  },
});

const time = css({
  color: '#9f9b9b',
  fontSize: '14px',
});

const UserTimelineBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: timelines } = useUserTimeline(user.username, 6);

  return (
    <section className={block}>
      <h2 className={title}>
        / 我的时间胶囊 <Link to={`/user/${user.username}/timeline`}>...more</Link>
      </h2>
      {!timelines || timelines.length === 0 ? (
        <p className={empty}>这里暂时没有动态</p>
      ) : (
        <ul className={list}>
          {timelines.map((timeline) => {
            const desc = renderTimelineDescription(timeline);
            if (desc == null) {
              return null;
            }
            return (
              <li key={timeline.id} className={item}>
                <span className={dot} />
                <div className={info}>
                  <div className={descBlock}>
                    {desc}{' '}
                    <span
                      className={time}
                      title={DateTime.fromSeconds(timeline.createdAt).toFormat('yyyy-MM-dd HH:mm')}
                    >
                      {makeDescriptiveTime(timeline.createdAt)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default UserTimelineBlock;
