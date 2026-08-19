import { screen } from '@testing-library/react';
import React from 'react';

import type {
  ChannelSubjectTopic,
  FriendSubjectCollectionActivity,
  SlimBlogEntry,
  SubjectTag,
  TrendingSubject,
} from '@bangumi/client/client';
import { CollectionType } from '@bangumi/client/client';
import { renderPage } from '@bangumi/website/utils/test-utils';

import topicsJson from '../../../mocks/fixtures/p1/trending/subjects/topics-GET.json';
import subjectsJson from '../../../mocks/fixtures/p1/trending/subjects-GET.json';
import { ChannelPageContent } from '.';
import { CHANNEL_CONFIGS } from './config';

const subjects = subjectsJson.data.slice(0, 3) as unknown as TrendingSubject[];
const topics = topicsJson.data
  .filter((topic) => topic.subject.type === 2)
  .slice(0, 2) as unknown as ChannelSubjectTopic[];
const user = topics[0]!.creator!;

const blogs: SlimBlogEntry[] = [
  {
    id: 100,
    type: 1,
    uid: user.id,
    user,
    title: '七月新番第一话短评合集',
    icon: '',
    summary: '本季度新番的第一印象。',
    replies: 4,
    public: true,
    createdAt: 1_786_000_000,
    updatedAt: 1_786_000_000,
  },
];
const tags: SubjectTag[] = [
  { name: 'TV', count: 1200 },
  { name: '原创', count: 340 },
];

function createData(
  collectionType: CollectionType = CollectionType.Doing,
): React.ComponentProps<typeof ChannelPageContent>['data'] {
  const friendActivities: FriendSubjectCollectionActivity[] = [
    {
      user,
      subject: subjects[0]!.subject,
      collectionType,
      updatedAt: 1_786_000_000,
    },
  ];

  return {
    subjects,
    topics,
    blogs,
    tags,
    friendActivities,
    showFriendActivities: true,
  };
}

describe('ChannelPageContent', () => {
  it.each([
    ['anime', '动画频道', '注目动画'],
    ['book', '书籍频道', '注目书籍'],
    ['music', '音乐频道', '注目音乐'],
    ['game', '游戏频道', '注目游戏'],
    ['real', '三次元频道', '注目三次元'],
  ] as const)('renders the %s channel configuration', (key, pageTitle, trendingTitle) => {
    renderPage(<ChannelPageContent config={CHANNEL_CONFIGS[key]} data={createData()} />);

    expect(screen.getByRole('heading', { name: pageTitle })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: new RegExp(trendingTitle) })).toBeInTheDocument();
  });

  it('renders all channel data sections', () => {
    renderPage(<ChannelPageContent config={CHANNEL_CONFIGS.anime} data={createData()} />);

    expect(document.querySelector('main')?.className).toContain('max-w_1200px');
    expect(screen.getAllByText('尼古喵喵')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: '好友动态' })).toBeInTheDocument();
    expect(screen.getByText('七月新番第一话短评合集')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '动画日志more' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '标签汇总more' })).toBeInTheDocument();
    expect(screen.getByTitle('1,200 个条目')).toHaveTextContent('TV');
    expect(
      screen.getByText(
        '《记忆管理局》是2010年左右中国二次元社区所期待的中国动画“未来应该走的路子”吗？',
      ),
    ).toBeInTheDocument();
  });

  it('uses the channel-specific collection verb', () => {
    renderPage(<ChannelPageContent config={CHANNEL_CONFIGS.book} data={createData()} />);

    expect(screen.getByText('在读')).toBeInTheDocument();
  });
});
