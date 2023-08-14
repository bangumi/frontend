export function onRequest(context) {
  const url = new URL(context.request.url);
  url.hostname = 'next.bgm38.com';
  return fetch(new Request(url, context.request));
}
