import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { getMe } from './api/user'
import GlobalLayout from './components/GlobalLayout'
import PageRoutes from './components/PageRoutes'
import { UserContext } from './hooks/useUser'
import Home from './pages/Home'
import Subject from './pages/Subject'
import { BGMUser } from 'bgm-types'

const App: FC = () => {
  const [user, setUser] = React.useState<BGMUser.Me| null>(null)
  React.useEffect(() => {
    getMe().then((res) => {
      setUser(res)
    })
  }, [])

  return (
    <UserContext.Provider value={user}>
      <GlobalLayout>
        <BrowserRouter>
          <PageRoutes>
            <Route path="subject/*" element={<Subject />} />
            <Route index element={<Home />} />
          </PageRoutes>
        </BrowserRouter>
      </GlobalLayout>
    </UserContext.Provider>
  )
}

export default App
