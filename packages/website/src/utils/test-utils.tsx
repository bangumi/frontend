import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import { UserProvider } from '../hooks/use-user';

HelmetProvider.canUseDOM = false;

const PageWrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <HelmetProvider>
      <UserProvider>{children}</UserProvider>
    </HelmetProvider>
  </MemoryRouter>
);

export const renderPage = (page: React.ReactElement, options?: RenderOptions): RenderResult => {
  return render(page, {
    wrapper: PageWrapper,
    ...options,
  });
};
