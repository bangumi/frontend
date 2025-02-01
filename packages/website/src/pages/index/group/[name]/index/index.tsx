import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, CollapsibleContent, Section } from '@bangumi/design';
import { ArrowRightCircle } from '@bangumi/icons';
import { render as renderBBCode, UnreadableCodeError } from '@bangumi/utils';
import Helmet from '@bangumi/website/components/Helmet';
import { useGroupTopics } from '@bangumi/website/hooks/use-group-topics';
import { useUser } from '@bangumi/website/hooks/use-user';

import { useGroupContext } from '../../[name]';
import TopicForm from '../../components/TopicForm';
import TopicsTable from '../components/TopicsTable';
import styles from './style.module.less';

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

  const parsedDescription = renderBBCode(group.description);

  return (
    <>
      <Helmet title={`${group.title}小组`} />
      <CollapsibleContent
        threshold={193}
        content={parsedDescription}
        collapsed={descriptionCollapsed}
        onChange={setDescriptionCollapsed}
      />
      <Section
        title='最近讨论'
        wrapperClass={styles.recentTopics}
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
