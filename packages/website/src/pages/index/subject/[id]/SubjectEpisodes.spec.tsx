import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectHomeResponse } from '@bangumi/client/client.ts';
import fixture from '@bangumi/website/mocks/fixtures/p1/subjects/12/home-GET.json';
import { renderPage } from '@bangumi/website/utils/test-utils.tsx';

import SubjectEpisodes from './components/SubjectEpisodes.tsx';

const homeData = fixture as unknown as SubjectHomeResponse;

describe('SubjectEpisodes', () => {
  it('renders episode groups, metadata, and the subject return card', () => {
    renderPage(<SubjectEpisodes subject={homeData.subject} episodes={homeData.episodes} />);

    expect(screen.getByRole('heading', { name: '本篇' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '1.第1话' })).toHaveAttribute('href', '/ep/100');
    expect(screen.getByText('时长:24m / 首播:2026-04-01 / 讨论:+0')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('renders an empty state when the subject has no episodes', () => {
    renderPage(<SubjectEpisodes subject={homeData.subject} episodes={[]} />);

    expect(screen.getByText('暂无章节')).toBeInTheDocument();
  });
});
