import { act, fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import type { EditorFormProps } from '@bangumi/design/components/EditorForm/index.tsx';
import EditorForm from '@bangumi/design/components/EditorForm/index.tsx';

const TestEditorForm = (props: EditorFormProps) => {
  const [value, setValue] = useState('');
  return <EditorForm value={value} onChange={setValue} {...props} />;
};

function renderEditorForm(element: React.ReactElement) {
  return render(<MemoryRouter>{element}</MemoryRouter>);
}

describe('<EditorForm />', () => {
  it('render correctly with props', () => {
    const { asFragment } = renderEditorForm(
      <TestEditorForm className='custom class' placeholder='placeholder' confirmText='Confirm' />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('onConfirm event', () => {
    const onConfirm = vi.fn();
    const { getByText, getByPlaceholderText } = renderEditorForm(
      <TestEditorForm onConfirm={onConfirm} confirmText='Confirm' placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenLastCalledWith('test');
  });

  it('onCancel event', () => {
    const onCancel = vi.fn();
    const { getByText } = renderEditorForm(<TestEditorForm onCancel={onCancel} />);
    getByText('取消').click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('Ctrl + Enter & Alt + S should trigger onConfirm event', () => {
    const onConfirm = vi.fn();
    const { getByPlaceholderText } = renderEditorForm(
      <TestEditorForm onConfirm={onConfirm} placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onConfirm).toHaveBeenLastCalledWith('test');

    fireEvent.change(textarea, { target: { value: 'test2' } });
    fireEvent.keyDown(textarea, { key: 's', altKey: true });
    expect(onConfirm).toHaveBeenLastCalledWith('test2');
  });

  it('disabled should prevent onConfirm via button click and keyboard shortcut', () => {
    const onConfirm = vi.fn();
    const { getByText, getByPlaceholderText } = renderEditorForm(
      <TestEditorForm
        onConfirm={onConfirm}
        confirmText='Confirm'
        placeholder='placeholder'
        disabled
      />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'test' } });
    const button = getByText('Confirm') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onConfirm).not.toHaveBeenCalled();

    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 's', altKey: true });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('should only submit once while an async confirmation is pending', async () => {
    let resolveSubmit: (() => void) | undefined;
    const onConfirm = vi.fn(async () => {
      await new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
    });
    const { getByText, getByPlaceholderText } = renderEditorForm(
      <TestEditorForm onConfirm={onConfirm} confirmText='Confirm' placeholder='placeholder' />,
    );
    const button = getByText('Confirm') as HTMLButtonElement;
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: 'test' } });
    act(() => {
      button.click();
      button.click();
      fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenLastCalledWith('test');
    expect(button.disabled).toBe(true);
    expect(button).toHaveAttribute('aria-busy', 'true');

    await act(async () => {
      resolveSubmit?.();
    });

    expect(button.disabled).toBe(false);
    expect(button).not.toHaveAttribute('aria-busy');
    fireEvent.click(button);
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it('controlled loading should prevent confirmation', () => {
    const onConfirm = vi.fn();
    const { getByText, getByPlaceholderText } = renderEditorForm(
      <TestEditorForm
        onConfirm={onConfirm}
        confirmText='Confirm'
        placeholder='placeholder'
        loading
      />,
    );
    const button = getByText('Confirm') as HTMLButtonElement;
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
