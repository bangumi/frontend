import 'progress-event-polyfill';

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

if (typeof globalThis.ProgressEvent === 'undefined') {
  class ProgressEventPolyfill<T extends EventTarget = EventTarget> extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;

    constructor(type: string, init?: ProgressEventInit) {
      super(type, init);
      this.lengthComputable = init?.lengthComputable ?? false;
      this.loaded = init?.loaded ?? 0;
      this.total = init?.total ?? 0;
    }
  }

  Object.defineProperty(globalThis, 'ProgressEvent', {
    value: ProgressEventPolyfill,
    writable: true,
    configurable: true,
  });
}

expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
