import React, { useState, FC } from 'react'
import { Button } from '@bangumi/design'
const App: FC = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="pol-main">
      <div className="pol-count">
        {count}
      </div>
      <Button
        onClick={() => setCount(count => count + 1)}
        className="pol-button"
      >
        Increase
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

export default App
