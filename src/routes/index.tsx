import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from '../pages/home'
import { History } from '../pages/history'
import { DefaultLayout } from '../layouts'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
