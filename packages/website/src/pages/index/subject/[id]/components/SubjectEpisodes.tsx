import { DateTime } from 'luxon';
import React from 'react';

import type { Episode, Subject } from '@bangumi/client/client';
import { EpisodeType, SubjectType } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getEpisodeLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { SubjectHeader } from './SubjectDetail';
import styles from './SubjectEpisodes.module.less';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

const EPISODE_TYPE_LABELS: Record<EpisodeType, string> = {
  [EpisodeType.Normal]: '本篇',
  [EpisodeType.Special]: 'SP',
  [EpisodeType.Op]: 'OP',
  [EpisodeType.Ed]: 'ED',
  [EpisodeType.Pre]: '剧场版',
  [EpisodeType.Mad]: 'MAD',
  [EpisodeType.Other]: '其他',
};

const EPISODE_TYPE_PREFIXES: Record<EpisodeType, string> = {
  [EpisodeType.Normal]: '',
  [EpisodeType.Special]: 'SP',
  [EpisodeType.Op]: 'OP',
  [EpisodeType.Ed]: 'ED',
  [EpisodeType.Pre]: 'Movie',
  [EpisodeType.Mad]: 'MAD',
  [EpisodeType.Other]: 'Other',
};

type EpisodeGroup = {
  key: string;
  label: string;
  episodes: Episode[];
};

function groupEpisodes(subject: Subject, episodes: Episode[]): EpisodeGroup[] {
  const grouped = new Map<number, Episode[]>();
  const isMusic = subject.type === SubjectType.Music;

  for (const episode of episodes) {
    const groupKey = isMusic ? episode.disc : episode.type;
    const group = grouped.get(groupKey) ?? [];
    group.push(episode);
    grouped.set(groupKey, group);
  }

  return [...grouped.entries()]
    .sort(([left], [right]) => left - right)
    .map(([key, group]) => ({
      key: `${isMusic ? 'disc' : 'type'}-${key}`,
      label: isMusic ? `Disc ${key}` : EPISODE_TYPE_LABELS[key as EpisodeType],
      episodes: [...group].sort((left, right) => left.sort - right.sort),
    }));
}

function isFutureEpisode(airdate: string): boolean {
  const date = DateTime.fromISO(airdate);
  return date.isValid && date.startOf('day').toMillis() > DateTime.now().startOf('day').toMillis();
}

function episodeTitle(episode: Episode): string {
  return `${EPISODE_TYPE_PREFIXES[episode.type]}${episode.sort}.${episode.name}`;
}

function EpisodeRow({ episode, showAirStatus }: { episode: Episode; showAirStatus: boolean }) {
  const broadcastInfo = [
    episode.duration ? `时长:${episode.duration}` : '',
    episode.airdate ? `首播:${episode.airdate}` : '',
  ].filter(Boolean);

  return (
    <li className={styles.episodeRow}>
      <div className={styles.episodeTitle}>
        {showAirStatus && (
          <span
            className={isFutureEpisode(episode.airdate) ? styles.futureStatus : styles.airedStatus}
            title={isFutureEpisode(episode.airdate) ? '未播出' : '已播出'}
          />
        )}
        <Link to={getEpisodeLink(episode.id)}>{episodeTitle(episode)}</Link>
        {episode.nameCN && <span className={styles.episodeNameCN}> / {episode.nameCN}</span>}
      </div>
      <p className={styles.episodeMeta}>
        {broadcastInfo.join(' / ')}
        {broadcastInfo.length > 0 && ' '}/ 讨论:+{episode.comment}
      </p>
    </li>
  );
}

export default function SubjectEpisodes({
  subject,
  episodes,
}: {
  subject: Subject;
  episodes: Episode[];
}) {
  const groups = groupEpisodes(subject, episodes);
  const showAirStatus = subject.type !== SubjectType.Music;

  return (
    <PageContainer as='main'>
      <SubjectHeader subject={subject} />
      <div className={styles.columns}>
        <div className={styles.episodeGroups}>
          {groups.length === 0 && <p className={styles.empty}>暂无章节</p>}
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`${group.key}-heading`}>
              <h2 id={`${group.key}-heading`} className={styles.groupTitle}>
                {group.label}
              </h2>
              <ol className={styles.episodeList}>
                {group.episodes.map((episode) => (
                  <EpisodeRow key={episode.id} episode={episode} showAirStatus={showAirStatus} />
                ))}
              </ol>
            </section>
          ))}
        </div>
        <SubjectSummaryCard subject={subject} />
      </div>
    </PageContainer>
  );
}
