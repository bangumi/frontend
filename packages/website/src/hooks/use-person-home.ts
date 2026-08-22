import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type {
  Person,
  PersonCharacter,
  PersonCollect,
  PersonRelation,
  PersonWork,
  SlimIndex,
} from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

type ApiFunction = (...args: never[]) => Promise<unknown>;

type SuccessfulData<T extends ApiFunction> = Extract<
  Awaited<ReturnType<T>>,
  { status: 200 }
>['data'];

export interface PersonHomeData {
  person: Person;
  casts: PersonCharacter[];
  castsTotal: number;
  works: PersonWork[];
  worksTotal: number;
  relations: PersonRelation[];
  relationsTotal: number;
  collects: PersonCollect[];
  collectsTotal: number;
  comments: SuccessfulData<typeof ozaClient.getPersonComments>;
  indexes: SlimIndex[];
}

export function usePersonHome(personID: number): { data: PersonHomeData | undefined } {
  const { data } = useSWR(
    `person-home ${personID}`,
    async (): Promise<PersonHomeData> => {
      const [person, casts, works, relations, collects, comments, indexes] = await Promise.all([
        ok(ozaClient.getPerson(personID)),
        ok(ozaClient.getPersonCasts(personID, { limit: 5, offset: 0 })),
        ok(ozaClient.getPersonWorks(personID, { limit: 5, offset: 0 })),
        ok(ozaClient.getPersonRelations(personID, { limit: 12, offset: 0 })),
        ok(ozaClient.getPersonCollects(personID, { limit: 5, offset: 0 })),
        ok(ozaClient.getPersonComments(personID)),
        ok(ozaClient.getPersonIndexes(personID, { limit: 10, offset: 0 })),
      ]);

      return {
        person,
        casts: casts.data,
        castsTotal: casts.total,
        works: works.data,
        worksTotal: works.total,
        relations: relations.data,
        relationsTotal: relations.total,
        collects: collects.data,
        collectsTotal: collects.total,
        comments,
        indexes: indexes.data,
      };
    },
    { suspense: true },
  );

  return { data };
}
