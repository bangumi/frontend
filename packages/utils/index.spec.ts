import { describe, expect, test } from 'vitest';

import { keyBy } from './index';

describe('keyBy', () => {
  const collection: Array<{
    key: number;
    name: string;
  }> = [
    {
      key: 1,
      name: 'david',
    },
    {
      key: 2,
      name: 'lucy',
    },
  ];

  test('key 1', () => {
    expect(keyBy(collection, 'key')).toEqual({
      1: {
        key: 1,
        name: 'david',
      },
      2: {
        key: 2,
        name: 'lucy',
      },
    });
  });

  test('key 2', () => {
    expect(keyBy(collection, 'name')).toEqual({
      david: {
        key: 1,
        name: 'david',
      },
      lucy: {
        key: 2,
        name: 'lucy',
      },
    });
  });
});
