import React from 'react';

import { Pagination } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { usePmConversations } from '@bangumi/website/hooks/use-pm';

import type { PMFolder } from '../types';
import { ConversationItem } from './ConversationItem';

const empty = css({
  padding: '48px 0',
  color: '#9f9b9b',
  textAlign: 'center',
});

const pagination = css({ marginTop: '20px' });

export function ConversationList({ folder }: { folder: PMFolder }): React.ReactElement {
  const { curPage, pageSize, offset } = usePaginationParams();
  const [, navigate] = useTransitionNavigate();
  const { data } = usePmConversations(folder, offset, pageSize);

  if (data.total === 0) {
    return <div className={empty}>暂无私信</div>;
  }

  return (
    <div>
      {data.data.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} folder={folder} />
      ))}
      <Pagination
        total={data.total}
        currentPage={curPage}
        pageSize={pageSize}
        onChange={(page) => {
          navigate({ search: `page=${page}` });
        }}
        wrapperClass={pagination}
      />
    </div>
  );
}
