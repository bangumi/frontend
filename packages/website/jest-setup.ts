import fetch from 'cross-fetch';
import timezoneMock from 'timezone-mock';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

import { server } from './src/mocks/server';

globalThis.fetch = fetch;

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  timezoneMock.register('Etc/GMT');
});

afterEach(() => {
  server.resetHandlers();
  timezoneMock.unregister();
});

afterAll(() => {
  server.close();
});
