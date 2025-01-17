export function onRequest(context) {
  const url = new URL(context.request.url);
  url.hostname = 'next.bgm38.tv';
  return fetch(new Request(url, context.request));
}
