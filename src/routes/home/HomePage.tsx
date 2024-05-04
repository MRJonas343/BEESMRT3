import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

//* Components
import NavBar from "@components/NavBar"
import HomeCard from "@components/HomeCard"

//* Assets
import MemoryGameImg from '@assets/memoryGame.webp'
import HangmanImg from '@assets/hangmanImg.webp'
import DragImg from '@assets/dragDropGame.webp'
import ComingSoonImage from "@assets/comingSoon.webp"

const HomePage: React.FC = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code")

    async function getAccessToken() {
      const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
      await fetch(BeeSMRTBackendURL + '/getAccessTokenGithub?code=' + codeParam, {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token)
        }
      })
      navigate("/MyAccount")
    }
    if (codeParam && (localStorage.getItem("accessToken") === null)) {
      getAccessToken()
    }
  }, [])

  return (
    <main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
      <NavBar />

      <h1 className="animate-tilt animate-duration-1000 animate-iteration-count-infinite  text-4xl text-center pb-3 text-white text-3d2 font-Principal tracking-wide from-neutral-400 md:text-4xl md:py-5 lg:text-6xl xl:py-6">BEESMRT GAMES</h1>
      <section className="grid grid-cols-2 justify-items-center gap-4 h-[84dvh] md:h-[82dvh] lg:flex lg:justify-center lg:items-center lg:gap-4 lg:h-[70dvh]">

        <Link to="/games/memorygameMode" className="flex">
          <HomeCard
            imageSrc={MemoryGameImg}
            title="Memory Game"
            text="Find all the pairs and answer the questions correctly to earn points." />
        </Link>

        <Link to="/games/hangmangameMode" className="flex">
          <HomeCard
            imageSrc={HangmanImg}
            title="Hangman"
            text="Practice your vocabulary with a hangman, try to solve it before he is executed." />
        </Link>

        <Link to="/games/dragdropgameMode" className="flex">
          <HomeCard
            imageSrc={DragImg}
            title="Drag and Drop"
            text="Drag and drop the images to the correct place!!!" />
        </Link>

        <div className="bg-white/70 p-5 rounded-2xl h-[40dvh] w-[43dvw] flex flex-col items-center justify-center overflow-hidden rounded-2x md:h-[37dvh] lg:w-[22dvw] lg:h-[55dvh]">
          <img src={ComingSoonImage} alt={""} className="w-32 lg:w-full" />
        </div>

      </section>
    </main>
  )
}

export default HomePage