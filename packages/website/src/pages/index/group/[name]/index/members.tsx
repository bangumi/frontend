import React from 'react';
import { useParams } from 'react-router-dom';

import { GroupMemberRole } from '@bangumi/client/client.ts';
import { Pagination, Section } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { UnreadableCodeError } from '@bangumi/utils/index.ts';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useGroupMembers } from '@bangumi/website/hooks/use-group-members.ts';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { useGroupContext } from '@bangumi/website/pages/index/group/[name]/index.tsx';
import { UserCard } from '@bangumi/website/pages/index/group/components/UserCard.tsx';

const members = css({
  marginBottom: '20px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  columnGap: '14px',
  rowGap: '20px',
  // 移动端每行至少两个成员，容器够宽时自动增加列数
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  },
});

const pagination = css({
  marginTop: '20px',
});

const GroupMembersPage = () => {
  const { curPage, offset, pageSize } = usePaginationParams(30);
  const { name } = useParams();

  if (name === undefined) {
    throw new UnreadableCodeError('BUG: name is undefined');
  }

  const groupContext = useGroupContext();
  const {
    groupRet: { group },
  } = groupContext;

  // 仅第一页获取管理员
  const { data: groupModMembers } = useGroupMembers(name, {
    offset,
    role: GroupMemberRole.Moderator,
    disable: curPage > 1,
  });

  const { data, total } = useGroupMembers(name, {
    offset,
    limit: pageSize,
    role: GroupMemberRole.Member,
  });
  const [, navigate] = useTransitionNavigate();

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  // TODO: 遵循旧站的交互规则，可能需要改动
  return (
    <>
      <Helmet title={`${group.title}小组成员`} />
      {curPage === 1 && (
        <Section title='小组管理员'>
          <div className={members}>
            {(groupModMembers ?? []).map((member) => (
              <UserCard
                mode='horizontal'
                user={{
                  nickname: member.user?.nickname ?? '',
                  username: member.user?.username ?? '',
                  avatar: member.user?.avatar.large ?? '',
                }}
                key={member.uid}
              />
            ))}
          </div>
        </Section>
      )}
      <Section title='小组成员'>
        <div className={members}>
          {(data ?? []).map((member) => {
            return (
              <UserCard
                mode='horizontal'
                user={{
                  nickname: member.user?.nickname ?? '',
                  username: member.user?.username ?? '',
                  avatar: member.user?.avatar.large ?? '',
                }}
                key={member.uid}
              />
            );
          })}
        </div>
        <Pagination
          wrapperClass={pagination}
          total={total}
          currentPage={curPage}
          onChange={handlePageChange}
        />
      </Section>
    </>
  );
};

export default GroupMembersPage;
