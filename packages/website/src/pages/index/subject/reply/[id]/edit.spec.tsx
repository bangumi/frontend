import { act, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { UserProvider } from '@bangumi/website/hooks/use-user';
import subjectPostFixture from '@bangumi/website/mocks/fixtures/p1/subjects/-/posts/2-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';

import EditReplyPage from './edit';

describe('SubjectReplyEditPage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/subject/reply/2/edit']}>
        <HelmetProvider>
          <UserProvider>
            <Routes>
              <Route path='subject/reply/:id/edit' element={children} />
            </Routes>
          </UserProvider>
        </HelmetProvider>
      </MemoryRouter>
    );
    mockServer.use(
      http.get('http://localhost:3000/p1/subjects/-/posts/2', () =>
        HttpResponse.json(subjectPostFixture),
      ),
    );
    await act(async () => {
      render(
        <Suspense fallback={null}>
          <EditReplyPage />
        </Suspense>,
        { wrapper },
      );
    });
  };

  it('渲染回复内容与所属话题链接', async () => {
    await renderPage();

    expect(await screen.findByText(/修改主题/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '热门讨论标题' })).toHaveAttribute(
      'href',
      '/subject/topic/202',
    );
    expect(screen.getByDisplayValue('回复内容')).toBeInTheDocument();
  });
});
