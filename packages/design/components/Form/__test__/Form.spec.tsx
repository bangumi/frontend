import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../Button';
import Input from '../../Input';
import Form from '..';

const MyForm = ({ handleKeyDown }: { handleKeyDown?: React.KeyboardEventHandler }) => {
  const { handleSubmit } = useForm();
  const [count, setCount] = useState(0);
  const onSubmit = () => {
    setCount(1);
  };
  return (
    <Form data-testid='form' onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
      <Input id='input' data-count={count} data-testid='input' />
      <Button htmlType='submit' data-testid='submit'>
        Submit
      </Button>
    </Form>
  );
};

describe('Form Components', () => {
  it('should not refresh onSubmit', async () => {
    const { findByTestId } = render(<MyForm />);
    const btn = await findByTestId('submit');
    const input = await findByTestId('input');
    btn.click();
    await waitFor(() => {
      expect(input.dataset.count).toBe('1');
    });
  });

  it('key down should work properly', async () => {
    const handleKeyDown = jest.fn();
    const { getByTestId } = render(<MyForm handleKeyDown={handleKeyDown} />);
    const form = getByTestId('form');
    const input = getByTestId('input');
    fireEvent.keyDown(form, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(input.dataset.count).toBe('0');
      expect(handleKeyDown).toBeCalled();
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
});
