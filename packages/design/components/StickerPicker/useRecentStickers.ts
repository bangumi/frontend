import { useCallback, useState } from 'react';

import { isStickerCode } from '@bangumi/utils/stickers.ts';

const RECENT_STICKERS_KEY = 'bangumi-recent-stickers';

const MAX_RECENT = 20;

function readRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_STICKERS_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    // 表情目录可能变化，剔除已不存在的代码
    return parsed
      .filter((code): code is string => typeof code === 'string' && isStickerCode(code))
      .slice(0, MAX_RECENT);
  } catch {
    // 内容损坏或 localStorage 不可用时视为没有记录
    return [];
  }
}

function writeRecent(codes: readonly string[]): void {
  try {
    window.localStorage.setItem(RECENT_STICKERS_KEY, JSON.stringify(codes));
  } catch {
    // Safari 无痕模式下 setItem 会抛异常；最近使用不是关键功能，忽略即可
  }
}

/** 最近使用过的表情代码，按最近优先排序并持久化到 localStorage */
export function useRecentStickers(): {
  recent: readonly string[];
  push: (code: string) => void;
} {
  const [recent, setRecent] = useState<readonly string[]>(readRecent);

  const push = useCallback((code: string): void => {
    setRecent((prev) => {
      const next = [code, ...prev.filter((item) => item !== code)].slice(0, MAX_RECENT);
      writeRecent(next);
      return next;
    });
  }, []);

  return { recent, push };
}
