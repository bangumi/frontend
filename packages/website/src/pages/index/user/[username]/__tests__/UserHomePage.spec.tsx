import type { RenderResult } from '@testing-library/react';
import { act, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { useParams } from 'react-router-dom';

import userFixture from '@bangumi/website/mocks/fixtures/p1/users/sai-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';
import UserHomePage from '@bangumi/website/pages/index/user/[username]';
import { renderPage } from '@bangumi/website/utils/test-utils';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

class UserHomeTest {
  page!: RenderResult;

  async setup(username: string, userData: object = userFixture): Promise<void> {
    mockedUseParams.mockReturnValue({ username });

    mockServer.use(
      http.get(`http://localhost:3000/p1/users/${username}`, () => {
        return HttpResponse.json(userData, { status: 200 });
      }),
    );

    await act(async () => {
      this.page = renderPage(<UserHomePage />);
    });
  }

  static async create(username: string, userData?: object): Promise<UserHomeTest> {
    const instance = new UserHomeTest();
    await instance.setup(username, userData);
    return instance;
  }
}

describe('UserHomePage', () => {
  it('should render user header and stats', async () => {
    const test = await UserHomeTest.create('sai');

    expect(await test.page.findByText('Sai')).toBeInTheDocument();
    expect(screen.getByText('@sai')).toBeInTheDocument();
    // 导航标签：时光机（当前页）与收藏
    expect(screen.getByText('时光机')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '收藏' })).toBeInTheDocument();
    // 签名区：bio 与服务标签
    expect(screen.getByText('测试简介')).toBeInTheDocument();
    expect(screen.getByText('2010-1-1 加入')).toBeInTheDocument();
  });

  it('should render subject collect blocks', async () => {
    const test = await UserHomeTest.create('sai');

    // 收藏块标题（我的动画/我的书籍）
    expect(await test.page.findByText('我的动画')).toBeInTheDocument();
    expect(screen.getByText('我的书籍')).toBeInTheDocument();
    // 收藏块中的条目
    await waitFor(() => {
      expect(screen.getAllByText('测试动画').length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText('测试书籍').length).toBeGreaterThan(0);
  });

  it('should render timeline and stats blocks', async () => {
    const test = await UserHomeTest.create('sai');

    // 时间胶囊：progress 条目渲染条目链接；status 条目渲染吐槽文本
    expect(await test.page.findByText('我的时间胶囊')).toBeInTheDocument();
    expect(screen.getByText('今天天气真好')).toBeInTheDocument();
    expect(screen.getAllByText('测试动画').length).toBeGreaterThan(0);
    // 收藏统计
    expect(screen.getByText('收藏统计')).toBeInTheDocument();
    expect(screen.getByText('完成')).toBeInTheDocument();
    expect(screen.getByText('完成率')).toBeInTheDocument();
  });

  it('should show not found page when user does not exist', async () => {
    mockedUseParams.mockReturnValue({ username: 'ghost' });

    mockServer.use(
      http.get('http://localhost:3000/p1/users/ghost', () => {
        return HttpResponse.json({ message: 'user not found' }, { status: 404 });
      }),
    );

    await act(async () => {
      renderPage(<UserHomePage />);
    });

    expect(await screen.findByText('User Not found')).toBeInTheDocument();
  });
});
