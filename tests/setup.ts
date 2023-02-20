import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

expect.extend(matchers);

vi.stubGlobal('jest', vi);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
