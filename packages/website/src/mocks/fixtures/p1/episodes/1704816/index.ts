import type { ozaClient } from '@bangumi/client';
import type { JsonFixture, SuccessfulData } from '@bangumi/website/mocks/utils';

import episodesJson from '../../subjects/501963/episodes-GET.json';
import episodeJson from '../1704816-GET.json';
import commentsJson from './comments-GET.json';

export const episodeFixture: JsonFixture<SuccessfulData<typeof ozaClient.getEpisode>> = episodeJson;

export const episodeCommentsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getEpisodeComments>
> = commentsJson;

export const subjectEpisodesFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getSubjectEpisodes>
> = episodesJson;
