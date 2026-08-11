import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectHomeResponse } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import homeFixture from '../../../../mocks/fixtures/p1/subjects/12/home-GET.json';
import reviewsFixture from '../../../../mocks/fixtures/p1/subjects/12/reviews-GET.json';
import SubjectReviews from './components/SubjectReviews';

const homeData = homeFixture as unknown as SubjectHomeResponse;
const { data: reviews, total } = reviewsFixture;

describe('SubjectReviews', () => {
  const renderReviews = (props: Partial<React.ComponentProps<typeof SubjectReviews>> = {}) =>
    renderPage(
      <SubjectReviews
        subject={homeData.subject}
        reviews={reviews}
        total={total}
        currentPage={1}
        pageSize={10}
        onPageChange={() => undefined}
        {...props}
      />,
    );

  it('should render the review list with links', () => {
    renderReviews();

    // 评论标题与摘要均链接到日志页
    const title = screen.getByRole('link', { name: '测试动画的观后感：值得一看的宝藏作品' });
    expect(title).toHaveAttribute('href', '/blog/301');
    expect(screen.getByRole('link', { name: '从制作角度分析结局的铺垫' })).toHaveAttribute(
      'href',
      '/blog/302',
    );

    // 作者、时间与回复数（fixture 时间戳为 UTC，测试环境固定为 Etc/GMT）
    const authorLinks = screen.getAllByRole('link', { name: 'Madeline' });
    expect(authorLinks).toHaveLength(2);
    expect(authorLinks[0]).toHaveAttribute('href', '/user/1272395');
    expect(screen.getByText('2026-1-1')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '3 回复' })).toHaveAttribute('href', '/blog/301');

    // 右栏条目卡
    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('should show the new review button when logged in', async () => {
    renderReviews();

    const button = await screen.findByRole('link', { name: '我来评论' });
    // 新前端未实现写日志页，跳转旧站
    expect(button).toHaveAttribute('href', 'https://bgm.tv/blog/create?review=12');
  });

  it('should render an empty state when there are no reviews', () => {
    renderReviews({ reviews: [], total: 0 });

    expect(screen.getByText('暂无评论')).toBeInTheDocument();
    expect(screen.queryAllByRole('link', { name: '返回条目' })).toHaveLength(1);
  });
});
