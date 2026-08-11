import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectTopic, TrendingSubject } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import topicsJson from '../../../mocks/fixtures/p1/trending/subjects/topics-GET.json';
import subjectsJson from '../../../mocks/fixtures/p1/trending/subjects-GET.json';
import { AnimeChannel } from '.';

const subjects = subjectsJson.data as unknown as TrendingSubject[];
const topics = topicsJson.data as unknown as SubjectTopic[];

describe('AnimeChannel', () => {
  it('renders trending anime and only anime topics', () => {
    renderPage(
      <AnimeChannel
        subjects={subjects}
        topics={topics.filter((topic) => topic.subject.type === 2)}
      />,
    );

    expect(screen.getByRole('heading', { name: '动画频道' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /注目动画/ })).toBeInTheDocument();
    expect(screen.getByText('尼古喵喵')).toBeInTheDocument();
    expect(
      screen.getByText(
        '《记忆管理局》是2010年左右中国二次元社区所期待的中国动画“未来应该走的路子”吗？',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('完蛋的不是游戏，完蛋是国内这个游戏环境')).not.toBeInTheDocument();
  });
});
