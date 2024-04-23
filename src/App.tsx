import { Route, Routes, HashRouter } from 'react-router-dom'

//* Components
import HomePage from '@routes/home/HomePage'
import About from '@routes/about/About'
import Contact from '@routes/contact/Contact'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
      </Routes>
    </HashRouter>
  )
}

export default App
