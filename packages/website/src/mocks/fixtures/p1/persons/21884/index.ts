import type { ozaClient } from '@bangumi/client/index.ts';
import personJson from '@bangumi/website/mocks/fixtures/p1/persons/21884-GET.json';
import type { JsonFixture, SuccessfulData } from '@bangumi/website/mocks/utils.ts';

import castsJson from './casts-GET.json';
import collectsJson from './collects-GET.json';
import commentsJson from './comments-GET.json';
import indexesJson from './indexes-GET.json';
import relationsJson from './relations-GET.json';
import worksJson from './works-GET.json';

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
