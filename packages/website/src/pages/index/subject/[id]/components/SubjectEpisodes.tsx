import { DateTime } from 'luxon';
import React from 'react';

import type { Episode, Subject } from '@bangumi/client/client';
import { EpisodeType, SubjectType } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getEpisodeLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  '@media (max-width: 768px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const episodeGroups = css({ minWidth: '0' });

const groupTitle = css({
  margin: '0',
  padding: '5px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px solid #e8e3e3',
  color: '#595555',
  fontSize: '13px',
  fontWeight: 'normal',
  lineHeight: '18px',
});

const episodeList = css({ margin: '0', padding: '0', listStyle: 'none' });

const episodeRow = css({
  padding: '6px 5px',
  borderBottom: '1px dotted #e0e0e0',
  fontSize: '14px',
  lineHeight: '1.6',
  '&:nth-child(even)': { background: '#f9f9f9' },
});

const episodeTitleClass = css({
  minWidth: '0',
  overflowWrap: 'anywhere',
});

const airedStatus = css({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  margin: '0 5px 1px 1px',
  borderRadius: '50%',
  background: '#3db3f5',
});

const futureStatus = css({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  margin: '0 5px 1px 1px',
  borderRadius: '50%',
  background: '#d9dfe1',
});

const episodeNameCN = css({ color: '#595555' });

const episodeMeta = css({
  margin: '0',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '19px',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

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
    <li className={episodeRow}>
      <div className={episodeTitleClass}>
        {showAirStatus && (
          <span
            className={isFutureEpisode(episode.airdate) ? futureStatus : airedStatus}
            title={isFutureEpisode(episode.airdate) ? '未播出' : '已播出'}
          />
        )}
        <Link to={getEpisodeLink(episode.id)}>{episodeTitle(episode)}</Link>
        {episode.nameCN && <span className={episodeNameCN}> / {episode.nameCN}</span>}
      </div>
      <p className={episodeMeta}>
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
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={episodeGroups}>
            {groups.length === 0 && <p className={empty}>暂无章节</p>}
            {groups.map((group) => (
              <section key={group.key} aria-labelledby={`${group.key}-heading`}>
                <h2 id={`${group.key}-heading`} className={groupTitle}>
                  {group.label}
                </h2>
                <ol className={episodeList}>
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
    </>
  );
}
