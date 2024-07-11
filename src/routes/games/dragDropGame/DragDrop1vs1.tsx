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
import { Toaster, toast } from "sonner"
import { useNavigate } from "react-router-dom"

//* Componentes
import NavBar from "@components/NavBar"
import ModalSingleMode from "@components/ModalSingleModes"
import DraggableItem from "@components/DraggableItem"
import DroppableItem from "@components/DroppableItem"
import DragDrop1vs1Stats from "@components/DragDropStats1vs1"
import Spinner from "@components/Spinner"
import SpinningCoin from "@components/SpinningCoin"
//* Assets
import Trofeo from "@assets/trofeo.webp"

//* Types
import { ItemsDnDGameProps, DraggableItemType, DroppableProps } from "@types"

const DragDrop1vs1: React.FC = () => {
	const navigate = useNavigate()
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
	const [showSpinner, setShowSpinner] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [imageSrc, setImageSrc] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const [message, setMessage] = useState("")
	const [DraggableItems, setDraggableItems] = useState<DraggableItemType[]>([])
	const [DroppableAreas, setDroppableAreas] = useState<DroppableProps[]>([])
	const [showSpiningCoin, setShowSpiningCoin] = useState(false)
	const [headsOrTails, setHeadsOrTails] = useState<number | undefined>(
		undefined,
	)
	const [activePlayer, setActivePlayer] = useState("")
	const activePlayerRef = useRef("")
	const [activePlayerStats, setActivePlayerStats] = useState("")
	const [player1Points, setPlayer1Points] = useState(0)
	const [player2Points, setPlayer2Points] = useState(0)
	useEffect(() => {
		fetchData()
		setShowSpiningCoin(!showSpiningCoin)
	}, [])

	const changeCoin = () => {
		const newHeadsOrTails = Math.floor(Math.random() * 2)
		setHeadsOrTails(newHeadsOrTails)
		setTimeout(() => {
			setActivePlayer(
				newHeadsOrTails === 0 ? "Player 1 Starts!!!" : "Player 2 Starts!!!",
			)
			if (newHeadsOrTails === 0) {
				setActivePlayerStats("player1")
				activePlayerRef.current = "player1"
			} else {
				setActivePlayerStats("player2")
				activePlayerRef.current = "player2"
			}
		}, 3000)
		setTimeout(() => {
			setActivePlayer("")
			setHeadsOrTails(undefined)
			setShowSpiningCoin((prevState) => !prevState)
		}, 5000)
	}

	const fetchData = async () => {
		const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
		const response = await fetch(`${BeeSMRTBackendURL}/getDndGame1vs1`)
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

		setShowSpinner(false)
	}

	//* Drop the image in any of the droppable areas
	const handleDrop = (event: DragEndEvent) => {
		if (event.active.id && event.over?.id) {
			//* If the active and over id are different, the player failed
			if (event.active.id !== event.over.id) {
				toast(
					<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-red-500 text-4xl">
						<div>Fail</div>
					</div>,
					{ duration: 700 },
				)
				if (activePlayerRef.current === "player1") {
					setActivePlayerStats("player2")
					activePlayerRef.current = "player2"
				} else {
					setActivePlayerStats("player1")
					activePlayerRef.current = "player1"
				}
				return
			}
			//*Give the points to the player
			toast(
				<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-blue-500 text-4xl">
					<div> + 1 Point</div>
				</div>,
				{ duration: 700 },
			)

			if (activePlayerRef.current === "player1") {
				setPlayer1Points((prevState) => prevState + 1)
				setActivePlayerStats("player2")
				activePlayerRef.current = "player2"
			} else {
				setPlayer2Points((prevState) => prevState + 1)
				setActivePlayerStats("player1")
				activePlayerRef.current = "player1"
			}

			//*Update the droppable areas and the draggable items
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

			pointsRef.current += 1

			//*If the round is over, start the next round
			if (pointsRef.current === 6 && roundRef.current < 3) {
				roundRef.current = roundRef.current + 1
				toast(
					<div className="flex flex-col mx-auto text-center tracking-wider py-6 font-Principal text-3d text-green-600 text-4xl">
						<div>Next Round</div>
					</div>,
					{ duration: 1000 },
				)
				nextRound()
			}
		}
	}

	useEffect(() => {
		if (player1Points + player2Points === 18) {
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
			setShowModal(true)
			if (player1Points > player2Points) {
				setMainMessage("Congratulations Player 1")
				setMessage("You won the game")
				setImageSrc(Trofeo)
			} else {
				setMainMessage("Congratulations Player 2")
				setMessage("You won the game")
				setImageSrc(Trofeo)
			}
		}
	}, [player1Points, player2Points])

	const nextRound = () => {
		pointsRef.current = 0
		initGame()
	}

	//* Create a random for the confetti effect
	function randomInRange(min: number, max: number) {
		return Math.random() * (max - min) + min
	}

	//*Close the modal
	const closeModal = () => {
		navigate("/games/dragdropgameMode")
	}

	return (
		<main className="w-screen h-screen bg-[#64C5D5] overflow-x-hidden">
			{showSpinner ? (
				<Spinner />
			) : (
				<>
					<NavBar />

					<DndContext
						sensors={sensores}
						onDragEnd={handleDrop}
						autoScroll={false}
					>
						<div className="flex mt-2 flex-col mx-5 bg-white/60 rounded-md">
							<DragDrop1vs1Stats
								activePlayer={activePlayerStats}
								player1Points={player1Points}
								player2Points={player2Points}
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
						victoryOrDefeat={"NotDefined"}
						nextLevel={() => {}}
						tryAgain={() => {}}
					/>

					<Toaster richColors position="top-left" />
					<SpinningCoin
						activePlayer={activePlayer}
						showModalCoin={showSpiningCoin}
						headsOrTails={headsOrTails}
						changeCoin={changeCoin}
					/>
				</>
			)}
		</main>
	)
}

export default DragDrop1vs1
