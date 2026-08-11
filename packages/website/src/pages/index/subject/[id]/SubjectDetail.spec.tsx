import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import type { SubjectHomeResponse } from '@bangumi/client/client';
import { UserProvider } from '@bangumi/website/hooks/use-user';
import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import fixture from '../../../../mocks/fixtures/p1/subjects/12/home-GET.json';
import SubjectDetail from './components/SubjectDetail';

const homeData = fixture as unknown as SubjectHomeResponse;

describe('SubjectDetail', () => {
  const setup = () => {
    mockServer.use(
      http.get('http://localhost:3000/p1/subjects/12/home', () => {
        return HttpResponse.json(homeData, { status: 200 });
      }),
    );
  };

  const renderSubject = async () => {
    await act(async () => {
      renderPage(<SubjectDetail data={homeData} />);
    });
  };

  // 独立的 SWR 缓存：避免前序测试已缓存 /p1/me 的登录结果；
  // Suspense boundary 是 React 19 下 SWR suspense 挂起所必需的
  const renderSubjectLoggedOut = async () => {
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
      render(<SubjectDetail data={homeData} />, { wrapper });
    });
  };

  it('should render all blocks', async () => {
    setup();
    await renderSubject();

    // header 标题
    expect(await screen.findByText('Test Anime')).toBeInTheDocument();
    // 左栏：信息框 / 目录 / 收藏统计
    expect(await screen.findByText(/中文名/)).toBeInTheDocument();
    expect(await screen.findByText('推荐本条目的目录')).toBeInTheDocument();
    expect(await screen.findByText('谁看这部动画?')).toBeInTheDocument();
    expect(await screen.findByText(/人看过/)).toBeInTheDocument();
    // 主栏：ep / 标签
    expect(await screen.findByText('章节列表')).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: '大家将 Test Anime 标注为' }),
    ).toBeInTheDocument();
    // 右栏：收藏盒
    expect(await screen.findByText('收藏盒')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { pressed: false })).toHaveLength(5);
    expect(screen.getByRole('link', { name: 'Bangumi Anime Ranked: #100' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('list', { name: '评分分布' })).getAllByRole('listitem'),
    ).toHaveLength(10);
    // 主栏：角色 / 关联 / 推荐 / 评论 / 讨论 / 吐槽
    expect(await screen.findByText('角色介绍')).toBeInTheDocument();
    expect(await screen.findByText('关联条目')).toBeInTheDocument();
    expect(await screen.findByText('喜欢这部作品的会员大概会喜欢')).toBeInTheDocument();
    expect(await screen.findByText('测试动画长评')).toBeInTheDocument();
    expect(await screen.findByText('讨论版测试话题')).toBeInTheDocument();
    expect(await screen.findByText('这部动画很好看！')).toBeInTheDocument();
  });

  it('should render the subject index panel with avatars and tips', async () => {
    setup();
    await renderSubject();

    // 目录项：作者头像 + 标题链接 + by 作者（fixture 为真实数据 5 条）
    const indexList = screen.getByRole('list', { name: '推荐本条目的目录列表' });
    expect(within(indexList).getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getByAltText('失窃预告函')).toBeInTheDocument();
    expect(within(indexList).getByRole('link', { name: '测试目录' })).toHaveAttribute(
      'href',
      '/index/101917',
    );
    // 头像链接 + by 作者链接，accessible name 均为昵称
    expect(within(indexList).getAllByRole('link', { name: '失窃预告函' })).toHaveLength(2);

    // 底部：更多目录指向旧站；收集至我的目录仅登录用户可见
    expect(screen.getByRole('link', { name: '更多目录' })).toHaveAttribute(
      'href',
      'https://bgm.tv/subject/12/index',
    );
    expect(screen.getByRole('link', { name: '收集至我的目录' })).toHaveAttribute(
      'href',
      'https://bgm.tv/user/382951/index',
    );
  });

  it('should render recent collectors with status and collection stats', async () => {
    setup();
    await renderSubject();

    // 收藏用户列表（fixture 5 人）
    const collectList = await screen.findByRole('list', { name: '最近收藏用户列表' });
    const items = within(collectList).getAllByRole('listitem');
    expect(items).toHaveLength(5);

    // 用户名链接 + 头像链接指向用户主页（accessible name 均为昵称）
    expect(within(collectList).getAllByRole('link', { name: 'Madeline' })).toHaveLength(2);
    expect(within(collectList).getAllByRole('link', { name: 'Madeline' })[0]).toHaveAttribute(
      'href',
      '/user/1272395',
    );

    // 每项状态：相对时间 + 收藏状态（时间文本不固定，只断言状态后缀）
    const statuses = within(collectList).getAllByText(/前(想看|看过|在看|搁置|抛弃)$/);
    expect(statuses).toHaveLength(5);

    // rate > 0 的用户渲染星星（fixture 中 datura rate=7）
    expect(within(collectList).getAllByTestId('filled').length).toBeGreaterThan(0);

    // 底部统计链接按收藏类型排序
    expect(screen.getByRole('link', { name: '100人想看' })).toHaveAttribute(
      'href',
      '/subject/12/collections?filter=1',
    );
    expect(screen.getByRole('link', { name: '2000人看过' })).toHaveAttribute(
      'href',
      '/subject/12/collections?filter=2',
    );
    expect(screen.getByRole('link', { name: '1500人在看' })).toHaveAttribute(
      'href',
      '/subject/12/collections?filter=3',
    );
  });

  it('should hide 收集至我的目录 when logged out', async () => {
    setup();
    mockServer.use(
      http.get('http://localhost:3000/p1/me', () => {
        return HttpResponse.json({}, { status: 401 });
      }),
    );

    await renderSubjectLoggedOut();

    expect(await screen.findByText('推荐本条目的目录')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '更多目录' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '收集至我的目录' })).not.toBeInTheDocument();
  });

  it('should render the collection panel in a separate sidebar', async () => {
    setup();
    await renderSubject();

    const tagsSection = (
      await screen.findByRole('heading', { name: '大家将 Test Anime 标注为' })
    ).closest('section');
    const collectionSection = screen.getByRole('heading', { name: '收藏盒' }).closest('section');

    expect(tagsSection?.parentElement).not.toBe(collectionSection?.parentElement);
    expect(collectionSection?.closest('aside')).not.toBeNull();
  });

  it('should use centralized subject links', async () => {
    setup();
    await renderSubject();

    // header 标题链接指向站内 subject 页
    expect(screen.getByTitle('测试动画')).toHaveAttribute('href', '/subject/12');
    // 相关作品/推荐中的 subject 链接不再跳转旧站
    expect(document.querySelector('a[href="https://bgm.tv/subject/13"]')).not.toBeInTheDocument();
    expect(
      document.querySelector('a[href="/subject/12/collections?filter=3"]'),
    ).toBeInTheDocument();
  });

  it('should collect subject when not collected', async () => {
    setup();
    let patchedBody: unknown = null;
    mockServer.use(
      http.put('http://localhost:3000/p1/collections/subjects/12', async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderSubject();

    fireEvent.click(await screen.findByRole('button', { name: '在看' }));

    await waitFor(() => {
      expect(patchedBody).toEqual({ type: 3 });
    });
  });
});
