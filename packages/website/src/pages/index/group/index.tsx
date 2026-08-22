import React from 'react';

import { GroupSort } from '@bangumi/client/client.ts';
import { Button, Layout, Section } from '@bangumi/design/index.tsx';
import { ArrowRightCircle } from '@bangumi/icons/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useGroups } from '@bangumi/website/hooks/use-groups.ts';
import { useRecentGroupTopics } from '@bangumi/website/hooks/use-recent-group-topics.ts';

import GroupChannelSidebar from './components/GroupChannelSidebar.tsx';
import GroupList from './components/GroupList.tsx';
import GroupTopicTable from './components/GroupTopicTable.tsx';

const pageContainer = css({
  '& > *': {
    marginBottom: '10px',
  },
});

const mainSection = css({
  marginTop: '0',
});

const GroupChannel: React.FC = () => {
  // 话题流由服务端按登录态分发（登录=已加入小组，未登录=全部）
  const { data: topics } = useRecentGroupTopics(20, 0);
  const { data: hotGroups } = useGroups(GroupSort.Members, undefined, 6, 0);

  return (
    <>
      <Helmet title='小组' />
      <PageContainer className={pageContainer}>
        <Layout
          type='alpha'
          leftChildren={
            <>
              <Section title='热门小组' wrapperClass={mainSection}>
                <GroupList groups={hotGroups ?? []} />
              </Section>
              <Section
                title='小组最新话题'
                wrapperClass={mainSection}
                renderFooter={() => (
                  <Button.Link type='plain' to='/group/discover'>
                    更多话题
                    <ArrowRightCircle />
                  </Button.Link>
                )}
              >
                <GroupTopicTable topics={topics ?? []} />
              </Section>
            </>
          }
          rightChildren={<GroupChannelSidebar />}
        />
      </PageContainer>
    </>
  );
};

export default GroupChannel;
