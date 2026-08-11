import type { ozaClient } from '@bangumi/client';

import trendingSubjectTopicsJson from './subjects/topics-GET.json';
import trendingSubjectsJson from './subjects-GET.json';

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

export const trendingSubjectsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getTrendingSubjects>
> = trendingSubjectsJson;

export const trendingSubjectTopicsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getTrendingSubjectTopics>
> = trendingSubjectTopicsJson;
