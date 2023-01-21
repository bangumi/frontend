import { render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../Button';
import Input from '../../Input';
import Form from '..';

const MyForm = () => {
  const { handleSubmit } = useForm();
  const [count, setCount] = useState(0);
  const onSubmit = () => {
    setCount(1);
  };
  return (
    <Form data-testid='form' onSubmit={handleSubmit(onSubmit)}>
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
});
