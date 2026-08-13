import { act, render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user';

import PmConversationPage from '.';

describe('PmConversationPage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter initialEntries={['/pm/conversation/101']}>
            <HelmetProvider>
              <UserProvider>
                <Routes>
                  <Route path='pm/conversation/:msgID' element={children} />
                </Routes>
              </UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(<PmConversationPage />, { wrapper });
    });
    await screen.findByText('你好呀');
  };

  it('renders thread messages and reply form', async () => {
    await renderPage();

    // 会话标题与双方昵称
    expect(screen.getByText('你好呀')).toBeInTheDocument();
    expect(screen.getAllByText('Sai').length).toBeGreaterThan(0);
    expect(screen.getByText('我')).toBeInTheDocument();

    // 消息正文
    expect(screen.getByText(/欢迎来到新前端/)).toBeInTheDocument();
    expect(screen.getByText(/谢谢！界面很棒/)).toBeInTheDocument();
    expect(screen.getByText(/有任何问题欢迎反馈/)).toBeInTheDocument();

    // 回复框
    expect(screen.getByPlaceholderText('回复内容…')).toBeInTheDocument();
  });
});
