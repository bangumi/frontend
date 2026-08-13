import { fireEvent, screen, within } from '@testing-library/react';
import React from 'react';

import { renderPage } from '@bangumi/website/utils/test-utils';

import topicsJson from '../../../mocks/fixtures/p1/rakuen/topics-GET.json';
import RakuenIndex from '.';

vi.mock('@bangumi/website/hooks/use-rakuen-topics', async () => {
  const { data } = await import('../../../mocks/fixtures/p1/rakuen/topics-GET.json');
  return {
    useRakuenTopics: (type: string) => ({
      data: type === 'episode' ? data.filter((topic) => topic.type === 'episode') : data,
      total: data.length,
    }),
  };
});

describe('RakuenIndex', () => {
  it('renders page header and tabs', () => {
    renderPage(<RakuenIndex />);

    expect(screen.getByRole('heading', { name: '超展开' })).toBeInTheDocument();
    for (const label of ['全部', '小组', '已加入小组', '条目', '章节', '角色', '人物']) {
      expect(screen.getByRole('tab', { name: label })).toBeInTheDocument();
    }
  });

  it('renders mixed topic list items', () => {
    renderPage(<RakuenIndex />);

    expect(
      screen.getByRole('link', { name: /\[投票结果\] 关于连载书籍平台子分类的关联问题/ }),
    ).toHaveAttribute('href', '/group/topic/430381');
    expect(screen.getByRole('link', { name: /新番组 2026 年春季动画讨论帖/ })).toHaveAttribute(
      'href',
      '/subject/topic/430381',
    );
    expect(screen.getByRole('link', { name: /EP\.1 第一话/ })).toHaveAttribute('href', '/ep/999');
    expect(screen.getByRole('link', { name: /测试角色/ })).toHaveAttribute(
      'href',
      '/character/1001',
    );
    expect(screen.getByRole('link', { name: /test person/ })).toHaveAttribute(
      'href',
      '/person/1002',
    );

    // group 与 subject 话题 ID 相同（不同数据表），仍应渲染为两行，React key 不冲突
    const listItems = within(screen.getByTestId('rakuen-list')).getAllByRole('listitem');
    expect(listItems).toHaveLength(topicsJson.data.length);
  });

  it('switches list by type query', () => {
    renderPage(<RakuenIndex />);

    const episodeTab = screen.getByRole('tab', { name: '章节' });
    fireEvent.click(episodeTab);

    expect(screen.getByRole('tab', { name: '章节' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('link', { name: /EP\.1 第一话/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /测试角色/ })).not.toBeInTheDocument();
  });
});
