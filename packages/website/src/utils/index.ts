export const keyBy = <T extends Record<string, any>>(collection: T[], key: string): Record<string, T> => {
  return collection.reduce((pre, cur) => ({
    ...pre,
    [cur[key]]: cur
  }), {})
}
