import type { ozaClient } from '@bangumi/client';
import type { SubjectCollect } from '@bangumi/client/client';

import subjectCollectsJson from './collects-GET.json';
import subjectHomeJson from './home-GET.json';

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

export const subjectHomeFixture: JsonFixture<SuccessfulData<typeof ozaClient.getSubjectHome>> =
  subjectHomeJson;

/** tsc 类型验证：若 API 响应结构变更导致 fixture 与类型不一致，这里会报错 */
export const subjectCollectsFixture: { data: SubjectCollect[]; total: number } =
  subjectCollectsJson;
