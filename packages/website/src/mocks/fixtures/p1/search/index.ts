import type { ozaClient } from '@bangumi/client';

import characterSearchJson from './characters-POST.json';
import personSearchJson from './persons-POST.json';
import subjectSearchJson from './subjects-POST.json';

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

export const subjectSearchFixture: JsonFixture<SuccessfulData<typeof ozaClient.searchSubjects>> =
  subjectSearchJson;

export const characterSearchFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.searchCharacters>
> = characterSearchJson;

export const personSearchFixture: JsonFixture<SuccessfulData<typeof ozaClient.searchPersons>> =
  personSearchJson;
