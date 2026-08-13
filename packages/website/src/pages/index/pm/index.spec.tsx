import { render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user';

import PmInboxPage from '.';

describe('PmInboxPage', () => {
  const renderPage = async () => {
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
    render(<PmInboxPage />, { wrapper });
    await screen.findByText('私信');
  };

  it('renders inbox conversations with unread badge', async () => {
    await renderPage();

    // 会话按最后消息时间倒序，Sai 会话最新
    expect(screen.getByRole('link', { name: /有任何问题欢迎反馈/ })).toHaveAttribute(
      'href',
      '/pm/conversation/101',
    );
    expect(screen.getByRole('link', { name: /关于新番/ })).toHaveAttribute(
      'href',
      '/pm/conversation/201',
    );

    // 对方昵称与未读数
    expect(screen.getByText('Sai')).toBeInTheDocument();
    expect(screen.getByText('小叽')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
