import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectCharacter, SubjectHomeResponse } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import charactersFixture from '../../../../mocks/fixtures/p1/subjects/12/characters-GET.json';
import homeFixture from '../../../../mocks/fixtures/p1/subjects/12/home-GET.json';
import SubjectCharacters from './components/SubjectCharacters';

const homeData = homeFixture as unknown as SubjectHomeResponse;
const characters = charactersFixture.data as SubjectCharacter[];

describe('SubjectCharacters', () => {
  it('renders character groups with character and person links', () => {
    renderPage(<SubjectCharacters subject={homeData.subject} characters={characters} />);

    // 按出场类型分组：角色、配角、客串
    expect(screen.getByRole('heading', { name: '角色' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '配角' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '客串' })).toBeInTheDocument();

    // 角色头像链接与名字链接均指向角色页
    const characterLinks = screen.getAllByRole('link', { name: '测试角色' });
    expect(characterLinks).toHaveLength(2);
    expect(characterLinks.every((link) => link.getAttribute('href') === '/character/5')).toBe(true);

    // 出演声优链接指向人物页
    expect(screen.getByRole('link', { name: 'Test CV' })).toHaveAttribute('href', '/person/8');
    expect(screen.getByRole('link', { name: 'Test Voice Actor' })).toHaveAttribute(
      'href',
      '/person/9',
    );

    // 角色简介与配音类型标签
    expect(
      screen.getByText('测试角色的简介，用于验证角色介绍在列表中的展示与两行截断效果。'),
    ).toBeInTheDocument();
    expect(screen.getByText('CV:')).toBeInTheDocument();
    expect(screen.getByText('中文配音:')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('renders an empty state when the subject has no characters', () => {
    renderPage(<SubjectCharacters subject={homeData.subject} characters={[]} />);

    expect(screen.getByText('暂无角色')).toBeInTheDocument();
  });
});
