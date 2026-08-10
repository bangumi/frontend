import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';

import type { User } from '@bangumi/client/client';
import {
  makeDescriptiveTime,
  renderTimelineDescription,
} from '@bangumi/website/components/TimelineDescription';
import { useUserTimeline } from '@bangumi/website/hooks/use-user-timeline';

import styles from './UserTimelineBlock.module.less';

const UserTimelineBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: timelines } = useUserTimeline(user.username, 6);

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        / 我的时间胶囊 <Link to={`/user/${user.username}/timeline`}>...more</Link>
      </h2>
      {!timelines || timelines.length === 0 ? (
        <p className={styles.empty}>这里暂时没有动态</p>
      ) : (
        <ul className={styles.list}>
          {timelines.map((timeline) => {
            const desc = renderTimelineDescription(timeline);
            if (desc == null) {
              return null;
            }
            return (
              <li key={timeline.id} className={styles.item}>
                <span className={styles.dot} />
                <div className={styles.info}>
                  <div className={styles.desc}>
                    {desc}{' '}
                    <span
                      className={styles.time}
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
