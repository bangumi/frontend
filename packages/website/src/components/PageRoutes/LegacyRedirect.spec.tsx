import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { matchRoutes, MemoryRouter } from 'react-router-dom';

import { redirectTo } from '@bangumi/website/utils/route';

import { pageRoutes } from '../../routes';
import LegacyRedirect from './LegacyRedirect';

vi.mock('@bangumi/website/utils/route', () => ({
  redirectTo: vi.fn(),
}));

it('redirects a registered legacy path to the legacy site', async () => {
  render(
    <MemoryRouter initialEntries={['/subject/12/collections?filter=3#users']}>
      <LegacyRedirect />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(redirectTo).toHaveBeenCalledWith('https://bgm.tv/subject/12/collections?filter=3#users');
  });
});

it.each(['/subject/12/collections', '/subject/12/stats'])(
  'registers %s as a legacy route',
  (path) => {
    const matches = matchRoutes(pageRoutes, path);
    const element = matches?.at(-1)?.route.element;
    expect(React.isValidElement(element)).toBe(true);
    if (React.isValidElement(element)) {
      expect(element.type).toBe(LegacyRedirect);
    }
  },
);

it.each(['/subject/topic/42', '/subject/ep/42', '/blog/42'])(
  'forwards %s to the new frontend instead of the legacy site',
  (path) => {
    const matches = matchRoutes(pageRoutes, path);
    const element = matches?.at(-1)?.route.element;
    expect(React.isValidElement(element)).toBe(true);
    if (React.isValidElement(element)) {
      expect(element.type).not.toBe(LegacyRedirect);
    }
  },
);

it('keeps unknown paths on the not-found route', () => {
  const matches = matchRoutes(pageRoutes, '/not-a-known-page');
  expect(matches?.at(-1)?.route.path).toBe('*');
});
