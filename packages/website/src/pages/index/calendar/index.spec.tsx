import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';

import calendarFixture from '@bangumi/website/mocks/fixtures/p1/calendar-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import CalendarPage from '.';

describe('CalendarPage', () => {
  it('渲染页头与周一~周日分组', async () => {
    mockServer.use(
      http.get('http://localhost:3000/p1/calendar', () => HttpResponse.json(calendarFixture)),
    );
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <CalendarPage />
        </Suspense>,
      );
    });

    // 页头
    expect(await screen.findByRole('heading', { name: /每日放送/ })).toBeInTheDocument();

    // 星期分组标题
    expect(screen.getByText('星期一')).toBeInTheDocument();
    expect(screen.getByText('星期二')).toBeInTheDocument();
    expect(screen.getByText('星期日')).toBeInTheDocument();

    // 条目：中文名链接到条目页 + 在看人数
    const subjectLink = screen.getByRole('link', { name: /转学后班上的清纯可爱美少女/ });
    expect(subjectLink).toHaveAttribute('href', '/subject/456080');
    expect(screen.getByText('321 人在看')).toBeInTheDocument();
    expect(screen.getByText('150 人在看')).toBeInTheDocument();

    // 空星期占位
    expect(screen.getAllByText('暂无放送').length).toBeGreaterThan(0);
  });
});
