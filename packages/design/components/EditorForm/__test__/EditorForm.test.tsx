import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditorForm from '..';

describe('<EditorForm />', () => {
  it('render correctly with props', () => {
    const { asFragment } = render(
      <EditorForm className='custom class' placeholder='placeholder' confirmText='Confirm' />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('onConfirm event', () => {
    const onConfirm = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <EditorForm onConfirm={onConfirm} confirmText='Confirm' placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;
    textarea.value = 'test';
    getByText('Confirm').click();
    expect(onConfirm).lastCalledWith('test');
  });

  it('onCancel event', () => {
    const onCancel = jest.fn();
    const { getByText } = render(<EditorForm onCancel={onCancel} />);
    getByText('取消').click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('Ctrl + Enter & Alt + S should trigger onConfirm event', async () => {
    const onConfirm = jest.fn();
    const { getByPlaceholderText } = render(
      <EditorForm onConfirm={onConfirm} placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    textarea.value = 'test';
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onConfirm).lastCalledWith('test');

    textarea.value = 'test2';
    fireEvent.keyDown(textarea, { key: 's', altKey: true });
    expect(onConfirm).lastCalledWith('test2');
  });
});
