export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.hostname = 'next.bgm38.com';
    return fetch(new Request(url, request));
  },
};
