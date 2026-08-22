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

import PersonWorksPage from './works.tsx';

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

describe('PersonWorks', () => {
  it('should render the work list with positions', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <PersonWorksPage />
        </Suspense>,
      );
    });

    expect(await screen.findByText('「中村章吾」的作品')).toBeInTheDocument();

    // 作品标题链接到条目
    const workLink = screen.getByRole('link', { name: 'ヤニねこ' });
    expect(workLink).toHaveAttribute('href', '/subject/622206');
    expect(screen.getByRole('link', { name: 'テストアニメ' })).toHaveAttribute(
      'href',
      '/subject/622207',
    );

    // 职位标签
    expect(screen.getByText('导演')).toBeInTheDocument();
    expect(screen.getByText('脚本')).toBeInTheDocument();
    expect(screen.getByText('主演')).toBeInTheDocument();
  });

  it('should render the shared layout with person infobox', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <PersonWorksPage />
        </Suspense>,
      );
    });

    // 左栏 infobox 与导航 tabs 复用同一布局
    expect(await screen.findByRole('heading', { name: '推荐本条目的目录' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '角色' })).toHaveAttribute(
      'href',
      '/person/21884/works/voice',
    );
    expect(screen.getByRole('link', { name: '作品' })).toHaveAttribute(
      'href',
      '/person/21884/works',
    );
  });
});
