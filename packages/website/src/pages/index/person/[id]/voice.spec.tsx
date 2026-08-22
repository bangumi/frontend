import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import {
  personCastsFixture,
  personCollectsFixture,
  personCommentsFixture,
  personFixture,
  personIndexesFixture,
  personRelationsFixture,
  personWorksFixture,
} from '@bangumi/website/mocks/fixtures/p1/persons/21884/index.ts';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';
import { renderPage } from '@bangumi/website/utils/test-utils.tsx';

import PersonVoicePage from './voice.tsx';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

function mockPersonAPI() {
  mockServer.use(
    http.get('http://localhost:3000/p1/persons/21884', () => HttpResponse.json(personFixture)),
    http.get('http://localhost:3000/p1/persons/21884/casts', () =>
      HttpResponse.json(personCastsFixture),
    ),
    http.get('http://localhost:3000/p1/persons/21884/works', () =>
      HttpResponse.json(personWorksFixture),
    ),
    http.get('http://localhost:3000/p1/persons/21884/relations', () =>
      HttpResponse.json(personRelationsFixture),
    ),
    http.get('http://localhost:3000/p1/persons/21884/collects', () =>
      HttpResponse.json(personCollectsFixture),
    ),
    http.get('http://localhost:3000/p1/persons/21884/comments', () =>
      HttpResponse.json(personCommentsFixture),
    ),
    http.get('http://localhost:3000/p1/persons/21884/indexes', () =>
      HttpResponse.json(personIndexesFixture),
    ),
  );
}

beforeEach(() => {
  mockedUseParams.mockReturnValue({ id: '21884' });
  mockPersonAPI();
});

describe('PersonVoice', () => {
  it('should render the cast list with characters and subjects', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <PersonVoicePage />
        </Suspense>,
      );
    });

    expect(await screen.findByText('「中村章吾」的角色')).toBeInTheDocument();

    // 角色链接
    const characterLink = screen.getByRole('link', { name: '柴田' });
    expect(characterLink).toHaveAttribute('href', '/character/217861');

    // 出演条目与角色类型（fixture relations type=2 → 配角）
    expect(screen.getByRole('link', { name: 'ヤニねこ' })).toHaveAttribute(
      'href',
      '/subject/622206',
    );
    expect(screen.getAllByText('配角').length).toBeGreaterThan(0);
  });

  it('should render the shared layout with person infobox', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <PersonVoicePage />
        </Suspense>,
      );
    });

    // 左栏 infobox 与导航 tabs 复用同一布局
    expect(await screen.findByRole('heading', { name: '谁收藏了中村章吾?' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '角色' })).toHaveAttribute(
      'href',
      '/person/21884/works/voice',
    );
  });
});
