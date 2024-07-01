import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core"
import { useEffect, useState, useRef } from "react"
import confetti from "canvas-confetti"
import { useLocation } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { usePersonStore } from "@store/auth"

//* Componentes
import NavBar from "@components/NavBar"
import ModalSingleMode from "@components/ModalSingleModes"
import DraggableItem from "@components/DraggableItem"
import DroppableItem from "@components/DroppableItem"
import DragDropStatsSingle from "@components/DragDropStatsSingle"
import Spinner from "@components/Spinner"

//* Assets
import Trofeo from "@assets/trofeo.webp"

//* Types
import { ItemsDnDGameProps, DraggableItemType, DroppableProps } from "@types"

const DragDropGameSingle: React.FC = () => {
	const userEmail = usePersonStore((state) => state.userEmail)
	const navigate = useNavigate()
	const location = useLocation()
	//* Conffeti effect
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
	//* Sensores of DnD for Mouse, Touch and Keyboard
	const sensores = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	)

	//* Game States
	const pointsRef = useRef(0)
	const roundRef = useRef(1)
	const itemsRef = useRef<ItemsDnDGameProps[][]>()
	const itemsRefGen = useRef<ItemsDnDGameProps[]>()
	const levelRef = useRef("")
	const [showSpinner, setShowSpinner] = useState(true)
	const [trophys, setTrophys] = useState(0)
	const [completedPercentage, setCompletedPercentage] = useState(0)
	const [levelName, setLevelName] = useState("")
	const [englishLevel, setEnglishLevel] = useState("")
	const [round, setRound] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [imageSrc, setImageSrc] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const [message, setMessage] = useState("")
	const [victoryOrDefeat, setVictoryOrDefeat] = useState<
		"Victory" | "Defeat" | "NotDefined"
	>("Victory")
	const [DraggableItems, setDraggableItems] = useState<DraggableItemType[]>([])
	const [DroppableAreas, setDroppableAreas] = useState<DroppableProps[]>([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
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
		const response = await fetch(`${BeeSMRTBackendURL}/getDragAndDropSingle`, {
			headers,
		})
		const jsonData = await response.json()

		const firstPart = jsonData.slice(0, 6)
		const secondPart = jsonData.slice(6, 12)
		const thirdPart = jsonData.slice(12, 18)
		itemsRefGen.current = jsonData
		itemsRef.current = [firstPart, secondPart, thirdPart]
		initGame()
	}

	const initGame = () => {
		if (!itemsRef.current) {
			return
		}
		const gameDataSorted = [...itemsRef.current[roundRef.current - 1]].sort(
			() => Math.random() - 0.5,
		)
		const gameDataSorted2 = [...itemsRef.current[roundRef.current - 1]].sort(
			() => Math.random() - 0.5,
		)

		setDraggableItems(
			gameDataSorted.map((item) => {
				return {
					idDraggableItem: item.id,
					draggableImgSrc: item.image,
					shouldDissaperd: false,
				}
			}),
		)
		setDroppableAreas(
			gameDataSorted2.map((DroppableArea) => {
				return {
					idDroppableItem: DroppableArea.id,
					imgDropped: null,
					description: DroppableArea.word,
					hasAnItem: false,
				}
			}),
		)

		setRound((prevRound) => prevRound + 1)

		setShowSpinner(false)
	}

	//* Drop the image in any of the droppable areas
	const handleDrop = (event: DragEndEvent) => {
		if (event.active.id && event.over?.id) {
			//* If the active and over id are different, return
			if (event.active.id !== event.over.id) {
				return
			}

			const id = event.active.id

			const imageDropped = itemsRefGen.current!.find((item) => item.id === id)
				? itemsRefGen.current!.find((item) => item.id === id)!.image
				: null

			const newDroppableAreas = DroppableAreas?.map((DroppableArea) => {
				if (DroppableArea.idDroppableItem === event.over?.id) {
					return {
						idDroppableItem: DroppableArea.idDroppableItem,
						imgDropped: imageDropped,
						description: null,
						hasAnItem: true,
					}
				}
				return DroppableArea
			})
			setDroppableAreas(newDroppableAreas)

			const newDraggableItems = DraggableItems?.map((item) => {
				if (item.idDraggableItem === event.active.id) {
					return {
						idDraggableItem: item.idDraggableItem,
						draggableImgSrc: item.draggableImgSrc,
						shouldDissaperd: true,
					}
				}
				return item
			})
			setDraggableItems(newDraggableItems)

			setCompletedPercentage((prevPercentage) => {
				const newPercentage = prevPercentage + 100 / 6
				if (newPercentage > 96) {
					return 100
				}
				return Math.min(100, Math.round(newPercentage * 100) / 100)
			})

			pointsRef.current += 1

			if (roundRef.current === 3 && pointsRef.current === 6) {
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
				setVictoryOrDefeat("Victory")
				setMainMessage("Congratulations")
				setMessage("You have completed the level")
				setImageSrc(Trofeo)
				setShowModal(true)
				assignTrophys()
				return
			}
			if (pointsRef.current === 6 && roundRef.current < 3) {
				roundRef.current = roundRef.current + 1
				toast(
					<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
						<div>Well done</div>
						<div>Next round start</div>
					</div>,
					{ duration: 2000 },
				)
				nextRound()
			}
		}
	}

	const nextRound = () => {
		pointsRef.current = 0
		initGame()
		setCompletedPercentage(0)
	}

	//* Create a random for the confetti effect
	function randomInRange(min: number, max: number) {
		return Math.random() * (max - min) + min
	}

	//*Close the modal
	const closeModal = () => {
		navigate("/games/dragdropgameLevels")
	}

	const nextLevel = async () => {
		setShowModal(false)
		try {
			const currentLevel = levelRef.current

			//!The user reached the last level
			if (currentLevel === "B1Level6") {
				setVictoryOrDefeat("NotDefined")
				//*Display the modal with the message "ups you have reached the last level"
				setMainMessage("Oops!")
				setMessage("You have completed all the levels")
				setImageSrc(Trofeo)
				setShowModal(true)
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
					`${BeeSMRTBackendURL}/getDragAndDropSingle`,
					{
						headers,
					},
				)
				const jsonData = await response.json()
				const firstPart = jsonData.slice(0, 6)
				const secondPart = jsonData.slice(6, 12)
				const thirdPart = jsonData.slice(12, 18)
				itemsRefGen.current = jsonData
				itemsRef.current = [firstPart, secondPart, thirdPart]
				roundRef.current = 1
				pointsRef.current = 0
				setRound(0)
				initGame()
				setShowSpinner(false)
				return
			}

			//! Send the user to the next level
			setShowSpinner(true)
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
			const response = await fetch(
				`${BeeSMRTBackendURL}/getDragAndDropSingle`,
				{
					headers,
				},
			)

			const jsonData = await response.json()
			const firstPart = jsonData.slice(0, 6)
			const secondPart = jsonData.slice(6, 12)
			const thirdPart = jsonData.slice(12, 18)
			itemsRefGen.current = jsonData
			itemsRef.current = [firstPart, secondPart, thirdPart]
			roundRef.current = 1
			pointsRef.current = 0
			setRound(0)
			initGame()
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
			game: "DragAndDropGame",
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
		<main className="w-screen h-screen bg-green-400 overflow-x-hidden">
			{showSpinner ? (
				<Spinner />
			) : (
				<>
					<NavBar />
					<h1 className="font-Principal tracking-wide text-center text-2xl text-white text-3d lg:text-4xl lg:pt-4">
						Drag and Drop
					</h1>

					<DndContext
						sensors={sensores}
						onDragEnd={handleDrop}
						autoScroll={false}
					>
						<div className="flex flex-col mx-5 bg-white/60 rounded-md">
							<DragDropStatsSingle
								completedPercentage={completedPercentage}
								englishLevel={englishLevel}
								level={levelName}
								round={round}
								trophys={trophys}
							/>
							<div className="flex p-5 lg:flex-col h-[70%] lg:h-[60vh] lg:justify-evenly">
								<section className="flex flex-col w-full gap-4 items-center lg:flex-row lg:justify-around">
									{DraggableItems.map((item) => {
										return (
											<DraggableItem
												key={item.idDraggableItem}
												idDraggableItem={item.idDraggableItem}
												draggableImgSrc={item.draggableImgSrc}
												shouldDissaperd={item.shouldDissaperd}
											/>
										)
									})}
								</section>
								<section className="flex flex-col gap-4 w-full items-center lg:flex-row lg:justify-around">
									{DroppableAreas.map((DroppableArea) => {
										return (
											<DroppableItem
												key={DroppableArea.idDroppableItem}
												idDroppableItem={DroppableArea.idDroppableItem}
												imgDropped={DroppableArea.imgDropped}
												description={DroppableArea.description}
												hasAnItem={DroppableArea.hasAnItem}
											/>
										)
									})}
								</section>
							</div>
						</div>
					</DndContext>

					<ModalSingleMode
						showModal={showModal}
						close={closeModal}
						imageSrc={imageSrc}
						mainMessage={mainMessage}
						message={message}
						victoryOrDefeat={victoryOrDefeat}
						nextLevel={nextLevel}
						tryAgain={() => {}}
					/>

					<Toaster richColors position="top-left" />
				</>
			)}
		</main>
	)
}

export default DragDropGameSingle
