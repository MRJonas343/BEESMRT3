import { useState, useEffect, useRef, MouseEvent } from "react"
import confetti from "canvas-confetti"
import HangmanDemo from "./hangmanDemo.json"
import { useLocation, useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"

//* Componentes
import NavBar from "@components/NavBar"
import ModalSingleMode from "@components/ModalSingleModes"
import KeyHangmanGame from "@components/KeyHangmanGame"
import Spinner from "@components/Spinner"
import HangmanGameStatsSingle from "@components/HangmanGameStatsSingle"
import BasicModal from "@components/BasicModal"

//* Assets
import Defeat from "@assets/perder.webp"
import Trofeo from "@assets/trofeo.webp"
import HangmanImg0 from "@assets/hangman-0.svg"
import HangmanImg1 from "@assets/hangman-1.svg"
import HangmanImg2 from "@assets/hangman-2.svg"
import HangmanImg3 from "@assets/hangman-3.svg"
import HangmanImg4 from "@assets/hangman-4.svg"
import HangmanImg5 from "@assets/hangman-5.svg"
import HangmanImg6 from "@assets/hangman-6.svg"
import shyBee from "@assets/abeja-shy.webp"

//* Types
import { HangmanWords } from "@types"

const HangmanGameSingle: React.FC = () => {
	//* Conffeti effect
	const randomInRange = (min: number, max: number) => {
		return Math.random() * (max - min) + min
	}
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	const location = useLocation()
	const navigate = useNavigate()

	// biome-ignore format: It will take many lines to format the array
	const Keys = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
	"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "_", "W", "X", "Y", "Z", ]

	//* Game States
	const levelRef = useRef("")
	const round = useRef(0)
	const [victoryOrDefeat, setVictoryOrDefeat] = useState<
		"Victory" | "Defeat" | "NotDefined"
	>("NotDefined")
	const hangmanWordsRef = useRef<HangmanWords[]>([])
	const [level, setLevel] = useState("Level1")
	const [englishLevel, setEnglishLevel] = useState("A1")
	const [completedPercentage, setCompletedPercentage] = useState(0)
	const [Round, setRound] = useState(0)
	const [trophys, setTrophys] = useState(50)
	const [showSpinner, setShowSpinner] = useState(true)
	const [espacios, setEspacios] = useState<(null | string)[]>([])
	const [attemps, setAttemps] = useState(0)
	const [hangmanImg, setHangmanImg] = useState(HangmanImg0)
	const [imageSrc, setImageSrc] = useState("")
	const [message, setMessage] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const [showModal, setShowModal] = useState(false)
	const [wordToGess, setWordToGess] = useState("")
	const [hint, setHint] = useState("")
	const IncorrectAttempsRef = useRef(0)
	const hangmanImages: { [key: number]: string } = {
		0: HangmanImg0,
		1: HangmanImg1,
		2: HangmanImg2,
		3: HangmanImg3,
		4: HangmanImg4,
		5: HangmanImg5,
		6: HangmanImg6,
	}
	const [showBasicModal, setShowBasicModal] = useState(false)
	const [imgSrcBasicModal, setImgSrcBasicModal] = useState("")
	const [messageBasicModal, setMessageBasicModal] = useState("")
	const [mainMessageBasicModal, setMainMessageBasicModal] = useState("")

	const closeBasicModal = () => {
		navigate("/games/hangmangameLevels")
	}

	//* Get data from BeeSMRT API
	const fetchData = async () => {
		try {
			const { level, trophys } = location.state
			levelRef.current = level
			const levelName = String(`${level.substring(2, 7)} ${level.substring(7)}`)
			const englishLevel = String(level).substring(0, 2)
			setLevel(levelName)
			setEnglishLevel(englishLevel)
			setTrophys(trophys)

			// const levelNumber = parseInt(level)
			// const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			// const headers = new Headers()
			// headers.set("englishLevel", level)
			// const response = await fetch(`${BeeSMRTBackendURL}/getHangman1vs1`, {
			// 	headers,
			// })
			//const Words = await response.json()

			const Words: HangmanWords[] = HangmanDemo
			hangmanWordsRef.current = Words
			setRoundContent()

			setShowSpinner(false)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	const setRoundContent = () => {
		const newRound = round.current
		const wordToGess = hangmanWordsRef.current[newRound].word
		const hint = hangmanWordsRef.current[newRound].hint
		const espacios = Array(wordToGess.length).fill(null)
		IncorrectAttempsRef.current = 0
		setCompletedPercentage(0)
		setRound((prevRound) => prevRound + 1)
		setAttemps(0)
		setHangmanImg(HangmanImg0)
		setEspacios(espacios)
		setWordToGess(wordToGess)
		setHint(hint)
	}

	//* Handle Key Click
	const handleKeyClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement
		const currentLetter = target.innerText.toLowerCase()
		const currentWord = wordToGess.toLowerCase()
		const wordIndexes: number[] = []

		for (let i = 0; i < currentWord.length; i++) {
			// //* If the letter is already in the word, return
			if (espacios[i] === currentLetter) {
				return
			}

			//* If the letter is in the word, add the index to the array
			if (currentWord[i] === currentLetter) {
				wordIndexes.push(i)
			}
		}

		if (wordIndexes.length > 0) {
			//* Update the state of the game with the points and the letters
			const newEspacios = [...espacios]

			for (const index of wordIndexes) {
				//*Update the progress bar
				const isLetterAlreadyInEspacios = newEspacios[index] !== null
				if (!isLetterAlreadyInEspacios) {
					setCompletedPercentage((prevPercentage) => {
						const newPercentage = prevPercentage + 100 / currentWord.length
						return Math.min(100, Math.round(newPercentage * 100) / 100)
					})
				}

				newEspacios[index] = currentLetter
			}

			setEspacios(newEspacios)

			//* Check if the player has won
			const isEveryLetterGuess = newEspacios.every((elemento) => {
				return elemento !== null
			})

			if (isEveryLetterGuess) {
				round.current += 1
				if (round.current === 5) {
					setVictoryOrDefeat("Victory")
					showWinning()
					return
				}
				toast(
					<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
						<div>Well done</div>
						<div>Next round coming</div>
					</div>,
					{ duration: 2000 },
				)
				setRoundContent()
			}

			return
		}

		//* If the letter is not in the word, update the attemps and the hangman image
		setAttemps((prevState) => prevState + 1)
		IncorrectAttempsRef.current += 1
		console.log(IncorrectAttempsRef.current)
		setHangmanImg(hangmanImages[IncorrectAttempsRef.current])
	}

	const showWinning = () => {
		setImageSrc(Trofeo)
		setMessage("You have won")
		setMainMessage("Congratulations")
		setShowModal(true)
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

	const tryAgain = () => {
		console.log("try again")
		IncorrectAttempsRef.current = 0
		console.log(IncorrectAttempsRef.current)
		setRound((prevRound) => prevRound - 1)
		setRoundContent()
		setShowModal(false)
	}

	const close = () => {
		setShowModal(false)
		navigate("/games/hangmangameLevels")
	}

	const nextLevel = () => {
		setShowSpinner(true)
		setShowModal(false)
		try {
			const currentLevel = levelRef.current

			//!The user reached the last level
			if (currentLevel === "B1Level6") {
				//*Display the modal with the message "ups you have reached the last level"
				setImgSrcBasicModal(shyBee)
				setMessageBasicModal("You have reached the last level")
				setMainMessageBasicModal("Ups!")
				setShowBasicModal(true)
				setShowSpinner(false)
				return
			}

			//! The user reached the last level of the english level
			const levelNumber = Number(currentLevel.slice(-1))

			if (levelNumber === 6) {
				const englishLevels: { [key: string]: string } = {
					A1: "A2",
					A2: "B1",
				}
				const englishLevel = currentLevel.slice(0, 2)
				const nextEnglishLevel = englishLevels[englishLevel]
				const nextLevelName = `${nextEnglishLevel}Level1`
				levelRef.current = nextLevelName

				setLevel(nextLevelName)
				setEnglishLevel(nextEnglishLevel)

				//*Ask the backend for the next level
				// const levelNumber = parseInt(level)
				// const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
				// const headers = new Headers()
				// headers.set("englishLevel", level)
				// const response = await fetch(`${BeeSMRTBackendURL}/getHangman1vs1`, {
				// 	headers,
				// })
				//const Words = await response.json()

				const Words: HangmanWords[] = HangmanDemo
				hangmanWordsRef.current = Words
				round.current = 0
				setRound(0)
				setRoundContent()
				setShowSpinner(false)
				return
			}

			//! Send the user to the next level
			const englishLevel = currentLevel.slice(0, 2)
			const nextLevelNumber = levelNumber + 1
			const nextLevelName = `${englishLevel}Level${nextLevelNumber}`
			levelRef.current = nextLevelName

			setLevel(nextLevelName)
			setEnglishLevel(englishLevel)

			//*Ask the backend for the next level
			// const levelNumber = parseInt(level)
			// const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			// const headers = new Headers()
			// headers.set("englishLevel", level)
			// const response = await fetch(`${BeeSMRTBackendURL}/getHangman1vs1`, {
			// 	headers,
			// })
			//const Words = await response.json()

			const Words: HangmanWords[] = HangmanDemo
			hangmanWordsRef.current = Words
			round.current = 0
			setRound(0)
			setRoundContent()
			setShowSpinner(false)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	//* Check if the player lose
	useEffect(() => {
		if (attemps === 6) {
			setVictoryOrDefeat("Defeat")
			setImageSrc(Defeat)
			setMessage("You Lose")
			setMainMessage("Game Over")
			setShowModal(true)
			setAttemps(0)
			setHangmanImg(HangmanImg0)
		}
	}, [attemps])

	//* Initial fetch to start the game
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<main className="w-screen h-screen bg-Yellow1 overflow-x-hidden">
				<NavBar />
				<Toaster richColors position="top-left" />
				<h1 className="text-3xl font-Principal text-white text-3d text-center my-2">
					Hangman Game
				</h1>
				{showSpinner ? (
					<Spinner />
				) : (
					<div className="bg-white/70 lg:max-w-[1600px] pb-8 w-11/12 h-auto rounded-lg mx-auto lg:w-[90%] justify-evenly lg:h-[70%] drop-shadow-lg">
						<HangmanGameStatsSingle
							level={level}
							completedPercentage={completedPercentage}
							englishLevel={englishLevel}
							trophys={trophys}
							Round={Round}
						/>
						<div className="lg:flex lg:h-full lg:items-center lg:p-5 lg:pb-20">
							<div className="basis-2/6">
								<div className="flex w-full justify-center pt-4 pb-4">
									<img
										alt="hangman"
										src={hangmanImg}
										className="w-48 lg:w-56"
									/>
								</div>
							</div>
							<div className="basis-4/6 lg:mb-16">
								<div className="font-bold h-16 items-end flex w-full justify-center gap-3">
									{espacios.map((element, key) => {
										return (
											<div key={key} className="text-center pt-7">
												{element}
												<div className="outline outline-black w-4 h-0 m-1 mb-4 lg:w-6" />
											</div>
										)
									})}
								</div>
								<div className="mt-3 text-xl flex flex-col w-10/12 items-center mx-auto">
									<p className="font-Secundaria text-lg">{hint}</p>
									<p className="font-Secundaria text-lg mt-3">
										Incorrect Attempts: {attemps}/6
									</p>
								</div>
								<div
									onClick={handleKeyClick}
									className="grid grid-cols-9 gap-2 mt-4 mx-4"
								>
									{Keys.map((element, index) => {
										return <KeyHangmanGame key={index} element={element} />
									})}
								</div>
							</div>
						</div>
					</div>
				)}
				<ModalSingleMode
					showModal={showModal}
					imageSrc={imageSrc}
					message={message}
					mainMessage={mainMessage}
					victoryOrDefeat={victoryOrDefeat}
					tryAgain={tryAgain}
					nextLevel={nextLevel}
					close={close}
				/>
				<BasicModal
					showModal={showBasicModal}
					imageSrc={imgSrcBasicModal}
					message={messageBasicModal}
					mainMessage={mainMessageBasicModal}
					closeModal={closeBasicModal}
				/>
			</main>
		</>
	)
}

export default HangmanGameSingle
