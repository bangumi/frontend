import React from 'react';
import { useParams } from 'react-router-dom';

import { GroupMemberRole } from '@bangumi/client/client';
import { Pagination, Section } from '@bangumi/design';
import { UnreadableCodeError } from '@bangumi/utils';
import Helmet from '@bangumi/website/components/Helmet';
import { useGroupMembers } from '@bangumi/website/hooks/use-group-members';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

import { UserCard } from '../../components/UserCard';
import { useGroupContext } from '..';
import styles from './style.module.less';

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
          <div className={styles.members}>
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
        <div className={styles.members}>
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
          wrapperClass={styles.pagination}
          total={total}
          currentPage={curPage}
          onChange={handlePageChange}
        />
      </Section>
    </>
  );
};

export default GroupMembersPage;
