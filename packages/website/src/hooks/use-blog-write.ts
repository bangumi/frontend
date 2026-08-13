import type { BlogEntry } from '@bangumi/client/client';

/** 日志表单字段（对齐契约：POST/PATCH /p1/blogs） */
export interface BlogFormData {
  title: string;
  content: string;
  tags?: string[];
  /** true=公开，false=仅好友可见 */
  public?: boolean;
  /** 关联条目，最多 5 个 */
  subjectIDs?: number[];
}

interface ErrorPayload {
  message?: string;
}

/**
 * 临时实现：server-private 日志写接口完成并更新 openapi 后，
 * 替换为 ozaClient.createBlog / updateBlog（届时移除本文件 fetch 逻辑）。
 */
async function request<T>(path: string, method: 'POST' | 'PATCH', body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = (await res.json().catch(() => ({}))) as ErrorPayload;
    throw new Error(payload.message ?? `请求失败 (${res.status})`);
  }
  return (await res.json()) as T;
}

/** 发布日志（临时，待 codegen 替换） */
export async function createBlogEntry(
  body: BlogFormData & { turnstileToken: string },
): Promise<{ id: number }> {
  return request('/p1/blogs', 'POST', body);
}

/** 编辑日志（临时，待 codegen 替换） */
export async function updateBlogEntry(entryId: number, body: Partial<BlogFormData>): Promise<void> {
  await request(`/p1/blogs/${entryId}`, 'PATCH', body);
}

export type { BlogEntry };
