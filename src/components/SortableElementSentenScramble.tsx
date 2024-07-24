import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDroppable } from "@dnd-kit/core"
interface wordButton {
	id: number
	word: string
	idDroppableItem: number
}

const SortableElementSentenScramble: React.FC<wordButton> = ({
	id,
	idDroppableItem,
	word,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: id,
		})

	const { setNodeRef: setNodeRefDoppable } = useDroppable({
		id: idDroppableItem,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
	}

	return (
		<button className="w-32 h-10" type="button" ref={setNodeRefDoppable}>
			<div
				{...attributes}
				{...listeners}
				ref={setNodeRef}
				className="elevetedButton bg-white/80 rounded-md flex justify-center py-2 w-32 h-10"
				style={style}
			>
				{word}
			</div>
		</button>
	)
}

export default SortableElementSentenScramble
