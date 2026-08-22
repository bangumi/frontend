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

import PersonPage from './index.tsx';

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

describe('PersonDetail', () => {
  it('should render header, infobox and sections', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <PersonPage />
        </Suspense>,
      );
    });

    // header：姓名与导航 tabs
    expect((await screen.findAllByText('中村章吾')).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: '概览' })).toHaveAttribute('href', '/person/21884');
    expect(screen.getByRole('link', { name: '作品' })).toHaveAttribute(
      'href',
      '/person/21884/works',
    );
    expect(document.querySelector('main')?.className).toContain('max-w_1260px');
    expect(document.querySelector('main')?.className).toContain('p_10px_15px_24px');

    // 左栏：infobox 与收藏者
    // span 内的文本被拆分成多个 text node，用函数匹配器
    expect(
      screen.getByText(
        (content, element) => element?.tagName === 'SPAN' && content.startsWith('性别'),
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'pro-tanc.com/male/nakamurashougo/' })).toHaveAttribute(
      'href',
      'http://www.pro-tanc.com/male/nakamurashougo/',
    );
    expect(screen.getByRole('heading', { name: '谁收藏了中村章吾?' })).toBeInTheDocument();
    // 头像链接 + 昵称链接 + 目录面板 by 作者均为同一昵称
    expect(screen.getAllByRole('link', { name: '纯セン羽爱' })[0]).toHaveAttribute(
      'href',
      '/user/asm13177806',
    );
    // 收藏人数统计（collects fixture total=1）
    expect(screen.getByText('1人收藏')).toBeInTheDocument();

    // 左栏：推荐本条目的目录
    expect(screen.getByRole('heading', { name: '推荐本条目的目录' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '声优安利目录' })).toHaveAttribute(
      'href',
      '/index/602059',
    );
    expect(screen.getAllByRole('link', { name: '纯セン羽爱' })[0]).toHaveAttribute(
      'href',
      '/user/asm13177806',
    );

    // 主栏：职业 / 简介
    expect(screen.getByRole('heading', { name: /职业: 声优/ })).toBeInTheDocument();
    expect(screen.getByText(/日本の男性俳優/)).toBeInTheDocument();

    // 人物评论支持 BBCode 和表情，但图片降级为链接
    expect(screen.getByText('人物评论').tagName).toBe('STRONG');
    expect(screen.getByRole('img', { name: '(bgm38)' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'https://example.com/person-comment.png' }),
    ).toHaveAttribute('href', 'https://example.com/person-comment.png');

    // 最近演出角色
    expect(screen.getByRole('heading', { name: '最近演出角色' })).toBeInTheDocument();
    expect(screen.getAllByText('柴田').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'ヤニねこ' })[0]).toHaveAttribute(
      'href',
      '/subject/622206',
    );

    // 最近参与（fixture 无数据，标题仍在）
    expect(screen.getByRole('heading', { name: '最近参与' })).toBeInTheDocument();
    // 关联人物（fixture 无数据，不渲染）
    expect(screen.queryByRole('heading', { name: '关联人物' })).not.toBeInTheDocument();
    // 吐槽箱
    expect(screen.getByRole('heading', { name: '吐槽箱' })).toBeInTheDocument();
  });

  it('should show not found page when person does not exist', async () => {
    // 使用不同的 personID，避免 SWR 缓存复用上一个测试的 key
    mockedUseParams.mockReturnValue({ id: '9999' });
    mockServer.use(
      http.get('http://localhost:3000/p1/persons/9999', () =>
        HttpResponse.json({ message: 'person not found' }, { status: 404 }),
      ),
    );

    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <PersonPage />
        </Suspense>,
      );
    });

    expect(await screen.findByText('没有找到人物')).toBeInTheDocument();
  });
});
