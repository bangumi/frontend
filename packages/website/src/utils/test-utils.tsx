import React, { PropsWithChildren } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { UserProvider } from '../hooks/use-user';
import { MemoryRouter } from 'react-router-dom';

const PageWrapper = ({ children }: PropsWithChildren<{}>) => (
  <MemoryRouter>
    <UserProvider>{children}</UserProvider>
  </MemoryRouter>
);

export const renderPage = (page: React.ReactElement, options?: RenderOptions): RenderResult => {
  return render(page, {
    wrapper: PageWrapper,
    ...options,
  });
};
