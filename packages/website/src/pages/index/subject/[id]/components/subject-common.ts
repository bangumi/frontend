import { CharacterCastType, CollectionType } from '@bangumi/client/client';

export const COLLECT_DESC: Record<CollectionType, string> = {
  [CollectionType.Wish]: '想看',
  [CollectionType.Collect]: '看过',
  [CollectionType.Doing]: '在看',
  [CollectionType.OnHold]: '搁置',
  [CollectionType.Dropped]: '抛弃',
};

export const CAST_TYPE_DESC: Partial<Record<CharacterCastType, string>> = {
  [CharacterCastType.Cv]: 'CV',
  [CharacterCastType.Dub]: '配音',
  [CharacterCastType.Actor]: '演员',
  [CharacterCastType.ChineseDub]: '中文配音',
  [CharacterCastType.JapaneseDub]: '日语配音',
  [CharacterCastType.EnglishDub]: '英语配音',
  [CharacterCastType.KoreanDub]: '韩语配音',
};

/** 收藏动词：看/读/听/玩 */
export function collectVerb(subjectType: number): string {
  switch (subjectType) {
    case 1:
      return '读';
    case 3:
      return '听';
    case 4:
      return '玩';
    default:
      return '看';
  }
}
