import { act, fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user.tsx';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';

import IndexCreatePage from './create.tsx';

describe('IndexCreatePage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter initialEntries={['/index/create']}>
            <HelmetProvider>
              <UserProvider>{children}</UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(<IndexCreatePage />, { wrapper });
    });
  };

  it('渲染创建表单', async () => {
    await renderPage();

    expect(screen.getByPlaceholderText('给目录取一个标题')).toBeInTheDocument();
    expect(screen.getByText('公开')).toBeInTheDocument();
    expect(screen.getByText('仅自己可见')).toBeInTheDocument();
  });

  it('提交表单调用 createIndex', async () => {
    let postBody: unknown = null;
    mockServer.use(
      http.post('http://localhost:3000/p1/indexes', async ({ request }) => {
        postBody = await request.json();
        return HttpResponse.json({ id: 123 }, { status: 200 });
      }),
    );

    await renderPage();

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('给目录取一个标题'), {
        target: { value: '新目录' },
      });
    });

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('目录描述，支持 BBCode…'), {
        target: { value: '新目录描述' },
      });
    });

    // 点击确认按钮提交（EditorForm 的 onConfirm 触发 handleSubmit）
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '创建目录' }));
    });

    expect(postBody).toEqual({ title: '新目录', desc: '新目录描述', private: false });
  });
});
