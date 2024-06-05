import NavBar from "@components/NavBar"
import { ChangeEvent, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import LevelsJson from "./englishLevels.json"
import { useState } from "react"
import { EnglishLevel } from "@types"
import Trophy from "@assets/trophisIcon.png"

const MemoryGameLevels = () => {
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
		navigate("/games/memorygameSingle", { state: { level, trophys } })
	}

	return (
		<>
			<NavBar />
			<div>MemoryGameLevels</div>
			<h2>English level :</h2>
			<select onChange={changeLevels}>
				<option>A1</option>
				<option>A2</option>
				<option>B1</option>
				<option>B2</option>
				<option>C1</option>
				<option>C2</option>
			</select>
			<section className="flex flex-col w-auto gap-5">
				<h2>Choose a level</h2>
				{englishLevels.map((level, index) => (
					<div key={index} className="flex gap-4">
						<button
							key={index}
							className="bg-blue-500 w-28 text-white p-2 rounded-md"
							onClick={redirectToGame}
							type="button"
						>
							{level.LevelName}
						</button>
						<h3>{level.Trophys}</h3>
						<img src={Trophy} alt="Trophy" className="w-10" />
					</div>
				))}
			</section>
		</>
	)
}
export default MemoryGameLevels
