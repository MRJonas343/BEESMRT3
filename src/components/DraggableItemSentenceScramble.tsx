import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useState, useEffect } from "react"
import { DraggableItemSentenceScrambleProps } from "@types"

const DraggableItemSentenceScramble: React.FC<
	DraggableItemSentenceScrambleProps
> = ({ idDraggableItem, word, shouldDissaperd }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: idDraggableItem,
	})

	const [classNameItem, setClassNameItem] = useState("")

	useEffect(() => {
		if (!shouldDissaperd) {
			setClassNameItem(
				"outline outline-Yellow1 outline-3 elevetedButton bg-white/80 rounded-md flex justify-center py-2 w-32 lg:w-36 lg:h-36",
			)
		} else {
			setClassNameItem("hidden")
		}
	}, [shouldDissaperd])

	const style = {
		transform: CSS.Transform.toString(transform),
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			className={classNameItem}
			{...attributes}
		>
			<p className="font-Secundaria">{word}</p>
		</div>
	)
}

export default DraggableItemSentenceScramble
