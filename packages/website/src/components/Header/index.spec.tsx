import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { UserProvider } from '@bangumi/website/hooks/use-user';

import Header from '.';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </MemoryRouter>,
  );

describe('Header', () => {
  it('头像应链接到当前用户的个人主页', async () => {
    const { container } = renderHeader();

    // fixture: packages/website/src/mocks/fixtures/p1/me-GET.json，username 为 "382951"
    await waitFor(() => {
      expect(container.querySelector('a[href="/user/382951"]')).toBeInTheDocument();
    });
  });
});
