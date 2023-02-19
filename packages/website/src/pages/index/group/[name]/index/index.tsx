import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Section } from '@bangumi/design';
import { render as renderBBCode, UnreadableCodeError } from '@bangumi/utils';
import { ReactComponent as RightArrow } from '@bangumi/website/assets/right-arrow.svg';
import { DescriptionClamp, useGroupRecentTopics } from '@bangumi/website/hooks/use-group';
import { useUser } from '@bangumi/website/hooks/use-user';

import { useGroupContext } from '../../[name]';
import CommonStyles from '../../common.module.less';
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

  // TODO: XSS defense
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
          <RouterLink to={`/group/${name}/forum`} className={CommonStyles.textButton}>
            <span>更多组内讨论</span>
            <RightArrow />
          </RouterLink>
        )}
      >
        <TopicsTable topics={recentTopics.data} />
      </Section>
      {user && <TopicForm quickPost />}
    </>
  );
};

export default GroupHome;
