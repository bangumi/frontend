import React from 'react';
import { useParams } from 'react-router-dom';

import { Pagination } from '@bangumi/design/index.tsx';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { usePersonCasts } from '@bangumi/website/hooks/use-person-casts.ts';
import { usePersonHome } from '@bangumi/website/hooks/use-person-home.ts';

import PersonLayout from './components/PersonLayout.tsx';
import { CastList, sectionHeader } from './PersonDetail.tsx';

const PAGE_SIZE = 20;

function PersonVoicePage() {
  const { id } = useParams();
  const personID = Number(id);
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const { data } = usePersonHome(personID);
  const { data: casts, total } = usePersonCasts(personID, pageSize, offset);
  const [, navigate] = useTransitionNavigate();

  if (!data || !casts) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <PersonLayout data={data} title={`${data.person.name} - 角色`}>
      <div className={sectionHeader}>
        <h2>「{data.person.name}」的角色</h2>
      </div>
      <CastList casts={casts} />
      <Pagination
        total={total ?? 0}
        currentPage={curPage}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </PersonLayout>
  );
}

export default withErrorBoundary(PersonVoicePage, {
  404: () => <div>没有找到人物</div>,
});
