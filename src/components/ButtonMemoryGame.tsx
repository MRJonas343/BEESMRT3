//* Assets
import BackCardImg from "@assets/back.webp"

//* Types
import { MemoryGameButttonProps } from "@types"

const MemoryGameButtton: React.FC<MemoryGameButttonProps> = ({
	card,
	flipped,
	chooseCard,
}) => {
	const cardHandleClick = () => chooseCard(card)

	const classCard = `card ${
		flipped ? "matched" : ""
	} w-20 h-14 bg-gray-100 flex relative justify-center items-center cursor-pointer md:w-24 md:h-20 lg:w-36 lg:h-24`

	return (
		<div className={classCard} onClick={cardHandleClick}>
			<img
				className="cardImg w-12 md:w-20 absolute p-1"
				alt={card.src}
				src={card.src}
			/>
			<img
				alt="BackCardImg"
				className="cardBack w-12 md:w-20 p-1 absolute hover:scale-110 duration-200 ease-in-out"
				src={BackCardImg}
			/>
		</div>
	)
}

export default MemoryGameButtton
