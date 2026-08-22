import type { ozaClient } from '@bangumi/client/index.ts';
import type { JsonFixture, SuccessfulData } from '@bangumi/website/mocks/utils.ts';

import characterSearchJson from './characters-POST.json';
import personSearchJson from './persons-POST.json';
import subjectSearchJson from './subjects-POST.json';

export const subjectSearchFixture: JsonFixture<SuccessfulData<typeof ozaClient.searchSubjects>> =
  subjectSearchJson;

export const characterSearchFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.searchCharacters>
> = characterSearchJson;

export const personSearchFixture: JsonFixture<SuccessfulData<typeof ozaClient.searchPersons>> =
  personSearchJson;
