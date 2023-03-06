import { fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';

import type { EditorFormProps } from '..';
import EditorForm from '..';

const TestEditorForm = (props: EditorFormProps) => {
  const [value, setValue] = useState('');
  return <EditorForm value={value} onChange={setValue} {...props} />;
};

describe('<EditorForm />', () => {
  it('render correctly with props', () => {
    const { asFragment } = render(
      <TestEditorForm className='custom class' placeholder='placeholder' confirmText='Confirm' />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('onConfirm event', () => {
    const onConfirm = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <TestEditorForm onConfirm={onConfirm} confirmText='Confirm' placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    getByText('Confirm').click();
    expect(onConfirm).lastCalledWith('test');
  });

  it('onCancel event', () => {
    const onCancel = vi.fn();
    const { getByText } = render(<TestEditorForm onCancel={onCancel} />);
    getByText('取消').click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('Ctrl + Enter & Alt + S should trigger onConfirm event', () => {
    const onConfirm = vi.fn();
    const { getByPlaceholderText } = render(
      <TestEditorForm onConfirm={onConfirm} placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onConfirm).lastCalledWith('test');

    fireEvent.change(textarea, { target: { value: 'test2' } });
    fireEvent.keyDown(textarea, { key: 's', altKey: true });
    expect(onConfirm).lastCalledWith('test2');
  });
});
