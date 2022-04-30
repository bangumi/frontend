import React from 'react'
import { InfoBox } from '../../types/common'

export interface InfoBoxProps {
  info: InfoBox
}

const InfoBoxComp: React.FC<InfoBoxProps> = ({ info }) => {
  const SingleValueEntry: React.FC<{entryKey: string, value: string}> = ({ entryKey, value }) => {
    return (
      <div>
        <div>
          <span>{entryKey}:</span>
        </div>
        <div>
          <span>{value}</span>
        </div>
      </div>
    )
  }

  const MultiValueEntry: React.FC<{entryKey: string, value: Array<{k?: string, v: string}>}> = ({ entryKey, value }) => {
    return (
      <div>
        <div>
          <span>{entryKey}:</span>
        </div>
        <div>
          <ul>
            {value.map(({ k, v }) => {
              return <li key={`${k ?? ''}-${v}`}>{v}</li>
            })}
          </ul>
        </div>
      </div>
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
