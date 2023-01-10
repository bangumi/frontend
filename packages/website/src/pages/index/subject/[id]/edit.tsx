import { ok } from 'oazapfts';
import React from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Divider, Layout } from '@bangumi/design';

import { WikiEditTabs, _TEST_SUBJECTS_ } from './_shared';
import style from './common.module.less';
import WikiLayout from './components/WikiLayout';

const WikiEditPage = () => {
  const id = _TEST_SUBJECTS_;
  const { data } = useSWR(
    `/wiki/subjects/$ {id}`,
    async () => ok(ozaClient.subjectInfo(Number(id))),
    {
      suspense: true,
    },
  );

  const { data: subjectHistory } = useSWR(
    `wikiHistory/${id}`,
    async () => ok(ozaClient.subjectEditHistorySummary(Number(id))),
    { suspense: true },
  );
  console.log(subjectHistory);
  return (
    <WikiLayout id={_TEST_SUBJECTS_} activeTab={WikiEditTabs.Index} name={data!.name}>
      <Layout
        type='alpha'
        leftChildren={
          <>
            <div className={style.title}>Bangumi 采用的版本</div>
            <Divider className={style.divider} />
            {/* <form></form> */}
          </>
        }
        rightChildren={
          <>
            <div className={style.title}>条目修订历史</div>
            <Divider className={style.divider} />
            {/* {data!.} */}
          </>
        }
      />
    </WikiLayout>
  );
};

export default WikiEditPage;
