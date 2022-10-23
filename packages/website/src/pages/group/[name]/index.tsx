import { Section } from '@bangumi/design'
import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { DescriptionClamp, useGroupTopic } from 'website/hooks/use-group'
import CommonStyles from '../common.module.less'
import { render as renderBBCode } from '@bangumi/utils'
import { ClampableContent } from './components/ClampableContent'
import { ReactComponent as RightArrow } from 'website/assets/right-arrow.svg'
import TopicsTable from './components/TopicsTable'
import { useGroupContext } from 'website/pages/group'

const CLAMP_HEIGHT_THRESHOLD = 193

const GroupHome: React.FC = () => {
  const { name } = useParams()
  const groupContext = useGroupContext()
  const recentTopics = useGroupTopic(name as string)

  if (!name || !groupContext?.groupRet?.group || !recentTopics?.data) {
    return null
  }

  const {
    groupRet: {
      group,
      descriptionClamp,
      setDescriptionClamp
    }
  } = groupContext

  const handleChangeClamp = (isClamped: boolean): void => {
    setDescriptionClamp(isClamped ? DescriptionClamp.clamp : DescriptionClamp.unclamp)
  }

  // TODO: XSS defense
  const parsedDescription = renderBBCode(group.description)

  return (
    <>
      <ClampableContent
        threshold={CLAMP_HEIGHT_THRESHOLD}
        content={parsedDescription}
        isClamped={descriptionClamp === DescriptionClamp.clamp}
        onChange={handleChangeClamp}
      />
      <Section
        title="最近讨论"
        renderFooter={() => (
          <RouterLink to={`/group/${name}/forum`} className={CommonStyles.textButton}>
            <span>更多组内讨论</span><RightArrow />
          </RouterLink>
        )}
      >
        <TopicsTable topics={recentTopics.data} />
      </Section>
    </>
  )
}

export default GroupHome
