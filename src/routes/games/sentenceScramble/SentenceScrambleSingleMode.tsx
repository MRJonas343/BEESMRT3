import NavBar from "@components/NavBar"
import SentenceScrambleStatsSingleMode from "@components/SentenceScrambleStatsSingleMode"
import { useState, useEffect } from "react"
import DraggableItemSentenceScramble from "@components/DraggableItemSentenceScramble"
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core"
import {
	useSensors,
	useSensor,
	MouseSensor,
	TouchSensor,
	KeyboardSensor,
	DragEndEvent,
} from "@dnd-kit/core"
//import exampleData from "./data.json"
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable"
//import SortableElementSentenScramble from "@components/SortableElementSentenScramble"

const SentenceScrambleSingleMode = () => {
	const [englishLevel] = useState("A1")
	const [level] = useState("Level 3")
	const [completedPercentage] = useState(40)
	const [trophies] = useState(0)
	const [round, setRound] = useState(0)
	const [sentence] = useState("Hey, how are you doing?")
	//const roundRef = useRef(0)

	const words = [
		{
			word: "Hello",
			id: 10,
		},
		{
			word: "World",
			id: 20,
		},

		{
			word: "How",
			id: 30,
		},
		{
			word: "Are",
			id: 40,
		},
		{
			word: "You",
			id: 50,
		},
		{
			word: "Doing",
			id: 60,
		},
		{
			word: "Today",
			id: 70,
		},
		{
			word: "Good",
			id: 80,
		},
		{
			word: "Morning",
			id: 90,
		},
	]

	// const [wordsInDropZone, setWordsInDropZone] = useState(words)
	// const [wordsInInitialZone, setWordsInInitialZone] = useState(words)

	const { setNodeRef } = useDroppable({
		id: "dropzone",
	})

	const sensores = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	)

	const initGame = () => {
		setRound(1)
		updateSentence()
	}

	const updateSentence = () => {
		//const data = exampleData[roundRef.current]
		//const words = data.sentence.split(" ")
		//setWords(words)
	}

	useEffect(() => {
		initGame()
	}, [])

	const handleDropZone1 = (event: DragEndEvent) => {
		console.log(event)
	}

	const handleDropZone2 = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id === over?.id) return

		// setWordSortable((words) => {
		// 	const activeIndex = words.findIndex((word) => word.id === active.id)
		// 	const overIndex = words.findIndex((word) => word.id === over?.id)

		// 	const newWords = [...words]
		// 	newWords[activeIndex] = words[overIndex]
		// 	newWords[overIndex] = words[activeIndex]

		// 	return newWords
		// })
	}

	return (
		<main className="w-screen h-screen bg-[#DD0EE1] overflow-x-hidden">
			<NavBar />

			<h1 className="text-3xl text-3d pt-2 font-Principal text-white text-center">
				Sentence Scramble
			</h1>
			<section className="bg-white/70 flex flex-col mx-4 h-[80%] my-3 rounded-lg">
				<SentenceScrambleStatsSingleMode
					completedPercentage={completedPercentage}
					englishLevel={englishLevel}
					level={level}
					trophys={trophies}
					pairs={round}
				/>
				<div className="bg-white flex my-2 justify-center mx-10 rounded-lg shadow-xl">
					<p className="font-Secundaria p-2">{sentence}</p>
				</div>

				<DndContext
					sensors={sensores}
					onDragEnd={handleDropZone1}
					autoScroll={false}
				>
					<DndContext
						sensors={sensores}
						onDragEnd={handleDropZone2}
						autoScroll={false}
						collisionDetection={closestCenter}
					>
						<button
							type="button"
							className="bg-red-300 h-[240px] my-2 rounded-lg shadow-md grid grid-cols-3 mx-3 p-4 gap-4"
							ref={setNodeRef}
						>
							{/* <SortableContext
								items={wordSortable}
								strategy={rectSwappingStrategy}
							>
								{wordSortable.map((word, index) => (
									<SortableElementSentenScramble
										key={index}
										id={word.id}
										word={word.word}
									/>
								))}
							</SortableContext> */}
						</button>
					</DndContext>

					<section className="grid grid-cols-3 mx-3 p-4 gap-4">
						<SortableContext items={words} strategy={rectSwappingStrategy}>
							{words.map((word, index) => (
								<DraggableItemSentenceScramble
									key={index}
									idDraggableItem={word.id}
									shouldDissaperd={false}
									word={word.word}
								/>
							))}
						</SortableContext>
					</section>
				</DndContext>
			</section>
		</main>
	)
}
export default SentenceScrambleSingleMode
