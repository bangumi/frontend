import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import Button from '../../Button';
import EditorForm from '../../EditorForm';
import Input from '../../Input';
import Form from '..';

describe('Form Components', () => {
  it('should submit when submit button clicked', async () => {
    const handleSubmit = vi.fn();
    const { findByTestId } = render(
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Button htmlType='submit' data-testid='submit'>
          Submit
        </Button>
      </Form>,
    );
    const btn = await findByTestId('submit');
    btn.click();
    await waitFor(() => {
      expect(handleSubmit).toBeCalled();
    });
  });

  it('key down should work properly', async () => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <Form data-testid='form' onKeyDown={onKeyDown}>
        <Input id='input' data-testid='input' />
        <Button htmlType='submit' data-testid='submit'>
          Submit
        </Button>
      </Form>,
    );
    const form = getByTestId('form');
    fireEvent.keyDown(form, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(onKeyDown).toBeCalled();
    });
  });

  it('form item render properly', () => {
    const { container } = render(
      <Form labelWidth={120}>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input.Group>
            <Input />
            <Input />
          </Input.Group>
        </Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it('render compact layout properly', () => {
    const { container } = render(
      <Form compact>
        <Input />
        <Input />
        <EditorForm />
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });
});
