import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
interface wordButton {
	id: number
	word: string
}

const SortableElementSentenScramble: React.FC<wordButton> = ({ id, word }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: id,
		})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
	}

	return (
		<div
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className="elevetedButton bg-white/80 rounded-md flex justify-center py-2 w-32 h-10"
			style={style}
		>
			{word}
		</div>
	)
}

export default SortableElementSentenScramble
