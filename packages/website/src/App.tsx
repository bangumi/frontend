import React, { useState, FC, useEffect } from 'react'
import { Button } from '@bangumi/design'
import style from './App.module.css'
import { getCharacterDetail } from './api/character'
import { CharacterDetail } from './types/common'
const App: FC = () => {
  const [count, setCount] = useState(0)
  const [detail, setDetail] = useState<CharacterDetail|null>(null)
  useEffect(() => {
    getCharacterDetail('39115').then(res => {
      setDetail(res.data)
    })
  }, [])
  return (
    <div className={style.main}>
      <div className={style.count}>
        {count}
      </div>
      <Button
        onClick={() => setCount(count => count + 1)}
        className={style.button}
      >
        Increase
      </Button>
      <Button disabled>Disabled</Button>
      { detail
        ? <div>
        <h1>{detail.name}</h1>
            {
              detail.infobox.map(el =>
                <tr key={el.key}>
                  <td>{el.key}</td>
                  <tr>
                    { Array.isArray(el.value)
                      ? el.value.map(val => <p key={val.k}>{`${val.k}:${val.v}`}</p>)
                      : el.value }
                  </tr>
                </tr>
              )
            }
        <p>{detail.summary}</p>
        </div>
        : <div>loading</div>}
    </div>
  )
}

export default App
