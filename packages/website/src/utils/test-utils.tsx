import React, { PropsWithChildren } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { UserProvider } from '../hooks/use-user';
import { MemoryRouter } from 'react-router-dom';
import { LinkProvider } from '../components/Link';

const PageWrapper = ({ children }: PropsWithChildren<{}>) => (
  <MemoryRouter>
    <LinkProvider>
      <UserProvider>{children}</UserProvider>
    </LinkProvider>
  </MemoryRouter>
);

export const renderPage = (page: React.ReactElement, options?: RenderOptions): RenderResult => {
  return render(page, {
    wrapper: PageWrapper,
    ...options,
  });
};
