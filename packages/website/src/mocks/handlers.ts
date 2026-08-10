import { mockAPI } from './utils';

export const handlers = [
  mockAPI('/p1/me', 'get'),
  mockAPI('/p1/home', 'get'),
  mockAPI('/p1/users/:username', 'get'),
  mockAPI('/p1/users/:username/friends', 'get'),
  mockAPI('/p1/users/:username/groups', 'get'),
  mockAPI('/p1/users/:username/indexes', 'get'),
  mockAPI('/p1/users/:username/blogs', 'get'),
  mockAPI('/p1/users/:username/collections/subjects', 'get'),
];
