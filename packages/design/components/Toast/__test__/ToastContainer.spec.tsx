import { act, render } from '@testing-library/react';
import React from 'react';

import { ToastContainer } from '../ToastContainer';
import { insertToastEvent, removeToastEvent } from '../utils/event-bus';

it('should call onEmpty callback when no toast remains', () => {
  const onEmpty = vi.fn();
  render(<ToastContainer onEmpty={onEmpty} />);
  expect(onEmpty).not.toBeCalled();

  const newToast = { message: 'test', tid: '1' };
  act(() => {
    insertToastEvent.emit(newToast);
  });
  expect(onEmpty).not.toBeCalled();
  act(() => {
    removeToastEvent.emit(newToast);
  });
  expect(onEmpty).toBeCalled();
});
