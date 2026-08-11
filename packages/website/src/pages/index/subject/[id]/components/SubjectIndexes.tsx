import dayjs from 'dayjs';
import React from 'react';

import type { IndexStats, SlimIndex, Subject } from '@bangumi/client/client';
import { Avatar, Pagination, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getIndexLink, getLegacyPageLink, getUserProfileLink } from '@bangumi/utils/pages';
import subjectTypeSprite from '@bangumi/website/assets/subject-type-sprite.png';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useUser } from '@bangumi/website/hooks/use-user';

import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

/** 统计图标：条目类型 sprite（与旧站 subject_type_v2.png 一致），background-position 取自旧站 less */
const SUBJECT_STAT_KEYS: {
  key: keyof IndexStats['subject'];
  label: string;
  backgroundPosition: string;
}[] = [
  { key: 'anime', label: '动画', backgroundPosition: '0 -19px' },
  { key: 'book', label: '书籍', backgroundPosition: '0 0' },
  { key: 'music', label: '音乐', backgroundPosition: '0 -34px' },
  { key: 'game', label: '游戏', backgroundPosition: '0 -50px' },
  { key: 'real', label: '三次元', backgroundPosition: '0 -65px' },
];

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '10px',
  smDown: { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const listColumn = css({ minWidth: '0' });

/** 收集至我的目录，对齐 PHP btnPink */
const collectButton = css({
  boxSizing: 'border-box',
  display: 'inline-block',
  margin: '5px 0',
  padding: '5px 25px',
  borderRadius: '50px',
  background: '#f09199',
  color: '#fff',
  fontSize: '14px',
  lineHeight: '150%',
  textAlign: 'center',
  _hover: { background: '#e7848e', color: '#fff', textDecoration: 'none' },
});

const indexList = css({ margin: '0', padding: '0', listStyle: 'none' });

const item = css({
  display: 'flex',
  margin: '5px 0',
  padding: '5px 0',
});

const avatar = css({
  flex: '0 0 50px',
  margin: '0 5px',
  minWidth: '0',
  '& .bgm-avatar': { display: 'block' },
});

const info = css({
  flex: '1 1 auto',
  minWidth: '0',
  padding: '0 5px 5px 0',
  borderBottom: '1px dotted #e0e0e0',
  fontSize: '14px',
  lineHeight: '18px',
});

const head = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
});

const title = css({
  flex: '1 1 auto',
  minWidth: '0',
  '& h3': {
    margin: '0 0 5px',
    overflow: 'hidden',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '18px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const statsClass = css({
  flex: 'none',
  marginLeft: 'auto',
  color: '#9f9b9b',
  fontSize: '12px',
  whiteSpace: 'nowrap',
});

/** 类型图标 + 数量，对齐旧站 .ico_subject_type.num；sprite 背景经内联样式设置 */
const statClass = css({
  display: 'inline-block',
  height: '15px',
  marginLeft: '8px',
  padding: '0 5px 0 17px',
  lineHeight: '15px',
  color: '#9f9b9b',
  fontSize: '12px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '15px 100px',
});

const time = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#9f9b9b',
  fontSize: '12px',
  lineHeight: '18px',
});

/** 创建/更新时间行，靠右对齐 */
const dates = css({ marginLeft: 'auto' });

const date = css({ color: '#595555' });

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const pagination = css({ margin: '10px 0' });

function formatDate(unix: number): string {
  return dayjs.unix(unix).format('YYYY-M-D HH:mm');
}

function IndexStatsList({ stats }: { stats: IndexStats }) {
  const entries = SUBJECT_STAT_KEYS.map(({ key, label, backgroundPosition }) => ({
    label,
    backgroundPosition,
    count: stats.subject[key],
  })).filter((entry) => (entry.count ?? 0) > 0);

  if (entries.length === 0) {
    return null;
  }

  return (
    <span className={statsClass}>
      {entries.map(({ label, count, backgroundPosition }) => (
        <span
          key={label}
          className={statClass}
          style={{ backgroundImage: `url(${subjectTypeSprite})`, backgroundPosition }}
          title={`${label} ${count}`}
          aria-label={`${label} ${count}`}
        >
          {count}
        </span>
      ))}
    </span>
  );
}

/** 推荐本条目的目录，对齐 PHP subject_index / index_list */
const SubjectIndexes: React.FC<{
  subject: Subject;
  indexes: SlimIndex[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}> = ({ subject, indexes, total, currentPage, pageSize, onPageChange }) => {
  const { user } = useUser();

  return (
    <PageContainer as='main'>
      <SubjectHeader subject={subject} />
      <div className={columns}>
        <div className={listColumn}>
          {user && (
            <a
              className={collectButton}
              href={getLegacyPageLink(
                `/user/${user.username}/index?add_related=${subject.id}&ajax=1&keepThis=false&TB_iframe=true&height=350&width=500`,
              )}
              title='收集至我的目录'
            >
              收集至我的目录
            </a>
          )}
          <ul className={indexList}>
            {indexes.map((index) => (
              <li key={index.id} className={item}>
                <span className={avatar}>
                  {index.user && (
                    <Link to={getUserProfileLink(index.user.username)} title={index.user.nickname}>
                      <Avatar src={index.user.avatar.medium} alt={index.user.nickname} />
                    </Link>
                  )}
                </span>
                <span className={info}>
                  <div className={head}>
                    <Link to={getIndexLink(index.id)} className={title} title={index.title}>
                      <h3>{index.title}</h3>
                    </Link>
                    <IndexStatsList stats={index.stats} />
                  </div>
                  <span className={time}>
                    {index.user && (
                      <Link to={getUserProfileLink(index.user.username)}>
                        {index.user.nickname}
                      </Link>
                    )}
                    <span className={dates}>
                      创建 <span className={date}>{formatDate(index.createdAt)}</span> · 更新{' '}
                      <span className={date}>{formatDate(index.updatedAt)}</span>
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          {indexes.length === 0 && <p className={empty}>暂无目录</p>}
          <Pagination
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={onPageChange}
            wrapperClass={pagination}
          />
        </div>
        <SubjectSummaryCard subject={subject} />
      </div>
    </PageContainer>
  );
};

export default SubjectIndexes;
