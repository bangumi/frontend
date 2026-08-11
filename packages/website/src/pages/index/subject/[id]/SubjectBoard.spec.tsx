import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectHomeResponse } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import homeFixture from '../../../../mocks/fixtures/p1/subjects/12/home-GET.json';
import topicsFixture from '../../../../mocks/fixtures/p1/subjects/12/topics-GET.json';
import SubjectBoard from './components/SubjectBoard';

const homeData = homeFixture as unknown as SubjectHomeResponse;
const { data: topics, total } = topicsFixture;

describe('SubjectBoard', () => {
  const renderBoard = (props: Partial<React.ComponentProps<typeof SubjectBoard>> = {}) =>
    renderPage(
      <SubjectBoard
        subject={homeData.subject}
        topics={topics}
        total={total}
        currentPage={1}
        pageSize={10}
        onPageChange={() => undefined}
        {...props}
      />,
    );

  it('should render the topic list with links', () => {
    renderBoard();

    // 主题标题链接指向主题页
    const title = screen.getByRole('link', {
      name: '这是一条测试讨论主题，标题可能比较长，用于验证省略号截断效果',
    });
    expect(title).toHaveAttribute('href', '/subject/topic/101');
    expect(screen.getByRole('link', { name: '第二集讨论串' })).toHaveAttribute(
      'href',
      '/subject/topic/102',
    );
    expect(screen.getByRole('link', { name: '完结纪念帖' })).toHaveAttribute(
      'href',
      '/subject/topic/103',
    );

    // 作者链接与回复数（fixture 时间戳为 UTC，测试环境固定为 Etc/GMT）
    const authorLinks = screen.getAllByRole('link', { name: 'Madeline' });
    expect(authorLinks).toHaveLength(3);
    expect(authorLinks[0]).toHaveAttribute('href', '/user/1272395');
    expect(screen.getByText('5 replies')).toBeInTheDocument();
    expect(screen.getByText('2026-1-1')).toBeInTheDocument();

    // 右栏条目卡
    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('should show the new topic button when logged in', async () => {
    renderBoard();

    const button = await screen.findByRole('link', { name: '添加新讨论' });
    // 新前端未实现发帖页，跳转旧站
    expect(button).toHaveAttribute('href', 'https://bgm.tv/subject/12/topic/new');
  });

  it('should render an empty state when there are no topics', () => {
    renderBoard({ topics: [], total: 0 });

    expect(screen.getByText('暂无讨论')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
