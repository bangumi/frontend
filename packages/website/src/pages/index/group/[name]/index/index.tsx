import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, CollapsibleContent, Section } from '@bangumi/design';
import { ArrowRightCircle } from '@bangumi/icons';
import { render as renderBBCode, UnreadableCodeError } from '@bangumi/utils';
import { useGroupRecentTopics } from '@bangumi/website/hooks/use-group';
import { useUser } from '@bangumi/website/hooks/use-user';

import { useGroupContext } from '../../[name]';
import NewTopicForm from '../components/NewTopicForm';
import TopicsTable from '../components/TopicsTable';
import styles from './style.module.less';

const GroupHome: React.FC = () => {
  const { name } = useParams();
  if (!name) {
    throw new UnreadableCodeError('BUG: name is undefined');
  }
  const groupContext = useGroupContext();
  const recentTopics = useGroupRecentTopics(name);
  const { user } = useUser();

  if (!recentTopics.data.length) {
    return null;
  }

  const {
    groupRet: { group, descriptionCollapsed, setDescriptionCollapsed },
  } = groupContext;

  const parsedDescription = renderBBCode(group.group.description);

  return (
    <>
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
        <TopicsTable topics={recentTopics.data} />
      </Section>
      {user && <NewTopicForm quickPost />}
    </>
  );
};

export default GroupHome;
