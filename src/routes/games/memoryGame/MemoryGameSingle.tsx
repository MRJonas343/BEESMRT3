import { useState, useEffect, FormEvent, useRef } from "react"
import confetti from "canvas-confetti"
import { Toaster, toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"
import { usePersonStore } from "../../../store/auth"

//* Components
import NavBar from "@components/NavBar"
import MemoryGameButtton from "@components/ButtonMemoryGame"
import MemoryGameStatsSingleMode from "@components/MemoryGameStatsSingleMode"
import MemoryGameModal from "@components/MemoryGameModal"
import ModalSingleMode from "@components/ModalSingleModes"

//*Assets
import TrofeoImg from "@assets/trofeo.webp"
import Spinner from "@components/Spinner"

//*Types
import { CardMemoryGameProps } from "@types"

const MemoryGameSingleMode: React.FC = () => {
	//* Location
	const location = useLocation()
	const navigate = useNavigate()

	const userEmail = usePersonStore((state) => state.userEmail)

	//* Conffeti effect
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	//* Game States
	const levelRef = useRef("")
	const [victoryOrDefeat, setVictoryOrDefeat] = useState<
		"Victory" | "Defeat" | "NotDefined"
	>("Victory")
	const [showSpinner, setShowSpinner] = useState(true)
	const [cards, setCards] = useState<CardMemoryGameProps[]>([])
	const [card1, setCard1] = useState<CardMemoryGameProps | null>(null)
	const [card2, setCard2] = useState<CardMemoryGameProps | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [isModalWinOpen, setModalWinOpen] = useState(false)
	const [question, setQuestion] = useState("")
	const [imageSrc, setImageSrc] = useState("")
	const [correctAnswerRef, setcorrectAnswerRef] = useState("")
	const [correctAnswer, setCorrectAnswer] = useState("")
	const [incorrectAnswer1, setIncorrectAnswer1] = useState("")
	const [incorrectAnswer2, setIncorrectAnswer2] = useState("")
	const [incorrectAnswer3, setIncorrectAnswer3] = useState("")
	const [pairs, setPairs] = useState(0)

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
			const { level, trophys } = location.state
			levelRef.current = level
			const levelName = String(`${level.substring(2, 7)} ${level.substring(7)}`)
			const englishLevel = String(level).substring(0, 2)

			setLevelName(levelName)
			setEnglishLevel(englishLevel)
			setTrophys(trophys)
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			const headers = new Headers()
			headers.set("englishLevel", level)
			const response = await fetch(`${BeeSMRTBackendURL}/getMemoryGameSingle`, {
				headers,
			})

			//* const jsonData = await response.json()
			const jsonData = await response.json()
			setShowSpinner(!showSpinner)
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
	const resetGame = () => {
		setCard1(null)
		setCard2(null)
		setcorrectAnswerRef("")
		setPairs(0)
		setCompletedPercentage(0)
		setTrophys(0)
		setCards([])
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
			setPairs((prevPairs) => prevPairs + 1)
			toast(
				<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
					<div>Well done</div>
					<div>+ 1 Pair</div>
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
		assignTrophys()
		setMainMessage("Victory")
		setMessage("You have completed the level")
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

	const closeGame = () => {
		navigate("/games/memorygameLevels")
	}

	const nextLevel = async () => {
		setModalWinOpen(false)
		try {
			const currentLevel = levelRef.current

			//!The user reached the last level
			if (currentLevel === "B1Level6") {
				setVictoryOrDefeat("NotDefined")
				//*Display the modal with the message "ups you have reached the last level"
				setMainMessage("Oops!")
				setMessage("You have completed all the levels")
				setImageMessage(TrofeoImg)
				setModalWinOpen(true)
				return
			}

			//! The user reached the last level of the english level

			const levelNumber = Number(currentLevel.slice(-1))
			if (levelNumber === 6) {
				setShowSpinner(true)
				const englishLevels: { [key: string]: string } = {
					A1: "A2",
					A2: "B1",
				}

				const englishLevel = currentLevel.slice(0, 2)
				const nextEnglishLevel = englishLevels[englishLevel]
				const nextLevelName = `${nextEnglishLevel}Level1`
				levelRef.current = nextLevelName

				setLevelName(nextLevelName)
				setEnglishLevel(nextEnglishLevel)

				//*Ask the backend for the next level
				const levelNumber = nextLevelName
				const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
				const headers = new Headers()
				headers.set("englishLevel", levelNumber)
				const response = await fetch(
					`${BeeSMRTBackendURL}getMemoryGameSingle`,
					{
						headers,
					},
				)
				const jsonData = await response.json()
				resetGame()
				initGame(jsonData)
				setShowSpinner(false)
				return
			}

			//! Send the user to the next level
			setShowSpinner(true)
			resetGame()
			const englishLevel = currentLevel.slice(0, 2)
			const nextLevelNumber = levelNumber + 1
			const nextLevelName = `${englishLevel}Level${nextLevelNumber}`
			levelRef.current = nextLevelName

			setLevelName(nextLevelName)
			setEnglishLevel(englishLevel)

			//*Ask the backend for the next level
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			const headers = new Headers()
			headers.set("englishLevel", nextLevelName)
			const response = await fetch(`${BeeSMRTBackendURL}getMemoryGameSingle`, {
				headers,
			})
			const jsonData = await response.json()
			initGame(jsonData)
			setShowSpinner(false)
			return
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	const assignTrophys = async () => {
		if (!userEmail) return

		const data = {
			email: userEmail,
			game: "MemoryGame",
			level: levelRef.current,
		}

		try {
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL

			await fetch(`${BeeSMRTBackendURL}/assignTrophys`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

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
								pairs={pairs}
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
			<ModalSingleMode
				showModal={isModalWinOpen}
				imageSrc={imageMessage}
				message={message}
				mainMessage={mainMessage}
				close={closeGame}
				nextLevel={nextLevel}
				tryAgain={() => {}}
				victoryOrDefeat={victoryOrDefeat}
			/>
		</main>
	)
}

export default MemoryGameSingleMode
