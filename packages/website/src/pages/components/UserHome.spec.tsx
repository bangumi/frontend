// @ts-nocheck
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { useUser } from '../../hooks/use-user';
import UserHome from './UserHome';

vi.mock('../../hooks/use-user');

const mockedUseUser = vi.mocked(useUser);

it('should show user name if user is logged', () => {
  mockedUseUser.mockReturnValue({
    user: {
      nickname: 'testuser',
      username: 'testuser-123',
    },
  });

  const { getByText } = render(
    <MemoryRouter>
      <UserHome />
    </MemoryRouter>,
  );

  expect(getByText('testuser')).toHaveAttribute('href', '/user/testuser-123');
});
