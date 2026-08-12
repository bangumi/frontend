import type { ReactNode } from 'react';
import React from 'react';

import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';
import type { PersonHomeData } from '@bangumi/website/hooks/use-person-home';

import { columnMain, columns, page, PersonHeader, PersonInfobox } from '../PersonDetail';

/** 人物页面共享布局：Header + 左栏 Infobox + 主栏内容，各 tab 复用 */
const PersonLayout: React.FC<{
  data: PersonHomeData;
  title?: string;
  children: ReactNode;
}> = ({ data, title, children }) => (
  <>
    {title != null && <Helmet title={title} />}
    <PersonHeader person={data.person} />
    <PageContainer as='main' className={page}>
      <div className={columns}>
        <PersonInfobox data={data} />
        <div className={columnMain}>{children}</div>
      </div>
    </PageContainer>
  </>
);

export default PersonLayout;
