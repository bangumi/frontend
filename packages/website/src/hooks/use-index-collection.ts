import { useState } from 'react';

import { ozaClient } from '@bangumi/client/index.ts';
import { toast } from '@bangumi/design/index.tsx';

/**
 * 目录收藏操作。
 *
 * 是否已收藏由详情数据中的 `Index.collectedAt` 驱动，操作成功后调用方
 * 需要自行刷新详情数据以更新收藏状态。
 */
export function useIndexCollection(indexId: number): {
  pending: boolean;
  add: () => Promise<boolean>;
  remove: () => Promise<boolean>;
} {
  const [pending, setPending] = useState(false);

  const add = async (): Promise<boolean> => {
    setPending(true);
    try {
      const res = await ozaClient.addIndexCollection(indexId);
      if (res.status === 200) {
        return true;
      }
      toast(res.data.message);
      return false;
    } finally {
      setPending(false);
    }
  };

  const remove = async (): Promise<boolean> => {
    setPending(true);
    try {
      const res = await ozaClient.deleteIndexCollection(indexId);
      if (res.status === 200) {
        return true;
      }
      toast(res.data.message);
      return false;
    } finally {
      setPending(false);
    }
  };

  return { pending, add, remove };
}
