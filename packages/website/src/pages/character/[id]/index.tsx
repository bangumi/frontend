import { Divider, Image, Menu, MenuProps, Typography } from '@bangumi/design'
import React from 'react'
import { useParams } from 'react-router-dom'
import InfoBoxComp from '../../../components/InfoBox'
import { useCharacter } from '../../../hooks/use-character'
import { useRelatedSubjectsOfCharacters } from '../../../hooks/use-related-subjects'
import RelatedSubject from './components/RelatedSubject'
import styles from './index.module.less'

const { Text } = Typography

const CharacterPage: React.FC = () => {
  const { id } = useParams()
  const { data: character, isLoading } = useCharacter(id as string)
  const { data: relatedSubjects } = useRelatedSubjectsOfCharacters(id as string)

  const menuItems: MenuProps['items'] = [{
    key: 'overview',
    label: '概览'
  }]

  if (isLoading) {
    // TODO: loading
    return <div>LOADING</div>
  }

  if (!character) {
    // TODO: error
    return <div>ERROR</div>
  }
  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.title}>{character.name}</h1>
      {
        character.nameInSimplifiedChinese &&
          <div className={styles.nameInSimplifiedChinese}>{character.nameInSimplifiedChinese}</div>
      }
      <Menu wrapperClass={styles.menu} items={menuItems} activeKey="overview" mode="horizontal" />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Image className={styles.characterThumbnail} src={character.images.large} width={290} height={426} />
          <InfoBoxComp info={character.infobox} />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.summary}>
            <Text>{character.summary}</Text>
          </div>
          <div className={styles.section}>
            <h3 className={styles.title}><Text type="secondary">出演</Text></h3>
            <Divider className={styles.divider} />
            <div className={styles.relatedSubjects}>
              {relatedSubjects?.map((subject) => (
                <RelatedSubject
                  key={subject.id}
                  subject={subject}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CharacterPage
