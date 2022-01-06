import React, { useState, FC } from 'react'
import { Button } from '@bangumi/design'
import style from './App.module.css'

const App: FC = () => {
  const [count, setCount] = useState(0)
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
    </div>
  )
}

export default App
