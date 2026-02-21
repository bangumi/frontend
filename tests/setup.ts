import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

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

const progressEventCtor =
  typeof globalThis.ProgressEvent === 'undefined'
    ? ProgressEventPolyfill
    : globalThis.ProgressEvent;

Object.defineProperty(globalThis, 'ProgressEvent', {
  value: progressEventCtor,
  writable: true,
  configurable: true,
});

if (typeof global !== 'undefined' && typeof global.ProgressEvent === 'undefined') {
  Object.defineProperty(global, 'ProgressEvent', {
    value: progressEventCtor,
    writable: true,
    configurable: true,
  });
}

if (typeof window !== 'undefined' && typeof window.ProgressEvent === 'undefined') {
  Object.defineProperty(window, 'ProgressEvent', {
    value: progressEventCtor,
    writable: true,
    configurable: true,
  });
}

expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
