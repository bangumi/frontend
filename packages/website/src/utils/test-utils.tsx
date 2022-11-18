import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { LinkProvider } from '../components/Link';
import { UserProvider } from '../hooks/use-user';

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
