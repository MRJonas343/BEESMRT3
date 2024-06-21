import { useDroppable } from "@dnd-kit/core"
import { useState, useEffect } from "react"

import { DroppableProps } from "@types"

const DroppableItem: React.FC<DroppableProps> = ({
	idDroppableItem,
	imgDropped,
	description,
	hasAnItem,
}) => {
	const { setNodeRef } = useDroppable({
		id: idDroppableItem,
	})

	if (imgDropped === null) {
		imgDropped = ""
	}

	const [classNameArea, setClassNameArea] = useState("")
	const [classNameP, setClassNameP] = useState("")

	useEffect(() => {
		if (hasAnItem) {
			setClassNameArea(
				"bg-white p-4 rounded-lg w-32 h-18 flex justify-center items-center outline-Pink1 outline lg:w-36 lg:h-36",
			)
			setClassNameP("hidden")
		} else {
			setClassNameArea(
				"bg-white p-4 rounded-lg w-32 h-20 outline outline-Yellow3 lg:w-36 lg:h-36",
			)
			setClassNameP("font-Principal text-lg tracking-wide")
		}
	}, [hasAnItem])

	return (
		<button type="button" ref={setNodeRef} className={classNameArea}>
			{/* biome-ignore lint/a11y/useAltText: It take out the purpose of the game */}
			<img src={imgDropped} className="w-16" />
			<p className={classNameP}>{description}</p>
		</button>
	)
}

export default DroppableItem
