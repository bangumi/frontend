import React from 'react';
import { useParams } from 'react-router-dom';

import { CollectionType } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { UnreadableCodeError } from '@bangumi/utils';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useUserHome } from '@bangumi/website/hooks/use-user-home';

import {
  COLLECTION_LABELS,
  COLLECTION_STATUS_ALIASES,
  COLLECTION_STATUS_PATHS,
  SUBJECT_BLOCK_LIST,
} from '../../components/constants';
import UserHeader from '../../components/UserHeader';
import UserStatsBlock from '../../components/UserStatsBlock';
import { CollectionGroup } from './components/CollectionGroup';
import { CollectionList } from './components/CollectionList';

const { Link } = Typography;

const content = css({
  paddingTop: '23px',
});

const typeTabs = css({
  display: 'flex',
  gap: '16px',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e8e3e3',
  '& a': {
    fontSize: '15px',
    color: '#595555',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

const active = css({
  color: '#54b5df !important',
  fontWeight: 'bold',
});

const columns = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '20px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    // 单列时让子项占满容器宽度，避免内容按 max-content 撑开导致横向溢出
    alignItems: 'stretch',
  },
});

const columnLeft = css({
  flex: '1 1 auto',
  minWidth: '0',
});

const columnRight = css({
  flex: '0 0 220px',
  width: '220px',
  minWidth: '0',
  '@media (max-width: 768px)': {
    flex: 'none',
    width: '100%',
  },
});

const statusTabs = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px 14px',
  marginBottom: '14px',
  '& a': {
    fontSize: '13px',
    color: '#595555',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

const STATUS_LIST = [
  CollectionType.Wish,
  CollectionType.Collect,
  CollectionType.Doing,
  CollectionType.OnHold,
  CollectionType.Dropped,
] as const;

interface UserCollectionsPageProps {
  /** 条目类型路径段，如 anime/book/music/game/real */
  subjectType: string;
}

const UserCollectionsPage: React.FC<UserCollectionsPageProps> = ({ subjectType }) => {
  const { username, status } = useParams();
  if (!username) {
    throw new UnreadableCodeError('BUG: username is undefined');
  }

  const meta = SUBJECT_BLOCK_LIST.find((item) => item.path === subjectType);
  if (!meta) {
    throw new UnreadableCodeError('BUG: unknown subject type');
  }

  const { data: user } = useUserHome(username);

  if (!user) {
    return null;
  }

  const statusType = status ? COLLECTION_STATUS_ALIASES[status] : undefined;
  const subjectStats = user.stats.subject[meta.subjectType];

  return (
    <>
      <Helmet title={`${user.nickname}的收藏 - ${meta.label}`} />
      <main>
        <UserHeader user={user} />
        <PageContainer className={content}>
          <div className={typeTabs}>
            {SUBJECT_BLOCK_LIST.map((item) => (
              <Link
                key={item.path}
                to={`/${item.path}/list/${username}`}
                className={item.path === meta.path ? active : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className={columns}>
            <div className={columnLeft}>
              <div className={statusTabs}>
                <Link
                  to={`/${meta.path}/list/${username}`}
                  className={!status ? active : undefined}
                >
                  全部
                </Link>
                {STATUS_LIST.map((type) => {
                  const count = subjectStats?.[type] ?? 0;
                  if (count === 0) {
                    return null;
                  }
                  const statusPath = COLLECTION_STATUS_PATHS[type];
                  return (
                    <Link
                      key={type}
                      to={`/${meta.path}/list/${username}/${statusPath}`}
                      className={status === statusPath ? active : undefined}
                    >
                      {COLLECTION_LABELS[type]} ({count})
                    </Link>
                  );
                })}
              </div>
              {statusType !== undefined ? (
                <CollectionList
                  username={username}
                  subjectType={meta.subjectType}
                  type={statusType}
                />
              ) : (
                <CollectionGroup user={user} subjectType={meta.subjectType} />
              )}
            </div>
            <div className={columnRight}>
              <UserStatsBlock user={user} />
            </div>
          </div>
        </PageContainer>
      </main>
    </>
  );
};

export default UserCollectionsPage;
