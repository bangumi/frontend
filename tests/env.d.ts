// @types/whatwg-fetch has wrong type def
// https://github.com/github/fetch#importing

declare module 'whatwg-fetch' {
  const fetch: typeof window.fetch;
  export { fetch };
}
