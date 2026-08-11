import type { ozaClient } from '@bangumi/client';

import personJson from '../21884-GET.json';
import castsJson from './casts-GET.json';
import collectsJson from './collects-GET.json';
import commentsJson from './comments-GET.json';
import indexesJson from './indexes-GET.json';
import relationsJson from './relations-GET.json';
import worksJson from './works-GET.json';

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

export const personFixture: JsonFixture<SuccessfulData<typeof ozaClient.getPerson>> = personJson;

export const personCastsFixture: JsonFixture<SuccessfulData<typeof ozaClient.getPersonCasts>> =
  castsJson;

export const personWorksFixture: JsonFixture<SuccessfulData<typeof ozaClient.getPersonWorks>> =
  worksJson;

export const personRelationsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getPersonRelations>
> = relationsJson;

export const personCollectsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getPersonCollects>
> = collectsJson;

export const personCommentsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getPersonComments>
> = commentsJson;

export const personIndexesFixture: JsonFixture<SuccessfulData<typeof ozaClient.getPersonIndexes>> =
  indexesJson;
