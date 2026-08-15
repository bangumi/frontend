import dayjs from 'dayjs';
import React from 'react';

import type { User } from '@bangumi/client/client';
import { OpenQuote } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';
import { BBCodePreset } from '@bangumi/utils/bbcode/presets';
import { render as renderBBCode } from '@bangumi/utils/bbcode/react';

const card = css({
  marginBottom: '38px',
  '@media (max-width: 640px)': {
    marginBottom: '24px',
  },
});

const bio = css({
  position: 'relative',
  display: 'flex',
  gap: '12px',
  minHeight: '126px',
  marginBottom: '12px',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  background: '#f7f7f4',
  '@media (max-width: 640px)': {
    minHeight: '0',
    padding: '12px',
  },
});

const quoteIcon = css({
  flexShrink: '0',
  color: '#9f9b9b',
  fontSize: '24px',
});

const bioText = css({
  minWidth: '0',
  color: '#1f1c1c',
  fontSize: '14px',
  lineHeight: '1.6',
  wordBreak: 'normal',
  overflowWrap: 'break-word',
  '& p': {
    margin: '0 0 12px',
    '&:last-child': {
      marginBottom: '0',
    },
  },
  '@media (max-width: 640px)': {
    fontSize: '14px',
  },
});

const services = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '5px 10px',
  '& li': {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#999',
    '@media (max-width: 640px)': {
      fontSize: '14px',
    },
  },
});

const serviceName = css({
  flexShrink: '0',
  padding: '2px 10px',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '11px',
});

const serviceText = css({
  color: '#999',
  textDecoration: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  'a&': {
    color: '#54b5df',
  },
});

function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const UserInfoCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <section className={card}>
      {user.bio && (
        <div className={bio}>
          <OpenQuote className={quoteIcon} />
          <div className={bioText}>{renderBBCode(user.bio, BBCodePreset.userBio)}</div>
        </div>
      )}
      <ul className={services}>
        <li>
          <span className={serviceName} style={{ backgroundColor: '#f06292' }}>
            Bangumi
          </span>
          <span className={serviceText}>{dayjs.unix(user.joinedAt).format('YYYY-M-D')} 加入</span>
        </li>
        {user.site && (
          <li>
            <span className={serviceName} style={{ backgroundColor: '#333' }}>
              Home
            </span>
            <a
              className={serviceText}
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
            <span className={serviceName} style={{ backgroundColor: svc.color }}>
              {svc.title}
            </span>
            {svc.url ? (
              <a
                className={serviceText}
                href={svc.url}
                target='_blank'
                rel='nofollow external noopener noreferrer'
              >
                {svc.account}
              </a>
            ) : (
              <span className={serviceText}>{svc.account}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserInfoCard;
