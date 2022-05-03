import React from 'react'
import { InfoBox } from '../../types/common'
import styles from './index.module.less'

export interface InfoBoxProps {
  info: InfoBox
}

const EntryContainer: React.FC = ({ children }) => {
  return <div className={styles.entryContainer}>{children}</div>
}

const InfoBoxComp: React.FC<InfoBoxProps> = ({ info }) => {
  const SingleValueEntry: React.FC<{entryKey: string, value: string}> = ({ entryKey, value }) => {
    return (
      <EntryContainer>
        <div className={styles.entryName}>
          {entryKey}:
        </div>
        <div className={styles.entryValue}>
          {value}
        </div>
      </EntryContainer>
    )
  }

  const MultiValueEntry: React.FC<{entryKey: string, value: Array<{k?: string, v: string}>}> = ({ entryKey, value }) => {
    return (
      <EntryContainer>
        <div className={styles.entryName}>
          {entryKey}:
        </div>
        <div className={styles.entryValue}>
          {value.map(({ k, v }) => {
            return <div className={styles.item} key={`${k ?? ''}-${v}`}>{v}</div>
          })}
        </div>
      </EntryContainer>
    )
  }

  return (
    <div>
      {info.map(({ key, value }) => {
        if (typeof value === 'string') {
          return <SingleValueEntry key={key} entryKey={key} value={value} />
        } else {
          return <MultiValueEntry key={key} entryKey={key} value={value} />
        }
      })}
    </div>
  )
}

export default InfoBoxComp
