export { default as parseWiki } from './wiki/parser'
export { render, convert } from './bbcode'
export * from './bbcode'

export const keyBy = <T extends Record<string, any>, R extends keyof T>(collection: T[], key: R): Record<T[R], T> => {
  return collection.reduce((pre, cur) => ({
    ...pre,
    [cur[key]]: cur
  }), Object.assign({}))
}
