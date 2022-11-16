export async function privateGet (url: string): Promise<any> {
  const res = await fetch(
    url,
    {
      credentials: 'include',
      method: 'get'
    }
  )
  return await res.json()
}

export function privatePost (url: string, options: { json: Record<string, any> }): Promise<Response> {
  return fetch(
    url,
    {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify(options.json),
      headers: { 'content-type': 'application/json' }
    }
  )
}
