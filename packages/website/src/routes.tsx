import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const RootIndex = lazy(async () => import('./pages/index'));
const MatchAll = lazy(async () => import('./pages/index/[...slug]'));
const HomeIndex = lazy(async () => import('./pages/index/index'));
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
const Subject = lazy(async () => import('./pages/index/subject/[id]/index'));
const Wiki = lazy(async () => import('./pages/index/subject/[id]/wiki'));
const WikiEdit = lazy(async () => import('./pages/index/subject/[id]/wiki/edit'));
const WikiEditDetail = lazy(async () => import('./pages/index/subject/[id]/wiki/edit_detail'));
const WikiHistory = lazy(async () => import('./pages/index/subject/[id]/wiki/history'));
const WikiHome = lazy(async () => import('./pages/index/subject/[id]/wiki/index'));
const WikiUploadImg = lazy(async () => import('./pages/index/subject/[id]/wiki/upload_img'));
const Login = lazy(async () => import('./pages/login'));

export const pageRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootIndex />,
    children: [
      { path: '*', element: <MatchAll /> },
      { path: '', element: <HomeIndex /> },
      { path: 'notifications', element: <Notifications /> },
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
        path: 'subject',
        children: [
          {
            path: ':id',
            children: [
              { path: '', element: <Subject /> },
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
    ],
  },
  {
    path: 'login',
    children: [{ path: '', element: <Login /> }],
  },
];
