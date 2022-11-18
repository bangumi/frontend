export class RequestError extends Error {
  readonly response: Response;

  constructor(response: Response) {
    super();
    this.response = response;
  }
}

export async function privateGet<T = unknown>(url: string): Promise<T> {
  const res: Response = await fetch(url, {
    credentials: 'same-origin',
    method: 'get',
  });

  if (res.status >= 400) {
    throw new RequestError(res);
  }

  return await res.json();
}

export async function privatePost(
  url: string,
  options: { json?: Record<string, any> },
): Promise<Response> {
  let body: BodyInit | null = null;
  const header = new Headers();
  if (options.json) {
    body = JSON.stringify(options.json);
    header.set('content-type', 'application/json');
  }

  return await fetch(url, {
    credentials: 'same-origin',
    method: 'post',
    body,
    headers: header,
  });
}
