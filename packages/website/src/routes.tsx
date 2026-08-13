import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';

import LegacyRedirect from './components/PageRoutes/LegacyRedirect';

const RootIndex = lazy(async () => import('./pages/index'));
const MatchAll = lazy(async () => import('./pages/index/[...slug]'));
const HomeIndex = lazy(async () => import('./pages/index/index'));
const About = lazy(async () => import('./pages/index/about'));
const AboutGuideline = lazy(async () => import('./pages/index/about/guideline'));
const AboutCopyright = lazy(async () => import('./pages/index/about/copyright'));
const AboutLink2Us = lazy(async () => import('./pages/index/about/link2us'));
const BBCodeHelp = lazy(async () => import('./pages/index/help/bbcode'));
const DevApp = lazy(async () => import('./pages/index/dev/app'));
const Dollars = lazy(async () => import('./pages/index/dollars'));
const Goodies = lazy(async () => import('./pages/index/goodies'));
const Channel = lazy(async () => import('./pages/index/channel'));
const Episode = lazy(async () => import('./pages/index/ep/[id]'));
const EpisodeEdit = lazy(async () => import('./pages/index/ep/[id]/edit'));
const Notifications = lazy(async () => import('./pages/index/notifications'));
const PmInbox = lazy(async () => import('./pages/index/pm'));
const PmOutbox = lazy(async () => import('./pages/index/pm/outbox'));
const PmCompose = lazy(async () => import('./pages/index/pm/compose'));
const PmConversation = lazy(async () => import('./pages/index/pm/conversation/[msgID]'));
const Group = lazy(async () => import('./pages/index/group/[name]/index'));
const GroupChannel = lazy(async () => import('./pages/index/group/index'));
const GroupAll = lazy(async () => import('./pages/index/group/all'));
const GroupDiscover = lazy(async () => import('./pages/index/group/discover'));
const GroupForum = lazy(async () => import('./pages/index/group/[name]/index/forum'));
const GroupHome = lazy(async () => import('./pages/index/group/[name]/index/index'));
const GroupMembers = lazy(async () => import('./pages/index/group/[name]/index/members'));
const GroupMine = lazy(async () => import('./pages/index/group/mine'));
const GroupMyTopic = lazy(async () => import('./pages/index/group/my-topic'));
const GroupMyReply = lazy(async () => import('./pages/index/group/my-reply'));
const GroupNewTopic = lazy(async () => import('./pages/index/group/[name]/new_topic'));
const GroupReply = lazy(async () => import('./pages/index/group/reply/[id]'));
const GroupReplyEdit = lazy(async () => import('./pages/index/group/reply/[id]/edit'));
const GroupTopic = lazy(async () => import('./pages/index/group/topic/[id]'));
const GroupTopicEdit = lazy(async () => import('./pages/index/group/topic/[id]/edit'));
const GroupTopicHome = lazy(async () => import('./pages/index/group/topic/[id]/index'));
const Character = lazy(async () => import('./pages/index/character/[id]/index'));
const SubjectCharacters = lazy(async () => import('./pages/index/subject/[id]/characters'));
const SubjectPersons = lazy(async () => import('./pages/index/subject/[id]/persons'));
const Subject = lazy(async () => import('./pages/index/subject/[id]/index'));
const SubjectIndexes = lazy(async () => import('./pages/index/subject/[id]/indexes'));
const SubjectEpisodes = lazy(async () => import('./pages/index/subject/[id]/ep'));
const SubjectRelations = lazy(async () => import('./pages/index/subject/[id]/relations'));
const SubjectBoard = lazy(async () => import('./pages/index/subject/[id]/board'));
const SubjectComments = lazy(async () => import('./pages/index/subject/[id]/comments'));
const SubjectReviews = lazy(async () => import('./pages/index/subject/[id]/reviews'));
const SubjectSearch = lazy(async () => import('./pages/index/subject_search/[keyword]'));
const SubjectTopic = lazy(async () => import('./pages/index/subject/topic/[id]'));
const SubjectTopicEdit = lazy(async () => import('./pages/index/subject/topic/[id]/edit'));
const SubjectTopicHome = lazy(async () => import('./pages/index/subject/topic/[id]/index'));
const SubjectReply = lazy(async () => import('./pages/index/subject/reply/[id]'));
const SubjectReplyEdit = lazy(async () => import('./pages/index/subject/reply/[id]/edit'));
const Person = lazy(async () => import('./pages/index/person/[id]'));
const PersonVoice = lazy(async () => import('./pages/index/person/[id]/voice'));
const PersonWorks = lazy(async () => import('./pages/index/person/[id]/works'));
const Wiki = lazy(async () => import('./pages/index/subject/[id]/wiki'));
const WikiEdit = lazy(async () => import('./pages/index/subject/[id]/wiki/edit'));
const WikiEditDetail = lazy(async () => import('./pages/index/subject/[id]/wiki/edit_detail'));
const WikiHistory = lazy(async () => import('./pages/index/subject/[id]/wiki/history'));
const WikiHome = lazy(async () => import('./pages/index/subject/[id]/wiki/index'));
const WikiUploadImg = lazy(async () => import('./pages/index/subject/[id]/wiki/upload_img'));
const Login = lazy(async () => import('./pages/login'));
const UserHome = lazy(async () => import('./pages/index/user/[username]'));
const UserCollections = lazy(async () => import('./pages/index/user/collections/[username]'));
const BlogEntry = lazy(async () => import('./pages/index/blog/[id]'));

const userCollectionTypes = ['anime', 'book', 'music', 'game', 'real'] as const;

const legacyPagePaths = [
  ...userCollectionTypes.flatMap((type) => [
    `${type}/blog`,
    `${type}/browser/*`,
    `${type}/chart`,
    `${type}/tag/*`,
  ]),
  'calendar',
  'index',
  'index/:id',
  'index/:id/comments',
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
      { path: 'ep/:id', element: <Episode /> },
      { path: 'ep/:id/edit', element: <EpisodeEdit /> },
      { path: 'blog/:id', element: <BlogEntry /> },
      { path: 'notifications', element: <Notifications /> },
      {
        path: 'pm',
        children: [
          { path: '', element: <PmInbox /> },
          { path: 'outbox', element: <PmOutbox /> },
          { path: 'compose', element: <PmCompose /> },
          { path: 'conversation/:msgID', element: <PmConversation /> },
        ],
      },
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
