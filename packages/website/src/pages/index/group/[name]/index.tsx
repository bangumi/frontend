import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { Section } from '@bangumi/design';
import { render as renderBBCode, UnreadableCodeError } from '@bangumi/utils';
import { ReactComponent as RightArrow } from '@bangumi/website/assets/right-arrow.svg';
import { DescriptionClamp, useGroupTopic } from '@bangumi/website/hooks/use-group';

import { useGroupContext } from '../[name]';
import CommonStyles from '../common.module.less';
import { ClampableContent } from './components/ClampableContent';
import TopicsTable from './components/TopicsTable';

const CLAMP_HEIGHT_THRESHOLD = 193;

const GroupHome: React.FC = () => {
  const { name } = useParams();
  if (!name) {
    throw new UnreadableCodeError('BUG: name is undefined');
  }
  const groupContext = useGroupContext();
  const recentTopics = useGroupTopic(name);

  if (!groupContext?.groupRet?.group || !recentTopics.data.length) {
    return null;
  }

  const {
    groupRet: { group, descriptionClamp, setDescriptionClamp },
  } = groupContext;

  const handleChangeClamp = (isClamped: boolean): void => {
    setDescriptionClamp(isClamped ? DescriptionClamp.clamp : DescriptionClamp.unclamp);
  };

  // TODO: XSS defense
  const parsedDescription = renderBBCode(group.description);

  return (
    <>
      <ClampableContent
        threshold={CLAMP_HEIGHT_THRESHOLD}
        content={parsedDescription}
        isClamped={descriptionClamp === DescriptionClamp.clamp}
        onChange={handleChangeClamp}
      />
      <Section
        title='最近讨论'
        renderFooter={() => (
          <RouterLink to={`/group/${name}/forum`} className={CommonStyles.textButton}>
            <span>更多组内讨论</span>
            <RightArrow />
          </RouterLink>
        )}
      >
        <TopicsTable topics={recentTopics.data} />
      </Section>
    </>
  );
};

export default GroupHome;
