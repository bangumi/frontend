import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { SWRConfig } from 'swr';

import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import CharacterDetail from './CharacterDetail';
import { character174916Fixture as fixture } from './fixtures/character-174916';

describe('CharacterDetail', () => {
  const characterID = fixture.character.id;

  const setup = () => {
    const { character, casts, relations, collects, comments, indexes } = fixture;
    mockServer.use(
      http.get(`http://localhost:3000/p1/characters/${characterID}`, () =>
        HttpResponse.json(character, { status: 200 }),
      ),
      http.get(`http://localhost:3000/p1/characters/${characterID}/casts`, () =>
        HttpResponse.json({ data: casts, total: fixture.castTotal }, { status: 200 }),
      ),
      http.get(`http://localhost:3000/p1/characters/${characterID}/relations`, () =>
        HttpResponse.json({ data: relations, total: fixture.relationTotal }, { status: 200 }),
      ),
      http.get(`http://localhost:3000/p1/characters/${characterID}/collects`, () =>
        HttpResponse.json({ data: collects, total: fixture.collectTotal }, { status: 200 }),
      ),
      http.get(`http://localhost:3000/p1/characters/${characterID}/comments`, () =>
        HttpResponse.json(comments, { status: 200 }),
      ),
      http.get(`http://localhost:3000/p1/characters/${characterID}/photos/preview`, () =>
        HttpResponse.json({ data: fixture.photos, total: fixture.photoTotal }, { status: 200 }),
      ),
      http.get(`http://localhost:3000/p1/characters/${characterID}/indexes`, () =>
        HttpResponse.json({ data: indexes, total: fixture.indexTotal }, { status: 200 }),
      ),
    );
  };

  const renderCharacter = async (data: typeof fixture = fixture) => {
    await act(async () => {
      renderPage(
        <SWRConfig value={{ provider: () => new Map() }}>
          <React.Suspense fallback={null}>
            <CharacterDetail data={data} />
          </React.Suspense>
        </SWRConfig>,
      );
    });
  };

  it('should render all blocks', async () => {
    setup();
    await renderCharacter();

    // header 标题（出演区同名条目重复出现）
    expect((await screen.findAllByText('ヤニねこ')).length).toBeGreaterThan(0);
    // 信息框
    expect(await screen.findByText(/简体中文名/)).toBeInTheDocument();
    // 推荐目录
    expect(await screen.findByText('推荐本角色的目录')).toBeInTheDocument();
    expect(await screen.findByText('杯子测评')).toBeInTheDocument();
    // 收藏者
    expect(await screen.findByText('谁收藏了ヤニねこ?')).toBeInTheDocument();
    expect(await screen.findByText('柊镜司姐妹盖饭')).toBeInTheDocument();
    // 出演（夏吉ゆうこ 在两个出演条目中重复出现）
    expect(await screen.findByText('出演')).toBeInTheDocument();
    expect((await screen.findAllByText('夏吉ゆうこ')).length).toBeGreaterThan(0);
    // 关联角色
    expect(await screen.findByText('关联角色')).toBeInTheDocument();
    expect(await screen.findByText('妹子')).toBeInTheDocument();
    // 吐槽箱
    expect(await screen.findByText('吐槽箱')).toBeInTheDocument();
    expect(await screen.findByText('年度神人奖你至少要有个提名')).toBeInTheDocument();
    expect(await screen.findByText('算了你还是拿冠军吧')).toBeInTheDocument();
    // 相册为空不渲染（tabs 中的"相册"链接不算）
    expect(screen.queryByRole('heading', { name: '相册' })).not.toBeInTheDocument();
  });

  it('should collect character when not collected', async () => {
    setup();
    let collected = false;
    mockServer.use(
      http.put(`http://localhost:3000/p1/collections/characters/${characterID}`, () => {
        collected = true;
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderCharacter();

    fireEvent.click(await screen.findByRole('button', { name: '加入收藏' }));

    await waitFor(() => {
      expect(collected).toBe(true);
    });
  });

  it('should uncollect character when collected', async () => {
    setup();
    let deleted = false;
    mockServer.use(
      http.delete(`http://localhost:3000/p1/collections/characters/${characterID}`, () => {
        deleted = true;
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    // 已收藏状态由传入的 data 决定，而非 API 返回值
    const collectedFixture = {
      ...fixture,
      character: { ...fixture.character, collectedAt: 1775000000 },
    };

    await renderCharacter(collectedFixture);

    fireEvent.click(await screen.findByRole('button', { name: '取消收藏' }));

    await waitFor(() => {
      expect(deleted).toBe(true);
    });
  });
});
