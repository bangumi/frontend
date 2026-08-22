import { CharacterCastType, CollectionType } from '@bangumi/client/client.ts';

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

/** 相对时间，对齐 PHP GlobalCore::make_descriptive_time（如「1小时25分钟前」） */
export function makeDescriptiveTime(timestamp: number): string {
  const YEAR = 86400 * 365;
  const MONTH = 86400 * 30;
  const DAY = 86400;
  const HOUR = 3600;
  const MINUTE = 60;

  const diff = Math.floor(Date.now() / 1000) - timestamp;

  if (diff > YEAR) {
    const years = Math.floor(diff / YEAR);
    const rest = diff - years * YEAR;
    if (rest > MONTH) {
      return `${years}年${Math.floor(rest / MONTH)}月前`;
    }
    return `${years}年前`;
  }
  if (diff > MONTH) {
    const months = Math.floor(diff / MONTH);
    const rest = diff - months * MONTH;
    if (rest > DAY) {
      return `${months}月${Math.floor(rest / DAY)}天前`;
    }
    return `${months}月前`;
  }
  if (diff > DAY) {
    const days = Math.floor(diff / DAY);
    const rest = diff - days * DAY;
    if (rest > HOUR) {
      return `${days}天${Math.floor(rest / HOUR)}小时前`;
    }
    return `${days}天前`;
  }
  if (diff > HOUR) {
    const hours = Math.floor(diff / HOUR);
    const rest = diff - hours * HOUR;
    if (rest > MINUTE) {
      return `${hours}小时${Math.floor(rest / MINUTE)}分钟前`;
    }
    return `${hours}小时前`;
  }
  if (diff > MINUTE) {
    const minutes = Math.floor(diff / MINUTE);
    const rest = diff - minutes * MINUTE;
    if (rest > 0) {
      return `${minutes}分${rest}秒前`;
    }
    return `${minutes}分钟前`;
  }
  return `${diff}秒前`;
}
