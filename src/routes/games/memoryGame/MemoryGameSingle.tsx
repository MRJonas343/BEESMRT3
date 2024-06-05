import { useState, useEffect, FormEvent } from "react"
import confetti from "canvas-confetti"
import { Toaster, toast } from "sonner"
import cardsMemoryGame from "./dataTest.json"
import { useLocation } from "react-router-dom"

//* Components
import NavBar from "@components/NavBar"
import MemoryGameButtton from "@components/ButtonMemoryGame"
import MemoryGameStatsSingleMode from "@components/MemoryGameStatsSingleMode"
import MemoryGameModal from "@components/MemoryGameModal"
import ModalGameOver from "@components/ModalGameOver"

//*Assets
import TrofeoImg from "@assets/trofeo.webp"
import Spinner from "@components/Spinner"

//*Types
import { CardMemoryGameProps } from "@types"

const MemoryGameSingleMode: React.FC = () => {
	//* Location
	const location = useLocation()

	//* Conffeti effect
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	//* Game States
	const [showSpinner, setShowSpinner] = useState(true)
	const [cards, setCards] = useState<CardMemoryGameProps[]>([])
	const [card1, setCard1] = useState<CardMemoryGameProps | null>(null)
	const [card2, setCard2] = useState<CardMemoryGameProps | null>(null)
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

	const [trophys, setTrophys] = useState(0)
	const [completedPercentage, setCompletedPercentage] = useState(0)
	const [levelName, setLevelName] = useState("")
	const [englishLevel, setEnglishLevel] = useState("")

	//* Get data from BeeSMRT API
	const fetchData = async () => {
		try {
			//? To do : fetch data from the API with the level as a header
			const { level, trophys } = location.state
			const levelName = String(`${level.substring(2, 7)} ${level.substring(7)}`)
			const englishLevel = String(level).substring(0, 2)

			setLevelName(levelName)
			setEnglishLevel(englishLevel)
			setTrophys(trophys)

			// const levelNumber = parseInt(level)
			// const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			// const headers = new Headers()
			// headers.set("englishLevel", "B1Level4")
			// const response = await fetch(`${BeeSMRTBackendURL}/getMemoryGame1vs1`, {
			// 	headers,
			// })

			//* const jsonData = await response.json()
			const jsonData = cardsMemoryGame
			setShowSpinner(false)
			initGame(jsonData)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	//* Generete a random number for the confetti effect
	const randomInRange = (min: number, max: number) => {
		return Math.random() * (max - min) + min
	}

	//*Open the modal for the question
	const openModal = () => {
		setShowModal(!showModal)
	}

	//*Choose the card
	const chooseCard = (card: CardMemoryGameProps) => {
		card1 ? setCard2(card) : setCard1(card)
	}

	//*Create the table of cards
	const initGame = (cardItemJson: CardMemoryGameProps[]) => {
		const allCards = [...cardItemJson, ...cardItemJson]
			.map((item: CardMemoryGameProps, index: number) => ({
				...item,
				id: index,
			}))
			.sort(() => Math.random() - 0.5)
		setCards(allCards)
	}

	//*Show the modal when the game is over
	const shoModalWin = () => {
		setModalWinOpen(!isModalWinOpen)
	}

	//*Play again (it resets the game)
	const playAgain = () => {
		setResetGame(!resetGame)
		setCard1(null)
		setCard2(null)
		fetchData()
		if (isModalWinOpen) {
			setModalWinOpen(!isModalWinOpen)
		}
	}

	//*Check the answer of the question
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const Form = new FormData(event.target as HTMLFormElement)
		const answer = Form.get("Answer")
		if (correctAnswerRef === answer) {
			setCompletedPercentage((prevPercentage) => {
				const newPercentage = prevPercentage + 100 / 12
				if (newPercentage > 96) {
					throwConfetti()
					return 100
				}
				return Math.min(100, Math.round(newPercentage * 100) / 100)
			})

			//*Give points to the player
			toast(
				<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
					<div>+ 1 </div>
					<div>Perfect!!! do it again</div>
				</div>,
				{ duration: 2000 },
			)
		} else {
			setCards((prevCards) =>
				prevCards.map((item) =>
					item.src === imageSrc ? { ...item, matched: false } : item,
				),
			)
		}
		event.currentTarget.reset()
		setShowModal(!showModal)
	}

	//*Throw confetti
	const throwConfetti = () => {
		setMainMessage("Victory")
		setMessage(`You have won ${trophys} trophys`)
		setImageMessage(TrofeoImg)
		shoModalWin()
		const interval = setInterval(() => {
			const timeLeft = animationEnd - Date.now()
			if (timeLeft <= 0) {
				clearInterval(interval)
				return
			}
			const particleCount = 50 * (timeLeft / duration)
			const origin1 = { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
			const origin2 = { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
			confetti({ ...defaults, particleCount, origin: origin1 })
			confetti({ ...defaults, particleCount, origin: origin2 })
		}, 250)
	}

	//*Check if the cards match
	useEffect(() => {
		if (card1 && card2) {
			if (card1.id === card2.id) {
				setCard2(null)
			} else {
				if (card1.src === card2.src) {
					setCards((prevCards) =>
						prevCards.map((item) =>
							item.src === card1.src ? { ...item, matched: true } : item,
						),
					)
					setcorrectAnswerRef(card1.correctAnswer)
					const shuffledAnswersArray = [
						card1.correctAnswer,
						card1.incorrectAnswers[0],
						card1.incorrectAnswers[1],
						card1.incorrectAnswers[2],
					].sort(() => Math.random() - 0.5)
					setQuestion(card1.question)
					setImageSrc(card1.src)
					setCorrectAnswer(shuffledAnswersArray[0])
					setIncorrectAnswer1(shuffledAnswersArray[1])
					setIncorrectAnswer2(shuffledAnswersArray[2])
					setIncorrectAnswer3(shuffledAnswersArray[3])
					openModal()
				} else {
				}
				setTimeout(() => {
					setCard1(null)
					setCard2(null)
				}, 1000)
			}
		}
	}, [card1, card2])

	//*Start the game
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<main className="w-screen h-screen bg-blue-500 overflow-x-hidden">
			<NavBar />
			{showSpinner ? (
				<Spinner />
			) : (
				<>
					<section className="lg:max-w-[1280px] lg:mx-auto">
						<h1 className="text-center text-3xl font-Principal text-3d text-white mt-4 lg:text-4xl">
							Memory Game
						</h1>

						<div className="mx-4 mt-4 mb-6">
							<MemoryGameStatsSingleMode
								trophys={trophys}
								level={levelName}
								englishLevel={englishLevel}
								completedPercentage={completedPercentage}
							/>
						</div>

						<section className="grid grid-cols-4 place-items-center bg-white/40 p-5 mx-4 rounded-xl gap-3 md:grid-cols-6 lg:gap-5">
							{cards.map((card) => (
								<MemoryGameButtton
									key={card.id}
									card={card}
									chooseCard={chooseCard}
									flipped={card === card1 || card === card2 || card.matched}
								/>
							))}
						</section>
					</section>
				</>
			)}

			<Toaster richColors position="top-left" />
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
				showModalWin={shoModalWin}
			/>
		</main>
	)
}

export default MemoryGameSingleMode
