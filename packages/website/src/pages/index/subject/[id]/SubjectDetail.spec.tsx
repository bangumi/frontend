import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';

import type { SubjectHomeResponse } from '@bangumi/client/client';
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

  it('should render all blocks', async () => {
    setup();
    await renderSubject();

    // header 标题
    expect(await screen.findByText('Test Anime')).toBeInTheDocument();
    // 左栏：信息框 / 目录 / 收藏统计
    expect(await screen.findByText(/中文名/)).toBeInTheDocument();
    expect(await screen.findByText('推荐本条目的目录')).toBeInTheDocument();
    expect(await screen.findByText(/人看过/)).toBeInTheDocument();
    // 右栏：ep / 标签 / 收藏盒
    expect(await screen.findByText('章节列表')).toBeInTheDocument();
    expect(await screen.findByText('标签')).toBeInTheDocument();
    expect(await screen.findByText('收藏盒')).toBeInTheDocument();
    // 右栏：角色 / 关联 / 推荐 / 评论 / 讨论 / 吐槽
    expect(await screen.findByText('角色介绍')).toBeInTheDocument();
    expect(await screen.findByText('关联条目')).toBeInTheDocument();
    expect(await screen.findByText('喜欢这部作品的会员大概会喜欢')).toBeInTheDocument();
    expect(await screen.findByText('测试动画长评')).toBeInTheDocument();
    expect(await screen.findByText('讨论版测试话题')).toBeInTheDocument();
    expect(await screen.findByText('这部动画很好看！')).toBeInTheDocument();
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
