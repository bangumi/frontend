import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import type { SlimUser, SubjectHomeResponse, SubjectInterestComment } from '@bangumi/client/client';
import homeFixture from '@bangumi/website/mocks/fixtures/p1/subjects/12/home-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';

import SubjectComments from './components/SubjectComments';

// 登录用户 sai（id=1）
vi.mock('@bangumi/website/hooks/use-user', async () => ({
  ...(await vi.importActual<typeof import('@bangumi/website/hooks/use-user')>(
    '@bangumi/website/hooks/use-user',
  )),
  useUser: () => ({
    user: { id: 1, username: 'sai', nickname: 'Sai', permissions: { subjectWikiEdit: true } },
  }),
}));

const homeData = homeFixture as unknown as SubjectHomeResponse;

function makeUser(id: number, nickname: string): SlimUser {
  return {
    id,
    username: `user${id}`,
    nickname,
    avatar: { small: '', medium: '', large: '' },
    group: 2,
    sign: '',
    joinedAt: 0,
    isFriend: false,
  };
}

const ownComment: SubjectInterestComment = {
  id: 2001,
  user: makeUser(1, 'Sai'),
  type: 2,
  rate: 8,
  comment: '我的吐槽',
  updatedAt: 1700000000,
  reactions: [],
};

const otherComment: SubjectInterestComment = {
  id: 2002,
  user: makeUser(2, 'Chii'),
  type: 1,
  rate: 0,
  comment: '别人的吐槽',
  updatedAt: 1700000001,
  reactions: [],
};

describe('SubjectComments 写操作', () => {
  const renderComments = async (comments: SubjectInterestComment[]) => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <MemoryRouter>
          <HelmetProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </HelmetProvider>
        </MemoryRouter>
      </SWRConfig>
    );
    await act(async () => {
      render(
        <SubjectComments
          subject={homeData.subject}
          subjectID={12}
          comments={comments}
          total={comments.length}
          currentPage={1}
          pageSize={20}
          type={undefined}
          onPageChange={() => undefined}
          mutate={async () => undefined}
        />,
        { wrapper },
      );
    });
  };

  it('登录用户可见发帖表单（状态/评分/文本）', async () => {
    await renderComments([otherComment]);

    expect(screen.getByPlaceholderText('写点吐槽…')).toBeInTheDocument();
    expect(screen.getByText('收藏状态：')).toBeInTheDocument();
    expect(screen.getByText('评分：')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(5);
  });

  it('发帖调用 createSubjectComment（含收藏状态）', async () => {
    let postBody: unknown = null;
    mockServer.use(
      http.post('http://localhost:3000/p1/subjects/12/comments', async ({ request }) => {
        postBody = await request.json();
        return HttpResponse.json({ id: 3001 }, { status: 200 });
      }),
    );
    await renderComments([otherComment]);

    // 选择"看过"（第二个状态 radio）
    const radios = screen.getAllByRole('radio');
    await act(async () => {
      fireEvent.click(radios[1]!);
    });
    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('写点吐槽…'), {
        target: { value: '新吐槽内容' },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '写好了' }));
    });

    expect(postBody).toMatchObject({ comment: '新吐槽内容', type: 2 });
  });

  it('未选择收藏状态时提交不发请求并提示', async () => {
    let postCalled = false;
    mockServer.use(
      http.post('http://localhost:3000/p1/subjects/12/comments', async () => {
        postCalled = true;
        return HttpResponse.json({ id: 3001 }, { status: 200 });
      }),
    );
    await renderComments([otherComment]);

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('写点吐槽…'), {
        target: { value: '无状态吐槽' },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '写好了' }));
    });

    expect(postCalled).toBe(false);
  });

  it('自己的吐槽可编辑/删除，他人不可', async () => {
    let deleteRequested = false;
    mockServer.use(
      http.delete('http://localhost:3000/p1/subjects/-/comments/2001', () => {
        deleteRequested = true;
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    await renderComments([ownComment, otherComment]);

    const ownItem = screen.getByText('我的吐槽').closest('li')!;
    expect(within(ownItem).getByRole('button', { name: '编辑' })).toBeInTheDocument();
    expect(within(ownItem).getByRole('button', { name: '删除' })).toBeInTheDocument();

    const otherItem = screen.getByText('别人的吐槽').closest('li')!;
    expect(within(otherItem).queryByRole('button', { name: '编辑' })).not.toBeInTheDocument();
    expect(within(otherItem).queryByRole('button', { name: '删除' })).not.toBeInTheDocument();

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    await act(async () => {
      fireEvent.click(within(ownItem).getByRole('button', { name: '删除' }));
    });
    expect(deleteRequested).toBe(true);
    confirmSpy.mockRestore();
  });

  it('编辑调用 updateSubjectComment', async () => {
    let putBody: unknown = null;
    mockServer.use(
      http.put('http://localhost:3000/p1/subjects/-/comments/2001', async ({ request }) => {
        putBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    await renderComments([ownComment]);

    const ownItem = screen.getByText('我的吐槽').closest('li')!;
    await act(async () => {
      fireEvent.click(within(ownItem).getByRole('button', { name: '编辑' }));
    });

    const editTextarea = within(ownItem).getByRole('textbox');
    await act(async () => {
      fireEvent.input(editTextarea, { target: { value: '修改后的吐槽' } });
    });
    await act(async () => {
      fireEvent.click(within(ownItem).getByRole('button', { name: '写好了' }));
    });

    expect(putBody).toEqual({ comment: '修改后的吐槽' });
  });
});
