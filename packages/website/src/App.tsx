import React, { useState, FC, useEffect } from 'react'
import { Typography } from '@bangumi/design'
import style from './App.module.css'
import { getCharacterDetail } from './api/character'
import { getSubject } from './api/subject'
import { CharacterDetail, Subject } from './types/common'
import Header from './components/Header'

const App: FC = () => {
  const [detail, setDetail] = useState<CharacterDetail | null>(null)
  const [subjectDetail, setSubjectDetail] = useState<Subject | null>(null)

  useEffect(() => {
    getCharacterDetail('39115').then(res => {
      setDetail(res.data)
    })
  }, [])

  useEffect(() => {
    getSubject('39115').then(res => {
      setSubjectDetail(res.data)
    })
  }, [])

  return (
    <>
      <Header />
      <div className={style.main}>
        {detail
          ? <div>
            <Typography.Link href="https://bgm.tv/character/39115"><h1>{detail.name}</h1></Typography.Link>
            {
              detail.infobox.map(el =>
                <tr key={el.key}>
                  <td>{el.key}</td>
                  <tr>
                    {Array.isArray(el.value)
                      ? el.value.map(val => <p key={val.k}>{`${val.k ?? ''}:${val.v}`}</p>)
                      : el.value}
                  </tr>
                </tr>
              )
            }
            <p>{detail.summary}</p>
          </div>
          : <div>loading</div>}
        {subjectDetail
          ? <div>
            <Typography.Link href="https://bgm.tv/subject/39115"><h1>{subjectDetail.name}</h1></Typography.Link>
            {
              subjectDetail.infobox.map(el =>
                <tr key={el.key}>
                  <td>{el.key}</td>
                  <tr>
                    {Array.isArray(el.value)
                      ? el.value.map(val => <p key={val.v}>{`${val.v}`}</p>)
                      : el.value}
                  </tr>
                </tr>
              )
            }
            <p>{subjectDetail.summary}</p>
          </div>
          : <div>loading</div>}
      </div>
    </>
  )
}

export default App
