import type { CreateBlog, UpdateBlog } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 日志表单字段（对齐契约 POST/PATCH /p1/blogs） */
export type BlogFormData = CreateBlog;

/** 发布日志 */
export async function createBlogEntry(
  body: CreateBlog & { turnstileToken: string },
): Promise<{ id: number }> {
  const res = await ozaClient.createBlogEntry(body);
  if (res.status === 200) {
    return res.data;
  }
  throw new Error(res.data.message);
}

/** 编辑日志 */
export async function updateBlogEntry(entryId: number, body: UpdateBlog): Promise<void> {
  const res = await ozaClient.updateBlogEntry(entryId, body);
  if (res.status === 200) {
    return;
  }
  throw new Error(res.data.message);
}
