import { useState, useEffect, useRef, MouseEvent } from "react"
import confetti from "canvas-confetti"

//* Componentes
import NavBar from "@components/NavBar"
import ModalGameOver from "@components/ModalGameOver"
import KeyHangmanGame from "@components/KeyHangmanGame"
import Spinner from "@components/Spinner"

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

const HangmanGameSingle: React.FC = () => {
	//* Conffeti effect
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	//*Keys
	const Keys = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"_",
		"W",
		"X",
		"Y",
		"Z",
	]

	//* Game States
	const [showSpinner, setShowSpinner] = useState(true)
	const [espacios, setEspacios] = useState<(null | string)[]>([])
	const [attemps, setAttemps] = useState(0)
	const [hangmanImg, setHangmanImg] = useState(HangmanImg0)
	const [imageSrc, setImageSrc] = useState("")
	const [message, setMessage] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const [showModal, setShowModal] = useState(false)
	const [points, setPoints] = useState(0)
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

	//* Get data from BeeSMRT API
	const fetchData = async () => {
		try {
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			const response = await fetch(`${BeeSMRTBackendURL}/getHangman1vs1`)

			const Words = await response.json()
			// const Words = HangmanDemo
			const selectedWord = Words[Math.floor(Math.random() * Words.length)]
			const wordLength = selectedWord.word.length

			setWordToGess(selectedWord.word)
			setHint(selectedWord.hint)
			setEspacios(Array(wordLength).fill(null))
			setShowSpinner(false)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
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
				setPoints(points + 1)
				newEspacios[index] = currentLetter
			}

			setEspacios(newEspacios)

			//* Check if the player has won
			const isEveryLetterGuess = newEspacios.every((elemento) => {
				return elemento !== null
			})

			if (isEveryLetterGuess) {
				showWinning()
			}

			return
		}

		//* If the letter is not in the word, update the attemps and the hangman image
		setAttemps((prevState) => prevState + 1)
		IncorrectAttempsRef.current += 1
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

	//* Generete a random number for the confetti effect
	const randomInRange = (min: number, max: number) => {
		return Math.random() * (max - min) + min
	}

	//* Play again function
	const playAgain = () => {
		fetchData()
		setAttemps(0)
		setPoints(0)
		setHangmanImg(HangmanImg0)
	}

	//* Check if the player lose
	useEffect(() => {
		if (attemps === 6) {
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
				<h1 className="text-3xl font-Principal text-white text-3d text-center my-2">
					Hangman Game
				</h1>
				{showSpinner ? (
					<Spinner />
				) : (
					<div className="bg-white/70 w-11/12 h-auto rounded-lg mx-auto lg:flex lg:w-[90%] justify-evenly items-center lg:h-[70%]">
						<div className="basis-2/6">
							<div className="flex w-full justify-center pt-4 pb-4">
								<img alt="hangman" src={hangmanImg} className="w-48 lg:w-56" />
							</div>
						</div>
						<div className="basis-4/6">
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
							<div className="flex w-full justify-around pt-5 pb-5">
								<button
									type="button"
									className="font-Secundaria  text-base bg-red-600 rounded-md p-2 w-24 text-white lg:w-32 lg:text-lg"
									onClick={playAgain}
								>
									RESET
								</button>
								<p className="font-Secundaria text-base bg-green-500 rounded-md p-2 w-24 text-white lg:w-32 lg:text-lg">
									Points : {points}
								</p>
							</div>
						</div>
					</div>
				)}
				<ModalGameOver
					showModal={showModal}
					imageSrc={imageSrc}
					message={message}
					mainMessage={mainMessage}
					playAgain={playAgain}
					showModalWin={() => setShowModal(!showModal)}
				/>
			</main>
		</>
	)
}

export default HangmanGameSingle
