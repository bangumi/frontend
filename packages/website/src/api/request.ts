export async function privateGet(url: string): Promise<any> {
  const res = await fetch(url, {
    credentials: 'same-origin',
    method: 'get',
  });
  return await res.json();
}

export function privatePost(
  url: string,
  options: { json: Record<string, any> },
): Promise<Response> {
  let body: BodyInit | null = null;
  const header = new Headers();
  if (options.json) {
    body = JSON.stringify(options.json);
    header.set('content-type', 'application/json');
  }

  return fetch(url, {
    credentials: 'same-origin',
    method: 'post',
    body,
    headers: header,
  });
}
