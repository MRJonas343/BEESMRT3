import { useState, useEffect, useRef, MouseEvent } from "react"
import confetti from "canvas-confetti"
import HangmanDemo from "./hangmanDemo.json"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"

//* Componentes
import NavBar from "@components/NavBar"
import KeyHangmanGame from "@components/KeyHangmanGame"
import Spinner from "@components/Spinner"
import HangmanStats1vs1 from "@components/HangmanStats1vs1"
import BasicModal from "@components/BasicModal"
import SpinningCoin from "@components/SpinningCoin"

//* Assets
import Trofeo from "@assets/trofeo.webp"
import HangmanImg0 from "@assets/hangman-0.svg"
import HangmanImg2 from "@assets/hangman-2.svg"
import HangmanImg5 from "@assets/hangman-5.svg"
import HangmanImg6 from "@assets/hangman-6.svg"

//* Types
import { HangmanWords } from "@types"

const HangmanGame1vs1: React.FC = () => {
	const player1WonRoundsRef = useRef(0)
	const player2WonRoundsRef = useRef(0)
	const player1MistakesRef = useRef(0)
	const player2MistakesRef = useRef(0)
	const activePlayerRef = useRef<"player1" | "player2">("player1")
	const round = useRef(-1)
	const hangmanWordsRef = useRef<HangmanWords[]>([])
	const [spaces, setSpaces] = useState<(null | string)[]>([])
	const [headsOrTails, setHeadsOrTails] = useState<number | undefined>(
		undefined,
	)
	const [showSpinner, setShowSpinner] = useState(true)
	const [activePlayer, setActivePlayer] = useState<"player1" | "player2" | "">(
		"",
	)
	const [imgWinner, setImgWinner] = useState<string>("")
	const [mainMessage, setMainMessage] = useState<string>("")
	const [message, setMessage] = useState<string>("")
	const [showModal, setShowModal] = useState(false)
	const [player1WonRounds, setPlayer1WonRounds] = useState(0)
	const [player2WonRounds, setPlayer2WonRounds] = useState(0)
	const [hangmanImagePlayer1, setHangmanImagePlayer1] = useState(HangmanImg0)
	const [hangmanImagePlayer2, setHangmanImagePlayer2] = useState(HangmanImg0)
	const [player1Mistakes, setPlayer1Mistakes] = useState(0)
	const [player2Mistakes, setPlayer2Mistakes] = useState(0)
	const [showSpinningCoin, setShowSpinningCoin] = useState(false)
	const [wordToGess, setWordToGess] = useState("")
	const [hint, setHint] = useState("")
	const hangmanImages: { [key: number]: string } = {
		0: HangmanImg0,
		1: HangmanImg2,
		2: HangmanImg5,
		3: HangmanImg6,
	}

	const navigate = useNavigate()

	//* Conffeti effect
	const randomInRange = (min: number, max: number) => {
		return Math.random() * (max - min) + min
	}
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	// biome-ignore format: It will take many lines to format the array
	const Keys = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
	"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "_", "W", "X", "Y", "Z", ]

	//* Get data from BeeSMRT API
	const fetchData = async () => {
		try {
			const Words: HangmanWords[] = HangmanDemo
			hangmanWordsRef.current = Words
		} catch (error) {
			console.error("Error fetching data:", error)
		}
		setShowSpinner(false)
		setShowSpinningCoin(!showSpinningCoin)
	}

	//* Spin the coin to decide who starts
	const changeCoin = () => {
		const newHeadsOrTails = Math.floor(Math.random() * 2)
		setHeadsOrTails(newHeadsOrTails)
		setTimeout(() => {
			if (newHeadsOrTails === 0) {
				setActivePlayer("player1")
				activePlayerRef.current = "player1"
			} else {
				setActivePlayer("player2")
				activePlayerRef.current = "player2"
			}
		}, 3000)
		setTimeout(() => {
			setHeadsOrTails(undefined)
			setShowSpinningCoin(!showSpinningCoin)
		}, 5000)
	}

	const initRound = () => {
		round.current += 1
		const wordToGess = hangmanWordsRef.current[round.current].word
		const hint = hangmanWordsRef.current[round.current].hint
		const newSpaces = Array(wordToGess.length).fill(null)
		setSpaces(newSpaces)
		setWordToGess(wordToGess)
		setHint(hint)
	}

	useEffect(() => {
		fetchData()
		setShowSpinningCoin(true)
		initRound()
	}, [])

	const nextRound = () => {
		setHangmanImagePlayer1(HangmanImg0)
		setHangmanImagePlayer2(HangmanImg0)
		setPlayer1Mistakes(0)
		setPlayer2Mistakes(0)
		initRound()
		player1MistakesRef.current = 0
		player2MistakesRef.current = 0
	}

	const checkIfthePlayerLost = () => {
		if (player1MistakesRef.current === 3) {
			toast(
				<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
					<div>Player 1</div>
					<div>Lost the round</div>
				</div>,
				{ duration: 2000 },
			)
			player2WonRoundsRef.current += 1
			setPlayer2WonRounds((prevState) => prevState + 1)

			//*Check if the game is over
			if (player2WonRoundsRef.current === 3) {
				console.log(player1WonRoundsRef.current)
				console.log(player2WonRoundsRef.current)
				const winner = "Player 2"
				setMainMessage("Game Over")
				setMessage(`${winner} Won the game`)
				setImgWinner(Trofeo)
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
			} else {
				nextRound()
			}
		}
		if (player2MistakesRef.current === 3) {
			toast(
				<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
					<div>Player 2</div>
					<div>Lost the round</div>
				</div>,
				{ duration: 2000 },
			)
			player1WonRoundsRef.current += 1
			setPlayer1WonRounds((prevState) => prevState + 1)
			//*Check if the game is over
			if (player1WonRoundsRef.current === 3) {
				console.log(player1WonRoundsRef.current)
				console.log(player2WonRoundsRef.current)
				const winner = "Player 1"
				setMainMessage("Game Over")
				setMessage(`${winner} Won the game`)
				setImgWinner(Trofeo)
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
			} else {
				nextRound()
			}
		}
	}

	//* Handle Key Click
	const handleKeyClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement
		const currentLetter = target.innerText.toLowerCase()
		const currentWord = wordToGess.toLowerCase()
		const wordIndexes: number[] = []

		for (let i = 0; i < currentWord.length; i++) {
			//* If the letter is already in the word add one mistake, update the hangman image and change the player
			if (spaces[i] === currentLetter) {
				if (activePlayerRef.current === "player1") {
					setHangmanImagePlayer1(hangmanImages[player1Mistakes + 1])
					setPlayer1Mistakes((prevState) => prevState + 1)
					player1MistakesRef.current += 1
				} else {
					setHangmanImagePlayer2(hangmanImages[player2Mistakes + 1])
					setPlayer2Mistakes((prevState) => prevState + 1)
					player2MistakesRef.current += 1
				}
				checkIfthePlayerLost()
				setActivePlayer((prevState) => {
					return prevState === "player1" ? "player2" : "player1"
				})
				activePlayerRef.current =
					activePlayerRef.current === "player1" ? "player2" : "player1"
				return
			}
			console.log("si la letra ya esta en la palabra no deberia pasar aqui")

			//* If the letter is in the word, add the index to the array
			if (currentWord[i] === currentLetter) {
				wordIndexes.push(i)
			}
		}

		if (wordIndexes.length > 0) {
			//* If the letter is in the word, show a toast
			toast(
				<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
					<div>Well done</div>
					<div>+1 Turn</div>
				</div>,
				{ duration: 2000 },
			)
			//* Update the state of the game with the letters
			const newSpaces = [...spaces]

			for (const index of wordIndexes) {
				newSpaces[index] = currentLetter
			}

			setSpaces(newSpaces)

			//* Check if the player has won
			const isEveryLetterGuess = newSpaces.every((elemento) => {
				return elemento !== null
			})

			if (isEveryLetterGuess) {
				//*check who won the round
				if (activePlayerRef.current === "player1") {
					setPlayer1WonRounds((prevState) => prevState + 1)
					player1WonRoundsRef.current += 1
					toast(
						<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
							<div>Player 1</div>
							<div>Won the round</div>
						</div>,
						{ duration: 2000 },
					)
				} else {
					setPlayer2WonRounds((prevState) => prevState + 1)
					player2WonRoundsRef.current += 1
					toast(
						<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
							<div>Player 2</div>
							<div>Won the round</div>
						</div>,
						{ duration: 2000 },
					)
				}
				console.log(player1WonRoundsRef.current)
				console.log(player2WonRoundsRef.current)
				//*Check if the game is over
				if (
					player1WonRoundsRef.current === 3 ||
					player2WonRoundsRef.current === 3
				) {
					const winner =
						player1WonRoundsRef.current === 3 ? "Player 1" : "Player 2"
					setMainMessage("Game Over")
					setMessage(`${winner} Won the game`)
					setImgWinner(Trofeo)
					setShowModal(true)
					const interval = setInterval(() => {
						const timeLeft = animationEnd - Date.now()
						if (timeLeft <= 0) {
							clearInterval(interval)
							return
						}
						const particleCount = 50 * (timeLeft / duration)
						const origin1 = {
							x: randomInRange(0.1, 0.3),
							y: Math.random() - 0.2,
						}
						const origin2 = {
							x: randomInRange(0.7, 0.9),
							y: Math.random() - 0.2,
						}
						confetti({ ...defaults, particleCount, origin: origin1 })
						confetti({ ...defaults, particleCount, origin: origin2 })
					}, 250)
					return
				}

				nextRound()
			}
		}

		//* If the letter is not in the word, update the attemps and the hangman image
		if (activePlayerRef.current === "player1") {
			setHangmanImagePlayer1(hangmanImages[player1Mistakes + 1])
			setPlayer1Mistakes((prevState) => prevState + 1)
			player1MistakesRef.current += 1
		} else {
			setHangmanImagePlayer2(hangmanImages[player2Mistakes + 1])
			setPlayer2Mistakes((prevState) => prevState + 1)
			player2MistakesRef.current += 1
		}
		checkIfthePlayerLost()
		//*Change the player
		setActivePlayer((prevState) => {
			return prevState === "player1" ? "player2" : "player1"
		})
		activePlayerRef.current =
			activePlayerRef.current === "player1" ? "player2" : "player1"
		//*update the hangman image
	}

	const closeModal = () => {
		setShowModal(false)
		navigate("/games/hangmangameMode")
	}
	return (
		<>
			<main className="w-screen h-screen bg-Yellow1 overflow-x-hidden">
				{showSpinner ? (
					<Spinner />
				) : (
					<>
						<NavBar />
						<Toaster richColors position="top-left" />
						<h1 className="text-3xl font-Principal text-white text-3d text-center my-2">
							Hangman Game
						</h1>
						<div className="bg-white/70 lg:max-w-[1600px] pb-8 w-11/12 h-auto rounded-lg mx-auto justify-evenly drop-shadow-lg lg:flex lg:flex-col">
							<HangmanStats1vs1
								activePlayer={activePlayer}
								player1Mistakes={player1Mistakes}
								player1WonRounds={player1WonRounds}
								player2Mistakes={player2Mistakes}
								player2WonRounds={player2WonRounds}
							/>
							<div className="">
								<div className="basis-2/6">
									<div className="flex w-full justify-around pt-4 pb-4">
										<img
											alt="hangman"
											src={hangmanImagePlayer1}
											className="w-32"
										/>
										<img
											alt="hangman"
											src={hangmanImagePlayer2}
											className="w-32"
										/>
									</div>
								</div>
								<div className="basis-4/6">
									<div className="font-bold h-16 items-end flex w-full justify-center gap-3">
										{spaces.map((element, key) => {
											return (
												<div key={key} className="text-center pt-7">
													{element}
													<div className="outline outline-black w-4 h-0 m-1 mb-4" />
												</div>
											)
										})}
									</div>
									<div className="mt-3 text-xl flex flex-col w-10/12 items-center mx-auto">
										<p className="font-Secundaria text-lg">{hint}</p>
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
						<SpinningCoin
							showModalCoin={showSpinningCoin}
							headsOrTails={headsOrTails}
							changeCoin={changeCoin}
							activePlayer={activePlayer}
						/>
						<BasicModal
							showModal={showModal}
							closeModal={closeModal}
							imageSrc={imgWinner}
							message={message}
							mainMessage={mainMessage}
						/>
					</>
				)}
			</main>
		</>
	)
}

export default HangmanGame1vs1
