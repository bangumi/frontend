import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import { useEpisodePage } from '@bangumi/website/hooks/use-episode-page.ts';

import EpisodeDetail from './EpisodeDetail.tsx';

function EpisodePage() {
  const { id } = useParams();
  const episodeID = Number(id);
  const { data, mutate } = useEpisodePage(episodeID);

  if (!data) {
    return null;
  }

  return <EpisodeDetail data={data} mutate={mutate} />;
}

export default withErrorBoundary(EpisodePage, {
  404: () => <div>没有找到章节</div>,
});
