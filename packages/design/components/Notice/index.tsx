/**
 * TODO: 没有设计稿，只是实现了功能
 */

import './style';

import type { FC } from 'react';
import React from 'react';

import type { INotice } from '@bangumi/client/user';

export interface NoticeProps extends INotice {
  onClose?: (id: number) => void;
}

const Notice: FC<NoticeProps> = ({ id, type, title, postID, topicID, sender, onClose }) => {
  const setting = _settings[type];

  if (!setting) {
    return (
      <div id={`notice_${id}`}>
        <div>{title}</div>
      </div>
    );
  }

  return (
    <>
      <div id={`notice_${id}`} className='bgm-notify'>
        <div className='avatar'>
          <img src={sender.avatar.small} alt='' />
        </div>

        <div className='inner'>
          <a
            href={`https://bgm.tv/user/${sender.username}`}
            target='_blank'
            rel='noopener noreferrer'
            className='user'
          >
            {sender.nickname}
          </a>
          <div>
            {setting.prefix}{' '}
            <a
              href={`${setting.url}/${topicID}${setting.append ?? ''}${setting.anchor}${postID}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {setting.inner ?? title}
            </a>{' '}
            {setting.suffix}
          </div>
        </div>

        <div className='close' onClick={() => onClose?.(id)} />
      </div>
      <hr />
    </>
  );
};

export default Notice;

interface setting {
  id: number;
  hash: number;

  url: string;
  anchor: string;
  append?: string;
  url_mobile?: string;

  prefix: string;
  inner?: string;
  suffix: string;

  merge?: number;
}

const _settings: Record<number, setting> = {
  1: {
    url: '/group/topic',
    url_mobile: 'MOBILE_URL/topic/group/',
    anchor: '#post_',
    prefix: '在你的小组话题',
    suffix: '中发表了新回复',
    id: 1,
    hash: 1,
    merge: 1,
  },
  2: {
    url: '/group/topic',
    url_mobile: 'MOBILE_URL/topic/group/',
    anchor: '#post_',
    prefix: '在小组话题',
    suffix: '中回复了你',
    id: 2,
    hash: 1,
    merge: 1,
  },
  3: {
    url: '/subject/topic',
    url_mobile: '/topic/subject',
    anchor: '#post_',
    prefix: '在你的条目讨论',
    suffix: '中发表了新回复',
    id: 3,
    hash: 3,
    merge: 1,
  },
  4: {
    url: 'SITE_URL/subject/topic/',
    url_mobile: 'MOBILE_URL/topic/subject/',
    anchor: '#post_',
    prefix: '在条目讨论',
    suffix: '中回复了你',
    id: 4,
    hash: 3,
    merge: 1,
  },
  5: {
    url: 'SITE_URL/character/',
    url_mobile: 'MOBILE_URL/topic/crt/',
    anchor: '#post_',
    prefix: '在角色讨论',
    suffix: '中发表了新回复',
    id: 5,
    hash: 5,
    merge: 1,
  },
  6: {
    url: 'SITE_URL/character/',
    url_mobile: 'MOBILE_URL/topic/crt/',
    anchor: '#post_',
    prefix: '在角色',
    suffix: '中回复了你',
    id: 6,
    hash: 5,
    merge: 1,
  },
  '7': {
    url: 'SITE_URL/blog/',
    anchor: '#post_',
    prefix: '在你的日志',
    suffix: '中发表了新回复',
    id: 7,
    hash: 7,
    merge: 1,
  },
  '8': {
    url: 'SITE_URL/blog/',
    anchor: '#post_',
    prefix: '在日志',
    suffix: '中回复了你',
    id: 8,
    hash: 7,
    merge: 1,
  },
  '9': {
    url: 'SITE_URL/subject/ep/',
    url_mobile: 'MOBILE_URL/topic/ep/',
    anchor: '#post_',
    prefix: '在章节讨论',
    suffix: '中发表了新回复',
    id: 9,
    hash: 9,
    merge: 1,
  },
  '10': {
    url: 'SITE_URL/subject/ep/',
    url_mobile: 'MOBILE_URL/topic/ep/',
    anchor: '#post_',
    prefix: '在章节讨论',
    suffix: '中回复了你',
    id: 10,
    hash: 9,
    merge: 1,
  },
  '11': {
    url: 'SITE_URL/index/',
    anchor: '#post_',
    append: '/comments',
    prefix: '在目录',
    suffix: '中给你留言了',
    id: 11,
    hash: 11,
    merge: 1,
  },
  '12': {
    url: 'SITE_URL/index/',
    anchor: '#post_',
    append: '/comments',
    prefix: '在目录',
    suffix: '中回复了你',
    id: 12,
    hash: 11,
    merge: 1,
  },
  '13': {
    url: 'SITE_URL/person/',
    url_mobile: 'MOBILE_URL/topic/prsn/',
    anchor: '#post_',
    prefix: '在人物',
    suffix: '中回复了你',
    id: 13,
    hash: 13,
    merge: 1,
  },
  '14': {
    url: 'SITE_URL/user/',
    anchor: '#',
    prefix: '请求与你成为好友',
    suffix: '',
    id: 14,
    hash: 14,
  },
  '15': {
    url: 'SITE_URL/user/',
    anchor: '#',
    prefix: '通过了你的好友请求',
    suffix: '',
    id: 15,
    hash: 14,
  },
  '17': {
    url: 'DOUJIN_URL/club/topic/',
    anchor: '#post_',
    prefix: '在你的社团讨论',
    suffix: '中发表了新回复',
    id: 17,
    hash: 17,
    merge: 1,
  },
  '18': {
    url: 'DOUJIN_URL/club/topic/',
    anchor: '#post_',
    prefix: '在社团讨论',
    suffix: '中回复了你',
    id: 18,
    hash: 17,
    merge: 1,
  },
  '19': {
    url: 'DOUJIN_URL/subject/',
    anchor: '#post_',
    prefix: '在同人作品',
    suffix: '中回复了你',
    id: 19,
    hash: 19,
    merge: 1,
  },
  '20': {
    url: 'DOUJIN_URL/event/topic/',
    anchor: '#post_',
    prefix: '在你的展会讨论',
    suffix: '中发表了新回复',
    id: 20,
    hash: 20,
    merge: 1,
  },
  '21': {
    url: 'DOUJIN_URL/event/topic/',
    anchor: '#post_',
    prefix: '在展会讨论',
    suffix: '中回复了你',
    id: 21,
    hash: 20,
    merge: 1,
  },
  '22': {
    url: 'SITE_URL/user/chobits_user/timeline/status/',
    anchor: '#post_',
    prefix: '回复了你的',
    inner: '吐槽',
    suffix: '',
    id: 22,
    hash: 22,
    merge: 1,
  },
  '23': {
    url: 'SITE_URL/group/topic/',
    url_mobile: 'MOBILE_URL/topic/group/',
    anchor: '#post_',
    prefix: '在小组话题',
    suffix: '中提到了你',
    id: 23,
    hash: 1,
    merge: 1,
  },
  '24': {
    url: 'SITE_URL/subject/topic/',
    url_mobile: 'MOBILE_URL/topic/subject/',
    anchor: '#post_',
    prefix: '在条目讨论',
    suffix: '中提到了你',
    id: 24,
    hash: 3,
    merge: 1,
  },
  '25': {
    url: 'SITE_URL/character/',
    url_mobile: 'MOBILE_URL/topic/crt/',
    anchor: '#post_',
    prefix: '在角色',
    suffix: '中提到了你',
    id: 25,
    hash: 5,
    merge: 1,
  },
  '26': {
    url: 'SITE_URL/person/',
    url_mobile: 'MOBILE_URL/topic/prsn/',
    anchor: '#post_',
    prefix: '在人物讨论',
    suffix: '中提到了你',
    id: 26,
    hash: 5,
    merge: 1,
  },
  '27': {
    url: 'SITE_URL/index/',
    anchor: '#post_',
    append: '/comments',
    prefix: '在目录',
    suffix: '中提到了你',
    id: 28,
    hash: 11,
    merge: 1,
  },
  '28': {
    url: 'SITE_URL/user/chobits_user/timeline/status/',
    anchor: '#post_',
    prefix: '在',
    suffix: '中提到了你',
    id: 28,
    hash: 22,
    merge: 1,
  },
  '29': {
    url: 'SITE_URL/blog/',
    anchor: '#post_',
    prefix: '在日志',
    suffix: '中提到了你',
    id: 29,
    hash: 7,
    merge: 1,
  },
  '30': {
    url: 'SITE_URL/subject/ep/',
    url_mobile: 'MOBILE_URL/topic/ep/',
    anchor: '#post_',
    prefix: '在章节讨论',
    suffix: '中提到了你',
    id: 30,
    hash: 9,
    merge: 1,
  },
  '31': {
    url: 'DOUJIN_URL/club/',
    anchor: '/shoutbox#post_',
    prefix: '在社团',
    suffix: '的留言板中提到了你',
    id: 31,
    hash: 31,
    merge: 1,
  },
  '32': {
    url: 'DOUJIN_URL/club/topic/',
    anchor: '#post_',
    prefix: '在社团讨论',
    suffix: '中提到了你',
    id: 32,
    hash: 17,
    merge: 1,
  },
  '33': {
    url: 'DOUJIN_URL/subject/',
    anchor: '#post_',
    prefix: '在同人作品',
    suffix: '中提到了你',
    id: 33,
    hash: 19,
    merge: 1,
  },
  '34': {
    url: 'DOUJIN_URL/event/topic/',
    anchor: '#post_',
    prefix: '在展会讨论',
    suffix: '中提到了你',
    id: 34,
    hash: 20,
    merge: 1,
  },
};