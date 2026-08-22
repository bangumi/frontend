import React, { useState } from 'react';

import type { IndexRelated } from '@bangumi/client/client.ts';
import { IndexRelatedCategory } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';
import { Button, Input, Radio, toast } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { useIndexRelated } from '@bangumi/website/hooks/use-index-related.ts';

const form = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  padding: '12px',
  background: '#f7f7f4',
  borderRadius: '8px',
});

const field = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  color: '#595555',
});

const sidInput = css({
  width: '140px',
});

const list = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 0',
  borderTop: '1px dotted #e0e0e0',
  '&:first-child': { borderTop: 'none' },
});

const title = css({
  flex: '1 1 auto',
  minWidth: '0',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const catLabel = css({
  flex: 'none',
  padding: '1px 6px',
  borderRadius: '4px',
  background: '#e8e3e3',
  color: '#595555',
  fontSize: '12px',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  color: '#9f9b9b',
  fontSize: '13px',
});

const CAT_OPTIONS: { value: IndexRelatedCategory; label: string }[] = [
  { value: IndexRelatedCategory.Subject, label: '条目' },
  { value: IndexRelatedCategory.Character, label: '角色' },
  { value: IndexRelatedCategory.Person, label: '人物' },
  { value: IndexRelatedCategory.Episode, label: '章节' },
];

const CAT_LABEL: Record<IndexRelatedCategory, string> = {
  [IndexRelatedCategory.Subject]: '条目',
  [IndexRelatedCategory.Character]: '角色',
  [IndexRelatedCategory.Person]: '人物',
  [IndexRelatedCategory.Episode]: '章节',
  [IndexRelatedCategory.Blog]: '日志',
  [IndexRelatedCategory.GroupTopic]: '小组话题',
  [IndexRelatedCategory.SubjectTopic]: '条目讨论',
};

function RelatedTitle({ related }: { related: IndexRelated }) {
  switch (related.cat) {
    case IndexRelatedCategory.Subject:
      return <>{related.subject?.nameCN || related.subject?.name || related.rid}</>;
    case IndexRelatedCategory.Character:
      return <>{related.character?.nameCN || related.character?.name || related.rid}</>;
    case IndexRelatedCategory.Person:
      return <>{related.person?.nameCN || related.person?.name || related.rid}</>;
    case IndexRelatedCategory.Episode:
      return <>{related.episode?.nameCN || related.episode?.name || related.rid}</>;
    case IndexRelatedCategory.Blog:
      return <>{related.blog?.title || related.rid}</>;
    case IndexRelatedCategory.GroupTopic:
    case IndexRelatedCategory.SubjectTopic:
      return <>{related.groupTopic?.title || related.subjectTopic?.title || related.rid}</>;
    default:
      return <>{related.rid}</>;
  }
}

/** 目录关联内容管理：添加/删除/排序 */
const RelatedManager: React.FC<{ indexId: number }> = ({ indexId }) => {
  const { related, mutate } = useIndexRelated(indexId, undefined, undefined, 100, 0);
  const [cat, setCat] = useState<IndexRelatedCategory>(IndexRelatedCategory.Subject);
  const [sid, setSid] = useState('');
  const [sending, setSending] = useState(false);

  const sorted = [...related].sort((a, b) => a.order - b.order);

  const handleAdd = async () => {
    const rid = Number(sid);
    if (!Number.isInteger(rid) || rid <= 0) {
      toast('请输入有效的 ID');
      return;
    }
    setSending(true);
    try {
      const res = await ozaClient.putIndexRelated(indexId, { cat, sid: rid });
      if (res.status === 200) {
        setSid('');
        await mutate();
      } else {
        toast(res.data.message);
      }
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('确认删除这条关联内容？')) {
      const res = await ozaClient.deleteIndexRelated(indexId, id);
      if (res.status === 200) {
        await mutate();
      } else {
        toast(res.data.message);
      }
    }
  };

  /** 与相邻项交换 order，实现上移/下移 */
  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sorted.length) {
      return;
    }
    const a = sorted[index]!;
    const b = sorted[target]!;
    const resA = await ozaClient.patchIndexRelated(indexId, a.id, {
      order: b.order,
      comment: a.comment,
    });
    const resB = await ozaClient.patchIndexRelated(indexId, b.id, {
      order: a.order,
      comment: b.comment,
    });
    if (resA.status !== 200) {
      toast(resA.data.message);
      return;
    }
    if (resB.status !== 200) {
      toast(resB.data.message);
      return;
    }
    await mutate();
  };

  return (
    <>
      <div className={form}>
        <div className={field}>
          <span>类型：</span>
          <Radio.Group>
            {CAT_OPTIONS.map((option) => (
              <Radio
                key={option.value}
                label={option.label}
                name='related-cat'
                checked={cat === option.value}
                onChange={() => setCat(option.value)}
              />
            ))}
          </Radio.Group>
        </div>
        <div className={field}>
          <span>ID：</span>
          <Input
            className={sidInput}
            value={sid}
            onChange={(e) => setSid(e.target.value)}
            placeholder='输入条目/角色等 ID'
          />
        </div>
        <Button type='secondary' size='medium' onClick={handleAdd} disabled={sending}>
          添加
        </Button>
      </div>
      {sorted.length === 0 && <p className={empty}>暂无关联内容</p>}
      <ul className={list}>
        {sorted.map((entry, idx) => (
          <li key={entry.id} className={item}>
            <span className={catLabel}>{CAT_LABEL[entry.cat]}</span>
            <span className={title}>
              <RelatedTitle related={entry} />
            </span>
            <Button
              type='plain'
              size='small'
              disabled={idx === 0}
              onClick={async () => move(idx, -1)}
              title='上移'
            >
              ↑
            </Button>
            <Button
              type='plain'
              size='small'
              disabled={idx === sorted.length - 1}
              onClick={async () => move(idx, 1)}
              title='下移'
            >
              ↓
            </Button>
            <Button type='plain' size='small' onClick={async () => handleDelete(entry.id)}>
              删除
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RelatedManager;
