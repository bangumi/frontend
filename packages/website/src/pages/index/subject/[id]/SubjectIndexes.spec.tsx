import { act, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user.tsx';
import { subject602059IndexesFixture } from '@bangumi/website/mocks/fixtures/p1/subjects/602059/indexes-GET.ts';
import { subject602059Fixture } from '@bangumi/website/mocks/fixtures/p1/subjects/602059-GET.ts';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';
import { renderPage } from '@bangumi/website/utils/test-utils.tsx';

import SubjectIndexes from './components/SubjectIndexes.tsx';

const subject = subject602059Fixture;
const { data: indexes, total } = subject602059IndexesFixture;

describe('SubjectIndexes', () => {
  const renderIndexes = (props: Partial<React.ComponentProps<typeof SubjectIndexes>> = {}) =>
    renderPage(
      <SubjectIndexes
        subject={subject}
        indexes={indexes}
        total={total}
        currentPage={1}
        pageSize={20}
        onPageChange={() => undefined}
        {...props}
      />,
    );

  // 独立的 SWR 缓存：避免前序测试已缓存 /p1/me 的登录结果；
  // Suspense boundary 是 React 19 下 SWR suspense 挂起所必需的
  const renderIndexesLoggedOut = async (
    props: Partial<React.ComponentProps<typeof SubjectIndexes>> = {},
  ) => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter>
            <HelmetProvider>
              <UserProvider>{children}</UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(
        <SubjectIndexes
          subject={subject}
          indexes={indexes}
          total={total}
          currentPage={1}
          pageSize={20}
          onPageChange={() => undefined}
          {...props}
        />,
        { wrapper },
      );
    });
  };

  it('should render the index list with stats and timestamps', async () => {
    renderIndexes();

    // 标题链接指向目录页
    const title = await screen.findByRole('heading', { name: '2026年追番目录' });
    expect(title.closest('a')).toHaveAttribute('href', '/index/87073');
    // 统计：条目类型图标 + 数量（sprite 图标，数字作为可见文本，类型在 aria-label）
    expect(await screen.findByLabelText('动画 51')).toHaveTextContent('51');
    // 创建/更新时间（fixture 时间戳为 UTC，测试环境固定为 Etc/GMT）
    expect(screen.getByText('2026-1-1 03:41')).toBeInTheDocument();
    expect(screen.getByText('2026-7-16 14:58')).toBeInTheDocument();
    // 创建者链接（时间行中的昵称）
    expect(screen.getByText('曙光虹').closest('a')).toHaveAttribute('href', '/user/sgjs');
    // 多类型统计（96523：动画 67 + 书籍 1）
    expect(screen.getByLabelText('动画 67')).toHaveTextContent('67');
    expect(screen.getByLabelText('书籍 1')).toHaveTextContent('1');
    // 右栏条目卡
    expect(await screen.findByRole('link', { name: '返回条目' })).toHaveAttribute(
      'href',
      '/subject/602059',
    );
    // 全部 11 个目录都渲染
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(indexes.length);
  });

  it('should show the collect button when logged in', async () => {
    renderIndexes();

    const button = await screen.findByRole('link', { name: '收集至我的目录' });
    // /p1/me fixture 用户为 382951（树洞酱），按钮跳转旧站目录收集页
    expect(button).toHaveAttribute(
      'href',
      expect.stringContaining('/user/382951/index?add_related=602059'),
    );
  });

  it('should hide the collect button when not logged in', async () => {
    mockServer.use(
      http.get('http://localhost:3000/p1/me', () => HttpResponse.json({}, { status: 401 })),
    );

    await renderIndexesLoggedOut();

    expect(await screen.findByRole('heading', { name: '2026年追番目录' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '收集至我的目录' })).not.toBeInTheDocument();
  });

  it('should render an empty state when there are no indexes', () => {
    renderIndexes({ indexes: [], total: 0 });

    expect(screen.getByText('暂无目录')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
