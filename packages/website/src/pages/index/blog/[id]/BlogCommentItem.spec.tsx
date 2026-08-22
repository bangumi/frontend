import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import type { CommentBase } from '@bangumi/client/client.ts';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';

import BlogComments from './components/BlogComments.tsx';

vi.mock('@bangumi/website/hooks/use-user', async () => ({
  ...(await vi.importActual<typeof import('@bangumi/website/hooks/use-user.tsx')>(
    '@bangumi/website/hooks/use-user',
  )),
  useUser: () => ({
    user: {
      id: 1,
      username: 'sai',
      nickname: 'Sai',
      avatar: { small: '', medium: '', large: '' },
    },
  }),
}));

type CommentWithReplies = CommentBase & { replies: CommentBase[] };

const ownComment: CommentWithReplies = {
  id: 1001,
  mainID: 0,
  creatorID: 1,
  relatedID: 0,
  createdAt: 1700000000,
  content: '我的评论',
  state: 0,
  user: {
    id: 1,
    username: 'sai',
    nickname: 'Sai',
    avatar: { small: '', medium: '', large: '' },
    group: 2,
    sign: '',
    joinedAt: 0,
    isFriend: false,
  },
  replies: [],
};

describe('BlogComments 评论编辑', () => {
  const renderComments = async (comments: CommentWithReplies[]) => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter>
        <HelmetProvider>{children}</HelmetProvider>
      </MemoryRouter>
    );
    await act(async () => {
      render(
        <BlogComments entryId={123} comments={comments} onCommentUpdate={async () => undefined} />,
        { wrapper },
      );
    });
  };

  it('自己的评论可编辑，保存调用 updateBlogComment', async () => {
    let putBody: unknown = null;
    mockServer.use(
      http.put('http://localhost:3000/p1/blogs/-/comments/1001', async ({ request }) => {
        putBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    await renderComments([ownComment]);

    const item = screen.getByText('我的评论').closest('.blog-comment__main') as HTMLElement;
    await act(async () => {
      fireEvent.click(within(item).getByRole('button', { name: '编辑' }));
    });

    const textarea = within(item).getByRole('textbox');
    await act(async () => {
      fireEvent.input(textarea, { target: { value: '修改后的评论' } });
    });
    await act(async () => {
      fireEvent.click(within(item).getByRole('button', { name: '写好了' }));
    });

    expect(putBody).toEqual({ content: '修改后的评论' });
  });
});
