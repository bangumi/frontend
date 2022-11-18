const noLayoutRoutes = new Set(['/login']);

export function isNoLayoutRoute(pathname: string): boolean {
  return noLayoutRoutes.has(pathname);
}
