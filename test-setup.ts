import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
