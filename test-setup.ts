import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
// import fetch from 'cross-fetch';
import { afterEach, expect } from 'vitest';

expect.extend(matchers);
// vi.stubGlobal('fetch', fetch);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
