import { render } from '@testing-library/react';
import React from 'react';

import { Toast } from '..';
import type { Toast as TToast } from '../types';
import { removeToastEvent } from '../utils/event-bus';

jest.mock('../utils/event-bus');

function expectToastToBeClosed(toast: TToast) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(removeToastEvent.emit).toBeCalledWith(toast);
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should show message and disappear after given time', () => {
  const toast: TToast = { message: 'test', tid: '1', timeout: 1000 };
  const { getByText } = render(<Toast toast={toast} />);

  expect(getByText('test')).toBeInTheDocument();
  // 包含 transition 的时间
  jest.advanceTimersByTime(1000 + 300);
  expectToastToBeClosed(toast);
});
