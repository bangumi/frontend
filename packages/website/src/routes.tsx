import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';

import LegacyRedirect from './components/PageRoutes/LegacyRedirect.tsx';

const RootIndex = lazy(async () => import('./pages/index/index.tsx'));
const MatchAll = lazy(async () => import('./pages/index/[...slug].tsx'));
const HomeIndex = lazy(async () => import('./pages/index/index.tsx'));
const About = lazy(async () => import('./pages/index/about/index.tsx'));
const AboutGuideline = lazy(async () => import('./pages/index/about/guideline.tsx'));
const AboutCopyright = lazy(async () => import('./pages/index/about/copyright.tsx'));
const AboutLink2Us = lazy(async () => import('./pages/index/about/link2us.tsx'));
const BBCodeHelp = lazy(async () => import('./pages/index/help/bbcode/index.tsx'));
const DevApp = lazy(async () => import('./pages/index/dev/app/index.tsx'));
const Dollars = lazy(async () => import('./pages/index/dollars/index.tsx'));
const Goodies = lazy(async () => import('./pages/index/goodies/index.tsx'));
const Channel = lazy(async () => import('./pages/index/channel/index.tsx'));
const Episode = lazy(async () => import('./pages/index/ep/[id]/index.tsx'));
const EpisodeEdit = lazy(async () => import('./pages/index/ep/[id]/edit.tsx'));
const Notifications = lazy(async () => import('./pages/index/notifications/index.tsx'));
const IndexChannel = lazy(async () => import('./pages/index/indexes/index.tsx'));
const IndexBrowser = lazy(async () => import('./pages/index/indexes/browser.tsx'));
const IndexCreate = lazy(async () => import('./pages/index/indexes/create.tsx'));
const IndexDetail = lazy(async () => import('./pages/index/indexes/[id]/index.tsx'));
const IndexCommentsPage = lazy(async () => import('./pages/index/indexes/[id]/comments.tsx'));
const IndexEdit = lazy(async () => import('./pages/index/indexes/[id]/edit.tsx'));
const IndexRelated = lazy(async () => import('./pages/index/indexes/[id]/related.tsx'));
const Rakuen = lazy(async () => import('./pages/index/rakuen/index.tsx'));
const Group = lazy(async () => import('./pages/index/group/[name]/index/index.tsx'));
const GroupChannel = lazy(async () => import('./pages/index/group/index.tsx'));
const GroupAll = lazy(async () => import('./pages/index/group/all.tsx'));
const GroupDiscover = lazy(async () => import('./pages/index/group/discover.tsx'));
const GroupForum = lazy(async () => import('./pages/index/group/[name]/index/forum.tsx'));
const GroupHome = lazy(async () => import('./pages/index/group/[name]/index/index.tsx'));
const GroupMembers = lazy(async () => import('./pages/index/group/[name]/index/members.tsx'));
const GroupMine = lazy(async () => import('./pages/index/group/mine.tsx'));
const GroupMyTopic = lazy(async () => import('./pages/index/group/my-topic.tsx'));
const GroupMyReply = lazy(async () => import('./pages/index/group/my-reply.tsx'));
const GroupNewTopic = lazy(async () => import('./pages/index/group/[name]/new_topic/index.tsx'));
const GroupReply = lazy(async () => import('./pages/index/group/reply/[id]'));
const GroupReplyEdit = lazy(async () => import('./pages/index/group/reply/[id]/edit.tsx'));
const GroupTopic = lazy(async () => import('./pages/index/group/topic/[id]/index.tsx'));
const GroupTopicEdit = lazy(async () => import('./pages/index/group/topic/[id]/edit.tsx'));
const GroupTopicHome = lazy(async () => import('./pages/index/group/topic/[id]/index.tsx'));
const Character = lazy(async () => import('./pages/index/character/[id]/index.tsx'));
const SubjectCharacters = lazy(async () => import('./pages/index/subject/[id]/characters.tsx'));
const SubjectPersons = lazy(async () => import('./pages/index/subject/[id]/persons.tsx'));
const Subject = lazy(async () => import('./pages/index/subject/[id]/index.tsx'));
const SubjectIndexes = lazy(async () => import('./pages/index/subject/[id]/indexes.tsx'));
const SubjectEpisodes = lazy(async () => import('./pages/index/subject/[id]/ep.tsx'));
const SubjectRelations = lazy(async () => import('./pages/index/subject/[id]/relations.tsx'));
const SubjectBoard = lazy(async () => import('./pages/index/subject/[id]/board.tsx'));
const SubjectComments = lazy(async () => import('./pages/index/subject/[id]/comments.tsx'));
const SubjectReviews = lazy(async () => import('./pages/index/subject/[id]/reviews.tsx'));
const SubjectSearch = lazy(async () => import('./pages/index/subject_search/[keyword]/index.tsx'));
const MonoSearch = lazy(async () => import('./pages/index/mono_search/[keyword]/index.tsx'));
const SubjectTopic = lazy(async () => import('./pages/index/subject/topic/[id]/index.tsx'));
const SubjectTopicEdit = lazy(async () => import('./pages/index/subject/topic/[id]/edit.tsx'));
const SubjectTopicHome = lazy(async () => import('./pages/index/subject/topic/[id]/index.tsx'));
const SubjectReply = lazy(async () => import('./pages/index/subject/reply/[id]'));
const SubjectReplyEdit = lazy(async () => import('./pages/index/subject/reply/[id]/edit.tsx'));
const Person = lazy(async () => import('./pages/index/person/[id]/index.tsx'));
const PersonVoice = lazy(async () => import('./pages/index/person/[id]/voice.tsx'));
const PersonWorks = lazy(async () => import('./pages/index/person/[id]/works.tsx'));
const Wiki = lazy(async () => import('./pages/index/subject/[id]/wiki/index.tsx'));
const WikiEdit = lazy(async () => import('./pages/index/subject/[id]/wiki/edit.tsx'));
const WikiEditDetail = lazy(async () => import('./pages/index/subject/[id]/wiki/edit_detail.tsx'));
const WikiHistory = lazy(async () => import('./pages/index/subject/[id]/wiki/history.tsx'));
const WikiHome = lazy(async () => import('./pages/index/subject/[id]/wiki/index.tsx'));
const WikiUploadImg = lazy(async () => import('./pages/index/subject/[id]/wiki/upload_img.tsx'));
const Login = lazy(async () => import('./pages/login/index.tsx'));
const UserHome = lazy(async () => import('./pages/index/user/[username]/index.tsx'));
const UserCollections = lazy(
  async () => import('./pages/index/user/collections/[username]/index.tsx'),
);
const BlogEntry = lazy(async () => import('./pages/index/blog/[id]/index.tsx'));
const BlogCreate = lazy(async () => import('./pages/index/blog/create.tsx'));
const BlogEdit = lazy(async () => import('./pages/index/blog/[id]/edit.tsx'));
const Calendar = lazy(async () => import('./pages/index/calendar/index.tsx'));

const userCollectionTypes = ['anime', 'book', 'music', 'game', 'real'] as const;

const legacyPagePaths = [
  ...userCollectionTypes.flatMap((type) => [
    `${type}/blog`,
    `${type}/browser/*`,
    `${type}/chart`,
    `${type}/tag/*`,
  ]),
  'magi',
  'onair',
  'subject/:id/collections',
  'subject/:id/stats',
  'subject/tag/:tag',
  'tokei',
  'user/:username/timeline/status/:id',
  'wiki',
] as const;

/** 旧版条目页剧集 URL 转发到新版 ep/:id */
const EpisodeRedirect: React.FC = () => {
  const { id } = useParams();
  return <Navigate to={`/ep/${id}`} replace />;
};

export const pageRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootIndex />,
    children: [
      ...legacyPagePaths.map((path) => ({ path, element: <LegacyRedirect /> })),
      { path: 'subject/ep/:id', element: <EpisodeRedirect /> },
      {
        path: 'subject/topic/:id',
        element: <SubjectTopic />,
        children: [
          { path: 'edit', element: <SubjectTopicEdit /> },
          { path: '', element: <SubjectTopicHome /> },
        ],
      },
      {
        path: 'subject/reply/:id',
        element: <SubjectReply />,
        children: [{ path: 'edit', element: <SubjectReplyEdit /> }],
      },
      { path: '*', element: <MatchAll /> },
      { path: '', element: <HomeIndex /> },
      {
        path: 'about',
        children: [
          { path: '', element: <About /> },
          { path: 'guideline', element: <AboutGuideline /> },
          { path: 'copyright', element: <AboutCopyright /> },
          { path: 'link2us', element: <AboutLink2Us /> },
        ],
      },
      { path: 'help/bbcode', element: <BBCodeHelp /> },
      { path: 'dev/app', element: <DevApp /> },
      { path: 'dollars', element: <Dollars /> },
      { path: 'goodies', element: <Goodies /> },
      {
        path: 'index',
        children: [
          { path: '', element: <IndexChannel /> },
          { path: 'browser', element: <IndexBrowser /> },
          { path: 'create', element: <IndexCreate /> },
          {
            path: ':id',
            children: [
              { path: '', element: <IndexDetail /> },
              { path: 'edit', element: <IndexEdit /> },
              { path: 'comments', element: <IndexCommentsPage /> },
              { path: 'related', element: <IndexRelated /> },
            ],
          },
        ],
      },
      { path: 'calendar', element: <Calendar /> },
      { path: 'rakuen', element: <Rakuen /> },
      { path: 'ep/:id', element: <Episode /> },
      { path: 'ep/:id/edit', element: <EpisodeEdit /> },
      { path: 'blog/create', element: <BlogCreate /> },
      { path: 'blog/:id', element: <BlogEntry /> },
      { path: 'blog/:id/edit', element: <BlogEdit /> },
      { path: 'notifications', element: <Notifications /> },
      ...userCollectionTypes.map((type) => ({
        path: type,
        children: [
          { path: '', element: <Channel channel={type} /> },
          {
            path: 'list/:username',
            children: [{ path: ':status?', element: <UserCollections subjectType={type} /> }],
          },
        ],
      })),
      {
        path: 'group',
        children: [
          { path: '', element: <GroupChannel /> },
          { path: 'all', element: <GroupAll /> },
          { path: 'discover', element: <GroupDiscover /> },
          { path: 'mine', element: <GroupMine /> },
          { path: 'my_topic', element: <GroupMyTopic /> },
          { path: 'my_reply', element: <GroupMyReply /> },
          {
            path: ':name',
            children: [
              {
                path: '',
                element: <Group />,
                children: [
                  { path: 'forum', element: <GroupForum /> },
                  { path: '', element: <GroupHome /> },
                  { path: 'members', element: <GroupMembers /> },
                ],
              },
              {
                path: 'new_topic',
                children: [{ path: '', element: <GroupNewTopic /> }],
              },
            ],
          },
          {
            path: 'reply',
            children: [
              {
                path: ':id',
                element: <GroupReply />,
                children: [{ path: 'edit', element: <GroupReplyEdit /> }],
              },
            ],
          },
          {
            path: 'topic',
            children: [
              {
                path: ':id',
                element: <GroupTopic />,
                children: [
                  { path: 'edit', element: <GroupTopicEdit /> },
                  { path: '', element: <GroupTopicHome /> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'character/:id',
        element: <Character />,
      },
      {
        path: 'subject',
        children: [
          {
            path: ':id',
            children: [
              { path: '', element: <Subject /> },
              { path: 'characters', element: <SubjectCharacters /> },
              { path: 'persons', element: <SubjectPersons /> },
              { path: 'index', element: <SubjectIndexes /> },
              { path: 'ep', element: <SubjectEpisodes /> },
              { path: 'relations', element: <SubjectRelations /> },
              { path: 'board', element: <SubjectBoard /> },
              { path: 'comments', element: <SubjectComments /> },
              { path: 'reviews', element: <SubjectReviews /> },
              {
                path: 'wiki',
                element: <Wiki />,
                children: [
                  { path: 'edit', element: <WikiEdit /> },
                  { path: 'edit_detail', element: <WikiEditDetail /> },
                  { path: 'history', element: <WikiHistory /> },
                  { path: '', element: <WikiHome /> },
                  { path: 'upload_img', element: <WikiUploadImg /> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'person/:id',
        children: [
          { path: '', element: <Person /> },
          { path: 'works', element: <PersonWorks /> },
          { path: 'works/voice', element: <PersonVoice /> },
        ],
      },
      {
        path: 'subject_search/:keyword',
        element: <SubjectSearch />,
      },
      {
        path: 'mono_search/:keyword',
        element: <MonoSearch />,
      },
      {
        path: 'user',
        children: [{ path: ':username', element: <UserHome /> }],
      },
    ],
  },
  {
    path: 'login',
    children: [{ path: '', element: <Login /> }],
  },
];
