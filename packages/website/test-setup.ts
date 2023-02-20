import timezoneMock from 'timezone-mock';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

import { server } from './src/mocks/server';

vi.stubGlobal('fetch', fetchPolyfill);

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
