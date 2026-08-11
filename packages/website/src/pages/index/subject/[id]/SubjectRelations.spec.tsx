import { screen } from '@testing-library/react';
import React from 'react';

import { subjectHomeFixture } from '@bangumi/website/mocks/fixtures/p1/subjects/12';
import { renderPage } from '@bangumi/website/utils/test-utils';

import relationsFixture from '../../../../mocks/fixtures/p1/subjects/12/relations-GET.json';
import SubjectRelations from './components/SubjectRelations';

const relations = relationsFixture.data;

describe('SubjectRelations', () => {
  it('renders relation groups with subject links', () => {
    renderPage(<SubjectRelations subject={subjectHomeFixture.subject} relations={relations} />);

    expect(screen.getByRole('heading', { name: '续作' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '前传' })).toBeInTheDocument();

    // 每个条目有封面链接与标题链接，均指向同一条目页
    for (const [name, subjectId] of [
      ['测试动画2', 13],
      ['测试动画剧场版', 14],
    ] as const) {
      const links = screen.getAllByRole('link', { name });
      expect(links).toHaveLength(2);
      expect(links.every((link) => link.getAttribute('href') === `/subject/${subjectId}`)).toBe(
        true,
      );
    }
    const prequelLinks = screen.getAllByRole('link', { name: '测试动画0' });
    expect(prequelLinks).toHaveLength(2);
    expect(prequelLinks[0]).toHaveAttribute('href', '/subject/11');
    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('renders an empty state when the subject has no relations', () => {
    renderPage(<SubjectRelations subject={subjectHomeFixture.subject} relations={[]} />);

    expect(screen.getByText('暂无关联条目')).toBeInTheDocument();
  });
});
