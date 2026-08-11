import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import LegacyRedirect from './components/PageRoutes/LegacyRedirect';

const RootIndex = lazy(async () => import('./pages/index'));
const MatchAll = lazy(async () => import('./pages/index/[...slug]'));
const HomeIndex = lazy(async () => import('./pages/index/index'));
const Channel = lazy(async () => import('./pages/index/channel'));
const Episode = lazy(async () => import('./pages/index/ep/[id]'));
const EpisodeEdit = lazy(async () => import('./pages/index/ep/[id]/edit'));
const Notifications = lazy(async () => import('./pages/index/notifications'));
const Group = lazy(async () => import('./pages/index/group/[name]/index'));
const GroupForum = lazy(async () => import('./pages/index/group/[name]/index/forum'));
const GroupHome = lazy(async () => import('./pages/index/group/[name]/index/index'));
const GroupMembers = lazy(async () => import('./pages/index/group/[name]/index/members'));
const GroupNewTopic = lazy(async () => import('./pages/index/group/[name]/new_topic'));
const GroupReply = lazy(async () => import('./pages/index/group/reply/[id]'));
const GroupReplyEdit = lazy(async () => import('./pages/index/group/reply/[id]/edit'));
const GroupTopic = lazy(async () => import('./pages/index/group/topic/[id]'));
const GroupTopicEdit = lazy(async () => import('./pages/index/group/topic/[id]/edit'));
const GroupTopicHome = lazy(async () => import('./pages/index/group/topic/[id]/index'));
const Character = lazy(async () => import('./pages/index/character/[id]/index'));
const SubjectCharacters = lazy(async () => import('./pages/index/subject/[id]/characters'));
const Subject = lazy(async () => import('./pages/index/subject/[id]/index'));
const SubjectIndexes = lazy(async () => import('./pages/index/subject/[id]/indexes'));
const SubjectEpisodes = lazy(async () => import('./pages/index/subject/[id]/ep'));
const SubjectRelations = lazy(async () => import('./pages/index/subject/[id]/relations'));
const SubjectSearch = lazy(async () => import('./pages/index/subject_search/[keyword]'));
const Person = lazy(async () => import('./pages/index/person/[id]'));
const Wiki = lazy(async () => import('./pages/index/subject/[id]/wiki'));
const WikiEdit = lazy(async () => import('./pages/index/subject/[id]/wiki/edit'));
const WikiEditDetail = lazy(async () => import('./pages/index/subject/[id]/wiki/edit_detail'));
const WikiHistory = lazy(async () => import('./pages/index/subject/[id]/wiki/history'));
const WikiHome = lazy(async () => import('./pages/index/subject/[id]/wiki/index'));
const WikiUploadImg = lazy(async () => import('./pages/index/subject/[id]/wiki/upload_img'));
const Login = lazy(async () => import('./pages/login'));
const UserHome = lazy(async () => import('./pages/index/user/[username]'));
const UserCollections = lazy(async () => import('./pages/index/user/collections/[username]'));

const userCollectionTypes = ['anime', 'book', 'music', 'game', 'real'] as const;

const legacyPagePaths = [
  ...userCollectionTypes.flatMap((type) => [
    `${type}/blog`,
    `${type}/browser/*`,
    `${type}/chart`,
    `${type}/tag/*`,
  ]),
  'about',
  'about/guideline',
  'about/copyright',
  'about/link2us',
  'award/2021',
  'blog/:id',
  'calendar',
  'dev/app',
  'dollars',
  'goodies',
  'group/all',
  'group/discover',
  'group/mine',
  'group/my_reply',
  'group/my_topic',
  'help/bbcode',
  'index',
  'index/:id',
  'index/:id/comments',
  'magi',
  'onair',
  'register',
  'subject/:id/board',
  'subject/:id/collections',
  'subject/:id/comments',
  'subject/:id/persons',
  'subject/:id/reviews',
  'subject/:id/stats',
  'subject/ep/:id',
  'subject/tag/:tag',
  'subject/topic/:id',
  'tokei',
  'user/:username/timeline/status/:id',
  'wiki',
] as const;

export const pageRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootIndex />,
    children: [
      ...legacyPagePaths.map((path) => ({ path, element: <LegacyRedirect /> })),
      { path: '*', element: <MatchAll /> },
      { path: '', element: <HomeIndex /> },
      { path: 'ep/:id', element: <Episode /> },
      { path: 'ep/:id/edit', element: <EpisodeEdit /> },
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
              { path: 'index', element: <SubjectIndexes /> },
              { path: 'ep', element: <SubjectEpisodes /> },
              { path: 'relations', element: <SubjectRelations /> },
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
        element: <Person />,
      },
      {
        path: 'subject_search/:keyword',
        element: <SubjectSearch />,
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
