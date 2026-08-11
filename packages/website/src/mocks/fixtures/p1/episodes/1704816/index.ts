import type { ozaClient } from '@bangumi/client';

import episodesJson from '../../subjects/501963/episodes-GET.json';
import episodeJson from '../1704816-GET.json';
import commentsJson from './comments-GET.json';

type ApiFunction = (...args: never[]) => Promise<unknown>;

type SuccessfulData<T extends ApiFunction> = Extract<
  Awaited<ReturnType<T>>,
  { status: 200 }
>['data'];

type JsonFixture<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends (infer Item)[]
        ? JsonFixture<Item>[]
        : T extends object
          ? { [Key in keyof T]: JsonFixture<T[Key]> }
          : T;

export const episodeFixture: JsonFixture<SuccessfulData<typeof ozaClient.getEpisode>> = episodeJson;

export const episodeCommentsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getEpisodeComments>
> = commentsJson;

export const subjectEpisodesFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getSubjectEpisodes>
> = episodesJson;
