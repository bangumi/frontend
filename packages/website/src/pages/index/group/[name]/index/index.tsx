import React from 'react';
import { useParams } from 'react-router-dom';

import { Button, Section } from '@bangumi/design';
import { ArrowRightCircle } from '@bangumi/icons';
import { render as renderBBCode, UnreadableCodeError } from '@bangumi/utils';
import { DescriptionClamp, useGroupRecentTopics } from '@bangumi/website/hooks/use-group';
import { useUser } from '@bangumi/website/hooks/use-user';

import { useGroupContext } from '../../[name]';
import { ClampableContent } from '../../components/ClampableContent';
import TopicForm from '../../components/TopicForm';
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
    groupRet: { group, descriptionClamp, setDescriptionClamp },
  } = groupContext;

  const handleChangeClamp = (isClamped: boolean): void => {
    setDescriptionClamp(isClamped ? DescriptionClamp.clamp : DescriptionClamp.unclamp);
  };

  const parsedDescription = renderBBCode(group.group.description);

  return (
    <>
      <ClampableContent
        threshold={193}
        content={parsedDescription}
        isClamped={descriptionClamp === DescriptionClamp.clamp}
        onChange={handleChangeClamp}
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
      {user && <TopicForm quickPost groupName={name} />}
    </>
  );
};

export default GroupHome;
