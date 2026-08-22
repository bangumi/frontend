import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type {
  Character,
  CharacterRelation,
  CharacterSubject,
  MonoPhoto,
  PersonCollect,
  SlimIndex,
} from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

type SuccessData<T extends (...args: never[]) => unknown> =
  Extract<Awaited<ReturnType<T>>, { status: 200 }> extends { data: infer Data } ? Data : never;

export type CharacterComment = SuccessData<typeof ozaClient.getCharacterComments>[number];

export interface CharacterHomeResponse {
  character: Character;
  casts: CharacterSubject[];
  castTotal: number;
  relations: CharacterRelation[];
  relationTotal: number;
  collects: PersonCollect[];
  collectTotal: number;
  comments: CharacterComment[];
  photos: MonoPhoto[];
  photoTotal: number;
  indexes: SlimIndex[];
  indexTotal: number;
}

export function useCharacterHome(characterID: number): {
  data: CharacterHomeResponse | undefined;
  mutate: () => Promise<unknown>;
} {
  const { data, mutate } = useSWR(
    `character-home ${characterID}`,
    async () => {
      const [character, casts, relations, collects, comments, photos, indexes] = await Promise.all([
        ok(ozaClient.getCharacter(characterID)),
        ok(ozaClient.getCharacterCasts(characterID, { limit: 10 })),
        ok(ozaClient.getCharacterRelations(characterID, { limit: 8 })),
        ok(ozaClient.getCharacterCollects(characterID, { limit: 5 })),
        ok(ozaClient.getCharacterComments(characterID)),
        ok(ozaClient.getCharacterPhotoPreview(characterID, { limit: 8 })),
        ok(ozaClient.getCharacterIndexes(characterID, { limit: 5 })),
      ]);

      return {
        character,
        casts: casts.data,
        castTotal: casts.total,
        relations: relations.data,
        relationTotal: relations.total,
        collects: collects.data,
        collectTotal: collects.total,
        comments,
        photos: photos.data,
        photoTotal: photos.total,
        indexes: indexes.data,
        indexTotal: indexes.total,
      };
    },
    { suspense: true },
  );

  return { data, mutate };
}
