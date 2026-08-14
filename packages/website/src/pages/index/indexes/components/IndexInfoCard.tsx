import dayjs from 'dayjs';
import React from 'react';

import type { Index } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { BBCodePreset } from '@bangumi/utils/bbcode/presets';
import { render as renderBBCode } from '@bangumi/utils/bbcode/react';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { useIndexCollection } from '@bangumi/website/hooks/use-index-collection';
import { useUser } from '@bangumi/website/hooks/use-user';

const { Link } = Typography;

const card = css({
  background: '#f7f7f4',
  borderRadius: '15px',
  padding: '15px',
});

const top = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
});

const avatarLink = css({
  flex: '0 0 48px',
  '& .bgm-avatar': { display: 'block' },
});

const desc = css({
  flex: '1 1 auto',
  minWidth: '0',
  fontSize: '13px',
  lineHeight: '150%',
  color: '#595555',
  overflowWrap: 'anywhere',
  '& a': { color: '#123' },
});

const descEmpty = css({
  color: '#9f9b9b',
});

const divider = css({
  border: 'none',
  borderTop: '1px solid #e8e3e3',
  margin: '12px 0',
});

const bottom = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  flexWrap: 'wrap',
});

const meta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  lineHeight: '17px',
  color: '#9f9b9b',
  '& a': { color: '#123' },
});

const time = css({ color: '#595555' });

/** 收藏/取消收藏按钮，对齐旧站 btnPink/btnBlue */
const collectBtn = css({
  display: 'inline-block',
  padding: '5px 25px',
  borderRadius: '50px',
  background: '#f09199',
  color: '#fff',
  fontSize: '14px',
  lineHeight: '150%',
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  _hover: { background: '#e7848e', color: '#fff' },
});

const collectBtnBlue = css({
  background: '#8bb5da',
  _hover: { background: '#79a8cf', color: '#fff' },
});

function formatTime(unix: number): string {
  return dayjs.unix(unix).format('YYYY-M-D HH:mm');
}

/** 目录信息卡：描述 + 作者/时间行 + 收藏按钮（对齐旧站 index_info） */
const IndexInfoCard: React.FC<{
  index: Index;
  mutate: () => Promise<unknown>;
}> = ({ index, mutate }) => {
  const { user } = useUser();
  const { pending, add, remove } = useIndexCollection(index.id);
  const isCollected = index.collectedAt != null;
  const isOwner = user?.id === index.uid;
  const parsedDescription = renderBBCode(index.desc, BBCodePreset.indexDescription);

  const handleCollect = async () => {
    const success = isCollected ? await remove() : await add();
    if (success) {
      await mutate();
    }
  };

  return (
    <div className={card}>
      <div className={top}>
        {index.user && (
          <Link to={getUserProfileLink(index.user.username)} className={avatarLink}>
            <Avatar src={index.user.avatar.large} size='medium' alt={index.user.nickname} />
          </Link>
        )}
        {index.desc ? (
          <div className={desc}>{parsedDescription}</div>
        ) : (
          <div className={desc}>这个目录还没有描述</div>
        )}
      </div>
      <hr className={divider} />
      <div className={bottom}>
        <div className={meta}>
          {index.user && (
            <Link to={getUserProfileLink(index.user.username)}>{index.user.nickname}</Link>
          )}
          <span>
            · 创建 <span className={time}>{formatTime(index.createdAt)}</span>
          </span>
          <span>
            · 更新 <span className={time}>{formatTime(index.updatedAt)}</span>
          </span>
          {index.private && <span>· 私密</span>}
          {index.collects > 0 && <span>/ {index.collects} 人收藏</span>}
          {isOwner && (
            <>
              <span>/</span>
              <Link to={`/index/${index.id}/edit`}>修改</Link>
              <span>/</span>
              <Link to={`/index/${index.id}/related`}>管理</Link>
            </>
          )}
        </div>
        {user && (
          <button
            type='button'
            className={collectBtn + (isCollected ? ` ${collectBtnBlue}` : '')}
            onClick={handleCollect}
            disabled={pending}
          >
            {isCollected ? '取消收藏' : '收藏目录'}
          </button>
        )}
      </div>
    </div>
  );
};

export default IndexInfoCard;
