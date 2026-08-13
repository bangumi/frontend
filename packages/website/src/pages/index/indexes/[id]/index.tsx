import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { IndexRelatedCategory, SubjectType } from '@bangumi/client/client';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import useIndex from '@bangumi/website/hooks/use-index';
import { useIndexRelated } from '@bangumi/website/hooks/use-index-related';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';

import IndexDetail from '../components/IndexDetail';
import type { RelatedFilter } from '../components/IndexRelatedList';

const PAGE_SIZE = 20;

const CAT_VALUES = Object.values(IndexRelatedCategory).filter(
  (v): v is IndexRelatedCategory => typeof v === 'number',
);
const TYPE_VALUES = Object.values(SubjectType).filter(
  (v): v is SubjectType => typeof v === 'number',
);

function IndexDetailPage() {
  const { id } = useParams();
  const indexId = Number(id);
  const [searchParams] = useSearchParams();
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const [, navigate] = useTransitionNavigate();

  const catParam = Number(searchParams.get('cat'));
  const typeParam = Number(searchParams.get('type'));
  const activeFilter: RelatedFilter = {
    cat: CAT_VALUES.includes(catParam) ? catParam : undefined,
    subjectType: TYPE_VALUES.includes(typeParam) ? typeParam : undefined,
  };

  const { index, mutate } = useIndex(indexId);
  const { related, total } = useIndexRelated(
    indexId,
    activeFilter.cat,
    activeFilter.subjectType,
    pageSize,
    offset,
  );

  const handleTabChange = (filter: RelatedFilter): void => {
    const params = new URLSearchParams();
    if (filter.cat !== undefined) {
      params.set('cat', String(filter.cat));
    }
    if (filter.subjectType !== undefined) {
      params.set('type', String(filter.subjectType));
    }
    navigate({ search: params.toString() });
  };

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams();
    if (activeFilter.cat !== undefined) {
      params.set('cat', String(activeFilter.cat));
    }
    if (activeFilter.subjectType !== undefined) {
      params.set('type', String(activeFilter.subjectType));
    }
    params.set('page', String(page));
    navigate({ search: params.toString() });
  };

  return (
    <>
      <Helmet title={index.title} />
      <IndexDetail
        index={index}
        related={related}
        total={total}
        currentPage={curPage}
        pageSize={pageSize}
        activeFilter={activeFilter}
        onTabChange={handleTabChange}
        onPageChange={handlePageChange}
        mutate={mutate}
      />
    </>
  );
}

export default withErrorBoundary(IndexDetailPage, {
  404: () => <div>没有找到目录</div>,
});
