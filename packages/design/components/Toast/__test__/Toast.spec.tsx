import { act, render } from '@testing-library/react';
import React from 'react';

import { Toast } from '@bangumi/design/components/Toast/index.tsx';
import type { Toast as TToast } from '@bangumi/design/components/Toast/types.ts';
import { removeToastEvent } from '@bangumi/design/components/Toast/utils/event-bus.ts';

vi.mock('../utils/event-bus');

function expectToastToBeClosed(toast: TToast) {
  expect(removeToastEvent.emit).toHaveBeenCalledWith(toast);
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('should show message and disappear after given time', () => {
  const toast: TToast = { message: 'test', tid: '1', type: 'info', timeout: 1000 };
  const { getByText } = render(<Toast toast={toast} />);

  act(() => {
    expect(getByText('test')).toBeInTheDocument();
    // 包含 transition 的时间
    vi.advanceTimersByTime(1000 + 300);
    expectToastToBeClosed(toast);
  });
});
