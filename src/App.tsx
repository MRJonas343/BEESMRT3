import { Route, Routes, HashRouter } from 'react-router-dom'

//* Components
import HomePage from '@routes/home/HomePage'
import About from '@routes/about/About'
import Contact from '@routes/contact/Contact'
import LogIn from '@routes/login/Login'
import SignUp from '@routes/signup/SignUp'
import PrivacyPolicy from '@routes/privacypolicy/PrivacyPolicy'
import MyAccount from '@routes/myAccount/MyAccount'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/login" Component={LogIn} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/privacypolicy" Component={PrivacyPolicy} />
        <Route path="/myaccount" Component={MyAccount} />
      </Routes>
    </HashRouter>
  )
}

export default App
