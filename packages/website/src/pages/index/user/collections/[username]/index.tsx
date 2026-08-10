import React from 'react';
import { useParams } from 'react-router-dom';

import { CollectionType } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
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
import styles from './index.module.less';

const { Link } = Typography;

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
        <PageContainer className={styles.content}>
          <div className={styles.typeTabs}>
            {SUBJECT_BLOCK_LIST.map((item) => (
              <Link
                key={item.path}
                to={`/${item.path}/list/${username}`}
                className={item.path === meta.path ? styles.active : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.columns}>
            <div className={styles.columnLeft}>
              <div className={styles.statusTabs}>
                <Link
                  to={`/${meta.path}/list/${username}`}
                  className={!status ? styles.active : undefined}
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
                      className={status === statusPath ? styles.active : undefined}
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
            <div className={styles.columnRight}>
              <UserStatsBlock user={user} />
            </div>
          </div>
        </PageContainer>
      </main>
    </>
  );
};

export default UserCollectionsPage;
