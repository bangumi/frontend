import timezoneMock from 'timezone-mock';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

import { server } from '@bangumi/website/mocks/server';

import { defaults } from '../packages/client/client';

defaults.fetch = fetchPolyfill;

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
