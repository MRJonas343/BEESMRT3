import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'

//* Components
import NavBar from "@components/NavBar"
import MemoryGameButtton from "@components/ButtonMemoryGame"
import MemoryGameStats from "@components/MemoryGameStats"
import MemoryGameModal from "@components/MemoryGameModal"
import ModalGameOver from "@components/ModalGameOver"

//*Assets
import TrofeoImg from '@assets/trofeo.webp'
import Swords from '@assets/espadas.webp'
import Spinner from "@components/Spinner"

//*Objetos obtenidos del JSON
import { CardMemoryGameProps } from "@types"

const MemoryGame1vs1: React.FC = () => {

  //* Valores para el efecto confeti
  const duration = 15 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  //*Estado para el Spinner
  const [showSpinner, setShowSpinner] = useState(true)


  //*Inicializa el proceso de fetch y carga de datos
  useEffect(() => {
    fetchData()
  }, [])

  //*Funcion para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch('https://beesmrt-backend-vercel.vercel.app/getMemoryGameData')
      const jsonData = await response.json()
      setShowSpinner(false)
      initGame(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  function randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

  //*Estados del juego
  const [cards, setCards] = useState<CardMemoryGameProps[]>([])
  const [card1, setCard1] = useState<CardMemoryGameProps | null>(null)
  const [card2, setCard2] = useState<CardMemoryGameProps | null>(null)
  const [isPlayer1Active, setIsPlayer1Active] = useState(true)
  const [player1Points, setPlayer1Points] = useState(0)
  const [player2Points, setPlayer2Points] = useState(0)
  const [resetGame, setResetGame] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isModalWinOpen, setModalWinOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [imageSrc, setImageSrc] = useState("")
  const [correctAnswerRef, setcorrectAnswerRef] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [incorrectAnswer1, setIncorrectAnswer1] = useState("")
  const [incorrectAnswer2, setIncorrectAnswer2] = useState("")
  const [incorrectAnswer3, setIncorrectAnswer3] = useState("")
  const [mainMessage, setMainMessage] = useState("")
  const [message, setMessage] = useState("")
  const [imageMessage, setImageMessage] = useState("")


  useEffect(() => {
    if (player1Points + player2Points === 12) {
      if (player1Points > player2Points) {
        setMainMessage("Victory")
        setMessage("Player 1 has won!!!")
        setImageMessage(TrofeoImg)
        shoModalWin()

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now()
          if (timeLeft <= 0) {
            return clearInterval(interval)
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
        }, 250)


      } else if (player1Points < player2Points) {
        setMainMessage("Victory")
        setMessage("Player 2 has won!!!")
        setImageMessage(TrofeoImg)
        shoModalWin()

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now()
          if (timeLeft <= 0) {
            return clearInterval(interval)
          }
          const particleCount = 50 * (timeLeft / duration)
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
        }, 250);
      } else {
        setMainMessage("Tiee!!!")
        setMessage("Good match")
        setImageMessage(Swords)
        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now()
          if (timeLeft <= 0) {
            return clearInterval(interval)
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
        }, 250)
      }
    }
  }, [player1Points, player2Points])

  useEffect(() => {
    if (card1 && card2) {
      if (card1.id === card2.id) {
        setCard2(null)
      } else {
        if (card1.src === card2.src) {
          setCards((prevCards) =>
            prevCards.map((item) =>
              item.src === card1.src ? { ...item, matched: true } : item
            )
          )
          setcorrectAnswerRef(card1.correctAnswer)
          const shuffledAnswersArray = [card1.correctAnswer, card1.incorrectAnswers[0], card1.incorrectAnswers[1], card1.incorrectAnswers[2]].sort(() => Math.random() - 0.5)
          setQuestion(card1.question)
          setImageSrc(card1.src)
          setCorrectAnswer(shuffledAnswersArray[0])
          setIncorrectAnswer1(shuffledAnswersArray[1])
          setIncorrectAnswer2(shuffledAnswersArray[2])
          setIncorrectAnswer3(shuffledAnswersArray[3])
          openModal()
        } else {
          setTimeout(() => {
            setIsPlayer1Active((prevIsPlayer1Active) => !prevIsPlayer1Active) // Cambiar el turno
          }, 1000)
        }
        setTimeout(() => {
          setCard1(null)
          setCard2(null)
        }, 1000);
      }
    }
  }, [card1, card2])

  //*Funciones
  const openModal = () => {
    setShowModal(!showModal)
  }

  const chooseCard = (card: CardMemoryGameProps) => {
    card1 ? setCard2(card) : setCard1(card)
  }

  const initGame = (cardItemJson: any) => {
    const allCards = [...cardItemJson, ...cardItemJson]
      .map((item: CardMemoryGameProps, index: number) => ({ ...item, id: index }))
      .sort(() => Math.random() - 0.5)
    setCards(allCards)
  }

  const shoModalWin = () => {
    setModalWinOpen(!isModalWinOpen)
  }

  const playAgain = () => {
    setResetGame(!resetGame)
    setPlayer1Points(0)
    setPlayer2Points(0)
    setCard1(null)
    setCard2(null)
    setIsPlayer1Active(true)
    fetchData()
    if (isModalWinOpen) {
      setModalWinOpen(!isModalWinOpen)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    //obtener los radios
    const Form = new FormData(e.target)
    const answer = Form.get('Answer')
    if (correctAnswerRef === answer) {
      if (isPlayer1Active) {
        setPlayer1Points(player1Points + 1)
      } else {
        setPlayer2Points(player2Points + 1)
      }
    } else {
      setCards((prevCards) =>
        prevCards.map((item) =>
          item.src === imageSrc ? { ...item, matched: false } : item
        )
      )
      setIsPlayer1Active((prevIsPlayer1Active) => !prevIsPlayer1Active)
    }
    setShowModal(!showModal)
    e.target.reset();
  }

  return (
    <main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
      <NavBar />

      {showSpinner
        ? <Spinner />

        : <div className="flex mt-4 flex-col gap-3 mb-1 xl:flex-row xl:justify-center">
          <MemoryGameStats
            isPlayer1Active={isPlayer1Active}
            player1Points={player1Points}
            player2Points={player2Points}
            playAgain={playAgain}
          />
          <div>
            <h1 className="text-2xl font-Principal text-white pb-3 text-3d lg:text-4xl text-center xl:ml-[30%] xl:text-start">
              Memory Game
            </h1>

            <section className="grid grid-cols-4 bg-white/40 p-5 mx-3 justify-items-center rounded-xl gap-3 md:grid-cols-6 xl:p-6">
              {cards.map((card) => (
                <MemoryGameButtton
                  key={card.id}
                  card={card}
                  chooseCard={chooseCard}
                  flipped={card === card1 || card === card2 || card.matched}
                />
              ))}
            </section>
          </div>
        </div>
      }

      <MemoryGameModal
        showModal={showModal}
        Question={question}
        imageSrc={imageSrc}
        answer1={correctAnswer}
        answer2={incorrectAnswer1}
        answer3={incorrectAnswer2}
        answer4={incorrectAnswer3}
        handleSubmit={handleSubmit}
      />
      <ModalGameOver
        imageSrc={imageMessage}
        message={message}
        showModal={isModalWinOpen}
        mainMessage={mainMessage}
        playAgain={playAgain}
        showModalWin={shoModalWin} />
    </main>
  )
}

export default MemoryGame1vs1