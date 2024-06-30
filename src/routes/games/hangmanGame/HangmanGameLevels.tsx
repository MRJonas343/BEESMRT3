import NavBar from "@components/NavBar"
import { ChangeEvent, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { EnglishLevel } from "@types"
import Trophy from "@assets/trophisIcon.png"
import BasicModal from "@components/BasicModal"
import { usePersonStore } from "../../../store/auth"
import shyBee from "@assets/abeja-shy.webp"
import Spinner from "@components/Spinner"

const HangmanGameLevels = () => {
	const [loading, setLoading] = useState(true)
	const token = usePersonStore((state) => state.token)
	const email = usePersonStore((state) => state.userEmail)
	const englishLevel = usePersonStore((state) => state.userEnglishLevel)
	const [showModal, setShowModal] = useState(false)
	const [imageSrc, setImageSrc] = useState("")
	const [message, setMessage] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const englishLevelsRef = useRef<EnglishLevel[]>([])

	const navigate = useNavigate()

	//* Supongamos que el nivel de inglés lo saco del local storage
	const userEnglishLevel = englishLevel || "A1"

	//*Necesito usar programación funcional para filtar los niveles de acuerdo al nivel de ingles del usuario
	const [englishLevels, setEnglishLevels] = useState<EnglishLevel[]>([])

	useEffect(() => {
		if (token === null) {
			setShowModal(true)
			setImageSrc(shyBee)
			setMessage("To save your progress, you must log in first")
			setMainMessage("You are not logged in")
			fetchLevels(null, null)
		} else {
			fetchLevels(email!, token!)
		}
	}, [])

	const fetchLevels = async (
		userEmail: string | null,
		token: string | null,
	) => {
		const headers = {
			"Content-Type": "application/json",
			game: "HangmanGame",
		}

		if (token) {
			Object.assign(headers, { Authorization: `Bearer ${token}` })
			Object.assign(headers, { email: userEmail })
		}

		const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
		const response = await fetch(`${BeeSMRTBackendURL}/getHangmanLevels`, {
			method: "GET",
			headers: headers,
		})

		const data = await response.json()
		englishLevelsRef.current = data

		if (response.ok) {
			const newLevels = englishLevelsRef.current.filter(
				(level: EnglishLevel) => level.EnglishLevel === userEnglishLevel,
			)
			console.log("Re-rendering")
			setEnglishLevels(newLevels)
			setLoading(!loading)
			return
		}

		if (response.status === 401) {
			setShowModal(true)
			setImageSrc(shyBee)
			setMessage("To save your progress, you must log in first")
			setMainMessage("You are not logged in")
			const newLevels = englishLevelsRef.current.filter(
				(level: EnglishLevel) => level.EnglishLevel === userEnglishLevel,
			)
			setEnglishLevels(newLevels)
			setLoading(!loading)
			return
		}

		if (response.status === 498) {
			setShowModal(true)
			setImageSrc(shyBee)
			setMessage("please log in again to continue playing")
			setMainMessage("Your session has expired")
			englishLevelsRef.current = data
			const newLevels = englishLevelsRef.current.filter(
				(level: EnglishLevel) => level.EnglishLevel === userEnglishLevel,
			)
			setEnglishLevels(newLevels)
			setLoading(!loading)
			return
		}
	}

	const changeLevels = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedLevel = String(e.target.value)
		const newEnglishLevels = englishLevelsRef.current.filter(
			(level) => level.EnglishLevel === selectedLevel,
		)
		setEnglishLevels(newEnglishLevels)
	}

	const redirectToGame = (e: MouseEvent<HTMLButtonElement>) => {
		const chosenLevel = e.currentTarget.textContent
		const levelObject = englishLevels.find(
			(level) => level.LevelName === chosenLevel,
		)
		const trophys = levelObject?.Trophys
		const level = levelObject?.Level
		navigate("/games/hangmangameSingle", { state: { level, trophys } })
	}

	return (
		<div className="w-screen h-screen bg-Gradient2 overflow-x-hidden">
			{loading ? (
				<Spinner />
			) : (
				<>
					<NavBar />
					<div className="bg-white m-6 p-10 pb-12 rounded-md text-center">
						<div className="font-Secundaria text-3xl py-3">
							Hangman Game Levels
						</div>
						<div className="flex justify-center gap-4 items-center">
							<h2 className="font-bold">English level :</h2>
							<select
								className="font-Principal text-xl px-4 rounded-lg border-black border-2"
								onChange={changeLevels}
							>
								<option>A1</option>
								<option>A2</option>
								<option>B1</option>
							</select>
						</div>

						<section className="flex flex-col w-auto gap-5">
							<h2 className="text-center font-Secundaria text-2xl font-bold">
								Choose a level
							</h2>
							<div className="flex gap-5 flex-wrap justify-center">
								{englishLevels.map((level, index) => (
									<div
										key={index}
										className="grid gap-1 text-center place-items-center"
									>
										<button
											key={index}
											className="font-Secundaria hover:shadow-sm hover:shadow-slate-950 text-fuchsia-600 border-fuchsia-600 hover:text-amber-500 hover:border-amber-500 transition-btn-1 border-2 border-btn w-32 font-bold p-2 rounded-md"
											onClick={redirectToGame}
											type="button"
										>
											{level.LevelName}
										</button>
										<h3 className="font-semibold">{level.Trophys}</h3>
										<img src={Trophy} alt="Trophy" className="w-10" />
									</div>
								))}
							</div>
						</section>
					</div>
					<BasicModal
						showModal={showModal}
						closeModal={() => setShowModal(!showModal)}
						imageSrc={imageSrc}
						message={message}
						mainMessage={mainMessage}
					/>
				</>
			)}
		</div>
	)
}
export default HangmanGameLevels
