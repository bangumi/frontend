import { fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import type { EditorFormProps } from '..';
import EditorForm from '..';

const TestEditorForm = (props: EditorFormProps) => {
  const [value, setValue] = useState('');
  return <EditorForm value={value} onChange={setValue} {...props} />;
};

function renderEditorForm(element: React.ReactElement) {
  return render(<MemoryRouter>{element}</MemoryRouter>);
}

describe('<EditorForm />', () => {
  it('render correctly with props', () => {
    const { container, getByPlaceholderText, getByRole, getByText } = renderEditorForm(
      <TestEditorForm className='custom class' placeholder='placeholder' confirmText='Confirm' />,
    );

    expect(container.querySelector('.bgm-editor__form.custom.class')).not.toBeNull();
    expect(getByPlaceholderText('placeholder')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByRole('button', { name: '预览' })).toBeTruthy();
    expect(getByText('BBCode指南')).toBeTruthy();
  });

  it('onConfirm event', () => {
    const onConfirm = vi.fn();
    const { getByText, getByPlaceholderText } = renderEditorForm(
      <TestEditorForm onConfirm={onConfirm} confirmText='Confirm' placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    getByText('Confirm').click();
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

  it('toggles a live BBCode preview without losing editor content', () => {
    const { container, getByPlaceholderText, getByRole } = renderEditorForm(
      <TestEditorForm placeholder='placeholder' />,
    );
    const textarea = getByPlaceholderText('placeholder') as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: '[b]hello[/b]' } });
    fireEvent.click(getByRole('button', { name: '预览' }));

    expect(container.querySelector('.bgm-editor__preview strong')?.textContent).toBe('hello');

    fireEvent.change(textarea, { target: { value: '[i]world[/i]' } });
    expect(container.querySelector('.bgm-editor__preview em')?.textContent).toBe('world');

    fireEvent.click(getByRole('button', { name: '关闭预览' }));
    expect(container.querySelector('.bgm-editor__preview')).toBeNull();
    expect(textarea.value).toBe('[i]world[/i]');
  });
});
