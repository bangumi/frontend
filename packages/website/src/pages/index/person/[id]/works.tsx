import React from 'react';
import { useParams } from 'react-router-dom';

import { Pagination } from '@bangumi/design';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { usePersonHome } from '@bangumi/website/hooks/use-person-home';
import { usePersonWorks } from '@bangumi/website/hooks/use-person-works';

import PersonLayout from './components/PersonLayout';
import { WorkList } from './PersonDetail';
import styles from './PersonDetail.module.less';

const PAGE_SIZE = 20;

function PersonWorksPage() {
  const { id } = useParams();
  const personID = Number(id);
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const { data } = usePersonHome(personID);
  const { data: works, total } = usePersonWorks(personID, pageSize, offset);
  const [, navigate] = useTransitionNavigate();

  if (!data || !works) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <PersonLayout data={data} title={`${data.person.name} - 作品`}>
      <div className={styles.sectionHeader}>
        <h2>「{data.person.name}」的作品</h2>
      </div>
      <WorkList works={works} />
      <Pagination
        total={total ?? 0}
        currentPage={curPage}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </PersonLayout>
  );
}

export default withErrorBoundary(PersonWorksPage, {
  404: () => <div>没有找到人物</div>,
});
