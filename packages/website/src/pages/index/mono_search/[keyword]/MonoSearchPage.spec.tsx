import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  characterSearchFixture,
  personSearchFixture,
} from '@bangumi/website/mocks/fixtures/p1/search/index.ts';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';
import { renderPage } from '@bangumi/website/utils/test-utils.tsx';

import MonoSearchPage from './index.tsx';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockedUseParams = vi.mocked(useParams);
const mockedUseSearchParams = vi.mocked(useSearchParams);

beforeEach(() => {
  mockedUseParams.mockReturnValue({ keyword: '巨人' });
  mockedUseSearchParams.mockReturnValue([new URLSearchParams('cat=crt'), vi.fn()]);

  mockServer.use(
    http.post('http://localhost:3000/p1/search/characters', () =>
      HttpResponse.json(characterSearchFixture),
    ),
    http.post('http://localhost:3000/p1/search/persons', () =>
      HttpResponse.json(personSearchFixture),
    ),
  );
});

describe('MonoSearchPage', () => {
  it('renders character results with pagination', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <MonoSearchPage />
        </Suspense>,
      );
    });

    const links = await screen.findAllByRole('link');
    expect(links.some((el) => el.getAttribute('href') === '/character/99657')).toBe(true);
    expect(screen.getByText('找到 40 个结果')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '虚构角色' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders person results with career filter when cat=prsn', async () => {
    mockedUseSearchParams.mockReturnValue([new URLSearchParams('cat=prsn'), vi.fn()]);
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <MonoSearchPage />
        </Suspense>,
      );
    });

    const links = await screen.findAllByRole('link');
    expect(links.some((el) => el.getAttribute('href') === '/person/49410')).toBe(true);
    expect(screen.getByText('找到 3 个结果')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: '' })).toBeInTheDocument();
  });
});
