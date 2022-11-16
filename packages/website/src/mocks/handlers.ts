import { mockAPI } from './utils';

const BASE_URL = (import.meta.env.VITE_APP_ROOT as string) ?? 'https://api.bgm.tv';

function buildAPIURL(path: string): string {
  return `${BASE_URL}${path}`;
}

export const handlers = [
  mockAPI(buildAPIURL('/v0/subjects/:subjectId'), 'get'),
  mockAPI(buildAPIURL('/v0/persons/:personId/characters'), 'get'),
  mockAPI(buildAPIURL('/v0/characters/:characterId'), 'get'),
  mockAPI(buildAPIURL('/v0/me'), 'get'),
  mockAPI('http://localhost/p/me', 'get'),
];
