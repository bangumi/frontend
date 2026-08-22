import { act, render } from '@testing-library/react';
import React from 'react';

import { ToastContainer } from '@bangumi/design/components/Toast/ToastContainer.tsx';
import {
  insertToastEvent,
  removeToastEvent,
} from '@bangumi/design/components/Toast/utils/event-bus.ts';

it('should call onEmpty callback when no toast remains', () => {
  const onEmpty = vi.fn();
  render(<ToastContainer onEmpty={onEmpty} />);
  expect(onEmpty).not.toHaveBeenCalled();

  const newToast = { message: 'test', tid: '1' };
  act(() => {
    insertToastEvent.emit(newToast);
  });
  expect(onEmpty).not.toHaveBeenCalled();
  act(() => {
    removeToastEvent.emit(newToast);
  });
  expect(onEmpty).toHaveBeenCalled();
});
