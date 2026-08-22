import type { ozaClient } from '@bangumi/client/index.ts';
import episodeJson from '@bangumi/website/mocks/fixtures/p1/episodes/1704816-GET.json';
import episodesJson from '@bangumi/website/mocks/fixtures/p1/subjects/501963/episodes-GET.json';
import type { JsonFixture, SuccessfulData } from '@bangumi/website/mocks/utils.ts';

import commentsJson from './comments-GET.json';

export const episodeFixture: JsonFixture<SuccessfulData<typeof ozaClient.getEpisode>> = episodeJson;

export const episodeCommentsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getEpisodeComments>
> = commentsJson;

export const subjectEpisodesFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getSubjectEpisodes>
> = episodesJson;
