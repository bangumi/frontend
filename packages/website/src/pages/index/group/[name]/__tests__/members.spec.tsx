import type { RenderResult } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { useParams } from 'react-router-dom';
import { expect, it, vi } from 'vitest';

import type { GroupMember, ResponseWithPagination } from '@bangumi/client/group';

import { server as mockServer } from '../../../../../mocks/server';
import { renderPage } from '../../../../../utils/test-utils';
import GroupMembers from '../members';
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
      rest.get(`http://localhost/p1/groups/${name}/profile`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(Sandbox));
      }),
    );

    mockServer.use(
      rest.get(`http://localhost/p1/groups/${name}/members`, (req, res, ctx) => {
        const isAdmin = req.url.searchParams.get('type') === 'mod';
        return res(ctx.status(200), ctx.json(isAdmin ? mock.modMembers : mock.members));
      }),
    );

    this.page = renderPage(<GroupMembers />);
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
