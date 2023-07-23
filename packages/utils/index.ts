export {
  parse as parseWiki,
  WikiSyntaxError,
  WikiItem,
  WikiArrayItem,
  stringify as stringifyWiki,
} from '@bgm38/wiki';
export { toWikiElement, fromWikiElement, WikiElement, mergeWiki, WikiTemplate } from './wiki';
export type { Wiki } from '@bgm38/wiki';
export * from './bbcode';

/**
 * 输入一个对象数组，提取对象中的某个值作为新对象中的键，值为对象本身
 *
 * @example
 * const arr = [{key:1,name:'david'},{key:2,name:'lucy'}]
 * keyBy(arr) === {
 *  1:{key:1,name:'david'},
 *  2:{key:2,name:'lucy'}
 * }
 *
 * @param collection 具有相同结构的对象（T）数组
 * @param key （T）中的某个key
 * @returns 以（T）中键为 key 的值为新对象的键，值为（T）本身
 */
export const keyBy = <T extends Record<R, T[R]>, R extends keyof T>(
  collection: T[],
  key: R,
): Record<T[R], T> => {
  return collection.reduce<Record<T[R], T>>((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
};

export class UnreadableCodeError extends Error {
  readonly args: unknown[];

  constructor(
    readonly message: string,
    ...args: unknown[]
  ) {
    super();
    this.args = args;
  }

  toString(): string {
    return `UnreadableCodeError(${this.message}, ${this.args
      .map((x) => x?.toString())
      .join(', ')})`;
  }
}
