import dayjs from 'dayjs';
import React from 'react';

import type { User } from '@bangumi/client/client';
import { render as renderBBCode } from '@bangumi/utils';

import styles from './UserInfoCard.module.less';

function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const UserInfoCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <section className={styles.card}>
      <ul className={styles.services}>
        <li>
          <span className={styles.serviceName}>Bangumi</span>
          <span>{dayjs.unix(user.joinedAt).format('YYYY-MM-DD')} 加入</span>
        </li>
        {user.site && (
          <li>
            <span className={styles.serviceName}>Home</span>
            <a href={withProtocol(user.site)} target='_blank' rel='nofollow me'>
              {user.site}
            </a>
          </li>
        )}
        {user.networkServices.map((svc) => (
          <li key={svc.name}>
            <span className={styles.serviceName} style={{ backgroundColor: svc.color }}>
              {svc.title}
            </span>
            {svc.url ? (
              <a href={svc.url} target='_blank' rel='nofollow external noopener noreferrer'>
                {svc.account}
              </a>
            ) : (
              <span>{svc.account}</span>
            )}
          </li>
        ))}
      </ul>
      {user.bio && <div className={styles.bio}>{renderBBCode(user.bio)}</div>}
    </section>
  );
};

export default UserInfoCard;
