import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { Button, toast, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { PageNeedLoginError } from '@bangumi/website/error';
import {
  deletePmConversation,
  markPmRead,
  pmErrorMessage,
  sendPm,
  usePmConversation,
} from '@bangumi/website/hooks/use-pm';
import { useUser } from '@bangumi/website/hooks/use-user';

import { MessageItem } from '../../components/MessageItem';
import { ReplyForm } from '../../components/ReplyForm';

const header = css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' });

const titleRow = css({ display: 'flex', alignItems: 'baseline', gap: '10px', minWidth: '0' });

const otherName = css({ fontWeight: '600', color: '#1f1c1c', flexShrink: '0' });

const titleText = css({
  color: '#595555',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const messagesBox = css({ marginTop: '24px' });

const replyBox = css({ marginTop: '12px' });

function Conversation(): React.ReactElement {
  const { msgID: msgIDParam } = useParams();
  const msgID = Number(msgIDParam);
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { data: detail } = usePmConversation(msgID);

  // 进入会话显式标记已读；标记失败不影响会话展示，忽略
  useEffect(() => {
    void markPmRead(msgID).catch(() => {});
  }, [msgID]);

  if (isLoading) {
    return <></>;
  }
  if (!user) {
    throw PageNeedLoginError;
  }

  const { conversation, messages } = detail;
  const { other } = conversation;

  const handleReply = async (content: string): Promise<void> => {
    await sendPm({
      receivers: [other.username],
      title: conversation.title,
      content,
      related: conversation.id,
    });
    await mutate((key) => typeof key === 'string' && key.startsWith('pm/'));
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePmConversation(msgID);
      await mutate((key) => typeof key === 'string' && key.startsWith('pm/'));
      navigate('/pm');
    } catch (error) {
      toast(pmErrorMessage(error));
    }
  };

  return (
    <PageContainer as='main'>
      <Helmet title={conversation.title} />
      <div className={header}>
        <div className={titleRow}>
          <Typography.Link to={getUserProfileLink(other.username)} className={otherName}>
            {other.nickname}
          </Typography.Link>
          <span className={titleText}>{conversation.title}</span>
        </div>
        <Button type='secondary' size='medium' onClick={handleDelete}>
          删除会话
        </Button>
      </div>

      <div className={messagesBox}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} isSelf={message.sender.id === user.id} />
        ))}
      </div>

      <div className={replyBox}>
        <ReplyForm onSubmit={handleReply} />
      </div>
    </PageContainer>
  );
}

export default withErrorBoundary(Conversation);
