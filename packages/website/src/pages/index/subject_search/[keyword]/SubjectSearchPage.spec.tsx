import { act, fireEvent, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  characterSearchFixture,
  personSearchFixture,
  subjectSearchFixture,
} from '@bangumi/website/mocks/fixtures/p1/search';
import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import SubjectSearchPage from '.';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockedUseParams = vi.mocked(useParams);
const mockedUseSearchParams = vi.mocked(useSearchParams);

beforeEach(() => {
  mockedUseParams.mockReturnValue({ keyword: '巨人' });
  mockedUseSearchParams.mockReturnValue([new URLSearchParams('cat=2'), vi.fn()]);

  mockServer.use(
    http.post('http://localhost:3000/p1/search/subjects', () =>
      HttpResponse.json(subjectSearchFixture),
    ),
    http.post('http://localhost:3000/p1/search/characters', () =>
      HttpResponse.json(characterSearchFixture),
    ),
    http.post('http://localhost:3000/p1/search/persons', () =>
      HttpResponse.json(personSearchFixture),
    ),
  );
});

it('renders typed search fixtures and persists the selected view', async () => {
  await act(async () => {
    renderPage(
      <Suspense fallback={null}>
        <SubjectSearchPage />
      </Suspense>,
    );
  });

  expect(await screen.findByRole('link', { name: '巨人之星' })).toHaveAttribute(
    'href',
    '/subject/41983',
  );
  expect(screen.getByText('找到 62 个条目')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '动画' }).className).toContain('bg_#f09199');
  expect(screen.getByRole('heading', { name: '相关人物' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: '网格视图' }));
  expect(window.localStorage.getItem('bangumi-subject-search-view')).toBe('grid');
});
