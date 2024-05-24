import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useState, useEffect } from "react"
import { DraggableItemProps } from "@types"

const DraggableItem: React.FC<DraggableItemProps> = ({
	idDraggableItem,
	draggableImgSrc,
	shouldDissaperd,
}) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: idDraggableItem,
	})

	const [classNameItem, setClassNameItem] = useState("")

	useEffect(() => {
		if (!shouldDissaperd) {
			setClassNameItem(
				"elevetedButton bg-white/70 rounded-lg flex items-center justify-center w-36 h-20 lg:w-36 lg:h-36",
			)
		} else {
			setClassNameItem("hidden")
		}
	}, [shouldDissaperd])

	const style = {
		transform: CSS.Transform.toString(transform),
	}

	if (draggableImgSrc === null) {
		draggableImgSrc = ""
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={classNameItem}
		>
			<img
				alt="draggableImgSrc"
				src={draggableImgSrc}
				className="w-20 h-20 p-2 lg:w-28 lg:h-28"
			/>
		</div>
	)
}

export default DraggableItem
