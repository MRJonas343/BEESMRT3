import NavBar from "@components/NavBar"
import { ChangeEvent, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import LevelsJson from "./HangmanLevels.json"
import { useState } from "react"
import { EnglishLevel } from "@types"
import Trophy from "@assets/trophisIcon.png"

const HangmanGameLevels = () => {
	const navigate = useNavigate()

	//* Supongamos que el nivel de inglés lo saco del local storage
	const userEnglishLevel = "A1"

	//*Necesito usar programación funcional para filtar los niveles de acuerdo al nivel de ingles del usuario
	const [englishLevels, setEnglishLevels] = useState<EnglishLevel[]>(
		LevelsJson.filter((level) => level.EnglishLevel === userEnglishLevel),
	)

	const changeLevels = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedLevel = String(e.target.value)
		const newEnglishLevels = LevelsJson.filter(
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
			<NavBar />
			<div className="bg-white m-6 p-10 pb-12 rounded-md text-center">
				<div className="font-Secundaria text-3xl py-3">HangmanGameLevels</div>
				<div className="flex justify-center gap-4 items-center">
					<h2 className="font-bold">English level :</h2>
					<select
						className="font-Principal text-xl px-4 rounded-lg border-black border-2"
						onChange={changeLevels}
					>
						<option>A1</option>
						<option>A2</option>
						<option>B1</option>
						<option>B2</option>
						<option>C1</option>
						<option>C2</option>
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
		</div>
	)
}
export default HangmanGameLevels
