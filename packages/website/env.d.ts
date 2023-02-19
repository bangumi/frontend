declare module 'whatwg-fetch' {
  const fetch: typeof window.fetch;
  export { fetch };
}
