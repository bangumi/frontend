import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { redirectTo } from '@bangumi/website/utils/route';

import MatchAll from './[...slug]';

vi.mock('@bangumi/website/utils/route', () => ({
  redirectTo: vi.fn(),
}));

it('redirects an unimplemented internal path to the legacy site', async () => {
  render(
    <MemoryRouter initialEntries={['/subject/12/collections?filter=3#users']}>
      <MatchAll />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(redirectTo).toHaveBeenCalledWith('https://bgm.tv/subject/12/collections?filter=3#users');
  });
});
