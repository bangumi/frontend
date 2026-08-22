import { act, fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import { server as mockServer } from '@bangumi/website/mocks/server.ts';

import BlogForm from './components/BlogForm.tsx';

vi.mock('@bangumi/website/hooks/use-user', async () => ({
  ...(await vi.importActual<typeof import('@bangumi/website/hooks/use-user.tsx')>(
    '@bangumi/website/hooks/use-user',
  )),
  useUser: () => ({ user: { id: 1, username: 'sai', nickname: 'Sai' } }),
}));

describe('BlogForm 发布', () => {
  const renderForm = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/blog/create']}>
        <HelmetProvider>{children}</HelmetProvider>
      </MemoryRouter>
    );
    await act(async () => {
      render(<BlogForm />, { wrapper });
    });
  };

  it('提交调用 POST /p1/blogs（含 title/content/tags/public）', async () => {
    let postBody: unknown = null;
    mockServer.use(
      http.post('http://localhost:3000/p1/blogs', async ({ request }) => {
        postBody = await request.json();
        return HttpResponse.json({ id: 999 }, { status: 200 });
      }),
    );
    await renderForm();

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('给日志取一个标题'), {
        target: { value: '我的日志' },
      });
    });
    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('日志正文，支持 BBCode…'), {
        target: { value: '日志正文内容' },
      });
    });
    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('Tag，用空格或逗号分隔（可选）'), {
        target: { value: '动画 感想' },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '发表日志' }));
    });

    expect(postBody).toMatchObject({
      title: '我的日志',
      content: '日志正文内容',
      tags: ['动画', '感想'],
      public: true,
    });
  });
});
