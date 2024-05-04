import { Route, Routes, HashRouter } from 'react-router-dom'

//* Components
import HomePage from '@routes/home/HomePage'
import About from '@routes/about/About'
import Contact from '@routes/contact/Contact'
import LogIn from '@routes/login/Login'
import SignUp from '@routes/signup/SignUp'
import PrivacyPolicy from '@routes/privacypolicy/PrivacyPolicy'
import MyAccount from '@routes/myAccount/MyAccount'
import MemoryGameMode from '@routes/games/memoryGame/MemoryGameMode'
import MemoryGame1vs1 from '@routes/games/memoryGame/MemoryGame1vs1'
import HangmanGameMode from '@routes/games/hangmanGame/HangmanGameMode'
import HangmanGameSingle from '@routes/games/hangmanGame/HangmanGameSingle'
import DragDropGameMode from '@routes/games/dragDropGame/DragDropGameMode'
import DragDropGameSingle from '@routes/games/dragDropGame/DragDropGameSingle'


const RoutesTree = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/login" Component={LogIn} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/privacypolicy" Component={PrivacyPolicy} />
        <Route path="/games/dragdropgameSingle" Component={DragDropGameSingle} />
        <Route path="/games/hangmangameSingle" Component={HangmanGameSingle} />
        <Route path="/games/memorygame1vs1" Component={MemoryGame1vs1} />
        <Route path="/myaccount" Component={MyAccount} />
        <Route path="/games/hangmangameMode" Component={HangmanGameMode} />
        <Route path="/games/memorygameMode" Component={MemoryGameMode} />
        <Route path="/games/dragdropgameMode" Component={DragDropGameMode} />
      </Routes>
    </HashRouter>
  )
}

export default RoutesTree
