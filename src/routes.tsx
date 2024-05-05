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
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<>404 not found</>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/games/hangmangameMode" element={<HangmanGameMode />} />
        <Route path="/games/memorygameMode" element={<MemoryGameMode />} />
        <Route path="/games/dragdropgameMode" element={<DragDropGameMode />} />

        <Route path="/games/dragdropgameSingle" element={<DragDropGameSingle />} />
        <Route path="/games/hangmangameSingle" element={<HangmanGameSingle />} />
        <Route path="/games/memorygame1vs1" element={<MemoryGame1vs1 />} />
      </Routes>
    </HashRouter>
  )
}

export default RoutesTree
