import React, { useState, FC } from 'react'
import { Button } from '@bangumi/design'
import './App.css'

const App: FC = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="chii-main">
      <div className="chii-count">
        {count}
      </div>
      <Button
        onClick={() => setCount(count => count + 1)}
        className="chii-button"
      >
        Increase
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

export default App
