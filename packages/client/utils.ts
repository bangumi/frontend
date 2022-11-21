export async function response(res: Response) {
  if (res.status === 204) {
    return {
      url: res.url,
      data: undefined,
      status: res.status,
      headers: res.headers,
      ok: res.ok,
    };
  }

  return {
    url: res.url,
    data: (await res.json()) as unknown,
    status: res.status,
    headers: res.headers,
    ok: res.ok,
  };
}
