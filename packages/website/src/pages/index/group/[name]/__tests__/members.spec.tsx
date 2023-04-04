import type { RenderResult } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';

import type { GroupMember, ResponseWithPagination } from '@bangumi/client/group';

import { server as mockServer } from '../../../../../mocks/server';
import { renderPage } from '../../../../../utils/test-utils';
import GroupMembers from '../index/members';
import Sandbox from './fixtures/sandbox.json';
import sandboxMembers from './fixtures/sandbox-members.json';
import sandboxModMember from './fixtures/sandbox-mod-member.json';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

class GroupMembersTest {
  page: RenderResult;

  constructor(
    name: string,
    mock: {
      members: ResponseWithPagination<GroupMember[]>;
      modMembers: ResponseWithPagination<GroupMember[]>;
    },
  ) {
    mockedUseParams.mockReturnValue({
      name,
    });

    mockServer.use(
      rest.get(`http://localhost:3000/p1/groups/${name}/profile`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(Sandbox));
      }),
    );

    mockServer.use(
      rest.get(`http://localhost:3000/p1/groups/${name}/members`, async (req, res, ctx) => {
        const isAdmin = req.url.searchParams.get('type') === 'mod';
        return res(ctx.status(200), ctx.json(isAdmin ? mock.modMembers : mock.members));
      }),
    );

    this.page = renderPage(
      <Routes>
        <Route element={<Outlet context={{ groupRet: { group: Sandbox } }} />}>
          <Route index element={<GroupMembers />} />
        </Route>
      </Routes>,
    );
  }

  async assertMembersExist(expectMembers: string[]): Promise<void> {
    const { getByText } = this.page;

    await waitFor(() => {
      expectMembers.forEach((member) => {
        expect(getByText(member)).toBeInTheDocument();
      });
    });
  }
}

it('should list group members', async () => {
  const test = new GroupMembersTest('test', {
    members: sandboxMembers as ResponseWithPagination<GroupMember[]>,
    modMembers: sandboxModMember as ResponseWithPagination<GroupMember[]>,
  });

  await test.assertMembersExist(['树洞酱', 'nickname 427613', 'nickname 287622']);
});
