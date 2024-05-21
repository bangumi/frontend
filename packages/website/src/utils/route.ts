const noLayoutRoutes = new Set(['/login']);

export function isNoLayoutRoute(pathname: string): boolean {
  return noLayoutRoutes.has(pathname);
}

export function redirectTo(pathname: string): void {
  window.location.replace(pathname);
}
