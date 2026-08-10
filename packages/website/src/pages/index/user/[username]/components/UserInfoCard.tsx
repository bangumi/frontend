import dayjs from 'dayjs';
import React from 'react';

import type { User } from '@bangumi/client/client';
import { OpenQuote } from '@bangumi/icons';
import { render as renderBBCode } from '@bangumi/utils';

import styles from './UserInfoCard.module.less';

function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const UserInfoCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <section className={styles.card}>
      {user.bio && (
        <div className={styles.bio}>
          <OpenQuote className={styles.quoteIcon} />
          <div className={styles.bioText}>{renderBBCode(user.bio)}</div>
        </div>
      )}
      <ul className={styles.services}>
        <li>
          <span className={styles.serviceName} style={{ backgroundColor: '#f06292' }}>
            Bangumi
          </span>
          <span className={styles.serviceText}>
            {dayjs.unix(user.joinedAt).format('YYYY-M-D')} 加入
          </span>
        </li>
        {user.site && (
          <li>
            <span className={styles.serviceName} style={{ backgroundColor: '#333' }}>
              Home
            </span>
            <a
              className={styles.serviceText}
              href={withProtocol(user.site)}
              target='_blank'
              rel='nofollow me'
            >
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
              <a
                className={styles.serviceText}
                href={svc.url}
                target='_blank'
                rel='nofollow external noopener noreferrer'
              >
                {svc.account}
              </a>
            ) : (
              <span className={styles.serviceText}>{svc.account}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserInfoCard;
