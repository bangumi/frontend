import { screen } from '@testing-library/react';
import React from 'react';

import type { SubjectHomeResponse, SubjectStaff } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import homeFixture from '../../../../mocks/fixtures/p1/subjects/12/home-GET.json';
import staffFixture from '../../../../mocks/fixtures/p1/subjects/12/staffs/persons-GET.json';
import SubjectPersons from './components/SubjectPersons';

const homeData = homeFixture as unknown as SubjectHomeResponse;
const staffs = staffFixture.data as SubjectStaff[];

describe('SubjectPersons', () => {
  it('groups staff by position with person links', () => {
    renderPage(<SubjectPersons subject={homeData.subject} staffs={staffs} />);

    // 按职位分组，同一人可以出现在多个职位下
    expect(screen.getByRole('heading', { name: '监督' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '脚本' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '分镜' })).toBeInTheDocument();

    // 名字链接：测试监督同时出现在「监督」和「分镜」两组
    const directorNameLinks = screen.getAllByRole('link', { name: 'Test Director' });
    expect(directorNameLinks).toHaveLength(2);
    expect(directorNameLinks.every((link) => link.getAttribute('href') === '/person/1')).toBe(true);

    // 头像链接（title 显示中文名）同样指向人物页
    const directorAvatarLinks = screen.getAllByRole('link', { name: '测试监督' });
    expect(directorAvatarLinks).toHaveLength(2);
    expect(directorAvatarLinks.every((link) => link.getAttribute('href') === '/person/1')).toBe(
      true,
    );

    expect(screen.getByRole('link', { name: 'Test Writer' })).toHaveAttribute('href', '/person/2');
    expect(screen.getByRole('link', { name: '测试脚本' })).toHaveAttribute('href', '/person/2');

    // 职位摘要与出演话数
    expect(screen.getByText('第1-3话')).toBeInTheDocument();
    expect(screen.getByText('系列构成 / 1-12')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('renders an empty state when the subject has no staff', () => {
    renderPage(<SubjectPersons subject={homeData.subject} staffs={[]} />);

    expect(screen.getByText('暂无制作人员')).toBeInTheDocument();
  });
});
