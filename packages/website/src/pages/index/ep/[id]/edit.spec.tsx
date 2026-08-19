import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import EpisodeEditPage from './edit';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

beforeEach(() => {
  mockedUseParams.mockReturnValue({ id: '1704816' });
});

describe('EpisodeEditPage', () => {
  it('loads the editable revision and submits the updated episode', async () => {
    let submittedBody: unknown;
    mockServer.use(
      http.patch('http://localhost:3000/p1/wiki/ep/1704816', async ({ request }) => {
        submittedBody = await request.json();
        return HttpResponse.json({});
      }),
    );

    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <EpisodeEditPage />
        </Suspense>,
      );
    });

    const name = await screen.findByLabelText('原名');
    expect(document.querySelector('main')?.className).toContain('max-w_1200px');
    expect(name).toHaveValue('燃えよ狂犬');
    expect(screen.getByLabelText('中文名')).toHaveValue('燃烧吧，狂犬');

    fireEvent.change(name, { target: { value: '燃えよ狂犬 改' } });
    fireEvent.change(screen.getByLabelText('编辑摘要'), { target: { value: '修正标题' } });
    fireEvent.submit(screen.getByRole('button', { name: '提交修改' }).closest('form')!);

    await waitFor(() => {
      expect(submittedBody).toEqual({
        commitMessage: '修正标题',
        episode: {
          name: '燃えよ狂犬 改',
          nameCN: '燃烧吧，狂犬',
          type: 0,
          ep: 1,
          disc: 0,
          duration: '00:23:40',
          date: '2026-07-04',
          summary: 'ルーデウスと結ばれたものの、己の未熟さを痛感したエリスは彼のもとを去った。',
        },
        expectedRevision: {
          name: '燃えよ狂犬',
          nameCN: '燃烧吧，狂犬',
          duration: '00:23:40',
          date: '2026-07-04',
          summary: 'ルーデウスと結ばれたものの、己の未熟さを痛感したエリスは彼のもとを去った。',
        },
      });
    });
  });
});
