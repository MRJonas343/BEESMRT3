import { Route, Routes, HashRouter } from 'react-router-dom'

//* Components
import HomePage from '@routes/home/HomePage'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </HashRouter>
  )
}

export default App
