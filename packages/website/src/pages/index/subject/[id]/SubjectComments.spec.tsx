import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectHomeResponse, SubjectInterestComment } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import commentsFixture from '../../../../mocks/fixtures/p1/subjects/12/comments-GET.json';
import homeFixture from '../../../../mocks/fixtures/p1/subjects/12/home-GET.json';
import SubjectComments from './components/SubjectComments';

const homeData = homeFixture as unknown as SubjectHomeResponse;
const { data: comments, total } = commentsFixture as unknown as {
  data: SubjectInterestComment[];
  total: number;
};

describe('SubjectComments', () => {
  const renderComments = (props: Partial<React.ComponentProps<typeof SubjectComments>> = {}) =>
    renderPage(
      <SubjectComments
        subject={homeData.subject}
        comments={comments}
        total={total}
        currentPage={1}
        pageSize={20}
        type={undefined}
        onPageChange={() => undefined}
        {...props}
      />,
    );

  it('should render the comment list with rates and collect types', () => {
    renderComments();

    // 作者链接到个人主页
    const authorLinks = screen.getAllByRole('link', { name: 'Madeline' });
    expect(authorLinks[0]).toHaveAttribute('href', '/user/Madeline');

    // 评分星星：rate=8 → 4 颗实星，rate=7 → 3 颗实星，共 7 颗
    const rate = screen.getAllByTestId('filled');
    expect(rate).toHaveLength(7);

    // 收藏类型与吐槽内容（"看过" 出现 3 次：筛选 tab 1 次 + 两条吐槽各 1 次）
    expect(screen.getAllByText('看过')).toHaveLength(3);
    expect(screen.getByText('剧情节奏紧凑，作画稳定，值得一看的宝藏作品。')).toBeInTheDocument();
    expect(screen.getByText('先码住，等完结再看。')).toBeInTheDocument();
  });

  it('should not render a rate for comments without a score', () => {
    renderComments();

    // type=1 的吐槽 rate=0，不显示星星
    const text = screen.getByText('先码住，等完结再看。');
    expect(text.closest('li')?.querySelector('.bgm-rate')).toBeNull();
  });

  it('should render the filter tabs with collect type links', () => {
    renderComments();

    expect(screen.getByRole('link', { name: '全部' })).toHaveAttribute(
      'href',
      '/subject/12/comments',
    );
    expect(screen.getByRole('link', { name: '看过' })).toHaveAttribute(
      'href',
      '/subject/12/comments?type=2',
    );
    expect(screen.getByRole('link', { name: '想看' })).toHaveAttribute(
      'href',
      '/subject/12/comments?type=1',
    );
  });

  it('should render an empty state when there are no comments', () => {
    renderComments({ comments: [], total: 0 });

    expect(screen.getByText('还没有吐槽')).toBeInTheDocument();
  });
});
