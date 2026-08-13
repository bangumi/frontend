import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { CreatePrivateMessage } from '@bangumi/client/client';

import type { PMFolder } from '../pages/index/pm/types';
import { useUser } from './use-user';

/** 私信错误码 → 中文文案（错误码未进入 openapi，需前端硬编码映射） */
export function pmErrorMessage(error: unknown): string {
  const code = (error as { data?: { code?: string } } | null | undefined)?.data?.code;
  switch (code) {
    case 'PM_SEND_BANNED':
      return '你当前无法发送私信';
    case 'PM_SEND_NOT_ALLOWED':
      return '无法给该用户发送私信';
    case 'PM_RECEIVER_NOT_FOUND':
      return '收件人不存在';
    case 'PM_SEND_SELF':
      return '不能给自己发私信';
    case 'PM_TOO_MANY_RECEIVERS':
      return '收件人最多 10 个';
    case 'PM_CONTENT_INVALID':
      return '内容包含非法字符';
    case 'PM_CONVERSATION_NOT_FOUND':
      return '私信不存在';
    case 'RATE_LIMIT_EXCEEDED':
      return '操作过于频繁，请稍后再试';
    default:
      return '操作失败，请稍后再试';
  }
}

/** 非 suspense：供 Header 等非阻塞场景使用，未登录时不请求 */
export const usePmStatus = () => {
  const { user } = useUser();
  return useSWR(user ? 'pm/status' : null, async () => ok(ozaClient.getPrivateMessageStatus()));
};

export const usePmConversations = (folder: PMFolder, offset: number, limit: number) =>
  useSWR(
    `pm/conversations/${folder}/${offset}/${limit}`,
    async () =>
      folder === 'inbox'
        ? ok(ozaClient.listPrivateMessageInbox({ limit, offset }))
        : ok(ozaClient.listPrivateMessageOutbox({ limit, offset })),
    { suspense: true },
  );

export const usePmConversation = (msgID: number) =>
  useSWR(
    `pm/conversation/${msgID}`,
    async () => ok(ozaClient.getPrivateMessageConversation(msgID)),
    { suspense: true },
  );

export const usePmContacts = () =>
  useSWR('pm/contacts', async () => ok(ozaClient.listPrivateMessageContacts()), {
    suspense: true,
  });

/** 发送私信 / 回复；返回后端写入结果 */
export const sendPm = async (input: CreatePrivateMessage) =>
  ok(ozaClient.createPrivateMessage(input));

/** 进入会话后显式标记已读（后端 GET 会话详情已无自动已读副作用） */
export const markPmRead = async (msgID: number) =>
  ok(ozaClient.markPrivateMessageConversationRead(msgID));

export const deletePmConversation = async (msgID: number) =>
  ok(ozaClient.deletePrivateMessageConversation(msgID));

export const deletePmMessage = async (msgID: number) => ok(ozaClient.deletePrivateMessage(msgID));
