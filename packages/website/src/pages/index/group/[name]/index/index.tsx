import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, CollapsibleContent, Section } from '@bangumi/design/index.tsx';
import { ArrowRightCircle } from '@bangumi/icons/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { BBCodePreset } from '@bangumi/utils/bbcode/presets.ts';
import { render as renderBBCode } from '@bangumi/utils/bbcode/react.tsx';
import { UnreadableCodeError } from '@bangumi/utils/index.ts';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useGroupTopics } from '@bangumi/website/hooks/use-group-topics.ts';
import { useUser } from '@bangumi/website/hooks/use-user.tsx';
import TopicsTable from '@bangumi/website/pages/index/group/[name]/components/TopicsTable.tsx';
import { useGroupContext } from '@bangumi/website/pages/index/group/[name]/index.tsx';
import TopicForm from '@bangumi/website/pages/index/group/components/TopicForm.tsx';

const recentTopics = css({
  marginTop: '40px',
});

const descriptionBox = css({
  // 对齐旧版 grp_box 的浅灰背景
  background: '#f7f7f4',
  borderRadius: '15px',
  padding: '15px',
});

const GroupHome: React.FC = () => {
  const { name } = useParams();
  if (!name) {
    throw new UnreadableCodeError('BUG: name is undefined');
  }
  const groupContext = useGroupContext();
  const { data: topics } = useGroupTopics(name, {
    limit: 10,
    offset: 0,
  });
  const { user } = useUser();

  const {
    groupRet: { group, descriptionCollapsed, setDescriptionCollapsed },
  } = groupContext;

  const parsedDescription = renderBBCode(group.description, BBCodePreset.groupDescription);

  return (
    <>
      <Helmet title={`${group.title}小组`} />
      <CollapsibleContent
        containerClassName={descriptionBox}
        threshold={193}
        content={parsedDescription}
        collapsed={descriptionCollapsed}
        onChange={setDescriptionCollapsed}
      />
      <Section
        title='最近讨论'
        wrapperClass={recentTopics}
        renderFooter={() => (
          <Button.Link type='plain' to={`/group/${name}/forum`}>
            更多组内讨论
            <ArrowRightCircle />
          </Button.Link>
        )}
      >
        <TopicsTable topics={topics ?? []} />
      </Section>
      {user && <TopicForm quickPost groupName={name} />}
    </>
  );
};

export default GroupHome;
