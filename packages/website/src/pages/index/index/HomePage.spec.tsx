import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { SWRConfig } from 'swr';

import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import homeFixture from '../../../mocks/fixtures/p1/home-GET.json';
import HomePage from './components/HomePage';

function createLocalStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  };
}

describe('HomePage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createLocalStorage(),
    });
  });

  const setupHome = () => {
    mockServer.use(
      http.get('http://localhost:3000/p1/home', () => {
        return HttpResponse.json(homeFixture, { status: 200 });
      }),
    );
  };

  const renderHome = async () => {
    await act(async () => {
      renderPage(
        <SWRConfig value={{ provider: () => new Map() }}>
          <React.Suspense fallback={null}>
            <HomePage />
          </React.Suspense>
        </SWRConfig>,
      );
    });
  };

  it('should render all home blocks', async () => {
    setupHome();
    await renderHome();

    // 顶部问候（昵称在问候语与多个区块中重复出现）
    expect((await screen.findAllByText('树洞酱')).length).toBeGreaterThan(0);
    // 进度管理器（条目名与热门讨论中的同名条目重复出现）
    expect((await screen.findAllByText('测试动画')).length).toBeGreaterThan(0);
    expect(await screen.findByText('ep.6 看过')).toBeInTheDocument();
    // 时间线（抓抓）
    expect(await screen.findByText('今天天气真好')).toBeInTheDocument();
    // 小组话题
    expect(await screen.findByText('小组话题标题')).toBeInTheDocument();
    // 热门条目讨论
    expect(await screen.findByText('热门讨论标题')).toBeInTheDocument();
    // 每日放送（今日上映统计）
    expect(await screen.findByText(/今日上映/)).toBeInTheDocument();
    // 公告
    expect(await screen.findByText('公告')).toBeInTheDocument();
  });

  it('should use internal links for subjects', async () => {
    setupHome();
    await renderHome();

    const subjectLinks = document.querySelectorAll<HTMLAnchorElement>('a[href="/subject/12"]');
    expect(subjectLinks.length).toBeGreaterThan(0);
    for (const link of subjectLinks) {
      expect(link).not.toHaveAttribute('target');
    }
    expect(document.querySelector('a[href="https://bgm.tv/subject/12"]')).not.toBeInTheDocument();
  });

  it('should render timeline subject cards and action summaries', async () => {
    const baseTimeline = homeFixture.timeline[0];
    const anime = {
      id: 268070,
      name: '荒ぶる季節の乙女どもよ。',
      nameCN: '骚动时节的少女们啊',
      type: 2,
      info: '12话 / 2019年7月5日 / 安藤真裕',
      metaTags: [],
      rating: { rank: 0, count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], score: 0, total: 0 },
      locked: false,
      nsfw: false,
      images: {
        large: '/anime-large.jpg',
        common: '/anime-common.jpg',
        medium: '/anime-medium.jpg',
        small: '/anime-small.jpg',
        grid: '/anime-grid.jpg',
      },
    };
    const book = {
      ...anime,
      id: 467390,
      name: '冒険者になれなかった俺',
      nameCN: '没能成为冒险者的我',
      type: 1,
      info: '2024-09-27 / ぺい / KADOKAWA',
      images: {
        large: '/book-large.jpg',
        common: '/book-common.jpg',
        medium: '/book-medium.jpg',
        small: '/book-small.jpg',
        grid: '/book-grid.jpg',
      },
    };

    mockServer.use(
      http.get('http://localhost:3000/p1/home', () =>
        HttpResponse.json({
          ...homeFixture,
          timeline: [
            {
              ...baseTimeline,
              id: 9002,
              cat: 4,
              type: 2,
              source: { name: 'Chobits iOS', url: 'https://bgm.tv/group/topic/1' },
              memo: {
                progress: {
                  single: {
                    subject: anime,
                    episode: {
                      id: 893064,
                      subjectID: anime.id,
                      sort: 6,
                      type: 0,
                      disc: 0,
                      name: '乙女は森のなか',
                      nameCN: '少女隐于林',
                      duration: '24m',
                      airdate: '2019-08-09',
                      comment: 0,
                      desc: '',
                    },
                  },
                },
              },
            },
            {
              ...baseTimeline,
              id: 9003,
              cat: 4,
              type: 0,
              memo: {
                progress: {
                  batch: {
                    epsTotal: '??',
                    epsUpdate: 26,
                    volsTotal: '??',
                    subject: book,
                  },
                },
              },
            },
            {
              ...baseTimeline,
              id: 9004,
              cat: 3,
              type: 13,
              memo: { subject: [{ subject: book, comment: '', rate: 0 }] },
            },
          ],
        }),
      ),
    );
    await renderHome();

    const episodeLink = await screen.findByRole('link', { name: 'ep.6 乙女は森のなか' });
    expect(episodeLink).toHaveAttribute('href', '/ep/893064');
    expect(screen.getByRole('img', { name: '骚动时节的少女们啊' })).toHaveAttribute(
      'src',
      '/anime-grid.jpg',
    );
    expect(screen.getByText(/读过.*第26话/)).toBeInTheDocument();
    expect(screen.getByText(/搁置了/)).toBeInTheDocument();
    expect(screen.getByText('2024-09-27 / ぺい / KADOKAWA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chobits iOS' })).toHaveAttribute(
      'href',
      'https://bgm.tv/group/topic/1',
    );
  });

  it('should render daily timeline actions by type', async () => {
    const baseTimeline = homeFixture.timeline[0]!;
    const user = baseTimeline.user!;
    const friendA = { ...user, id: 1001, username: 'friend-a', nickname: '好友甲' };
    const friendB = { ...user, id: 1002, username: 'friend-b', nickname: '好友乙' };
    const groupA = { id: 1, name: 'sakura', nsfw: false, title: '樱花庄的宠物女孩' };
    const groupB = { id: 2, name: 'majo', nsfw: false, title: '魔女之旅' };

    mockServer.use(
      http.get('http://localhost:3000/p1/home', () =>
        HttpResponse.json({
          ...homeFixture,
          timeline: [
            {
              ...baseTimeline,
              id: 9011,
              cat: 1,
              type: 2,
              batch: true,
              memo: { daily: { users: [friendA, friendB] } },
            },
            {
              ...baseTimeline,
              id: 9012,
              cat: 1,
              type: 3,
              memo: { daily: { groups: [groupA] } },
            },
            {
              ...baseTimeline,
              id: 9013,
              cat: 1,
              type: 4,
              memo: { daily: { groups: [groupB] } },
            },
            // 加入乐园等未解析的 daily 类型不渲染
            { ...baseTimeline, id: 9014, cat: 1, type: 5, memo: {} },
          ],
        }),
      ),
    );
    await renderHome();

    expect(screen.getByText('和 好友甲、好友乙 成为了好友')).toBeInTheDocument();
    expect(screen.getByText('加入了小组 樱花庄的宠物女孩')).toBeInTheDocument();
    expect(screen.getByText('创建了小组 魔女之旅')).toBeInTheDocument();
    expect(screen.queryByText(/每日推荐/)).not.toBeInTheDocument();
  });

  it('should mark the last unwatched episode as watched', async () => {
    setupHome();
    let patchedBody: unknown = null;
    mockServer.use(
      http.patch('http://localhost:3000/p1/collections/episodes/105', async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderHome();

    fireEvent.click(await screen.findByText('ep.6 看过'));

    await waitFor(() => {
      expect(patchedBody).toEqual({ type: 2 });
    });
  });

  it('should update subject progress in batch', async () => {
    setupHome();
    let patchedBody: unknown = null;
    mockServer.use(
      http.patch('http://localhost:3000/p1/collections/subjects/12', async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderHome();

    const input = await screen.findByDisplayValue('5');
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: '更新' }));

    await waitFor(() => {
      expect(patchedBody).toEqual({ epStatus: 8 });
    });
  });

  it('should switch to grid view and render episode buttons', async () => {
    setupHome();
    await renderHome();

    // 默认分栏视图展示当前选中条目的集数按钮
    expect(screen.getAllByTitle(/^ep\.\d+ /)).toHaveLength(12);

    fireEvent.click(screen.getByRole('button', { name: '网格视图' }));

    // 12 集全部渲染
    await waitFor(() => {
      expect(screen.getAllByTitle(/^ep\.\d+ /)).toHaveLength(12);
    });
    // 已看集数标记为 pressed，未看集数不是
    expect(screen.getByTitle('ep.1 第1话')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTitle('ep.5 第5话')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTitle('ep.6 第6话')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTitle('ep.12 第12话')).toHaveAttribute('aria-pressed', 'false');

    // 切回分栏视图后，当前条目的集数按钮仍然可用
    fireEvent.click(screen.getByRole('button', { name: '列表视图' }));
    expect(screen.getAllByTitle(/^ep\.\d+ /)).toHaveLength(12);
  });

  it('should restore the progress manager view', async () => {
    window.localStorage.setItem('bangumi-home-progress-view', 'grid');
    setupHome();
    await renderHome();

    expect(screen.getByRole('button', { name: '网格视图' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    fireEvent.click(screen.getByRole('button', { name: '列表视图' }));
    expect(window.localStorage.getItem('bangumi-home-progress-view')).toBe('list');
  });

  it('should update episode status from the grid view detail popover', async () => {
    setupHome();
    let patchedBody: unknown = null;
    mockServer.use(
      http.patch('http://localhost:3000/p1/collections/episodes/105', async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderHome();

    fireEvent.click(screen.getByRole('button', { name: '网格视图' }));
    await waitFor(() => {
      expect(screen.getAllByTitle(/^ep\.\d+ /)).toHaveLength(12);
    });

    // 详情浮层由 CSS hover 控制显隐，内容始终渲染在 DOM 中
    const ep6Detail = document.querySelector('[data-ep-id="105"]');
    expect(ep6Detail).not.toBeNull();
    expect(ep6Detail).toHaveTextContent('ep.6 第6话');
    expect(ep6Detail).toHaveTextContent('中文标题');
    expect(ep6Detail).toHaveTextContent('命运之夜');
    expect(ep6Detail).toHaveTextContent('首播');
    expect(ep6Detail).toHaveTextContent('2026-05-06');
    expect(ep6Detail).toHaveTextContent('时长');
    expect(ep6Detail).toHaveTextContent('25m');
    // 讨论数
    expect(ep6Detail).toHaveTextContent('讨论');
    expect(ep6Detail).toHaveTextContent('+8');

    fireEvent.click(within(ep6Detail as HTMLElement).getByRole('button', { name: '看过' }));

    await waitFor(() => {
      expect(patchedBody).toEqual({ type: 2 });
    });
  });
});
