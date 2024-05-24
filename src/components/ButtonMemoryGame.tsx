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
	} w-20 h-14 bg-gray-100 flex relative justify-center items-center cursor-pointer  md:w-24 md:h-20 xl:w-36 xl:h-32`

	return (
		<div className={classCard} onClick={cardHandleClick}>
			<img
				className="cardImg w-12 md:w-20  absolute xl:w-24 p-1 "
				alt=""
				src={card.src}
			/>
			<img
				alt="BackCardImg"
				className="cardBack w-12 md:w-20 xl:w-24 p-1 absolute hover:scale-110 duration-200 ease-in-out"
				src={BackCardImg}
			/>
		</div>
	)
}

export default MemoryGameButtton
